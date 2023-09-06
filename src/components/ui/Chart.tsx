"use client"
import React, { useEffect, useState } from "react";
import { Bubble } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend, BubbleControllerDatasetOptions, DatasetChartOptions, ChartOptions } from 'chart.js';
import { getRandomColor } from "@/lib/utils";

// Import the required Chart.js types
import { TooltipItem } from 'chart.js';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const Chart = ({ data }: any) => {
    const groupedData: Record<string, EnrichmentResult[]> = {};
    const groupSpacing = 30;
    const spaceBetweenGroups = 0.9;

    data.forEach((item: any) => {
        const method = item.method;
        if (!groupedData[method]) {
            groupedData[method] = [];
        }
        groupedData[method].push(item);
    });

    const datasets = Object.keys(groupedData).map((method, index) => {
        const color = getRandomColor(index, 0.7);

        const methodData = groupedData[method];
        const startX = index * (groupSpacing + spaceBetweenGroups);
        const shuffledData = methodData.map((item, i) => {
            const xOffset = (Math.random() - 0.5) * groupSpacing * 0.8;

            return {
                x: startX + xOffset,
                y: item.log10pval,
                r: item.count + 5,
                rmid: item.term,
                // r: item.log10pval + bubbleRadius - 5,
            };
        });
        return {
            label: method,
            data: shuffledData,
            backgroundColor: color,
            hoverBorderColor: 'black',
            hoverBorderWidth: 1,
        };
    });

    const chartData = { datasets };

    const option: ChartOptions<"bubble"> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                ticks: {
                    stepSize: 10,
                    display: false,
                },
                grid: {
                    display: true,
                },
                // display: false, // Hide x-axis labels
            },
            y: {
                type: 'linear',
                position: 'left',
                ticks: {
                    stepSize: 1,
                },


            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem: TooltipItem<"bubble">) => {
                        const value = tooltipItem.raw as TooltipItemProps


                        if (value) {
                            return `${value.rmid}`;
                        } else {
                            return "";
                        }
                    },
                },
            },
            legend: {
                position: 'bottom',
            },

        },
    };

    return (
        <div className="w-full  max-w-7xl" style={{ height: '500px' }}>
            <Bubble data={chartData} options={option} />
        </div>
    );
};

export default Chart;