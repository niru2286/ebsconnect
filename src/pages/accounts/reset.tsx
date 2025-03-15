import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, message } from "antd";
import  { forgotPassword } from "../../auth/AuthAxiosInstance";
// import { AuthContext } from "../../auth/AuthProvider";

const Reset: React.FC = () => {
  const [loading, setLoading] = useState(false);
  //const auth = useContext(AuthContext);
  //const navigate = useNavigate();

  const handleReset = async (values: { email: string }) => {
    setLoading(true);
    console.log("values", values);
    const success = await forgotPassword(values.email);
    
    console.log(success);
    if(success.status === 200){
        setLoading(false);
        alert(success.data.message);
    }
  };

  return (
    <Card title="Reset Password" style={{ maxWidth: 400, margin: "50px auto" }}>
      <Form layout="vertical" onFinish={handleReset}>
        <Form.Item label="Username" name="username" rules={[{ required: true, message: "Enter username" }]}>
          <Input />
        </Form.Item>
       
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Reset Password
          </Button>
        </Form.Item>
        
      </Form>
    </Card>
  );
};

export default Reset;
