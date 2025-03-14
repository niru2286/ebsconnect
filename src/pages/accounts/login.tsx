import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, message } from "antd";
import { AuthContext } from "../../auth/AuthProvider";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (values: { username: string; password: string }) => {
    setLoading(true);
    const success = await auth?.loginUser(values.username, values.password);
    setLoading(false);

    if (success) {
      message.success("Login successful");
      navigate("/");
    } else {
      message.error("Invalid credentials");
    }
  };

  return (
    <Card title="Login" style={{ maxWidth: 400, margin: "50px auto" }}>
      <Form layout="vertical" onFinish={handleLogin}>
        <Form.Item label="Username" name="username" rules={[{ required: true, message: "Enter username" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Enter password" }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
