export interface DataPoint {
  time: number;
  concentration: number;
}

export interface SimulationState {
  temperature: number; // Kelvin
  concentration: number; // Molar (M)
  isPlaying: boolean;
  time: number; // Current simulation time
}

export interface SimulationConfig {
  A: number; // Frequency factor
  Ea: number; // Activation Energy (J/mol)
  R: number; // Gas constant (8.314 J/(mol·K))
}

// Default constants for a "demo-friendly" reaction
export const DEFAULT_CONFIG: SimulationConfig = {
  A: 1000, 
  Ea: 50000, 
  R: 8.314,
};
