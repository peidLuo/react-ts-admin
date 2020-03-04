import React, { useState, Fragment } from 'react';
import { Form, Input, Button, Row, Col, Card } from 'antd';
import env from '@/api/env';

import styles from './index.less';

const baseUrl = env.baseUrl;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};
export default () => {
  const [form] = Form.useForm();
  const [captchaTime, setCaptchaTime] = useState(new Date().getTime());

  const onFinish = (values: { [name: string]: string }) => {
    console.log(values);
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
        <Card title="Login" bordered={false}>
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="Note"
              rules={[{ required: true, message: '请填写name' }]}
            >
              <Input placeholder="name" />
            </Form.Item>
            <Form.Item
              name="password"
              label="password"
              rules={[{ required: true, message: '请填写password' }]}
            >
              <Input placeholder="password" />
            </Form.Item>
            <Form.Item
              name="captcha"
              label="captcha"
              rules={[{ required: true, message: '请填写captcha' }]}
            >
              <Fragment>
                <Input placeholder="captcha" />
                <img
                  src={`${baseUrl}/captcha?t=${captchaTime}`}
                  alt="验证码"
                  onClick={changeCap}
                  width="120px"
                />
              </Fragment>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
