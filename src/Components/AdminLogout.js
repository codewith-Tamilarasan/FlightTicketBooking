import React, { useState, useEffect } from "react";
import { useAuth } from "./Authentication";
import { useNavigate } from "react-router";
import { Table, Button, Popconfirm, Modal, Form, Input } from 'antd';
import axios from "axios";

const { Search } = Input;

const AdminLogout = () => {
    const authenticate = useAuth();
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAdd = async () => {
        try {
            const values = await form.validateFields();
            const { name, departtime, arrivaltime, from, to } = values;
            const response = await axios.post("http://localhost:3000/addlist", {
                name,
                departtime,
                arrivaltime,
                from,
                to
            });

            if (response.status === 200) {
                console.log("adeddddddddd");
                alert("Successfully added");
                updateDataSource(); 
            }

            setIsModalVisible(false);
            form.resetFields();
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    const handleLogout = () => {
        authenticate.logout('admin');
        navigate('/');
    };

    const handleDelete = async (name) => {
        console.log(`Deleting row with key ${name}`);
        const deleteresponse = await axios.post("http://localhost:3000/deletelist", {
            name
        });

        if (deleteresponse.status === 200) {
            alert("Successfully deleted");
            updateDataSource();
        }
    };

    const handleviewall = async () => {
        try {
            const viewresponse = await axios.get("http://localhost:3000/viewall");
            if (viewresponse.status === 200 && Array.isArray(viewresponse.data.data)) {
                setDataSource(viewresponse.data.data);
                sessionStorage.setItem('flightData', JSON.stringify(viewresponse.data.data));
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const updateDataSource = () => {
        const storedData = sessionStorage.getItem('flightData');
        if (storedData) {
            setDataSource(JSON.parse(storedData));
        }
    };

    useEffect(() => {
        handleviewall();
    }, []);

    const [dataSource, setDataSource] = useState(null);
    const [searchText, setSearchText] = useState('');

    const handleSearch = (value) => {
        setSearchText(value);
        sessionStorage.setItem('searchText', value);  
    };

    const getFilteredData = () => {
        if (!dataSource) {
            return [];
        }
        return dataSource.filter((item) =>
            Object.values(item).some((value) =>
                value.toString().toLowerCase().includes(searchText.toLowerCase())
            )
        );
    };

    useEffect(() => {
        const storedSearchText = sessionStorage.getItem('searchText');
        if (storedSearchText) {
            setSearchText(storedSearchText);
        }
    }, []);

    const handleTableChange = (pagination, filters, sorter) => {
        console.log(pagination, filters, sorter);
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Departure Time',
            dataIndex: 'departtime',
            key: 'departtime',
        },
        {
            title: 'Arrival Time',
            dataIndex: 'arrivaltime',
            key: 'arrivaltime',
        },
        {
            title: 'From',
            dataIndex: 'from',
            key: 'from',
        },
        {
            title: 'To',
            dataIndex: 'to',
            key: 'to',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.name)}>
                    <Button type="danger">Delete</Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div className="bg-black-700">
            <div className="border bg-gray-300 border-black-800 flex justify-center p-10 w:auto m-5 rounded-lg">
                <div className="border border-black-500 p-8 bg-gray-100 rounded-lg mr-20 hover:bg-green-800">
                    <h1 className="flex justify-center font-bold text-xl">Book To Fly</h1>
                </div>

                <div className="flex justify-start items-end px-10">
                    <button className="border border-gray-500 h-fit p-2 mr-5 bg-gray-50 text-black-700 font-semibold hover:bg-blue-400 focus:text-white-900 rounded-lg hover:font-bold" onClick={handleviewall}>View All Flight</button>
                    <button className="border border-gray-500 h-fit p-2 mr-5 bg-gray-50 text-black-700 font-semibold hover:bg-blue-400 focus:text-white-900 rounded-lg hover:font-bold" onClick={handleLogout}>LogOut</button>
                    <button className="border border-gray-500 h-fit p-2 mr-5 bg-gray-50 text-black-700 font-semibold hover:bg-blue-400 focus:text-white-900 rounded-lg hover:font-bold" onClick={showModal}>Add to A List</button>
                    <Search
                   placeholder="Search..."
                  value={searchText}
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{ width: 200, height: 40 }} 
/>

                </div>
            </div>

            <div className="flex justify-center border border-black-900 m-9 ">
                <Table
                    dataSource={getFilteredData()}
                    columns={columns}
                    onChange={handleTableChange}
                    pagination={{ position: ['topRight'] }}
                    onHeaderRow={(column) => ({
                        onClick: () => {},
                    })}
                    showSorterTooltip={false}
                    bordered
                    size="middle"
                    loading={dataSource === null}
                />
            </div>

            <Modal
                title="Add to A List"
                open={isModalVisible}
                onOk={handleAdd}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter a name' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Departure Time" name="departtime" rules={[{ required: true, message: 'Please enter departure time' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Arrival Time" name="arrivaltime" rules={[{ required: true, message: 'Please enter arrival time' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="From" name="from" rules={[{ required: true, message: 'Please enter from' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="To" name="to" rules={[{ required: true, message: 'Please enter to' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminLogout;
