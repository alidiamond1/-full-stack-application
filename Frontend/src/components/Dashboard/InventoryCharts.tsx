import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { Product } from '../../types/Product';

interface InventoryChartsProps {
    products: Product[];
}

const InventoryCharts: React.FC<InventoryChartsProps> = ({ products }) => {
    // data for the chart: Top 5 products by quantity
    const data = [...products]
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 10) // Show top 10
        .map(p => ({
            name: p.name.length > 15 ? p.name.substring(0, 15) + '...' : p.name,
            quantity: p.quantity,
            fullParams: p
        }));

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-[400px]">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Stock Levels</h3>
            <div style={{ width: '100%', height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
                                            <p className="font-semibold text-gray-900">{data.fullParams.name}</p>
                                            <p className="text-sm text-gray-500">Quantity: <span className="font-semibold text-blue-600">{data.quantity}</span></p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="quantity" radius={[4, 4, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.quantity < 5 ? '#ef4444' : '#3b82f6'}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default InventoryCharts;
