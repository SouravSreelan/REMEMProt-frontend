import React from 'react';
import { Bubble, Scatter } from 'react-chartjs-2';
import { getRandomColor } from '@/lib/utils';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

interface EnrichmentResult {
    method: string;
    p_value: number;
    // Other properties...
}

interface ScatterChartProps {
    data: EnrichmentResult[];
}

const ChartPage: React.FC<BubbleChartProps> = ({ data }) => {
    const groupedData: Record<string, EnrichmentResult[]> = {};
    data.forEach(item => {
        const method = item.method;
        if (!groupedData[method]) {
            groupedData[method] = [];
        }
        groupedData[method].push(item);
    });

    const datasets = Object.keys(groupedData).map((method, index) => {
        const color = getRandomColor(index);

        const methodData = groupedData[method];

        const bubbleData = methodData.map((item, i) => ({
            x: index + Math.random() * 0.5 - 0.25, // X-coordinate with more scatter within group
            y: -Math.log10(item.padj), // Y-coordinate based on -log₁₀(padj)
            r: Math.min(Math.max(-Math.log10(item.padj), 2), 30), // Adjust circle size based on -log₁₀(padj)
        }));

        return {
            label: method,
            data: bubbleData,
            backgroundColor: color,
            borderColor: color,
            borderWidth: 1,
        };
    });

    const chartData = {
        datasets,
    };

    const options = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Method',
                },
                ticks: {
                    stepSize: 1,
                    callback: (value, index, values) => Object.keys(groupedData)[value], // Display method names as labels
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Y Axis',
                },
            },
        },
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const item = context.dataset;
                        return `${item.label} )`;
                    },
                },
            },
        },
    };

    return <Bubble data={chartData} options={options} />;
};

export default ChartPage;