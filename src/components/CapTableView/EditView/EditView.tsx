import React from 'react';
import { Select, Button, Form, Input } from 'antd';
const { Option } = Select;


interface AddViewProps {
    currentuser: any;
    handleEdit: (event: any) => void;
    onFinishFailed: (message: any) => void;
    setEditUserActive: () => void;
    deleteShareholder: (currentuser: any) => void;
}

const EditView: React.FC<AddViewProps> = ({ currentuser, handleEdit, onFinishFailed, setEditUserActive, deleteShareholder } ) => {
    const onSubmit = (event: any) => {
        event.id = currentuser.id;
        for (const prop in event) {
            if (event[prop] === undefined) {
                event[prop] = currentuser[prop];
            }
        }
        handleEdit(event);
    };

    return (
        <>
            <h1>Edit A Shareholder</h1>
             <Form
                id="stakeholdeForm"
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="shareholder Name"
                    name="shareholder"
                    rules={[{ required: false, message: 'Please input your shareholder name!' }]}
                >
                    <Input defaultValue={currentuser.shareholder} />
                </Form.Item>

                <Form.Item
                    label="shares"
                    name="shares"
                    rules={[{ required: false, message: 'Please input your shares!' }]}
                >
                    <Input defaultValue={currentuser.shares} />
                </Form.Item>

                <Form.Item
                    label="Price Per Share"
                    name="PPS"
                    rules={[{ required: false, message: 'Please input your Price Per Share!' }]}
                >
                    <Input defaultValue={currentuser.PPS} />
                </Form.Item>

                <Form.Item
                    name="role"
                    label="role"
                    hasFeedback
                    rules={[{ required: false, message: 'Please select your role!' }]}
                >
                    <Select placeholder="Please select a Role" defaultValue={currentuser.role}>
                        <Option value="Founder">Founder</Option>
                        <Option value="Investor">Investor</Option>
                        <Option value="Employee">Employee</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Ownership"
                    name="ownership"
                    rules={[{ required: false, message: 'Please input your Ownership!' }]}
                >
                    <Input defaultValue={currentuser.ownership} />
                </Form.Item>

                <Form.Item
                    label="Date Added"
                    name="date"
                    rules={[{ required: false, message: 'Please input your Date Added!' }]}
                >
                    <Input defaultValue={currentuser.date} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Edit Stakeholder</Button>
                </Form.Item>
            </Form>
            <Button onClick={() => deleteShareholder(currentuser)}>Delete Shareholder</Button>
            <Button onClick={setEditUserActive}>Back</Button>
        </>
    )
};

export default EditView;
