import React from "react";
import { Form, Input, Select, Button, Row, Col, App } from "antd";
import useFormHandler from "../../services/useFormHandler";
import apiService from "../../services/apiService";
import Toolbar from "../shared/Toolbar";

const { Option } = Select;

// 🔹 Define fields with grouping and validation
const fields = [
  { name: "name", label: "Name", type: "input",  rules: [{ required: true, message: "Name is required" }] },
  { name: "email", label: "Email", type: "input", rules: [{ required: true, type: "email", message: "Enter a valid email" }] },
  { name: "role", label: "Role", type: "select", options: ["Admin", "User"],  rules: [{ required: true, message: "Select a role" }] },
  { name: "department", label: "Department", type: "select", isDependent: true, rules: [{ required: true, message: "Select a department" }] },
  { name: "state", label: "State", type: "select", options: ["NY", "CA"], group: "Location Details", rules: [{ required: true, message: "Select a state" }] },
  { name: "city", label: "City", type: "select", isDependent: true, group: "Location Details", rules: [{ required: true, message: "Select a city" }] },
];

// 🔹 Define dependencies for dropdowns
const dependenciesConfig = {
  role: {
    dependentField: "department",
    fetchOptions: (role) => apiService.send(role),
  },
  state: {
    dependentField: "city",
    fetchOptions: (state) => apiService.send(state),
  },
};

const CreateVendor: React.FC = () => {
  const { notification } = App.useApp();
  const { form, dropdownOptions, handleChange } = useFormHandler(dependenciesConfig);

  const handleSave = async () => {
    try {
      await form.validateFields();
      console.log("Saved Form Data:", form.getFieldsValue());
      notification.success({
        message: "User saved successfully!",
        description: "Your data has been saved.",
        placement: "topRight",
      });
    } catch (error) {
      notification.error({
        message: "Validation Failed",
        description: "Please correct the errors before submitting.",
        placement: "topRight",
      });
    }
  };

  return (
    <>
      <Toolbar 
        title="New Vendor Creation Request"
        showNew={true}
        showSave={true}
        showList={true}
        showEdit={true}
        onSaveClick={handleSave}
      />

      <Form layout="vertical" form={form}>
        {Array.from(new Set(fields.map((field) => field.group))).map((group) => (
          <div key={group} style={{ marginBottom: "20px" }}>
            <h3>{group}</h3>
            <Row gutter={16}>
              {fields
                .filter((field) => field.group === group)
                .map((field) => (
                  <Col key={field.name} xs={24} sm={24} md={12} lg={8}>
                    <Form.Item name={field.name} label={field.label} rules={field.rules}>
                      {field.type === "input" && (
                        <Input onChange={(e) => handleChange(field.name, e.target.value)} />
                      )}
                      {field.type === "select" && (
                        <Select onChange={(value) => handleChange(field.name, value)}>
                          {(dropdownOptions[field.name] || field.options || []).map((option) => (
                            <Option key={option} value={option}>
                              {option} 
                            </Option>
                          ))}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                ))}
            </Row>
          </div>
        ))}
      </Form>
    </>
  );
};

export default CreateVendor;
