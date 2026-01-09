"use client";

import { useSimulation } from '@/lib/useSimulation';
import { ControlPanel } from '@/components/controls/ControlPanel';
import { VisualizationArea } from '@/components/visualization/VisualizationArea';

export default function Dashboard() {
  const simulation = useSimulation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
      {/* Left Column: Controls (3 cols on large screens) */}
      <div className="lg:col-span-4 xl:col-span-3 h-full overflow-y-auto">
        <ControlPanel simulation={simulation} />
      </div>

      {/* Right Column: Visualization (9 cols on large screens) */}
      <div className="lg:col-span-8 xl:col-span-9 h-full">
        <VisualizationArea simulation={simulation} />
      </div>
    </div>
  );
}
