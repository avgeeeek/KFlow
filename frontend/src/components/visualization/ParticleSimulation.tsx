"use client";

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { SimulationState } from '@/lib/types';

interface ParticleSimulationProps {
    state: SimulationState;
}

export function ParticleSimulation({ state }: ParticleSimulationProps) {
    const { temperature, concentration } = state;

    // Number of particles proportional to concentration (scaled for visual demo)
    const particleCount = Math.floor(concentration * 10);

    // Speed inversely proportional to duration (High T = Low duration = Fast)
    // Base duration is e.g. 5s per movement at low T.
    const duration = Math.max(0.5, 2000 / temperature);

    const particles = useMemo(() => {
        return Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            x: pseudoRandom(i) * 100, // % start position
            y: pseudoRandom(i + 1337) * 100,
        }));
    }, [particleCount]);

    return (
        <div className="relative w-full h-full min-h-[400px] bg-slate-900 rounded-lg overflow-hidden border border-slate-700 shadow-inner">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'radial-gradient(circle, #475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}
            />

            <div className="absolute top-4 right-4 bg-slate-800/80 backdrop-blur text-xs text-white px-3 py-1 rounded-full border border-slate-600">
                Temp: {temperature}K • Molecules: {particleCount}
            </div>

            {particles.map((p) => (
                <Molecule
                    key={p.id}
                    id={p.id}
                    duration={duration}
                    initialX={p.x}
                    initialY={p.y}
                />
            ))}
        </div>
    );
}

// Deterministic pseudo-random number generator
function pseudoRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function Molecule({ duration, initialX, initialY, id }: { duration: number, initialX: number, initialY: number, id: number }) {
    // Generate deterministic path based on ID
    const path = useMemo(() => {
        const r1 = pseudoRandom(id * 1.1);
        const r2 = pseudoRandom(id * 2.2);
        const r3 = pseudoRandom(id * 3.3);
        const r4 = pseudoRandom(id * 4.4);

        return {
            x: [`${initialX}%`, `${r1 * 90}%`, `${r2 * 90}%`, `${initialX}%`],
            y: [`${initialY}%`, `${r3 * 90}%`, `${r4 * 90}%`, `${initialY}%`],
            durationOffset: pseudoRandom(id * 5.5)
        };
    }, [initialX, initialY, id]);

    return (
        <motion.div
            className="absolute w-4 h-4 rounded-full shadow-lg"
            style={{
                background: 'radial-gradient(circle at 30% 30%, #60a5fa, #2563eb)',
                boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
            }}
            animate={{
                x: path.x,
                y: path.y,
                scale: [1, 1.1, 1],
            }}
            transition={{
                duration: duration * (0.5 + path.durationOffset), // Vary speed
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.33, 0.66, 1]
            }}
        />
    );
}
