import React, { useState } from 'react';
import TableView from './TableView';
import ChartView from './ChartView';
import AddView from './AddView';
import EditView from './EditView';
import './CapTableView.scss';

import { Button, Tabs } from 'antd';
const { TabPane } = Tabs;

interface TableViewProps {
    shareUsers: any;
    selectedChartData: any;
    selectRoleHandle: (role: string) => void;
    onFinishFailed: (errorMessage: any) => void;
    onShareHolderSubmisison: (event: any) => void;
    onCompanySubmisison: (event: any) => void;
    onShareHolderEditSubmisison: (event: any) => void;
    deleteShareholder: (currentuser: any) => void;
}


const CapTableView: React.FC<TableViewProps> = ({ shareUsers, selectedChartData, selectRoleHandle, onFinishFailed, onShareHolderSubmisison, onCompanySubmisison, onShareHolderEditSubmisison, deleteShareholder }) => {
    const [isAddUserActive, setAddUserActive] = useState(false);
    const [isEditUserActive, setEditUserActive] = useState(false);
    const [editUser, setEditUser] = useState({});

    const onFinishHandleCapView = (event: any) => {
        onShareHolderSubmisison(event);
        selectRoleHandle('Shareholder');
        setAddUserActive(false);
    }

    const handleEdit = (record: any) => {
        onShareHolderEditSubmisison(record);
        setEditUserActive(false);
    }

    const selectUserToEdit = (record: any) => {
        setEditUser(record);
        setEditUserActive(true);
    }

    const handleDelete = (currentuser: any) => {
        deleteShareholder(currentuser);
        setEditUserActive(false);
    }
    
    return (
        <div className="capview-container">
            {!isAddUserActive && !isEditUserActive && (
                <>
                    <h1 className='capview-headline'>Ownership Overview</h1>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Cap Table Overview" key="1">
                            <ChartView shareUsers={shareUsers} selectedChartData={selectedChartData} selectRoleHandle={selectRoleHandle} />
                        </TabPane>

                        <TabPane tab="Shares" key="2">
                            <TableView data={shareUsers} handleEdit={selectUserToEdit}/>
                            <Button className='shareholder-add-btn' onClick={() => setAddUserActive(true)}>Add ShareHolder</Button>
                        </TabPane>

                        <TabPane tab="Plans and Equity Awards" key="3">
                            Plans and Equity Awards Coming Soon!
                    </TabPane>
                    </Tabs>
                </>
            )}
            {isAddUserActive && (
                <>
                    <AddView onFinishFailed={onFinishFailed} onFinishHandleCapView={onFinishHandleCapView} setAddUserActive={() => setAddUserActive(false)} />
                </>
            )}
            {isEditUserActive && (
                <>
                    <EditView currentuser={editUser} handleEdit={handleEdit} onFinishFailed={onFinishFailed} setEditUserActive={() => setEditUserActive(false)} deleteShareholder={handleDelete}/>
                </>
            )}
        </div>
    )
};

export default CapTableView;
