// ClassSourceChart.js

import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const ClassSourceChart = ({ onChartRefUpdate }) => {
    const chartRef = useRef();
    const [chartData, setChartData] = useState({});
    const chartInstance = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/bookingDistribution');
                const data = await response.json();

                const classes = data.bookingDistribution.map(item => item._id);
                const counts = data.bookingDistribution.map(item => item.count);

                setChartData({
                    labels: classes,
                    datasets: [
                        {
                            data: counts,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.7)',
                                'rgba(54, 162, 235, 0.7)',
                                'rgba(255, 206, 86, 0.7)',
                                'rgba(75, 192, 192, 0.7)',
                                'rgba(153, 102, 255, 0.7)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching booking distribution:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            // Ensure the previous Chart instance is destroyed
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');

            // Create a new Chart instance
            chartInstance.current = new Chart(ctx, {
                type: 'pie',
                data: chartData,
                options: {
                    responsive: false, // Disable responsiveness
                    plugins: {
                        legend: {
                            display: false, // Hide legend
                        },
                    },
                },
            });

            // Call the callback with the chartRef
            onChartRefUpdate(chartRef);

            // Cleanup function to destroy the Chart instance when the component unmounts
            return () => {
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }
            };
        }
    }, [chartData, onChartRefUpdate]);

    return (
        <div className="col-xl-4 col-lg-5">
            <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Booking Distribution</h6>
                </div>
                <div className="card-body">
                    <div className="chart-pie pt-4 pb-2" style={{ height: '300px' }}>
                        <canvas ref={chartRef}></canvas>
                    </div>
                </div>
                <div className="mt-4 text-center small">
                    {chartData.labels &&
                        chartData.labels.map((label, index) => (
                            <span key={index} className="mr-2">
                                <i
                                    className="fas fa-circle"
                                    style={{ color: chartData.datasets[0].backgroundColor[index] }}
                                ></i>{' '}
                                {label}
                            </span>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ClassSourceChart;
