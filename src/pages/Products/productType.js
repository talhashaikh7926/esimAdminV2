import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Checkbox, Button, Table, Typography, Space, notification } from 'antd';
import { addProductType, productTypeSearch, deleteProductType, updateProductType } from '../../redux/actions/productType.action';
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title } = Typography;

const ProductType = () => {
  const [form] = Form.useForm();
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductType, setCurrentProductType] = useState(null);
  const dispatch = useDispatch();
  const { getProductType } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    dispatch(productTypeSearch());
  }, [dispatch]);

  const columns = [
    {
      title: 'Product Type',
      dataIndex: 'product_type',
      key: 'product_type',
    },
    {
      title: 'Total Stock',
      dataIndex: 'totalStock',
      key: 'totalStock',
    },
    {
      title: 'ICCID',
      dataIndex: 'iccid',
      key: 'iccid',
      render: (text) => (text ? 'true' : 'false'),
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
    if (isEditing) {
      dispatch(updateProductType(currentProductType, values )).then((res) => {
        if (res.type === "UPDATE_PRODUCT_TYPE_SUCCESS") {
          notification.success({
            message: "Update Successful",
            className: "toast-success",
          });
          dispatch(productTypeSearch());
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
      dispatch(addProductType(values)).then((res) => {
        if (res.type === "POST_PRODUCT_TYPE_SUCCESS") {
          notification.success({
            message: "Insert Successful",
            className: "toast-success",
          });
          dispatch(productTypeSearch());
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
      productType: record.product_type,
      iccid: record.iccid,
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
            dispatch(deleteProductType(key)).then((res) => {
                if (res.type === "DELETE_PRODUCT_TYPE_SUCCESS") {
                    notification.success({
                        message: "Delete Successful",
                        className: "toast-success",
                    });
                    dispatch(productTypeSearch());
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
            <Title level={2}>All Product Types</Title>
            <hr />
            <Table
              columns={columns}
              loading={getProductType?.loading}
              dataSource={getProductType?.payload?.data}
              pagination={false}
              footer={() => `Total records: ${getProductType?.payload?.data?.length ? getProductType?.payload?.data?.length : 0}`}
              style={{ marginBottom: '20px', paddingBottom: '20px', border: '1px solid #f0f0f0' }}
            />
          </>
        )}
        {showForm && (
          <div style={{ maxWidth: '600px', margin: '20px 0', backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
            <Title level={3}>{isEditing ? 'Edit' : 'Add'} Product Type</Title>
            <hr />
            <Form
              form={form}
              name="product_type_form"
              layout="vertical"
              onFinish={handleFinish}
            >
              <Form.Item
                label="Product Type"
                name="productType"
                rules={[{ required: true, message: 'Please input the product type!' }]}
              >
                <Input placeholder="Enter product type" />
              </Form.Item>
              <Form.Item name="iccid" valuePropName="checked">
                <Checkbox>ICCID</Checkbox>
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

export default ProductType;
