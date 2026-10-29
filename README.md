# Royal Wedding Invitation

A cinematic, single-page wedding invitation built with Next.js and TypeScript.

This project includes:
- Full-screen seal opener with tap-to-open interaction
- Animated transition from cover to invitation pages
- Story, countdown, details, and closing sections
- Background music toggle support
- Mobile-responsive layout

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- CSS (global stylesheet)
- Lucide React icons

## Project Structure

- app/layout.tsx: App shell
- app/page.tsx: Home page entry
- app/globals.css: Global styles, animations, section themes
- components/WeddingExperience.tsx: Main invitation component and interactions
- public/images: Static images
- public/videos: Opening animation video
- public/audio: Background audio

## Prerequisites

- Node.js 18+ (recommended latest LTS)
- npm

## Getting Started

1. Install dependencies

npm install

2. Run development server

npm run dev

3. Open in browser

http://localhost:3000

If port 3000 is busy, Next.js will automatically use the next available port.

## Available Scripts

- npm run dev: Start development server
- npm run build: Create production build
- npm run start: Start production server
- npm run lint: Run ESLint

## Media Assets

Current configured media paths:

- Opening seal image: /images/invite-seal.png
- Opening video: /videos/invite-open.mp4
- Background music: /audio/wed-music.mp3

Place/replace files under:
- public/images
- public/videos
- public/audio

## Customization Guide

Update these values in components/WeddingExperience.tsx:

- Couple names and displayed text
- Wedding date/time (weddingDate)
- Venue and map link details
- Dress code text
- Countdown target

Update visuals in app/globals.css:

- Typography sizes and spacing tokens
- Section backgrounds and animations
- Card, button, and layout styling

## Build and Deploy

1. Create a production build

npm run build

2. Run production server locally

npm run start

You can deploy this Next.js app to platforms like Vercel, Netlify, or any Node.js hosting provider.

## Notes

- Browsers may block autoplay audio until the first user interaction.
- If media changes do not appear immediately in development, hard refresh the page.
