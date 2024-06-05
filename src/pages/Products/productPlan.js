import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Checkbox, Button, Table, Typography, Space, notification, Select } from 'antd';
import { addProductPlan, productPlanSearch, deleteProductPlan, updateProductPlan } from '../../redux/actions/productPlan.action';
import { productTypeSearch } from '../../redux/actions/productType.action';
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const ProductPlan = () => {
    const [form] = Form.useForm();
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProductType, setCurrentProductType] = useState(null);
    const dispatch = useDispatch();
    const { getProductPlan, getProductType } = useSelector((state) => state);

    useEffect(() => {
        dispatch(productPlanSearch());
        dispatch(productTypeSearch());
    }, [dispatch]);

    console.log(getProductPlan,"check");
    const columns = [
        {
            title: 'Product Type',
            dataIndex: 'product_type',
            key: 'product_type',
            render: (_, record) => (
                record?.productType?.product_type
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Product Plan',
            dataIndex: 'productPlan',
            key: 'productPlan',
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
            dispatch(updateProductPlan(currentProductType, { ...values, product_type: productType })).then((res) => {
                if (res.type === "UPDATE_PRODUCT_PLAN_SUCCESS") {
                    notification.success({
                        message: "Update Successful",
                        className: "toast-success",
                    });
                    dispatch(productPlanSearch());
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
            dispatch(addProductPlan({ ...values, product_type: productType })).then((res) => {
                if (res.type === "POST_PRODUCT_PLAN_SUCCESS") {
                    notification.success({
                        message: "Insert Successful",
                        className: "toast-success",
                    });
                    dispatch(productPlanSearch());
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
        console.log(record);
        setIsEditing(true);
        setCurrentProductType(record._id);
        setShowForm(true);
        form.setFieldsValue({
            productType: record.productTypeId,
            productPlan: record.productPlan,
            description: record.description,
        });
    };

    const handleDelete = (key) => {
        dispatch(deleteProductPlan(key)).then((res) => {
            if (res.type === "DELETE_PRODUCT_PLAN_SUCCESS") {
                notification.success({
                    message: "Delete Successful",
                    className: "toast-success",
                });
                dispatch(productPlanSearch());
            } else {
                notification.error({
                    message: res?.payload?.message,
                    className: "toast-error",
                });
            }
        });
    };

    return (
        <Layout style={{ padding: '20px', minHeight: '100vh', backgroundColor: 'white' }}>
            <Content style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
                {!showForm && (
                    <>
                        <Title level={2}>All Product Plans</Title>
                        <hr />
                        <Table
                            columns={columns}
                            loading={getProductPlan?.loading}
                            dataSource={getProductPlan?.payload?.data}
                            pagination={false}
                            footer={() => `Total records: ${getProductPlan?.payload?.data?.length ? getProductPlan?.payload?.data?.length : 0}`}
                            style={{ marginBottom: '20px', paddingBottom: '20px', border: '1px solid #f0f0f0' }}
                        />
                    </>
                )}
                {showForm && (
                    <div style={{ maxWidth: '600px', margin: '20px 0', backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
                        <Title level={3}>{isEditing ? 'Edit' : 'Add'} Product Plan</Title>
                        <hr />
                        <Form
                            form={form}
                            name="product_type_form"
                            layout="vertical"
                            onFinish={handleFinish}
                        >
                            <Form.Item
                                label="Select Product Type"
                                name="productType"
                                rules={[{ required: true, message: 'Please select the product type!' }]}
                            >
                                <Select placeholder="Select product type">
                                    {getProductType?.payload?.data?.map((type) => (
                                        <Option key={type._id} value={type._id}>{type.product_type}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Product Plan"
                                name="productPlan"
                                rules={[{ required: true, message: 'Please input the product plan!' }]}
                            >
                                <Input placeholder="Enter product plan" />
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="description"
                            >
                                <TextArea placeholder="Enter description..." />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                                    Submit
                                </Button>
                                <Button
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

export default ProductPlan;
