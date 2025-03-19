import React from "react";
import { Form, Input, Select, Button, Row, Col, App } from "antd";
import useFormHandler from "../../services/useFormHandler";
import apiService from "../../services/apiService";
import Toolbar from "../shared/Toolbar";

const { Option } = Select;

// 🔹 Define fields with grouping and validation
const fields = [
  // Basic Details
  { name: "PartyName", label: "Party Name", type: "input", group: "Basic Details", rules: [{ required: true, message: "Name is required" }] },
  { name: "Address", label: "Address", type: "input", group: "Basic Details", rules: [{ required: true, message: "Address is required" }] },
  { name: "City", label: "City", type: "input", group: "Basic Details", rules: [{ required: true, message: "City is required" }] },
  { name: "State", label: "State", type: "input", group: "Basic Details", rules: [{ required: true, message: "State is required" }] },
  { name: "Pincode", label: "Pincode", type: "input", group: "Basic Details", rules: [{ required: true, message: "Pincode is required" }] },
  { name: "ContactNo", label: "Contact Number", type: "input", group: "Basic Details", rules: [{ required: true, pattern: /^[0-9]{10}$/, message: "Enter a valid contact number" }] },
  { name: "Email", label: "Email ID", type: "input", group: "Basic Details", rules: [{ required: true, type: "email", message: "Enter a valid email" }] },
  { name: "VendorType", label: "Vendor Type", type: "select", options: ["General", "Contractor", "Sub-Contractor"], group: "Basic Details", rules: [{ required: true, message: "Select a vendor type" }] },
  { name: "Pan", label: "PAN", type: "input", group: "Basic Details", rules: [{ required: true, message: "Enter PAN" }] },
  { name: "GST", label: "GSTIN", type: "input", group: "Basic Details", rules: [{ required: true, message: "Enter GSTIN" }] },

  // MSME Details
  { name: "MSME", label: "MSME ?", type: "select", options: ["Yes", "No"], group: "MSME Details", rules: [{ required: true, message: "Select MSME status" }] },
  { name: "MSMECategory", label: "MSME Category", type: "select", options: ["Medium", "Micro", "Small"], group: "MSME Details" },
  { name: "MSMEReg", label: "MSME Registration No", type: "input", group: "MSME Details",  },

  // Bank Details
  { name: "BankName", label: "Bank Name", type: "input", group: "Bank Details", rules: [{ required: true, message: "Enter bank name" }] },
  { name: "BranchName", label: "Branch Name", type: "input", group: "Bank Details", rules: [{ required: true, message: "Enter branch name" }] },
  { name: "IFSCCode", label: "IFSC Code", type: "input", group: "Bank Details", rules: [{ required: true, message: "Enter IFSC code" }] },
  { name: "BankAc", label: "Bank A/c", type: "input", group: "Bank Details", rules: [{ required: true, message: "Enter bank account number" }] }
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
