import React from "react";
import { Button, Space, Typography, Row, Col, Input } from "antd";
import { PlusOutlined, SaveOutlined, UnorderedListOutlined, EditOutlined, FileOutlined, SearchOutlined, FileExcelOutlined, FilterOutlined } from "@ant-design/icons";
import { exportToExcel } from "../../services/excelExport"

interface ToolbarProps {
  title?: string;
  showNew?: boolean;
  showSave?: boolean;
  showList?: boolean;
  showEdit?: boolean;
  showFilter?: boolean; // ✅ New filter button
  showSearch?:boolean,
  showExport?:boolean,
  tableRef?:any,
  onNewClick?: () => void;
  onSaveClick?: () => void;
  onListClick?: () => void;
  onEditClick?: () => void;
  onSearch?: (value: string) => void; // ✅ Handle Search in Parent
  onFilterClick?: ()=>void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  title = "Page Title",
  showNew = true,
  showSave = true,
  showList = true,
  showEdit = true,
  showFilter = false,
  showSearch = false,
  showExport = false,
  tableRef,
  onNewClick,
  onSaveClick,
  onListClick,
  onEditClick,
  onFilterClick,
  onSearch
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
          <Typography.Title level={4} style={{ margin: 0, fontSize:"14px"  }}>
            {title}
          </Typography.Title>
        </Space>

      {/* Right: Buttons */}
      <Col>
        <Space>
          {/* ✅ Search Box (Only If Enabled) */}
          {showSearch && tableRef && (
            <Input
              placeholder="Search..."
              allowClear
              size="small"
              prefix={<SearchOutlined style={{ color: "#595959" }} />}
              onChange={(e) => onSearch && onSearch(e.target.value)}
              style={{ width: 180 }}
            />
          )}

          {/* ✅ Export to Excel Button (Only If Enabled) */}
          {showExport && tableRef && (
            <Button
              type="default" style={{ fontSize: "12px", padding: "4px 8px" }}             
              icon={<FileExcelOutlined style={{ color: "#28a745" }}/>}
              size="small"
              onClick={() => {
                if (Array.isArray(tableRef)) {
                  exportToExcel(tableRef, `${title}.xlsx`);
                } else {
                  console.error("Export Error: tableRef is not an array", tableRef);
                }
              }}
            >Excel</Button>
          )}
          {showFilter && (
              <Button 
                type="default" 
                icon={<FilterOutlined style={{ color: "#faad14" }}/>}
                style={{ fontSize: "12px", padding: "4px 8px" }}
                size="small"
                onClick={onFilterClick}>
                Filter
              </Button>
            )}
          {showNew && <Button type="default" size="small" style={{ fontSize: "12px", padding: "4px 8px" }} 
           icon={<PlusOutlined style={{ color: "#1890ff" }} />} onClick={onNewClick}>New</Button>}
          {showSave && <Button type="default" size="small" style={{ fontSize: "12px", padding: "4px 8px" }} 
          icon={<SaveOutlined style={{ color: "#52c41a" }}/>} onClick={onSaveClick}>Save</Button>}
          {showList && <Button type="default" size="small" style={{ fontSize: "12px", padding: "4px 8px" }} 
          icon={<UnorderedListOutlined style={{ color: "#13c2c2" }}/>} onClick={onListClick}>List</Button>}
          {showEdit && <Button type="default" size="small" style={{ fontSize: "12px", padding: "4px 8px" }} 
          icon={<EditOutlined style={{ color: "#faad14" }} />} onClick={onEditClick}>Edit</Button>}
        </Space>
      </Col>
    </Row>
  );
};

export default Toolbar;
