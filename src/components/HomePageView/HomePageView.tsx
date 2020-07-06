import React from 'react';
import { Button } from 'antd';
import './HomePage.scss';
import homeImage from './homepage.jpg';
interface HomePageProps {
    setOnboardingHandle: () => void;
}

const HomePageView: React.FC<HomePageProps> = ({ setOnboardingHandle }) => {
    return (
        <div className='home-container'>
            <div>
                <h1>Plan your Startup Equity</h1>
                <h3>Captable is a free management software for keeping track of financing rounds and accourage records.</h3>
            </div>
            <div>
                <img src={homeImage} alt='Home Page'/>
            </div>
            <div>
                <Button className='create-btn' onClick={setOnboardingHandle}>Create a CapTable</Button>
            </div>
        </div>
    )
};

export default HomePageView;
