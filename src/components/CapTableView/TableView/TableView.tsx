// import React, { useState } from 'react';
import React from 'react';
// import styles from './Dashboard.module.scss';
import { Table } from 'antd';
// const { Column, ColumnGroup } = Table;

interface TableViewProps {
    data: any;
    handleEdit: any;
}

const TableView: React.FC<TableViewProps> = ({ data, handleEdit }) => {
    // const [selectedRowKeys, setSelectedRowKeys] = useState();
    const editHandle = (record: any) => {
        handleEdit(record);
    };


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Shareholder',
            dataIndex: 'shareholder',
            key: 'shareholder',
        },
        {
            title: 'Shares',
            dataIndex: 'shares',
            key: 'shares',
            sorter: (a: any, b: any) => {
                return a.shares - b.shares;
            },
        },
        {
            title: 'Price per Share',
            dataIndex: 'PPS',
            key: 'PPS',
        },
        {
            title: 'Capital',
            dataIndex: 'capital',
            key: 'capital',
            sorter: (a: any, b: any) => (a.capital - b.capital)
        },
        {
            title: 'Ownership',
            dataIndex: 'ownership',
            key: 'ownership',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: any) => (
                <button onClick={() => editHandle(record)}>Edit</button>
            ),
        },
    ];
                                
    return (
        <Table bordered
            title={() => 'Header'}
            footer={() => 'Footer'}
            columns={columns} 
            dataSource={data} 
            pagination={false} />
    )
};

export default TableView;
