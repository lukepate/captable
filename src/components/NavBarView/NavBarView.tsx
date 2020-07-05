import React from 'react';
import './NavBar.scss';
import { UpCircleOutlined } from '@ant-design/icons';

const NavBarView: React.FC = () => {
    return (
        <nav className='nav-container'> 
            <div>
                <UpCircleOutlined />
                <span className='logo-text'>CapTable</span>
            </div>
            
            <span> Sign In</span>
        </nav>
    )
};

export default NavBarView;
