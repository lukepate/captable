import React from 'react';
import './NavBar.scss';
import { UpCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Button } from 'antd';

interface NavBarProps {
    companyData: any;
    signIn: (data: any) => void;
}

const NavBarView: React.FC<NavBarProps> = ({ companyData, signIn }) => {
    const signOutHandle = () => {
        localStorage.clear();
        window.location.reload();
    };

    const signInHandle = async () => {
        axios.get('http://localhost:3000/users')
            .then(function (response) {
                signIn(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    };


    return (
        <nav className='nav-container'> 
            <div>
                <UpCircleOutlined />
                <span className='logo-text'>CapTable</span>
            </div>
            {companyData && (
                <>
                    <span>Welcome! {companyData.legalName}</span>
                    <Button onClick={signOutHandle}>Sign Out</Button>
                </>
            )}
            {!companyData && (
                <Button onClick={signInHandle}>Sign in!</Button>
            )}
        </nav>
    )
};

export default NavBarView;
