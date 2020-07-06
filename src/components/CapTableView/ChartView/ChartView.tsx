import React, { useState } from 'react';
import { VictoryPie } from 'victory';
import { Badge, Select } from 'antd';
import { StopTwoTone } from '@ant-design/icons';
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
        return shareUsers.map(() => '#' + Math.floor(Math.random() * 16777215).toString(16))
    };

    const [colorArray] = useState(generateColor());

    return (
        <div className='chart-container'>
            <div>
                <Select defaultValue="View by Shareholder" onChange={selectRoleHandle} >
                    <Option value="Shareholder">Shareholders</Option>
                    <Option value="Founder">Founder</Option>
                    <Option value="Investor">Investor</Option>
                    <Option value="Employee">Employee</Option>
                </Select>
            </div>

            <div className='graph-container'>
                {selectedChartData.length > 0 && (
                    <VictoryPie
                        colorScale={colorArray}
                        width={400}
                        data={selectedChartData}
                        events={[{
                            target: "data",
                            eventHandlers: {
                                onClick: (events) => {
                                    return [];
                                }
                            }
                        }]}
                    />
                )}
                {selectedChartData.length <= 0 && (
                    <div className='no-chart-error'>
                        <StopTwoTone />
                        <span className='text-padding'>No Data Available</span>
                    </div>
                )}
                <div className='badge-container'>
                    {shareUsers.map((user, index) => (
                        <Badge color={colorArray[index]} key={user.id} status="success" text={`${user.shareholder} - ${user.role}`} />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default ChartView;
