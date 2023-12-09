// ViewUsers.js
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';

function ViewUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all user details from the server
        axios.get('http://localhost:5000/api/viewUsers')
            .then(response => {
                setUsers(response.data.users);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
                setLoading(false);
            });
    }, []);

    const columns = [
        {
            title: 'Sr No',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => `${record.firstname} ${record.lastname}`,
        },
        {
            title: 'Email ID',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Is Verified',
            dataIndex: 'isVerified',
            key: 'isVerified',
            render: (text, record) => (record.isVerified ? 'Yes' : 'No'),
        },
    ];

    // Add a key to each user for the Table component
    const usersWithKey = users.map((user, index) => ({ ...user, key: index }));

    return (
        <div>
            <h1>User Details</h1>
            <Table dataSource={usersWithKey} columns={columns} loading={loading} />
        </div>
    );
}

export default ViewUsers;
