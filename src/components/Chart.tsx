"use client"
import React, { useEffect } from 'react';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend, CategoryScale } from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import { getRandomColor } from '@/lib/utils';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, CategoryScale);


// const BubbleChart: React.FC<BubbleChartProps> = ({ data }) => {
//     const groupedData: Record<string, EnrichmentResult[]> = {};
//     data.forEach(item => {
//         const method = item.method;
//         if (!groupedData[method]) {
//             groupedData[method] = [];
//         }
//         groupedData[method].push(item);
//     });

//     const groupSpacing = 1; // Adjust the spacing between groups
//     const bubbleSpacing = 0.3; // Adjust the spacing between bubbles within a group
//     const bubbleRadius = 10; // Adjust the bubble radius

//     const datasets = Object.keys(groupedData).map((method, index) => {
//         const color = getRandomColor(index);

//         const methodData = groupedData[method];
//         const totalItems = methodData.length;

//         const startX = (index + 1) * groupSpacing;

//         const shuffledData = methodData.map((item, itemIndex) => ({
//             x: startX + (itemIndex * (1 + bubbleSpacing) / totalItems),
//             y: -Math.log10(item.p_value),
//             r: bubbleRadius, // Use the same bubble radius for all items within the group
//         }));

//         return {
//             label: method,
//             data: shuffledData,
//             backgroundColor: color,
//             borderColor: color,
//             hoverBackgroundColor: color,
//             hoverBorderColor: color,
//         };
//     });

//     const chartData = { datasets };

//     console.log({ chartData})

//     const options = {
//         scales: {
//             x: {
//                 type: 'category', // Use a categorical x-axis
//                 labels: Object.keys(groupedData), // Set labels for each group
//                 title: {
//                     display: true,
//                     text: 'Method',
//                 },
//             },
//             y: {
//                 beginAtZero: true,
//             },
//         },
//         plugins: {
//             legend: {
//                 display: false,
//             },
//             tooltip: {
//                 callbacks: {
//                     label: (context: any) => {
//                         const item = context.dataset;
//                         return `${item?.label}`;
//                     },
//                 },
//             },
//             Bubble: {
//                 radius: bubbleRadius, // Set the same bubble radius for all bubbles
//             },
//         },
//     } as const;

//     // return <Bubble options={options} data={chartData} />;
//     return JSON.stringify(chartData)
// };

// export default BubbleChart;


// const BubbleChart: React.FC<BubbleChartProps> = ({ data }) => {
//     const groupedData: Record<string, EnrichmentResult[]> = {};
//     data.forEach(item => {
//         const method = item.method;
//         if (!groupedData[method]) {
//             groupedData[method] = [];
//         }
//         groupedData[method].push(item);
//     });

//     const groupSpacing = 2; // Adjust the spacing between groups
//     const bubbleRadius = 10; // Adjust the bubble radius
//     const spaceBetweenGroups = 0.5; // Adjust the space between groups

//     const datasets = Object.keys(groupedData).map((method, index) => {
//         const color = getRandomColor(index);

//         const methodData = groupedData[method];
//         const numBubbles = methodData.length;

//         const startX = index * (groupSpacing + spaceBetweenGroups);

//         const shuffledData = methodData.map((item, i) => ({
//             x: startX + (Math.random() * groupSpacing),
//             y: -Math.log10(item.p_value),
//             r: bubbleRadius,
//         }));

//         return {
//             label: method,
//             data: shuffledData,
//             backgroundColor: color,
//             borderColor: color,
//             hoverBackgroundColor: color,
//             hoverBorderColor: color,
//         };
//     });

//     const chartData = { datasets };

//     const options = {
//         scales: {
//             x: {
//                 type: 'linear',
//                 position: 'bottom',
//                 title: {
//                     display: true,
//                     text: 'Method',
//                 },
//                 ticks: {
//                     stepSize: groupSpacing + spaceBetweenGroups,
//                 },
//             },
//             y: {
//                 beginAtZero: true,
//             },
//         },
//         plugins: {
//             legend: {
//                 display: true,
//             },
//             tooltip: {
//                 callbacks: {
//                     label: (context: any) => {
//                         const item = context.raw as EnrichmentResult;
//                         return `${item.name} (${item.count})`;
//                     },
//                 },
//             },
//             Bubble: {
//                 radius: bubbleRadius,
//             },
//         },
//     } as const;

//     return <Bubble options={options} data={chartData} />;
// };

// export default BubbleChart;





const BubbleChart: React.FC<BubbleChartProps> = ({ data }) => {
    const groupedData: Record<string, EnrichmentResult[]> = {};
    data.forEach(item => {
        const method = item.method;
        if (!groupedData[method]) {
            groupedData[method] = [];
        }
        groupedData[method].push(item);
    });

    const groupSpacing = 5; // Adjust the spacing between groups
    const bubbleRadius = 10; // Adjust the bubble radius
    const spaceBetweenGroups = 0.5; // Adjust the space between groups

    const datasets = Object.keys(groupedData).map((method, index) => {
        const color = getRandomColor(index, 0.6);

        const methodData = groupedData[method];
        const numBubbles = methodData.length;

        const startX = index * (groupSpacing + spaceBetweenGroups);

        const shuffledData = methodData.map((item, i) => {
            const xOffset = (Math.random() - 0.5) * groupSpacing * 0.8; // Adjust the range for x-offset
            return {
                x: startX + xOffset,
                y: -Math.log10(item.p_value),
                r: bubbleRadius,
            };
        });

        return {
            label: method,
            data: shuffledData,
            backgroundColor: color,
            borderColor: color,
            hoverBackgroundColor: color,
            hoverBorderColor: color,
        };
    });

    const chartData = { datasets };

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
                    stepSize: groupSpacing + spaceBetweenGroups,
                },
            },
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const item = context.raw as EnrichmentResult;
                        return `${item.method} (${item.count})`;
                    },
                },
            },
            Bubble: {
                radius: bubbleRadius,
            },
        },
    } as const;

    return <Bubble options={options} data={chartData} />;
};

export default BubbleChart;






// const BubbleChart: React.FC<BubbleChartProps> = ({ data }) => {
//     const groupedData: Record<string, EnrichmentResult[]> = {};
//     data.forEach(item => {
//         const method = item.method;
//         if (!groupedData[method]) {
//             groupedData[method] = [];
//         }
//         groupedData[method].push(item);
//     });

//     const groupSpacing = 2; // Adjust the spacing between groups
//     const bubbleRadius = 10; // Adjust the bubble radius

//     const datasets = Object.keys(groupedData).map((method, index) => {
//         const color = getRandomColor(index);

//         const methodData = groupedData[method];

//         const startX = index * groupSpacing;

//         const shuffledData = methodData.map(item => ({
//             x: startX,
//             y: -Math.log10(item.p_value),
//             r: bubbleRadius,
//         }));

//         return {
//             label: method,
//             data: shuffledData,
//             backgroundColor: color,
//             borderColor: color,
//             hoverBackgroundColor: color,
//             hoverBorderColor: color,
//         };
//     });

//     const chartData = { datasets };

//     const options = {
//         scales: {
//             x: {
//                 type: 'linear',
//                 position: 'bottom',
//                 title: {
//                     display: true,
//                     text: 'Method',
//                 },
//                 ticks: {
//                     stepSize: groupSpacing, // Set step size to match group spacing
//                 },
//             },
//             y: {
//                 beginAtZero: true,
//             },
//         },
//         plugins: {
//             legend: {
//                 display: true,
//             },
//             tooltip: {
//                 callbacks: {
//                     label: (context: any) => {
//                         const item = context.raw as EnrichmentResult;
//                         return `${item.name} (${item.count})`;
//                     },
//                 },
//             },
//             Bubble: {
//                 radius: bubbleRadius,
//             },
//         },
//     } as const;

//     return <Bubble options={options} data={chartData} />;
// };

// export default BubbleChart;


// const BubbleChart: React.FC<BubbleChartProps> = ({ data }) => {
//     const groupedData: Record<string, EnrichmentResult[]> = {};
//     data.forEach(item => {
//         const method = item.method;
//         if (!groupedData[method]) {
//             groupedData[method] = [];
//         }
//         groupedData[method].push(item);
//     });

//     const categories = Object.keys(groupedData);
//     const categoryWidth = 0.8; // Adjust the width of each category

//     const datasets = categories.map((method, index) => {
//         const color = getRandomColor(index);

//         const methodData = groupedData[method];
//         const totalItems = methodData.length;

//         const startX = index * categoryWidth;

//         const shuffledData = methodData.map((item, itemIndex) => ({
//             x: startX + Math.random() * categoryWidth,
//             y: -Math.log10(item.p_value),
//             r: item.count,
//         }));

//         return {
//             label: method,
//             data: shuffledData,
//             backgroundColor: color,
//             borderColor: color,
//             hoverBackgroundColor: color,
//             hoverBorderColor: color,
//         };
//     });

//     const chartData = { datasets };

//     const options = {
//         scales: {
//             x: {
//                 type: 'linear',
//                 position: 'bottom',
//                 title: {
//                     display: true,
//                     text: 'Method',
//                 },
//                 ticks: {
//                     callback: (value, index) => {
//                         const categoryIndex = Math.floor(index / categoryWidth);
//                         return categories[categoryIndex] || '';
//                     },
//                 },
//             },
//             y: {
//                 beginAtZero: true,
//             },
//         },
//         plugins: {
//             legend: {
//                 display: false,
//             },
//             tooltip: {
//                 callbacks: {
//                     label: (context: any) => {
//                         const item = context.raw as EnrichmentResult;
//                         return `${item.method} (${item.count})`;
//                     },
//                 },
//             },
//             Bubble: {
//                 radius: 10,
//             },
//         },
//     } as const;

//     return <Bubble options={options} data={chartData} />;
// };

// export default BubbleChart;