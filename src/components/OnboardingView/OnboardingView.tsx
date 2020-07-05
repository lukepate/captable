import React, { useState } from 'react';
import './OnboardingView.scss';
import { Select, Button, Form, Input, InputNumber, Timeline, Table } from 'antd';
const { Option } = Select;

interface OnbaordingViewProps {
    data: any;
    onFinishFailedHandle: (errorMessage: any) => void;
    onShareHolderSubmisison: (event: any) => void;
    onCompanySubmisison: (event: any) => void;
    onCompleteSetup: () => void;
}

const OnboardingView: React.FC<OnbaordingViewProps> = ({ onShareHolderSubmisison, onCompanySubmisison, onFinishFailedHandle, data, onCompleteSetup }) => {
    const [isTimelineActice, setTimelineActice] = useState(1);
    const [form] = Form.useForm();

    const handleDataFill = (input: any) => {
        if(data) {
            return data[input] ? data[input] : ''; 
        }
        return '';
    }; 

    const indexTimeline = (index: number) => {  
        if (index === isTimelineActice) return 'red';
        return 'black';
    }

    const incrementTimeline = () => {
        setTimelineActice(isTimelineActice + 1)
    }

    const handleCompanySubmission = (companyData: any) => {
        onCompanySubmisison(companyData);
        incrementTimeline();
    }

    const onHandlShareSubmission = (event: any) => {
        form.resetFields();
        onShareHolderSubmisison(event);
    }

    const columns = [
        {
            title: 'Shareholder',
            dataIndex: 'shareholder',
            key: 'shareholder',
        },
        {
            title: 'Shares',
            dataIndex: 'shares',
            key: 'shares',
        },
        {
            title: 'Price per Share',
            dataIndex: 'PPS',
            key: 'PPS',
        },
        {
            title: 'Capital',
            dataIndex: 'capital',
            key: 'capital',
        },
        {
            title: 'Ownership',
            dataIndex: 'ownership',
            key: 'ownership',
        },
    ];

    return (
        <div className='container'>
            <div className='headliner-container'>
                <h1 className='headliner-border'>Create Company Profile</h1>
            </div>

            <div className='content-container'>
                <div className='table-container'>
                    <Timeline>
                        <Timeline.Item color={indexTimeline(1)}>Welcome</Timeline.Item>
                        <Timeline.Item color={indexTimeline(2)}>Company</Timeline.Item>
                        <Timeline.Item color={indexTimeline(3)}>Shareholders</Timeline.Item>
                        <Timeline.Item color={indexTimeline(4)}>Access</Timeline.Item>
                    </Timeline>
                </div>

                <div className='form-container'>
                    {isTimelineActice === 1 && (
                        <>
                            <h2 className='form-headline'>Welcome!</h2>
                            <p className='form-instructions'>Before you get started, we recommend having the following documents on-hand to ensure complete and accurate cap table setup. Please acknowledge your access to these documents by checking the boxes below.</p>
                            <Button onClick={incrementTimeline}>Get Started</Button>
                        </>
                    )}

                    {isTimelineActice === 2 && (
                        <>
                            <Form
                                // {...layout}
                                name="basic"
                                initialValues={{ remember: false }}
                                onFinish={handleCompanySubmission}
                                onFinishFailed={onFinishFailedHandle}
                            >
                                <h2 className='form-headline'>Company</h2>
                                <p className="form-instructions">This will be the  primary contact information for this company. You can also update this data later.</p>

                                {/* Company Formation */}
                                <Form.Item
                                    label="Legal Company Name"
                                    name="legalName"
                                    rules={[{
                                        required: true, message: 'Legal Company Name'
                                    }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Total funding raised"
                                    name="totalRaised"
                                    rules={[{
                                        required: true, message: 'Total funding raised'
                                    }]}
                                >
                                    <Input defaultValue={handleDataFill('shareholder')} />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit">Submit</Button>
                                </Form.Item>
                            </Form>
                        </>
                    )}

                    {isTimelineActice === 3 && (
                        <>
                            <h2 className='form-headline'>Next</h2>
                            <p className="form-instructions">We'll add the companies founders, investors and employees. You can always add or edit members later.</p>

                            <div className='table-padding'>
                                <Table dataSource={data} columns={columns} pagination={false} />
                            </div>
                            
                            <h2 className='form-headline'>Add A Stakeholder</h2>
                            <Form
                                // {...layout}
                                form={form}
                                id="stakeholdeForm"
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={onHandlShareSubmission}
                                onFinishFailed={onFinishFailedHandle}
                            >
                                <Form.Item
                                    label="shareholder Name"
                                    name="shareholder"
                                    rules={[{ required: true, message: 'Please input your shareholder name!' }]}
                                >
                                    <Input defaultValue={handleDataFill('shareholder')} />
                                </Form.Item>

                                <Form.Item
                                    label="shares"
                                    name="shares"
                                    rules={[{ required: true, message: 'Please input your shares!' }]}
                                >
                                    <InputNumber defaultValue={handleDataFill('shares')} />
                                </Form.Item>

                                <Form.Item
                                    label="Price Per Share"
                                    name="PPS"
                                    rules={[{ required: true, message: 'Please input your Price Per Share!' }]}
                                >
                                    <InputNumber defaultValue={handleDataFill('PPS')} />
                                </Form.Item>

                                <Form.Item
                                    name="role"
                                    label="role"
                                    hasFeedback
                                    rules={[{ required: true, message: 'Please select your role!' }]}
                                >
                                    <Select placeholder="Please select a Role" defaultValue={handleDataFill('role')}>
                                        <Option value="Founder">Founder</Option>
                                        <Option value="Investor">Investor</Option>
                                        <Option value="Employee">Employee</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Capital"
                                    name="capital"
                                    rules={[{ required: true, message: 'Please input your Capital!' }]}
                                >
                                    <InputNumber />
                                </Form.Item>

                                <Form.Item
                                    label="Ownership"
                                    name="ownership"
                                    rules={[{ required: true, message: 'Please input your Ownership!' }]}
                                >
                                    <InputNumber />
                                </Form.Item>

                                <Form.Item>
                                    {/* TODO add or add another check */}
                                    <Button type="primary" htmlType="submit">Add Another</Button>
                                    {/* Check shares length to validate */}
                                    <Button onClick={incrementTimeline}>Submit ></Button>
                                </Form.Item>
                            </Form>
                        </>
                    )}

                    {isTimelineActice === 4 && (
                        <>
                            <h2 className='form-headline'>Signatories</h2>
                            <p className="form-instructions">By confirming below, I agree to all terms and conditions</p>

                            <Button onClick={onCompleteSetup}>Confirm</Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
};

export default OnboardingView;
