import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Checkbox, Button, Table, Typography, Space, notification, Select, DatePicker } from 'antd';
import { productPlanSearch } from '../../redux/actions/productPlan.action';
import { productTypeSearch } from '../../redux/actions/productType.action';
import Swal from 'sweetalert2';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { InventorySearchNonIccid, addInventoryNonIccid, updateInventoryNonIccid, deleteInventoryNonIccid } from '../../redux/actions/nonInventoryIccid.action';

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const NonIccidProduct = () => {
    const [form] = Form.useForm();
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProductType, setCurrentProductType] = useState(null);
    const dispatch = useDispatch();
    const { getProductPlan, getProductType, getInventoryNontIccid } = useSelector((state) => state);

    useEffect(() => {
        dispatch(InventorySearchNonIccid());
        dispatch(productPlanSearch());
        dispatch(productTypeSearch());
    }, [dispatch]);

    const columns = [
        {
            title: 'Inward Date',
            dataIndex: 'inward',
            key: 'inward',
            render: (text) => (text ? moment(text).format('YYYY-MM-DD') : ''),
        },
        {
            title: 'Product Type',
            dataIndex: 'product_type',
            key: 'product_type',
            render: (_, record) => (
                record?.productTypeId?.name
            ),
        },

        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Expiry Date',
            dataIndex: 'expiryDate',
            key: 'expiryDate',
            render: (text) => (text ? moment(text).format('YYYY-MM-DD') : ''),
        },
        {
            title: 'Product Description',
            dataIndex: 'description',
            key: 'description',
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
        if (isEditing) {
            dispatch(updateInventoryNonIccid(currentProductType, { ...values, product_type: productType })).then((res) => {
                if (res.type === "UPDATE_INVENTORY_NON_ICCID_SUCCESS") {
                    notification.success({
                        message: "Update Successful",
                        className: "toast-success",
                    });
                    dispatch(InventorySearchNonIccid());
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
            dispatch(addInventoryNonIccid({ ...values, product_type: productType })).then((res) => {
                if (res.type === "POST_INVENTORY_NON_ICCID_SUCCESS") {
                    notification.success({
                        message: "Insert Successful",
                        className: "toast-success",
                    });
                    dispatch(InventorySearchNonIccid());
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
            productType: record.productTypeId?.id,
            inward: record.inward ? moment(record.inward) : null,
            description: record.productDescription,
            expiry: record.expiryDate ? moment(record.expiryDate) : null,
            quantity: record.quantity,

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
                dispatch(deleteInventoryNonIccid(key)).then((res) => {
                    console.log(res, "cll");
                    if (res.type === "DELETE_INVENTORY_NON_ICCID_REQUEST") {
                        notification.success({
                            message: "Delete Successful",
                            className: "toast-success",
                        });
                        dispatch(InventorySearchNonIccid());
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
                        <Title level={2}>Non ICCID Products Update Report</Title>
                        <hr />
                        <Table
                            columns={columns}
                            loading={getInventoryNontIccid?.loading}
                            dataSource={getInventoryNontIccid?.payload?.data}
                            pagination={false}
                            footer={() => `Total records: ${getInventoryNontIccid?.payload?.data?.length ? getInventoryNontIccid?.payload?.data?.length : 0}`}
                            style={{ marginBottom: '20px', paddingBottom: '20px', border: '1px solid #f0f0f0' }}
                        />
                    </>
                )}
                {showForm && (
                    <div style={{ maxWidth: '600px', margin: '20px 0', backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
                        <Title level={3}>{isEditing ? 'Edit' : 'Add'} Inward</Title>
                        <hr />
                        <Form
                            form={form}
                            name="product_type_form"
                            layout="vertical"
                            onFinish={handleFinish}
                        >
                            <Form.Item
                                label="Inward Date"
                                name="inward"
                            >
                                <DatePicker />
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
                                label="Quantity"
                                name="quantity"
                            >
                                <Input type='number' placeholder="###" />
                            </Form.Item>
                            <Form.Item
                                label="Inward Date"
                                name="inward"
                            >
                                <DatePicker />
                            </Form.Item>
                            <Form.Item
                                label="Product Description"
                                name="description"
                            >
                                <TextArea placeholder="Enter details..." />
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

export default NonIccidProduct;