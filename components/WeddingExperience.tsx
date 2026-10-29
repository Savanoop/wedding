"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, CalendarDays, MapPin, Music2, Pause, Play } from "lucide-react";

type OpenState = "closed" | "playing" | "opened";

type Countdown = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    started: boolean;
};

const initialCountdown: Countdown = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    started: false,
};

const weddingDate = new Date("2026-12-06T10:45:00+05:30");
const venue = "Ammachi Veedu, Kanjikuzhi, Kottayam, Kerala, India";
const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venue)}`;
const calendarUrl = `https://calendar.google.com/calendar/render?${new URLSearchParams({
    action: "TEMPLATE",
    text: "Wedding of Anoop Vijayan & Vishnupriya",
    dates: "20261206T051500Z/20261206T071500Z",
    details: "Join us to celebrate the wedding of Anoop Vijayan and Vishnupriya.",
    location: venue,
    ctz: "Asia/Kolkata",
})}`;

function getCountdown(): Countdown {
    const d = Math.max(0, weddingDate.getTime() - Date.now());
    return {
        days: Math.floor(d / 86400000),
        hours: Math.floor((d % 86400000) / 3600000),
        minutes: Math.floor((d % 3600000) / 60000),
        seconds: Math.floor((d % 60000) / 1000),
        started: d === 0,
    };
}

function downloadICS() {
    const body = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Anoop and Vishnupriya//Wedding//EN",
        "CALSCALE:GREGORIAN",
        "BEGIN:VEVENT",
        "UID:anoop-vishnupriya-20261206@wedding",
        "DTSTAMP:20261029T000000Z",
        "DTSTART;TZID=Asia/Kolkata:20261206T104500",
        "DTEND;TZID=Asia/Kolkata:20261206T124500",
        "SUMMARY:Wedding of Anoop Vijayan & Vishnupriya",
        `LOCATION:${venue.replace(/,/g, "\\,")}`,
        "DESCRIPTION:Join us to celebrate our wedding.",
        "END:VEVENT",
        "END:VCALENDAR",
    ].join("\r\n");

    const url = URL.createObjectURL(new Blob([body], { type: "text/calendar;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "anoop-vishnupriya-wedding.ics";
    a.click();
    URL.revokeObjectURL(url);
}

function GardenArt() {
    return (
        <svg viewBox="0 0 640 390" className="garden-art" role="img" aria-label="Watercolor-inspired palace and flower garden">
            <defs>
                <linearGradient id="sky" x2="0" y2="1">
                    <stop stopColor="#f3d6d0" />
                    <stop offset="1" stopColor="#fff2df" />
                </linearGradient>
            </defs>
            <path d="M35 335Q20 110 160 70Q315 -10 480 65Q630 120 605 335Z" fill="url(#sky)" />
            <circle cx="478" cy="95" r="42" fill="#f4c9a3" opacity=".65" />
            <path d="M70 335V190L120 148L170 190V335M440 335V195L495 150L550 195V335" fill="#d9a68e" opacity=".55" />
            <path d="M220 335V165L320 88L420 165V335" fill="#d7a88c" stroke="#b7806e" strokeWidth="3" />
            <path d="M202 169L320 76L438 169Z" fill="#b77e6d" />
            <path d="M280 335V252Q320 220 360 252V335" fill="#98645b" />
            <path d="M245 195H275V228H245ZM365 195H395V228H365Z" fill="#fff0db" stroke="#b7806e" strokeWidth="2" />
            <path d="M20 335Q180 300 320 335T620 335" fill="none" stroke="#8ea184" strokeWidth="7" />
            <g fill="#c98291">
                {Array.from({ length: 12 }, (_, i) => (
                    <g key={i} transform={`translate(${35 + i * 52} ${320 + (i % 3) * 8})`}>
                        <circle r="8" cy="-14" />
                        <circle r="8" cx="10" cy="-20" fill="#e3a5ac" />
                        <circle r="8" cx="-9" cy="-22" fill="#d995a1" />
                        <circle r="5" cy="-20" fill="#f6d8a6" />
                    </g>
                ))}
            </g>
        </svg>
    );
}

export default function WeddingExperience() {
    const [openState, setOpenState] = useState<OpenState>("closed");
    const [musicOn, setMusicOn] = useState(false);
    const [t, setT] = useState<Countdown>(initialCountdown);
    const [chapter, setChapter] = useState(0);
    const [photo, setPhoto] = useState(0);
    const openingVideoRef = useRef<HTMLVideoElement | null>(null);
    const isClosed = openState === "closed";
    const isPlaying = openState === "playing";
    const isOpened = openState === "opened";

    const playMusic = async () => {
        const audio = document.getElementById("wedding-audio") as HTMLAudioElement | null;
        if (!audio) {
            return false;
        }

        try {
            await audio.play();
            setMusicOn(true);
            return true;
        } catch {
            setMusicOn(false);
            return false;
        }
    };

    useEffect(() => {
        setT(getCountdown());
        const id = window.setInterval(() => setT(getCountdown()), 1000);
        return () => window.clearInterval(id);
    }, []);

    const chapters = useMemo(
        () => [
            {
                date: "THE BEGINNING",
                title: "A beautiful hello",
                copy: "Every great story begins with a moment that feels ordinary until it becomes the beginning of everything.",
            },
            {
                date: "GROWING TOGETHER",
                title: "A thousand little moments",
                copy: "In shared laughter, thoughtful gestures and dreams made together, two paths become one.",
            },
            {
                date: "THE PROMISE",
                title: "A forever kind of love",
                copy: "With hearts full of gratitude, we begin our next chapter surrounded by the people who mean the most.",
            },
            {
                date: "DECEMBER 6, 2026",
                title: "And now, you are part of it",
                copy: "We would be delighted to have you with us as we celebrate the start of our forever.",
            },
        ],
        [],
    );

    const toggleMusic = async () => {
        const audio = document.getElementById("wedding-audio") as HTMLAudioElement | null;
        if (!audio) {
            return;
        }

        if (musicOn) {
            audio.pause();
            setMusicOn(false);
            return;
        }

        const started = await playMusic();
        if (!started) {
            window.alert("Add a licensed music file at public/audio/wed-music.mp3 to enable music.");
        }
    };

    const startOpening = () => {
        if (openState !== "closed") {
            return;
        }

        setOpenState("playing");
        const openVideo = openingVideoRef.current;
        if (!openVideo) {
            finishOpening();
            return;
        }

        openVideo.currentTime = 0;
        const playPromise = openVideo.play();
        if (playPromise) {
            void playPromise.catch(() => {
                finishOpening();
            });
        }
    };

    const skipToInvite = () => {
        setOpenState("opened");
        window.scrollTo({ top: 0, behavior: "instant" });
    };

    const finishOpening = () => {
        setOpenState("opened");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        if (openState !== "playing") {
            return;
        }

        const stalledMediaFallback = window.setTimeout(() => {
            const openVideo = openingVideoRef.current;
            if (!openVideo) {
                finishOpening();
                return;
            }

            const hasPlaybackData = openVideo.readyState >= 2;
            const hasStartedPlayback = openVideo.currentTime > 0.2 || !openVideo.paused;
            if (!hasPlaybackData || !hasStartedPlayback) {
                finishOpening();
            }
        }, 1400);

        const fallback = window.setTimeout(() => {
            finishOpening();
        }, 7000);

        return () => {
            window.clearTimeout(stalledMediaFallback);
            window.clearTimeout(fallback);
        };
    }, [openState]);

    useEffect(() => {
        const root = document.documentElement;
        const body = document.body;

        if (!isOpened) {
            root.style.overflow = "hidden";
            body.style.overflow = "hidden";
        } else {
            root.style.overflow = "";
            body.style.overflow = "";
        }

        return () => {
            root.style.overflow = "";
            body.style.overflow = "";
        };
    }, [isOpened]);

    useEffect(() => {
        if (!isOpened) {
            return;
        }

        void playMusic();
    }, [isOpened]);

    return (
        <main className="storybook">
            <audio id="wedding-audio" src="/audio/wed-music.mp3" loop preload="none" />

            <section className={`seal-stage ${isOpened ? "is-opened" : ""}`} aria-hidden={isOpened}>
                <button
                    className={`seal-envelope ${isClosed ? "is-closed" : ""} ${isPlaying ? "is-playing" : ""} ${isOpened ? "is-opened" : ""}`}
                    onClick={startOpening}
                    disabled={!isClosed}
                    aria-label="Tap the seal to open the invitation"
                >
                    <img src="/images/invite-seal.png" alt="Wedding envelope with wax seal" className="seal-image" />
                    <video
                        ref={openingVideoRef}
                        className="seal-video"
                        src="/videos/invite-open.mp4"
                        muted
                        playsInline
                        preload="auto"
                        onEnded={finishOpening}
                        onError={finishOpening}
                        onAbort={finishOpening}
                    />
                    <span className="seal-hint">Tap the seal to open</span>
                </button>
                <button className={`skip-open ${isPlaying || isOpened ? "is-hidden" : ""}`} onClick={skipToInvite}>
                    Skip
                </button>
            </section>

            {isOpened ? <div className="inside-pages ready">
                <header className="nav">
                    <a href="#home" className="brand">
                        A <i>✿</i> V
                    </a>
                    <nav>
                        <a href="#story">Our story</a>
                        <a href="#details">The day</a>
                    </nav>
                    <button onClick={toggleMusic} className="sound">
                        {musicOn ? <Pause size={15} /> : <Music2 size={15} />} {musicOn ? "Pause music" : "Music"}
                    </button>
                </header>

                <section className="hero" id="home">
                    <div className="hero-copy">
                        <p className="eyebrow">A LITTLE NOTE FROM OUR HEARTS</p>
                        <h2>
                            Our <em>ever after</em>
                            <br />
                            begins here.
                        </h2>
                        <p className="names">
                            Anoop Vijayan <i>&</i> Vishnupriya
                        </p>
                        <p className="date">SUNDAY · 06 DECEMBER 2026 · 10:45 AM</p>
                    </div>
                    <button
                        className="scroll"
                        onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })}
                        aria-label="Scroll down"
                    >
                        <ArrowDown size={16} />
                    </button>
                </section>

                <section className="chapter-one section-shell" id="story">
                    <div aria-hidden="true" className="section-wash section-wash-blush" />
                    <div className="section-wrap wide">
                        <div className="section-head text-center">
                            <p className="chapter-kicker">Chapter One</p>
                            <h2 className="chapter-title">The Two of Them</h2>
                            <p className="chapter-script">A love story in three brushstrokes</p>
                        </div>

                        <div className="flourish-divider" aria-hidden="true">
                            ✦ ✧ ✦
                        </div>

                        <div className="portrait-grid">
                            <article className="portrait-card group-card">
                                <div className="portrait-media">
                                    <img className="photo-bride" src="/images/potrait-bride.jpg" alt="Portrait of the bride" />
                                    <div aria-hidden="true" className="portrait-glow" />
                                </div>
                                <div className="portrait-copy">
                                    <p className="mini-kicker">The Bride</p>
                                    <h3>Vishnupriya</h3>
                                    <p>With a smile that makes ordinary moments feel special and a heart that turns every day into a celebration.</p>
                                </div>
                            </article>

                            <article className="portrait-card group-card">
                                <div className="portrait-media">
                                    <img className="photo-groom" src="/images/potrait-groom.jpg" alt="Portrait of the groom" />
                                    <div aria-hidden="true" className="portrait-glow" />
                                </div>
                                <div className="portrait-copy">
                                    <p className="mini-kicker">The Groom</p>
                                    <h3>Anoop Vijayan</h3>
                                    <p>With a heart full of hope, laughter, and gratitude, ready for a lifetime of love and shared dreams.</p>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>

                <section className="waiting-shell section-shell">
                    <div aria-hidden="true" className="section-wash section-wash-waiting" />
                    <div className="lantern-layer" aria-hidden="true">
                        {Array.from({ length: 8 }, (_, i) => (
                            <span key={i} className={`lantern l-${i + 1}`} />
                        ))}
                    </div>
                    <div className="section-wrap narrow text-center">
                        <p className="chapter-kicker">The Waiting</p>
                        <h2 className="chapter-title">Until the gates open</h2>
                        <div className="count-glass-row">
                            {t.started ? (
                                <p>Today, our forever begins.</p>
                            ) : (
                                ([
                                    ["Days", t.days],
                                    ["Hours", t.hours],
                                    ["Minutes", t.minutes],
                                    ["Seconds", t.seconds],
                                ] as Array<[string, number]>).map(([label, value]) => (
                                    <div className="glass-count" key={label}>
                                        <strong>{String(value).padStart(2, "0")}</strong>
                                        <span>{label}</span>
                                    </div>
                                ))
                            )}
                        </div>
                        <p className="chapter-script mt-tight">Sunday, 06 December 2026</p>
                    </div>
                </section>

                <section className="details-shell section-shell" id="details">
                    <div aria-hidden="true" className="section-wash section-wash-peach" />
                    <div className="section-wrap details-wrap">
                        <div className="section-head text-center">
                            <p className="chapter-kicker">Chapter Two</p>
                            <h2 className="chapter-title">Where the story gathers</h2>
                        </div>

                        <div className="flourish-divider" aria-hidden="true">
                            ✦ ✧ ✦
                        </div>

                        <div className="detail-grid">
                            <article className="detail-plate">
                                <small>The Day</small>
                                <p>Sunday, 06 December 2026</p>
                            </article>
                            <article className="detail-plate">
                                <small>The Hour</small>
                                <p>10:45 in the morning</p>
                            </article>
                            <article className="detail-plate">
                                <small>The Place</small>
                                <p>Ammachi Veedu · Kanjikuzhi, Kottayam, Kerala</p>
                            </article>
                            <article className="detail-plate">
                                <small>Dress Code</small>
                                <p>Traditional</p>
                            </article>
                        </div>

                        <div className="details-actions">
                            <a className="garden-button" href={calendarUrl} target="_blank" rel="noreferrer">
                                <CalendarDays size={16} /> Add to Calendar
                            </a>
                            <a className="garden-button outline" href={mapsUrl} target="_blank" rel="noreferrer">
                                <MapPin size={16} /> Get Directions
                            </a>
                            <button className="text-link" onClick={downloadICS}>
                                Download calendar invite (.ics)
                            </button>
                        </div>

                        <div className="map-plate" aria-hidden="true">
                            <img className="photo-couple" src="/images/bride-groom.jpg" alt="" />
                            <div className="map-veil" />
                        </div>
                    </div>
                </section>

                {/* <section className="timeline">
                    <p className="chapter">CHAPTER THREE - A FEW PAGES FROM OUR STORY</p>
                    <h2>
                        How our story <em>blooms</em>
                    </h2>
                    <p className="intro">Choose a chapter to read a little note about our journey.</p>
                    <div className="tabs">
                        {chapters.map((c, i) => (
                            <button key={c.date} onClick={() => setChapter(i)} className={chapter === i ? "active" : ""} aria-pressed={chapter === i}>
                                {["I", "II", "III", "IV"][i]}
                            </button>
                        ))}
                    </div>
                    <article className="story-card">
                        <span>✿</span>
                        <small>{chapters[chapter].date}</small>
                        <h3>{chapters[chapter].title}</h3>
                        <p>{chapters[chapter].copy}</p>
                    </article>
                </section>

                <section className="section gallery" id="gallery">
                    <p className="chapter">CHAPTER FOUR - PAINTED MOMENTS</p>
                    <h2>
                        A little album of <em>us</em>
                    </h2>
                    <p className="intro">Your favorite photographs will make this story uniquely yours.</p>
                    <div className={`art-frame art-${photo}`}>
                        <div className="sun-disc" />
                        <div className="hills hill-a" />
                        <div className="hills hill-b" />
                        <span className="bloom bloom-a">✿</span>
                        <span className="bloom bloom-b">❀</span>
                        <span className="bloom bloom-c">✿</span>
                        <div className="figure figure-a" />
                        <div className="figure figure-b" />
                        <label>REPLACE WITH YOUR PHOTOGRAPHS</label>
                    </div>
                    <div className="gallery-controls">
                        <button onClick={() => setPhoto((p) => (p + 3) % 4)} aria-label="Previous gallery artwork">
                            ←
                        </button>
                        <span>{photo + 1} / 4 · A memory to cherish</span>
                        <button onClick={() => setPhoto((p) => (p + 1) % 4)} aria-label="Next gallery artwork">
                            →
                        </button>
                    </div>
                </section> */}

                <section className="closing">
                    <p className="eyebrow">COME EARLY. STAY A LITTLE.</p>
                    <h2>
                        Our story is sweeter
                        <br />
                        <em>with you in it.</em>
                    </h2>
                    <p>
                        With all our love,
                        <br />
                        <strong className="closing-names">Anoop <i>&</i> Vishnupriya</strong>
                    </p>
                    <span className="closing-date">06 · 12 · 2026</span>
                    <button className="garden-button" onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}>
                        Back to the beginning ↑
                    </button>
                </section>

                <footer>
                    <span>
                        A <i>✿</i> V
                    </span>
                    <p>MADE WITH LOVE · DECEMBER 2026</p>
                    <button onClick={toggleMusic}>{musicOn ? <Pause size={14} /> : <Play size={14} />} Music</button>
                </footer>
            </div> : null}
        </main>
    );
}
