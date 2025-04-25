# Notes App

A full-stack note-taking web application built with Angular and NestJS. This project is based on a [Frontend Mentor challenge](https://www.frontendmentor.io/challenges/note-taking-web-app-773r7bUfOG).

## Motivation

I took on this challenge for a few reasons:

- To explore building both the front-end and back-end in a single monorepo, with shared models between them
- To create a custom design system using only TailwindCSS and Angular CDK, without relying on any opinionated UI libraries
- To get hands-on experience with modern Angular features like Signals, the new built-in control flow, and SignalStore

## Live demo

The back-end is hosted on Render’s free tier, so it may occasionally be asleep or the database might be expired. You can check out the app [here](https://notes-app-fem.vercel.app/).

## Tech stack

### Front-end

- Angular 19+
- TailwindCSS
- SignalStore

### Back-end

- NestJS
- PostgreSQL
- TypeORM

## Running locally

To get this project running locally, make sure you have the following dependencies installed:

- Node.js 20+
- Docker
- PNPM

Next, create a `.env` file in the root directory using the `.env.example` file as a reference.

Once that’s set up, run the following commands to start the database and launch the development server:

1. `docker compose up -d`
2. `pnpm migration:run`
3. `pnpm install`
4. `pnpm serve:all`

Open your browser and navigate to `http://localhost:4200/`. The app will automatically reload when you make changes to any source files.
