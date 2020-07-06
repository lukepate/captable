import React from 'react';
import { Select, Button, Form, Input, InputNumber } from 'antd';
const { Option } = Select;


interface AddViewProps {
    onFinishHandleCapView: (event: any) => void;
    onFinishFailed: (message: any) => void;
    setAddUserActive: () => void;
}

const AddView: React.FC<AddViewProps> = ({ onFinishHandleCapView, onFinishFailed, setAddUserActive } ) => {
    
    return (
        <>
            <h2>Add A New User</h2>
             <Form
                id="stakeholdeForm"
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinishHandleCapView}
                onFinishFailed={onFinishFailed}
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
                    <Select placeholder="Please select a Role" >
                        <Option value="Founder">Founder</Option>
                        <Option value="Investor">Investor</Option>
                        <Option value="Employee">Employee</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Ownership"
                    name="ownership"
                    rules={[{ required: true, message: 'Please input your Ownership!' }]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="Date Added"
                    name="date"
                    rules={[{ required: true, message: 'Please input your Date Added!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Add Stakeholder</Button>
                </Form.Item>
            </Form>
            <Button onClick={setAddUserActive}>Back</Button>
        </>
    )
};

export default AddView;
