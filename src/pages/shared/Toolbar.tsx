import React from "react";
import { Button, Space, Typography, Row, Col } from "antd";
import { PlusOutlined, SaveOutlined, UnorderedListOutlined, EditOutlined, FileOutlined } from "@ant-design/icons";

interface ToolbarProps {
  title?: string;
  showNew?: boolean;
  showSave?: boolean;
  showList?: boolean;
  showEdit?: boolean;
  onNewClick?: () => void;
  onSaveClick?: () => void;
  onListClick?: () => void;
  onEditClick?: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  title = "Page Title",
  showNew = true,
  showSave = true,
  showList = true,
  showEdit = true,
  onNewClick,
  onSaveClick,
  onListClick,
  onEditClick,
}) => {
  return (
    <Row align="middle" justify="space-between" 
    style={{
        padding: "10px 16px",
        background: "#f5f5f5",        
        marginBottom: 16,
        borderBottom: "2px solid #1890ff", // ✅ Thin blue border at the bottom
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // ✅ Slight shadow effect
      }}>
      {/* Left: Page Title */}
      <Space>
          <FileOutlined style={{ fontSize: "18px", color: "#1890ff" }} /> {/* ✅ Page Icon */}
          <Typography.Title level={4} style={{ margin: 0 }}>
            {title}
          </Typography.Title>
        </Space>

      {/* Right: Buttons */}
      <Col>
        <Space>
          {showNew && <Button type="default" icon={<PlusOutlined />} onClick={onNewClick}>New</Button>}
          {showSave && <Button type="default" icon={<SaveOutlined />} onClick={onSaveClick}>Save</Button>}
          {showList && <Button type="default" icon={<UnorderedListOutlined />} onClick={onListClick}>List</Button>}
          {showEdit && <Button type="default" icon={<EditOutlined />} onClick={onEditClick}>Edit</Button>}
        </Space>
      </Col>
    </Row>
  );
};

export default Toolbar;
