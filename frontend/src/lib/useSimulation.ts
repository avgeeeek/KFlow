"use client";

import { useState, useMemo } from 'react';
import {
    DEFAULT_CONFIG,
    SimulationConfig
} from './types';
import {
    calculateRateConstant,
    generateConcentrationData
} from './simulationEngine';

export function useSimulation() {
    const [config] = useState<SimulationConfig>(DEFAULT_CONFIG);

    // State
    const [temperature, setTemperature] = useState<number>(300); // Kelvin
    const [concentration, setConcentration] = useState<number>(1.0); // Molar
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    // Derived values
    const k = useMemo(() => {
        return calculateRateConstant(temperature, config);
    }, [temperature, config]);

    const graphData = useMemo(() => {
        return generateConcentrationData(k, concentration);
    }, [k, concentration]);

    // Actions
    const togglePlay = () => setIsPlaying(prev => !prev);

    const resetSimulation = () => {
        setIsPlaying(false);
        setTemperature(300);
        setConcentration(1.0);
    };

    const setScenario = (type: 'explosive' | 'slow') => {
        if (type === 'explosive') {
            setTemperature(450); // High T
            setConcentration(2.0); // High [A]
        } else {
            setTemperature(250); // Low T
            setConcentration(0.5); // Low [A]
        }
    };

    return {
        state: { temperature, concentration, isPlaying, k, time: 0 },
        data: graphData,
        actions: {
            setTemperature,
            setConcentration,
            togglePlay,
            resetSimulation,
            setScenario
        }
    };
}
