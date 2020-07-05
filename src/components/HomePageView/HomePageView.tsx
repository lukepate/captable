import React from 'react';

interface HomePageProps {
    setOnboardingHandle: () => void;
}

const HomePageView: React.FC<HomePageProps> = ({ setOnboardingHandle }) => {
    return (
        <div>
            <h1>Plan your startup equity</h1>
            <button onClick={setOnboardingHandle}> click her to start</button>
        </div>
    )
};

export default HomePageView;
