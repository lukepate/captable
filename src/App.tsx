import React, { useState } from 'react';
import './App.scss';
import TableView from './components/TableView';
import ChartView from './components/ChartView';
import { Select, Button, Form, Input, InputNumber } from 'antd';
// import { Slice } from 'victory';
const { Option } = Select;


interface ShareUsers {
  id: string;
  key: number;
  shareholder: string;
  role: string;
  shares: number;
  PPS: number;
  capital: number;
  ownership: number;
}

interface Chart {
  x: string,
  y: number
}

const data = [
  {
    id: '1',
    key: 1,
    shareholder: 'Mike',
    role: 'Founder',
    shares: 40,
    PPS: 5,
    capital: 100,
    ownership: 30
  },
  {
    id: '2',
    key: 2,
    role: 'Investor',
    shareholder: 'John',
    shares: 30,
    PPS: 5,
    capital: 50,
    ownership: 50
  },
  {
    id: '3',
    key: 3,
    role: 'Investor',
    shareholder: 'Luke',
    shares: 30,
    PPS: 15,
    capital: 150,
    ownership: 150
  },
  {
    id: '4',
    key: 4,
    role: 'Employee',
    shareholder: 'Jake',
    shares: 30,
    PPS: 15,
    capital: 150,
    ownership: 150
  },
];

function App() {
  const [idCounter, setIdCounter] = useState(0);
  const [shareUsers, setShareUsers] = useState<ShareUsers[]>([]);

  const initialChartData = () => {
    return data.map(slice => ({ x: slice.shareholder, y: slice.shares }));
  };
  const [selectedChartData, setSelectedChartData] = useState(initialChartData);

  const setChartByRole = (selectedRole: any) => {
    const roleData = shareUsers.filter(el => el.role === selectedRole);
    const selectedData = roleData.map(slice => ({ x: slice.shareholder, y: slice.shares }));
    setSelectedChartData(selectedData);
  }

  const onFinish = async (event: any) => {
    event.id = idCounter;
    event.key = idCounter;

    setIdCounter(idCounter + 1);
    setShareUsers([...shareUsers, event]);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="App">
      <div className="chartContainer">
        <button onClick={initialChartData}>test {initialChartData}</button> 
        <Form
          // {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
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
        
        <Select defaultValue="Founder" style={{ width: 120 }} onChange={setChartByRole} >
          <Option value="Founder">Founder</Option>
          <Option value="Investor">Investor</Option>
          <Option value="Employee">Employee</Option>
        </Select>

        <ChartView data={selectedChartData} />
        <TableView data={shareUsers} />
        </div>
    </div>
  );
}

export default App;
