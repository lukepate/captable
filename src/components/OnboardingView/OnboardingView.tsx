import React from 'react';
// import styles from './Dashboard.module.scss';
import { Select, Button, Form, Input, InputNumber } from 'antd';
const { Option } = Select;

interface OnbaordingViewProps {
    onFinishFailedHandle: (errorMessage: any) => void;
    onFinishHandle: (event: any) => void;
}

const OnboardingView: React.FC<OnbaordingViewProps> = ({ onFinishHandle, onFinishFailedHandle }) => {
    return (
        <div>
            Onboarding 
               <Form
                // {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinishHandle}
                onFinishFailed={onFinishFailedHandle}
            >
                <Form.Item
                    label="shareholder Name"
                    name="shareholder"
                    rules={[{ required: true, message: 'Please input your shareholder name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="shares"
                    name="shares"
                    rules={[{ required: true, message: 'Please input your shares!' }]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="Price Per Share"
                    name="PPS"
                    rules={[{ required: true, message: 'Please input your Price Per Share!' }]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    name="role"
                    label="role"
                    hasFeedback
                    rules={[{ required: true, message: 'Please select your role!' }]}
                >
                    <Select placeholder="Please select a Role">
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
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    )
};

export default OnboardingView;
