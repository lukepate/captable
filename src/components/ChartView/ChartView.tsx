import React from 'react';
import { VictoryPie } from 'victory';

interface ChartViewProps {
    data: any;
}

const ChartView: React.FC<ChartViewProps> = ({ data }) => {
    return (
        <div>
            <VictoryPie data={data} />
        </div>
    )
};

export default ChartView;
