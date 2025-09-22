# Donate Impact

A comprehensive political donation prototype built with Vite + React + TypeScript. This application helps users find the most impactful candidates for their political donations based on their priorities and preferences.

**Developer:** Josh Mysore  
**GitHub:** [cs1060f25](https://github.com/cs1060f25)  
**Deployed URL:** [Your Vercel URL here]  
**PRD:** [Product Requirements Document URL here]

## Features

- **3-Step Wizard**: Select issues, impact preferences, and donation strategy
- **Smart Scoring**: Algorithm-based candidate ranking using competitiveness, funding gaps, time decay, and issue alignment
- **Candidate Details**: Comprehensive profiles with polling data, funding information, and district analysis
- **Donation Confirmation**: Support for both single high-impact and spread strategies
- **Modern UI**: Clean red-white-blue design with smooth animations

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment on Vercel.

## Tech Stack

- **Vite** - Build tool and dev server
- **React** - UI library with TypeScript
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Zustand** - State management with persistence
- **Framer Motion** - Smooth animations
- **TailwindCSS** - Utility-first styling
- **Lucide React** - Icon library

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Card, etc.)
│   ├── Banner.tsx      # Fixed prototype notice
│   ├── CandidateCard.tsx
│   ├── ScoreBadge.tsx
│   └── ...
├── pages/              # Route components
│   ├── Home.tsx        # Landing page with wizard
│   ├── Results.tsx     # Candidate results grid
│   ├── Candidate.tsx   # Individual candidate details
│   └── Confirm.tsx     # Donation confirmation
├── lib/                # Utilities and logic
│   ├── store.ts        # Zustand store
│   ├── scoring.ts      # Candidate scoring algorithm
│   └── utils.ts        # Helper functions
└── data/               # Static data
    └── candidates.json # Synthetic candidate data
```

## Disclaimer

This is a prototype application using synthetic data. It is not affiliated with any real political committee or organization. All candidate information, polling data, and financial figures are fictional and used for demonstration purposes only.
