import React from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Card, Layout, Typography, Divider, notification } from 'antd';
import { adminLogin } from '../../redux/actions/login.action'
import { useNavigate } from 'react-router-dom';



const { Content } = Layout;
const { Title } = Typography;

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();



    const onFinish = values => {
        console.log('Form values:', values);
        dispatch(adminLogin(values)).then((res) => {
            if (res.isSuccess) {
                localStorage.setItem('userInfo', JSON.stringify(res?.data))
                localStorage.setItem('token', JSON.stringify(res?.data?.token?.accessToken))

                notification.success({
                    message: res.message,
                    className: "toast-success",
                });
                navigate('/productType');
            } else {
                if (!res.isSuccess) {
                    notification.error({
                        message: "Login Failed",
                        className: "toast-error",
                    });
                }
            }
        });
    };

    return (
        <Layout style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
            <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Card style={{ width: 600, padding: '40px 60px', textAlign: 'center' }}>
                    <Title level={2} style={{ fontWeight: 'bold', marginBottom: 0 }}>
                        Esim Retail
                    </Title>
                    <Divider style={{ marginBottom: 40 }} />
                    <Form
                        name="login"
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={<span style={{ fontSize: '20px' }}>Email</span>}
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                               
                            ]}
                        >
                            <Input
                                placeholder="Enter your email"
                                style={{ width: '100%', height: '50px', fontSize: '20px' }}
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ fontSize: '20px' }}>Password</span>}
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                placeholder="Enter your password"
                                style={{ width: '100%', height: '50px', fontSize: '20px' }}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: '#13c2c2', height: '50px', fontSize: '20px' }}>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Content>
        </Layout>
    );
};

export default Login;
