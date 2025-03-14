import { Form } from "antd";
import { useEffect, useState } from "react";

interface DependencyConfig {
  [key: string]: {
    dependentField: string;
    fetchOptions: (value: string) => Promise<string[]>;
  };
}

const useFormHandler = (dependenciesConfig: DependencyConfig) => {
  const [form] = Form.useForm(); // ✅ Using Ant Design's Form instance
  const [dropdownOptions, setDropdownOptions] = useState<Record<string, string[]>>({});

  // Common handler for input changes
  const handleChange = (name: string, value: any) => {
    form.setFieldsValue({ [name]: value });

    // Check if this field has a dependent dropdown
    if (dependenciesConfig[name]) {
      const { dependentField, fetchOptions } = dependenciesConfig[name];

      fetchOptions(value).then((options) => {
        setDropdownOptions((prev) => ({ ...prev, [dependentField]: options }));
      });
    }
  };

  return { form, dropdownOptions, handleChange };
};

export default useFormHandler;
