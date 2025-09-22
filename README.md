# ScaleTilt - Political Impact Platform

**Author:** Josh Mysore  
**GitHub:** [joshmysore](https://github.com/joshmysore)  
**Deployed URL:** [https://joshmysore-hw3.vercel.app/](https://joshmysore-hw3.vercel.app/)  
**PRD:** [https://docs.google.com/document/d/1LuXaY7-YyPrfJNfPVoD9s4Ox4pb53fYR5b27jn38li8/edit?usp=sharing](https://docs.google.com/document/d/1LuXaY7-YyPrfJNfPVoD9s4Ox4pb53fYR5b27jn38li8/edit?usp=sharing)

## Overview

ScaleTilt is a data-driven political donation platform that helps individual donors maximize their political impact by providing strategic insights and candidate matching based on their priorities and preferences.

## Features

- **3-Step Wizard**: Issues selection, impact preferences, and donation strategy
- **Smart Candidate Matching**: AI-powered algorithm with transparent scoring
- **Dynamic Scoring**: Adjustable weights based on user preferences (close races, track record, infrastructure)
- **Interactive Demo**: Auto-playing simulation showcasing the platform
- **Responsive Design**: Modern American-themed UI with smooth animations
- **Real-time Results**: Live candidate ranking and detailed analysis

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** TailwindCSS with custom American color palette
- **State Management:** Zustand with localStorage persistence
- **Data Fetching:** TanStack Query
- **Animations:** Framer Motion
- **UI Components:** Shadcn/ui + Lucide React icons
- **Deployment:** Vercel

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/cs1060f25/joshmysore-hw3.git
cd joshmysore-hw3

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173` in development mode.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── Banner.tsx      # Disclaimer banner
│   ├── Navbar.tsx      # Navigation bar
│   ├── DemoSimulator.tsx # Homepage demo
│   └── ...
├── pages/              # Route components
│   ├── HomePage.tsx    # Landing page
│   ├── AboutPage.tsx   # About section
│   ├── Home.tsx        # Demo wizard
│   ├── Results.tsx     # Candidate results
│   ├── Candidate.tsx   # Candidate details
│   └── Confirm.tsx     # Donation confirmation
├── lib/                # Utilities and state
│   ├── store.ts        # Zustand store
│   └── scoring.ts      # Candidate scoring algorithm
└── data/               # Static data
    └── candidates.json # Synthetic candidate data
```

## User Flow

1. **Homepage**: View demo simulation and learn about ScaleTilt
2. **About**: Read problem statement and platform goals
3. **Demo Wizard**: 
   - Step 1: Select political issues (multi-select)
   - Step 2: Choose impact preference (single-select)
   - Step 3: Pick donation strategy (single-select)
4. **Results**: View ranked candidates with detailed analysis
5. **Candidate Details**: Deep dive into individual candidate profiles
6. **Confirmation**: Review and confirm donation decisions

## Scoring Algorithm

The platform uses a transparent scoring system that weights candidates based on:

- **Competitiveness** (35%): Race tightness (tossup, lean, safe)
- **Funding Gap** (35%): Relative funding advantage/disadvantage
- **Time Decay** (15%): Proximity to election day
- **Issue Match** (15%): Alignment with user's selected issues

Weights adjust dynamically based on user's impact preference:
- **Close Races**: Higher competitiveness weight
- **Track Record**: Higher issue match weight  
- **Infrastructure**: Higher time decay weight

## Data

The platform uses synthetic candidate data for demonstration purposes. All data is fictional and created for prototype testing.

**Disclaimer:** This is a prototype with synthetic data and is not affiliated with any political committee.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Key Dependencies

- `react` - UI framework
- `typescript` - Type safety
- `tailwindcss` - Styling
- `framer-motion` - Animations
- `zustand` - State management
- `@tanstack/react-query` - Data fetching
- `react-router-dom` - Routing

## Deployment

The application is automatically deployed to Vercel on every push to the main branch.

**Production URL:** [https://joshmysore-hw3.vercel.app/](https://joshmysore-hw3.vercel.app/)

## License

This project is created for educational purposes as part of CS106 coursework.

---

**Note:** This is a prototype demonstration. All candidate data is synthetic and created for testing purposes only.