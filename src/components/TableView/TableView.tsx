// import React, { useState } from 'react';
import React from 'react';
// import styles from './Dashboard.module.scss';
import { Table } from 'antd';
// const { Column, ColumnGroup } = Table;

interface TableViewProps {
    data: any;
}

const TableView: React.FC<TableViewProps> = ({ data }) => {
    // const [selectedRowKeys, setSelectedRowKeys] = useState();

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
    ];
                                


    // const columns = [
    //     {
    //         title: 'Name',
    //         dataIndex: 'name',
    //     },
    //     {
    //         title: 'Age',
    //         dataIndex: 'age',
    //         // defaultSortOrder: 'descend',
    //         sorter: (a: any, b: any) => {
    //             return a.age - b.age;
    //         },
    //     },
    //     {
    //         title: 'Address',
    //         dataIndex: 'address',
    //     },
    // ];

    // const data = [];
    // for (let i = 0; i < 6; i++) {
    //     data.push({
    //         key: i,
    //         name: `Edward King ${i}`,
    //         age: i,
    //         address: `London, Park Lane no. ${i}`,
    //     });
    // }

    return (
        // <Table dataSource={data} columns={columns} />
        <Table columns={columns} dataSource={data} pagination={false} />
    )
};

export default TableView;
