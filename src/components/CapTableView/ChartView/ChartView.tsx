import React from 'react';
import { VictoryPie } from 'victory';
import { Select } from 'antd';
import './ChartView.scss';

const { Option } = Select;

interface ChartViewProps {
    selectedChartData: any;
    selectRoleHandle: (role: string) => void;
}

const ChartView: React.FC<ChartViewProps> = ({ selectedChartData, selectRoleHandle }) => {
    return (
        <div className='chart-container'>
            <div>
                <Select defaultValue="Select a filter" style={{ width: 120 }} onChange={selectRoleHandle} >
                    <Option value="Founder">Founder</Option>
                    <Option value="Investor">Investor</Option>
                    <Option value="Employee">Employee</Option>
                </Select>
            </div>

            <div>
                <VictoryPie colorScale={["tomato", "orange", "gold", "cyan", "navy"]} width={400} data={selectedChartData} />
            </div>
        </div>
    )
};

export default ChartView;
