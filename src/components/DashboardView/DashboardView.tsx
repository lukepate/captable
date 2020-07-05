import React, { useEffect, useState } from 'react';
import OnboardingView from '../OnboardingView';
import NavBarView from '../NavBarView';
import HomePageView from '../HomePageView';
import CapTableView from '../CapTableView';
import { ShareUsers } from '../../store/types/ShareUsers';
import { Company } from '../../store/types/Company';


const DashboardView: React.FC= () => {  
    const [idCounter, setIdCounter] = useState(0);
    const [shareUsers, setShareUsers] = useState<ShareUsers[]>([]);
    const [isOnboardingActive, setOnboardingActive] = useState(false);
    const [selectedChartData, setSelectedChartData] = useState();
    const [companyData, setCompanyData] = useState<Company>();
    const [inSignedIn, setSignedIn] = useState(false);

    // TODO add company data to navbar
    const onCompanySubmisison = async (event: any) => {
        setCompanyData(event);
    };

    const onShareHolderSubmisison = async (event: any) => {
        event.id = idCounter;
        event.key = idCounter;

        setIdCounter(idCounter + 1);
        setShareUsers([...shareUsers, event]);

        // TODO replace this local update with actual call;
        localStorage.setItem('shareUsers', JSON.stringify(shareUsers));
    };

    const onShareHolderEditSubmisison = async (event: any) => {
        const upatedUsers = shareUsers;
        const foundUserIndex = upatedUsers.findIndex(user => user.id === event.id);
        upatedUsers[foundUserIndex] = event;
        setShareUsers(upatedUsers); 
    };

    const onCompleteSetup = () => {
        const selectedData = shareUsers.map(slice => ({ x: slice.shareholder, y: slice.shares }));
        setSelectedChartData(selectedData);
        localStorage.setItem('shareUsers', JSON.stringify(shareUsers));
        localStorage.setItem('company', JSON.stringify(companyData));
        setSignedIn(true);
    }
    
    const onFinishFailed = (errorMessage: any) => {
        console.log('Failed:', errorMessage);
    };

    const setChartByRole = (selectedRole: string) => {
        if (selectedRole === 'Shareholder') {
            const selectedData = shareUsers.map(slice => ({ x: slice.shareholder, y: slice.shares }));
            setSelectedChartData(selectedData);
        } else {
            let roleData = shareUsers.filter(el => el.role === selectedRole);
            const selectedData = roleData.map(slice => ({ x: slice.shareholder, y: slice.shares }));
            setSelectedChartData(selectedData);
        }
    }

    const setOnboardingHandle = () => {
        setOnboardingActive(true);
    };

    useEffect(() => {
        const localUsers = localStorage.getItem('shareUsers');
        if (localUsers) {
            setShareUsers(JSON.parse(localUsers));
            setSignedIn(true);
        }
    }, []);


    return (
        <>
            <NavBarView />
   
            {inSignedIn && (
                <CapTableView shareUsers={shareUsers} selectedChartData={selectedChartData} selectRoleHandle={setChartByRole} onFinishFailed={onFinishFailed} onShareHolderSubmisison={onShareHolderSubmisison} onCompanySubmisison={onCompanySubmisison} onShareHolderEditSubmisison={onShareHolderEditSubmisison}/>
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
