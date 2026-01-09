"use client";

import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { KineticGraph } from './KineticGraph';
import { ParticleSimulation } from './ParticleSimulation';
import { LineChart, Atom } from 'lucide-react';
import { cn } from '../ui/button';
import { useSimulation } from '@/lib/useSimulation';

type Tab = 'graph' | 'simulation';

interface VisualizationAreaProps {
    simulation: ReturnType<typeof useSimulation>;
}

export function VisualizationArea({ simulation }: VisualizationAreaProps) {
    const [activeTab, setActiveTab] = useState<Tab>('graph');

    return (
        <Card className="h-full flex flex-col border-none shadow-none bg-transparent">
            {/* Tabs Header */}
            <div className="flex items-center space-x-1 mb-4 bg-slate-100 p-1 rounded-lg w-fit">
                <button
                    onClick={() => setActiveTab('graph')}
                    className={cn(
                        "flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all",
                        activeTab === 'graph'
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                    )}
                >
                    <LineChart className="w-4 h-4 mr-2" />
                    Kinetic Graph
                </button>
                <button
                    onClick={() => setActiveTab('simulation')}
                    className={cn(
                        "flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all",
                        activeTab === 'simulation'
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                    )}
                >
                    <Atom className="w-4 h-4 mr-2" />
                    Particle Simulation
                </button>
            </div>

            {/* Content Area */}
            <CardContent className="flex-1 p-0 min-h-[500px] border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm relative">
                {activeTab === 'graph' ? (
                    <KineticGraph data={simulation.data} />
                ) : (
                    <ParticleSimulation state={simulation.state} />
                )}
            </CardContent>
        </Card>
    );
}
