import React from 'react';
import './TableView.scss';
import { Table } from 'antd';

interface TableViewProps {
    data: any;
    handleEdit: any;
}

const TableView: React.FC<TableViewProps> = ({ data, handleEdit }) => {
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
            title: 'Date Added',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Capital',
            key: 'capital',
            // sorter: (a: any, b: any) => (a.capital - b.capital),
            render: (text: any, record: any) => (
                <span>${record.PPS * record.shares}</span>
            ),
        },
        {
            title: 'Ownership',
            key: 'ownership',
            render: (text: any, record: any) => (
                <span>{record.ownership}%</span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: any) => (
                <span className='edit-btn' onClick={() => editHandle(record)}>Edit</span>
            ),
        },
    ];
                                
    return (
        <Table 
            columns={columns} 
            dataSource={data} 
            pagination={false} />
    )
};

export default TableView;
