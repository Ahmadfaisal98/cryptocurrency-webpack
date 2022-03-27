import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { usePostLoginMutation } from '@/services/serverApi';
import { Loader } from '@/components/atoms';
import { useDispatch } from 'react-redux';
import { setIsLogin, setLoginForm } from '@/features/userSlice';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Item } = Form;

const Login = () => {
  const [postLogin, { data, isFetching, error, isSuccess }] =
    usePostLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async ({ email, password }) => {
    await postLogin({ email, password });
    dispatch(setLoginForm({ email, password }));
    navigate('/');
  };

  if (error) console.log(error);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setIsLogin(true));
      document.cookie = `accessToken = ${data.access_token}`;
    }
  }, [dispatch, isSuccess, data]);

  if (isFetching) return <Loader />;

  return (
    <>
      <div className="login">
        <Title className="heading" level={2}>
          Login
        </Title>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={(e) => onFinish(e)}
          autoComplete="off"
        >
          <Item
            label="email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Item>

          <Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Item>

          <Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 4, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Item>

          <Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
