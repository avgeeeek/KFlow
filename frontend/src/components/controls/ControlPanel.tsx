"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Slider } from '../ui/slider';
import { Button } from '../ui/button';
import { Play, RotateCcw, Zap, Turtle, Calculator } from 'lucide-react';
import { getEquationString } from '@/lib/simulationEngine';
import type { useSimulation } from '@/lib/useSimulation';

// Extract the return type of useSimulation for props
type SimulationHook = ReturnType<typeof useSimulation>;

interface ControlPanelProps {
    simulation: SimulationHook;
}

export function ControlPanel({ simulation }: ControlPanelProps) {
    const { state, actions } = simulation;
    const [showMath, setShowMath] = useState(false);

    return (
        <Card className="h-full border-t-4 border-t-blue-600">
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    Control Panel
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">

                {/* Main Controls */}
                <div className="space-y-6">
                    <Slider
                        label="Temperature (T)"
                        min={200}
                        max={600}
                        step={10}
                        value={state.temperature}
                        onChange={(e) => actions.setTemperature(Number(e.target.value))}
                        valueDisplay={`${state.temperature} K`}
                    />

                    <Slider
                        label="Concentration [A]"
                        min={0.1}
                        max={5.0}
                        step={0.1}
                        value={state.concentration}
                        onChange={(e) => actions.setConcentration(Number(e.target.value))}
                        valueDisplay={`${state.concentration.toFixed(1)} M`}
                    />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <Button
                        variant={state.isPlaying ? "secondary" : "primary"}
                        onClick={actions.togglePlay}
                        className="w-full"
                    >
                        <Play className={`mr-2 h-4 w-4 ${state.isPlaying ? 'fill-slate-900' : 'fill-white'}`} />
                        {state.isPlaying ? 'Pause' : 'Start'}
                    </Button>

                    <Button
                        variant="outline"
                        onClick={actions.resetSimulation}
                        className="w-full"
                    >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset
                    </Button>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Scenarios */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-700">Scenarios</label>
                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="ghost" size="sm" className="justify-start bg-orange-50 text-orange-700 hover:bg-orange-100 hover:text-orange-800" onClick={() => actions.setScenario('explosive')}>
                            <Zap className="mr-2 h-4 w-4" /> Explosive
                        </Button>
                        <Button variant="ghost" size="sm" className="justify-start bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800" onClick={() => actions.setScenario('slow')}>
                            <Turtle className="mr-2 h-4 w-4" /> Slow Decay
                        </Button>
                    </div>
                </div>

                {/* Math Toggle */}
                <div className="pt-4">
                    <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <Calculator className="h-4 w-4" />
                            Show Math
                        </label>
                        <input
                            type="checkbox"
                            checked={showMath}
                            onChange={(e) => setShowMath(e.target.checked)}
                            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                    </div>

                    {showMath && (
                        <div className="p-4 bg-slate-900 text-slate-50 rounded-lg font-mono text-sm overflow-x-auto">
                            <div className="opacity-70 text-xs mb-1">Arrhenius Equation</div>
                            <div className="mb-2">k = A · e^(-Ea/RT)</div>
                            <div className="text-green-400 font-bold">k = {state.k.toExponential(3)}</div>

                            <div className="opacity-70 text-xs mt-3 mb-1">Rate Law</div>
                            <div>{getEquationString(state.k, state.concentration)}</div>
                        </div>
                    )}
                </div>

            </CardContent>
        </Card>
    );
}
