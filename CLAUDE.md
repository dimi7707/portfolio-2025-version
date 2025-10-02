# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a portfolio website built with Astro v5.5.3 and React, featuring internationalization (i18n) support for English and Spanish. The project uses TypeScript and SCSS for styling, with GSAP for animations and Lenis for smooth scrolling.

## Development Commands

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server at localhost:4321 |
| `bun build` | Build production site to ./dist/ |
| `bun preview` | Preview production build locally |
| `bunx biome format --write` | Format code using Biome |
| `bunx biome lint --write` | Lint and auto-fix code using Biome |

## Architecture

### Internationalization Structure
The project implements i18n with content collections for each language:
- `/src/content/en/` - English content
- `/src/content/es/` - Spanish content
- Content collections are defined in `src/content/config.ts`
- Each collection has corresponding Zod schemas in `src/schemas/`

### Directory Structure
```
src/
├── assets/          # Static assets
├── components/      # React components (.tsx)
├── content/         # Markdown content for i18n
├── hooks/           # React hooks
├── layouts/         # Astro layout components
├── pages/           # Astro pages (en/ and es/ subdirectories)
├── schemas/         # Zod schemas for content validation
├── styles/          # SCSS stylesheets
└── utils/           # Utility functions
```

### Key Components
- **Layout.astro**: Main layout with dynamic language detection from URL pathname
- **Navbar.tsx**: Navigation component using content collections for menu items
- **LenisWrapper.tsx**: Smooth scrolling implementation
- **BlackHorseConverter.tsx**: Currency converter component
- **TechStackCarousel.tsx**: Technology showcase component
- **SkillChart.tsx**: Skills visualization using Recharts

### Content Management
- Content is managed through Astro content collections
- Each language has separate collections (e.g., `enHeaderCollection`, `esHeaderCollection`)
- Schemas validate content structure and provide TypeScript types
- Language detection is based on URL pathname (`/es/*` for Spanish, default English)

### Routing
- Root `/` redirects to `/en`
- Language-specific routes: `/en/*` and `/es/*`
- Page components are in `src/pages/en/` and `src/pages/es/`

### Styling and Animation
- SCSS for styling (located in `src/styles/`)
- GSAP for complex animations with ScrollTrigger
- Lenis for smooth scrolling experiences
- React Icons for iconography

### Build Configuration
- Astro config includes React integration
- Vite optimizations for GSAP/ScrollTrigger
- TypeScript strict mode enabled
- Biome for code formatting and linting