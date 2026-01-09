# KineticFlow

A high-performance, interactive educational web application for visualizing chemical reaction kinetics. Built with Next.js 14+, TypeScript, and Tailwind CSS.

## Features

- **Interactive Simulation**: Visualizes the effect of Temperature and Concentration on reaction rates.
- **Real-time Graphing**: Plots Concentration vs. Time using an Euler integration engine.
- **Particle System**: Simulates molecular motion and collision probability.
- **Educational Tools**: Toggleable math display showing the underlying Arrhenius equation.
- **Scenarios**: "Explosive" and "Slow Decay" presets for quick demonstrations.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Animation**: Framer Motion
- **Icons**: Lucide React

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Project Structure

- `src/lib/simulationEngine.ts`: Core math logic (Arrhenius equation, Euler's method).
- `src/lib/useSimulation.ts`: Custom React hook managing calculation state.
- `src/components/controls/`: UI components for user input.
- `src/components/visualization/`: Graph and Particle simulation components.

## Deployment

### Deploy on Vercel

1. Push this code to a GitHub repository.
2. Login to Vercel and "Import Project".
3. Select the repository.
4. Framework Preset should auto-detect as **Next.js**.
5. Click **Deploy**.

## Math & Physics

The engine uses the **Arrhenius Equation** to calculate the rate constant $k$:

$$ k = A \cdot e^{\frac{-E_a}{RT}} $$

Concentration decay is modeled via first-order kinetics:

$$ \frac{d[A]}{dt} = -k[A] $$
