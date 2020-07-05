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
   
}


const CapTableView: React.FC<TableViewProps> = ({ shareUsers, selectedChartData, selectRoleHandle, onFinishFailed, onShareHolderSubmisison, onCompanySubmisison, onShareHolderEditSubmisison }) => {
    const [isAddUserActive, setAddUserActive] = useState(false);
    const [isEditUserActive, setEditUserActive] = useState(false);
    const [editUser, setEditUser] = useState({});

    const onFinishHandleCapView = (event: any) => {
        setAddUserActive(false);
        onShareHolderSubmisison(event);
        selectRoleHandle('Shareholder');
    }

    // TODO: handle edit
    const handleEdit = (record: any) => {
        console.log('handle edit hit');
        onShareHolderEditSubmisison(record);
        setEditUserActive(false);
    }

    const selectUserToEdit = (record: any) => {
        setEditUser(record);
        setEditUserActive(true);
    }
    
    return (
        <div className="capview-container">
            {!isAddUserActive && !isEditUserActive && (
                <>
                    <h1 className='capview-headline'>Ownership Overview</h1>
                    {/* TODO set def    ault to state */}
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
                    <AddView onFinishFailed={onFinishFailed} onFinishHandleCapView={onFinishHandleCapView}/>
                </>
            )}
            {isEditUserActive && (
                <>
                    <EditView currentuser={editUser} handleEdit={handleEdit} onFinishFailed={onFinishFailed}/>
                </>
            )}

                      

        </div>
    )
};

export default CapTableView;
