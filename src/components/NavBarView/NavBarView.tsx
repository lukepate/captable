import React, { useEffect } from 'react';
import './NavBar.scss';
import { UpCircleOutlined } from '@ant-design/icons';

const NavBarView: React.FC = () => {
    const getCompanyInfo = () => {
        const companyInfo = localStorage.getItem('company');
        if (companyInfo) return JSON.parse(companyInfo);
    };

    const signOutHandle = () => {
        console.log('this works');
        localStorage.clear();
        window.location.reload();
    };

    useEffect(() => {
        getCompanyInfo();
    });

    return (
        <nav className='nav-container'> 
            <div>
                <UpCircleOutlined />
                <span className='logo-text'>CapTable</span>
            </div>
            {getCompanyInfo && (
              <button onClick={signOutHandle}>sign out</button>
            )}
        </nav>
    )
};

export default NavBarView;
