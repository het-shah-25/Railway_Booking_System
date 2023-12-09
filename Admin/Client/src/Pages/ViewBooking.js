import React, { useState, useEffect } from 'react';
import { Table, Tag } from 'antd';
import axios from 'axios';

function ViewBookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Fetch all booking details from the server
        axios.get('http://localhost:5000/api/viewBookings')
            .then(response => setBookings(response.data.bookings))
            .catch(error => console.error('Error fetching booking details:', error));
    }, []);

    const columns = [
        {
            title: 'Sr No',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'PNR NO',
            dataIndex: 'pnrNumber',
            key: 'pnrNumber',
        },
        {
            title: 'Train Number',
            dataIndex: 'trainNumber',
            key: 'trainNumber',
        },
        {
            title: 'Booking Date',
            dataIndex: 'date',
            key: 'date',
            render: (text, record) => new Date(record.date).toLocaleDateString(),
        },
        {
            title: 'To',
            dataIndex: 'goingTo',
            key: 'goingTo',
        },
        {
            title: 'From',
            dataIndex: 'goingFrom',
            key: 'goingFrom',
        },
        {
            title: 'Number of Passengers',
            dataIndex: 'passengers',
            key: 'passengers',
            render: (text, record) => record.passengers.length,
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
        },
        {
            title: 'Booking Status',
            dataIndex: 'bookingStatus',
            key: 'bookingStatus',
            render: (text, record) => (
                <Tag color={record.bookingStatus === 1 ? 'green' : 'red'}>
                    {record.bookingStatus === 1 ? 'Confirmed' : 'Cancelled'}
                </Tag>
            ),
        },
        {
            title: 'User Name',
            dataIndex: 'userId',
            key: 'userId',
            render: (text, record) => `${record.userId.firstname} ${record.userId.lastname}`,
        },
    ];

    // Add a key to each booking for the Table component
    const bookingsWithKey = bookings.map((booking, index) => ({ ...booking, key: index }));

    return (
        <div>
            <h1>Booking Details</h1>
            <Table dataSource={bookingsWithKey} columns={columns} />
        </div>
    );
}

export default ViewBookings;
