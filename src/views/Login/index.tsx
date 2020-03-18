import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Form, Input, Button, Row, Col, Card } from 'antd';
import { LOGIN_REQUEST } from '@/redux/store/Login/actions';

import env from '@/api/env';

import styles from './index.less';

const baseUrl = env.baseUrl;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 }
};
const Login: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [captchaTime, setCaptchaTime] = useState(new Date().getTime());
  const onFinish = (values: HashMapObj) => {
    dispatch({ type: LOGIN_REQUEST, payload: values });
  };
  const changeCap = () => {
    setCaptchaTime(new Date().getTime());
  };
  return (
    <Row
      justify="space-around"
      align="middle"
      className={styles['form-content']}
    >
      <Col span={12}>
        <Card title="Skynet" bordered={false}>
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true, message: '请填写name' }]}
            >
              <Input size="large" placeholder="username" />
            </Form.Item>
            <Form.Item
              name="password"
              label="密&#12288;码"
              rules={[{ required: true, message: '请填写password' }]}
            >
              <Input.Password size="large" placeholder="password" />
            </Form.Item>
            <Form.Item
              name="captcha"
              label="验证码"
              rules={[{ required: true, message: '请填写captcha' }]}
            >
              <Row>
                <Col span={16}>
                  <Input size="large" placeholder="captcha" />
                </Col>
                <Col span={4}>
                  <img
                    src={`${baseUrl}/captcha?t=${captchaTime}`}
                    alt="验证码"
                    className="pointer"
                    onClick={changeCap}
                    width="120px"
                  />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button size="large" block type="primary" htmlType="submit">
                登陆
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
export default Login;
