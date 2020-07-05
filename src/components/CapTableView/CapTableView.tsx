import React, { useState } from 'react';
// import TableView from './TableView';
import ChartView from './ChartView';
import './CapTableView.scss';

// import OnboardingView from '../OnboardingView';

import { Button, Tabs } from 'antd';
const { TabPane } = Tabs;

interface TableViewProps {
    shareUsers: any;
    selectedChartData: any;
    selectRoleHandle: (role: string) => void;
    onFinishFailed: (errorMessage: any) => void;
    onShareHolderSubmisison: (event: any) => void;
    onCompanySubmisison: (event: any) => void;
}


const CapTableView: React.FC<TableViewProps> = ({ shareUsers, selectedChartData, selectRoleHandle, onFinishFailed, onShareHolderSubmisison, onCompanySubmisison }) => {
    const [isAddUserActive, setAddUserActive] = useState(false);
    const [editUser, setEditUser] = useState({});
    console.log(editUser, setEditUser);

    // const onFinishHandleCapView = (event: any) => {
    //     console.log(event, 'event');
    //     setAddUserActive(false);
    //     onShareHolderSubmisison(event);
    // }

    // TODO: handle edit
    // const handleEdit = (record: any) => {
    //     setAddUserActive(true);
    //     setEditUser(record);
    //     console.log(isAddUserActive, 'this was hit');
    // }
    
    return (
        <div className="capview-container">
            {!isAddUserActive && (
                <>
                    <h1>Ownership</h1>
                    {/* TODO set def    ault to state */}
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Cap Table Overview" key="1">
                            <ChartView selectedChartData={selectedChartData} selectRoleHandle={selectRoleHandle} />
                        </TabPane>

                        <TabPane tab="Shares" key="2">
                            <Button onClick={() => setAddUserActive(true)}>Add ShareHolder</Button>
                            {/* <TableView data={shareUsers} handleEdit={handleEdit}/> */}
                        </TabPane>

                        <TabPane tab="Plans and Equity Awards" key="3">
                            Plans and Equity Awards Coming Soon!
                    </TabPane>
                    </Tabs>
                </>
            )}
            {isAddUserActive && (
                <>
                    {/* <OnboardingView data={editUser} onFinishFailedHandle={onFinishFailed} onCompanySubmisison={onCompanySubmisison} onShareHolderSubmisison={onShareHolderSubmisison} onCompleteSetup={() => {}}/> */}
                </>
            )}

                      

        </div>
    )
};

export default CapTableView;
