import React, { useState } from "react";
import { Table, Input, Button } from "antd";
import { exportToExcel } from "../services/excelExport"
import useTableData from "../services/tableServices"
import "./TableComponent.css"; // Import custom styles


interface TableProps {
  apiUrl: string;
  columns: any[];
  title: string;
  searchText?: string; // ✅ Receive search input
}

/**
 * Reusable Table Component with Search Integration
 */
const TableComponent: React.FC<TableProps> = ({ apiUrl, columns, title, searchText, onExport }) => {
  const { data, loading } = useTableData({ apiUrl });

  const filteredData = data?.filter((item) =>
    Object.values(item).some(
      (field) =>
        field && field.toString().toLowerCase().includes(searchText?.toLowerCase() || "")
    )
  ) || [];

  return (
    <Table
      columns={columns}
      dataSource={filteredData} // ✅ Show filtered data
      loading={loading}
      rowKey={(record) => record.id}
      pagination={{ pageSize: 10 }}
      bordered
      size="small"
      className="custom-table"
    />
  );
};

export default TableComponent;