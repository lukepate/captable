import React, { useEffect, useState } from 'react';
import OnboardingView from '../OnboardingView';
import NavBarView from '../NavBarView';
import HomePageView from '../HomePageView';
import CapTableView from '../CapTableView';
import { ShareUsers } from '../../store/types/ShareUsers';
import { Company } from '../../store/types/Company';


const DashboardView: React.FC= () => { 
    const [inSignedIn, setSignedIn] = useState(false);

    const initialUsers = () => {
        const initUsers = window.localStorage.getItem("shareUsers"); 
        if (initUsers) {
            return JSON.parse(initUsers);
        }
        return [];
    }
       
    const [shareUsers, setShareUsers] = useState<ShareUsers[]>(initialUsers);
    const [isOnboardingActive, setOnboardingActive] = useState(false);
    const [selectedChartData, setSelectedChartData] = useState();
    const [companyData, setCompanyData] = useState<Company>();

    // TODO add company data to navbar
    const onCompanySubmisison = async (event: any) => {
        setCompanyData(event);
    };

    const onShareHolderSubmisison = async (event: any) => {
        event.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        setShareUsers([...shareUsers, event]);
        // TODO replace this local update with actual call;
        localStorage.setItem('shareUsers', JSON.stringify(shareUsers));
    };

    const onShareHolderEditSubmisison = async (event: any) => {
        const upatedUsers = shareUsers;
        const foundUserIndex = upatedUsers.findIndex(user => user.id === event.id);
        upatedUsers[foundUserIndex] = event;
        const selectedData = upatedUsers.map((slice: { shareholder: any; shares: any; }) => ({ x: slice.shareholder, y: slice.shares }));
        setSelectedChartData(selectedData);
        setShareUsers(upatedUsers); 
        localStorage.setItem('shareUsers', JSON.stringify(shareUsers));
    };

    const deleteShareholder = (currentuser: any) => {
        const upatedUsers = shareUsers;
        const foundUserIndex = upatedUsers.findIndex(user => user.id === currentuser.id);
        upatedUsers.splice(foundUserIndex, 1);
        localStorage.setItem('shareUsers', JSON.stringify(upatedUsers));
        setShareUsers(upatedUsers);
    }

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

    const signIn = (data: any) => {
        setShareUsers(data);
        setCompanyData({
            "legalName": "Start up",
            "totalRaised": 1000000
        });
        const selectedData = data.map((slice: { shareholder: string; shares: number; }) => ({ x: slice.shareholder, y: slice.shares }));
        setSelectedChartData(selectedData);
        setSignedIn(true);
    }

    useEffect(() => {
        const localUsers = localStorage.getItem('shareUsers');
        if (localUsers) {
            const selectedData = JSON.parse(localUsers).map((slice: { shareholder: any; shares: any; }) => ({ x: slice.shareholder, y: slice.shares }));
            setSelectedChartData(selectedData);
            setSignedIn(true);
        }
    }, []);

    return (
        <>
            <NavBarView companyData={companyData} signIn={signIn}/>
   
            {inSignedIn && (
                <CapTableView shareUsers={shareUsers} selectedChartData={selectedChartData} selectRoleHandle={setChartByRole} onFinishFailed={onFinishFailed} onShareHolderSubmisison={onShareHolderSubmisison} onCompanySubmisison={onCompanySubmisison} onShareHolderEditSubmisison={onShareHolderEditSubmisison} deleteShareholder={deleteShareholder}/>
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
