"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { DataPoint } from '@/lib/types';

interface KineticGraphProps {
    data: DataPoint[];
}

export function KineticGraph({ data }: KineticGraphProps) {
    return (
        <div className="w-full h-full min-h-[400px] p-4 bg-white rounded-lg">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                        dataKey="time"
                        label={{ value: 'Time (s)', position: 'insideBottomRight', offset: -10 }}
                        stroke="#64748b"
                        tick={{ fill: '#64748b' }}
                    />
                    <YAxis
                        label={{ value: 'Concentration [A]', angle: -90, position: 'insideLeft' }}
                        stroke="#64748b"
                        tick={{ fill: '#64748b' }}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        labelStyle={{ color: '#64748b' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="concentration"
                        stroke="#2563eb" // blue-600
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 8 }}
                        animationDuration={300}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
