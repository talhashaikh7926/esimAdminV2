import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Checkbox, Button, Table, Typography, Space, notification, Select, DatePicker } from 'antd';
import { productPlanSearch } from '../../redux/actions/productPlan.action';
import { productTypeSearch } from '../../redux/actions/productType.action';
import Swal from 'sweetalert2';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { InventorySearchWithoutIccid, addInventoryWithoutIccid, updateInventoryWithoutIccid, deleteInventoryWithoutIccid } from '../../redux/actions/inventoryWithoutIccid.action';

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const InventoryWithoutIccid = () => {
    const [form] = Form.useForm();
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProductType, setCurrentProductType] = useState(null);
    const dispatch = useDispatch();
    const { getProductPlan, getProductType, getInventoryWithoutIccid } = useSelector((state) => state);

    useEffect(() => {
        dispatch(InventorySearchWithoutIccid());
        dispatch(productPlanSearch());
        dispatch(productTypeSearch());
    }, [dispatch]);

    const columns = [
     
        {
            title: 'Product Type',
            dataIndex: 'product_type',
            key: 'product_type',
            render: (_, record) => (
                record?.productTypeId?.name
            ),
        },
        {
            title: 'Product Plan',
            dataIndex: 'product_plan',
            key: 'product_plan',
            render: (_, record) => (
                record?.productPlanId?.name
            ),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Balance Quantity',
            dataIndex: 'balance_quantity',
            key: 'balance_quantity',
        },
        {
            title: 'Adjust Quantity',
            dataIndex: 'adjust_quantity',
            key: 'adjust_quantity',
        },
        {
            title: 'Expiry Date',
            dataIndex: 'expiryDate',
            key: 'expiryDate',
            render: (text) => (text ? moment(text).format('YYYY-MM-DD') : ''),
        },
        {
            title: 'Status',
            dataIndex: '',
            key: '',

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)} />
                </Space>
            ),
        },
        {
            title: (
                <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={() => setShowForm(true)}
                />
            ),
            key: 'add',
        },
    ];

    const handleFinish = (values) => {
        const productType = getProductType?.payload?.data?.find(item => item._id === values.productType);
        const productPlan = getProductPlan?.payload?.data?.find(item => item._id === values.productPlan);
        if (isEditing) {
            dispatch(updateInventoryWithoutIccid(currentProductType, { ...values, product_type: productType, product_plan: productPlan })).then((res) => {
                if (res.type === "UPDATE_INVENTORY_WITHOUT_ICCID_SUCCESS") {
                    notification.success({
                        message: "Update Successful",
                        className: "toast-success",
                    });
                    dispatch(InventorySearchWithoutIccid());
                    form.resetFields();
                    setShowForm(false);
                    setIsEditing(false);
                    setCurrentProductType(null);
                } else {
                    notification.error({
                        message: res?.payload?.message,
                        className: "toast-error",
                    });
                }
            });
        } else {
            dispatch(addInventoryWithoutIccid({ ...values, product_type: productType, product_plan: productPlan })).then((res) => {
                if (res.type === "POST_INVENTORY_WITHOUT_ICCID_SUCCESS") {
                    notification.success({
                        message: "Insert Successful",
                        className: "toast-success",
                    });
                    dispatch(InventorySearchWithoutIccid());
                    form.resetFields();
                    setShowForm(false);
                } else {
                    notification.error({
                        message: res?.payload?.message,
                        className: "toast-error",
                    });
                }
            });
        }
    };

    const handleEdit = (record) => {
        setIsEditing(true);
        setCurrentProductType(record._id);
        setShowForm(true);
        form.setFieldsValue({
            order: record.orderNumber,
            productType: record.productTypeId?.id,
            productPlan: record.productPlanId?.id,
            comment: record.comment,
            expiry: record.expiryDate ? moment(record.expiryDate) : null,
            activated: record.activatedDate ? moment(record.activatedDate) : null,
            iccid: record.iccid,
            mobile: record.mobileNumber,
            quantity: record.quantity,
            pin: record.puk
        });
    };

    const handleDelete = (key) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this item?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteInventoryWithoutIccid(key)).then((res) => {
                    console.log(res,"cll");
                    if (res.type === "DELETE_INVENTORY_WITHOUT_ICCID_REQUEST") {
                        notification.success({
                            message: "Delete Successful",
                            className: "toast-success",
                        });
                        dispatch(InventorySearchWithoutIccid());
                    } else {
                        notification.error({
                            message: res?.payload?.message,
                            className: "toast-error",
                        });
                    }
                });
            }
        });
    };

    return (
        <Layout style={{ padding: '20px', minHeight: '100vh', backgroundColor: 'white' }}>
            <Content style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
                {!showForm && (
                    <>
                        <Title level={2}>My Inventory Without ICCID</Title>
                        <hr />
                        <Table
                            columns={columns}
                            loading={getInventoryWithoutIccid?.loading}
                            dataSource={getInventoryWithoutIccid?.payload?.data}
                            pagination={false}
                            footer={() => `Total records: ${getInventoryWithoutIccid?.payload?.data?.length ? getInventoryWithoutIccid?.payload?.data?.length : 0}`}
                            style={{ marginBottom: '20px', paddingBottom: '20px', border: '1px solid #f0f0f0' }}
                        />
                    </>
                )}
                {showForm && (
                    <div style={{ maxWidth: '600px', margin: '20px 0', backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
                        <Title level={3}>{isEditing ? 'Edit' : 'Add'} Inventory Without ICCID</Title>
                        <hr />
                        <Form
                            form={form}
                            name="product_type_form"
                            layout="vertical"
                            onFinish={handleFinish}
                        >
                            <Form.Item
                                label="Order Number/ Buyer Name"
                                name="order"
                            >
                                <Input placeholder="" />
                            </Form.Item>

                            <Form.Item
                                label="Select Product Type"
                                name="productType"
                                rules={[{ required: true, message: 'Please select the product type!' }]}
                            >
                                <Select placeholder="--Select--">
                                    {getProductType?.payload?.data?.map((type) => (
                                        <Option key={type._id} value={type._id}>{type.product_type}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Select Product Plan"
                                name="productPlan"
                            >
                                <Select placeholder="--Select--">
                                    {getProductPlan?.payload?.data?.map((type) => (
                                        <Option key={type._id} value={type._id}>{type.productPlan}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="ICCID"
                                name="iccid"
                            >
                                <Input placeholder="Enter ICCID" />
                            </Form.Item>

                            <Form.Item
                                label="Mobile Number"
                                name="mobile"

                            >
                                <Input type="number" placeholder="Enter Number" />
                            </Form.Item>
                            <Form.Item
                                label="PUK/PIN"
                                name="pin"
                            >
                                <Input placeholder="Enter Pin" />
                            </Form.Item>

                            <Form.Item
                                label="Expiry Date"
                                name="expiry"
                            >
                                <DatePicker />
                            </Form.Item>

                            <Form.Item
                                label="Quantity"
                                name="quantity"
                            >
                                <Input type='number' placeholder="###" />
                            </Form.Item>

                            <Form.Item
                                label="Comments"
                                name="comment"
                            >
                                <TextArea placeholder="Enter comments..." />
                            </Form.Item>

                            <Form.Item
                                label="Activated Date"
                                name="activated"
                            >
                                <DatePicker />
                            </Form.Item>

                            <Form.Item>
                            <Button size='large' htmlType="submit" style={{ marginRight: '10px' }}>
                                    Submit
                                </Button>
                                <Button
                                size='large'
                                    htmlType="button"
                                    onClick={() => {
                                        form.resetFields();
                                        setShowForm(false);
                                        setIsEditing(false);
                                        setCurrentProductType(null);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                )}
            </Content>
        </Layout>
    );
};

export default InventoryWithoutIccid;