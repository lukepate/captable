import React, { useState } from 'react';
import { VictoryPie } from 'victory';
import { Badge, Select } from 'antd';
import './ChartView.scss';
import { ShareUsers } from '../../../store/types/ShareUsers';

const { Option } = Select;

interface ChartViewProps {
    shareUsers: ShareUsers[];
    selectedChartData: any;
    selectRoleHandle: (role: string) => void;
}

const ChartView: React.FC<ChartViewProps> = ({ shareUsers, selectedChartData, selectRoleHandle }) => {
    const generateColor = () => {
        return shareUsers.map(() => '#' + Math.floor(Math.random() * 16777215).toString(16))};

    const [colorArray] = useState(generateColor());
    console.log(colorArray, 'from chartview');


    return (
        <div className='chart-container'>
            <div>
                <Select defaultValue="View by Shareholder" style={{ width: 120 }} onChange={selectRoleHandle} >
                    <Option value="Shareholder">Shareholders</Option>
                    <Option value="Founder">Founder</Option>
                    <Option value="Investor">Investor</Option>
                    <Option value="Employee">Employee</Option>
                </Select>
            </div>

            <div className='graph-container'>
                <VictoryPie 
                    colorScale={colorArray} 
                    width={400} 
                    data={selectedChartData}
                    events={[{ 
                        target: "data",
                        eventHandlers: {
                            onClick: (events) => {
                                console.log(events, 'this ran');
                                return [];
                            } 
                        }
                    }]}
                />

                <div className='badge-container'>
                    {shareUsers.map((user, index) => (
                        <Badge color={colorArray[index]} key={user.id} status="success" text={`${user.shareholder} - ${user.shares}`} />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default ChartView;
