import React, { useState } from 'react';
import { Select } from 'antd';

// import styles from './Dashboard.module.scss';
import TableView from '../TableView';
import ChartView from '../ChartView';
import OnboardingView from '../OnboardingView';

const { Option } = Select;

interface Chart {
    x: string,
    y: number
}

interface ShareUsers {
    id: string;
    key: number;
    shareholder: string;
    role: string;
    shares: number;
    PPS: number;
    capital: number;
    ownership: number;
}


const data = [
    {
        id: '1',
        key: 1,
        shareholder: 'Mike',
        role: 'Founder',
        shares: 40,
        PPS: 5,
        capital: 100,
        ownership: 30
    },
    {
        id: '2',
        key: 2,
        role: 'Investor',
        shareholder: 'John',
        shares: 30,
        PPS: 5,
        capital: 50,
        ownership: 50
    },
    {
        id: '3',
        key: 3,
        role: 'Investor',
        shareholder: 'Luke',
        shares: 30,
        PPS: 15,
        capital: 150,
        ownership: 150
    },
    {
        id: '4',
        key: 4,
        role: 'Employee',
        shareholder: 'Jake',
        shares: 30,
        PPS: 15,
        capital: 150,
        ownership: 150
    },
];
// console.log(shareholderData, 'dont need this');
const DashboardView: React.FC= () => {  
    const [idCounter, setIdCounter] = useState(0);
    const [shareUsers, setShareUsers] = useState<ShareUsers[]>([]);
    
    const initialChartData = () => {
        return data.map(slice => ({ x: slice.shareholder, y: slice.shares }));
    };
    const [selectedChartData, setSelectedChartData] = useState(initialChartData);

    const setChartByRole = (selectedRole: any) => {
        const roleData = shareUsers.filter(el => el.role === selectedRole);
        const selectedData = roleData.map(slice => ({ x: slice.shareholder, y: slice.shares }));
        setSelectedChartData(selectedData);
    }
   
    const onFinish = async (event: any) => {
        console.log('success', event)
        event.id = idCounter;
        event.key = idCounter;

        setIdCounter(idCounter + 1);
        setShareUsers([...shareUsers, event]);
    };
    
    const onFinishFailed = (errorMessage: any) => {
        console.log('Failed:', errorMessage);
    };
    
    return (
        <div>
            Dashboard
            <button onClick={initialChartData}>test {initialChartData}</button> 


            <Select defaultValue="Founder" style={{ width: 120 }} onChange={setChartByRole} >
                <Option value="Founder">Founder</Option>
                <Option value="Investor">Investor</Option>
                <Option value="Employee">Employee</Option>
            </Select>

            <ChartView data={selectedChartData} />
            <TableView data={shareUsers} />
            <OnboardingView onFinishFailedHandle={onFinishFailed} onFinishHandle={onFinish}/>
        </div>
    )
};

export default DashboardView;
