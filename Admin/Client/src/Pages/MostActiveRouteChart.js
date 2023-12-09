

import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const MostActiveRouteChart = () => {
    const chartRef = useRef();
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from the server
                const response = await fetch('http://localhost:5000/api/mostActiveRoute');
                const data = await response.json();

                // Extracting data for Chart.js
                const routes = data.mostActiveRoutes.map(route => `${route._id.goingFrom}-${route._id.goingTo}`);
                const counts = data.mostActiveRoutes.map(route => route.count);

                // Generate an array of different colors
                const backgroundColors = generateRandomColors(routes.length);

                // Update state with chart data
                setChartData({
                    labels: routes,
                    datasets: [
                        {
                            label: 'Booking Count',
                            data: counts,
                            backgroundColor: backgroundColors,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching most active routes:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Create the chart after the chartData state is updated
        if (chartRef.current && chartData.labels) {
            const ctx = chartRef.current.getContext('2d');

            new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true, // Ensure y-axis starts at 0
                        },
                    },
                },
            });
        }
    }, [chartData]);

    // Function to generate random colors
    const generateRandomColors = (count) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
            colors.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`);
        }
        return colors;
    };

    return (
        <div className="chart-area">
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default MostActiveRouteChart;
