import React, { useState } from 'react';
// import styles from './Dashboard.module.scss';
import OnboardingView from '../OnboardingView';
import NavBarView from '../NavBarView';
import HomePageView from '../HomePageView';
import CapTableView from '../CapTableView';
import { ShareUsers } from '../../store/types/ShareUsers';
import { Company } from '../../store/types/Company';



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

const DashboardView: React.FC= () => {  
    const [idCounter, setIdCounter] = useState(0);
    const [shareUsers, setShareUsers] = useState<ShareUsers[]>([]);
    const [inSignedIn, setSignedIn] = useState(false);
    console.log(setIdCounter, setSignedIn);

    const [isOnboardingActive, setOnboardingActive] = useState(false);
    const [companyData, setCompanyData] = useState<Company>();
    console.log(companyData, 'just for lint');
    
    const initialChartData = () => {
        return data.map(slice => ({ x: slice.shareholder, y: slice.shares }));
    };

    const [selectedChartData, setSelectedChartData] = useState(initialChartData);
   
    // TODO do something with company data;
    const onCompanySubmisison = async (event: any) => {
        setCompanyData(event);
    };

    const onShareHolderSubmisison = async (event: any) => {
        event.id = idCounter;
        event.key = idCounter;

        setIdCounter(idCounter + 1);
        setShareUsers([...shareUsers, event]);
    };

    const onCompleteSetup = () => {
        setSignedIn(true);
    }
    
    const onFinishFailed = (errorMessage: any) => {
        console.log('Failed:', errorMessage);
    };

    const setChartByRole = (selectedRole: any) => {
        const roleData = shareUsers.filter(el => el.role === selectedRole);
        const selectedData = roleData.map(slice => ({ x: slice.shareholder, y: slice.shares }));
        setSelectedChartData(selectedData);
    }

    const setOnboardingHandle = () => {
        console.log('setOnboardingHandle')
        setOnboardingActive(true);
    }
    
    return (
        <>
            <NavBarView />
   
            {inSignedIn && (
                <CapTableView shareUsers={shareUsers} selectedChartData={selectedChartData} selectRoleHandle={setChartByRole} onFinishFailed={onFinishFailed} onShareHolderSubmisison={onShareHolderSubmisison} onCompanySubmisison={onCompanySubmisison} />
            )}

            {!inSignedIn && (
                <>
                    {!isOnboardingActive && (
                        <HomePageView setOnboardingHandle={setOnboardingHandle} />
                    )}

                    {isOnboardingActive && (
                        <OnboardingView data={shareUsers} onFinishFailedHandle={onFinishFailed} onCompanySubmisison={onCompanySubmisison} onShareHolderSubmisison={onShareHolderSubmisison} onCompleteSetup={onCompleteSetup}/>
                    )}
                </>
            )}
        </>
    )
};

export default DashboardView;
