import { SimulationConfig, DEFAULT_CONFIG, DataPoint } from './types';

/**
 * Calculates the rate constant k using the Arrhenius equation:
 * k = A * e^(-Ea / (R * T))
 * 
 * @param temperature Temperature in Kelvin
 * @param config Simulation configuration (A, Ea, R)
 * @returns Rate constant k
 */
export function calculateRateConstant(
    temperature: number,
    config: SimulationConfig = DEFAULT_CONFIG
): number {
    const { A, Ea, R } = config;
    // Prevent division by zero or negative T issues in a physics context (though UI limits this)
    if (temperature <= 0) return 0;

    const exponent = -Ea / (R * temperature);
    return A * Math.exp(exponent);
}

/**
 * Generates concentration data over time using Euler's method.
 * Rate Law assumed: Rate = k * [A]^1 (First order)
 * d[A]/dt = -k[A]
 * 
 * @param k Rate constant
 * @param initialConcentration Initial concentration [A]0
 * @param timeStep Delta t for simulation (default 0.1s)
 * @param totalTime Total time to simulate (default 60s)
 * @returns Array of DataPoints
 */
export function generateConcentrationData(
    k: number,
    initialConcentration: number,
    timeStep: number = 0.5,
    totalTime: number = 100
): DataPoint[] {
    const data: DataPoint[] = [];
    let currentConcentration = initialConcentration;

    for (let t = 0; t <= totalTime; t += timeStep) {
        data.push({
            time: Number(t.toFixed(1)), // float precision fix
            concentration: Math.max(0, currentConcentration), // Prevent negative concentration
        });

        // Euler step: [A]new = [A]old + (d[A]/dt * dt)
        // d[A]/dt = -k * [A]
        const rate = k * currentConcentration;
        currentConcentration -= rate * timeStep;

        // Optimization: Stop if concentration is effectively zero
        if (currentConcentration < 0.0001) {
            // Fill the rest with 0 to keep graph scale consistent
            for (let remainT = t + timeStep; remainT <= totalTime; remainT += timeStep) {
                data.push({
                    time: Number(remainT.toFixed(1)),
                    concentration: 0
                });
            }
            break;
        }
    }

    return data;
}

/**
 * Formatted MathJax/KaTeX string for display
 */
export function getEquationString(k: number, concentration: number): string {
    // Rate = k[A]
    return `Rate = ${k.toFixed(3)} \\cdot [${concentration.toFixed(2)}]`;
}
