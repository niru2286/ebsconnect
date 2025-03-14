import React from "react";
import { message, Table, Typography } from "antd";
import Toolbar from "../shared/Toolbar";

const { Text, Link } = Typography;

interface User {
  key: string;
  name: string;
  email: string;
  role: string;
}

const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Email", dataIndex: "email", key: "email", render: (text: string) => <Link href={`mailto:${text}`}>{text}</Link> },
  { title: "Role", dataIndex: "role", key: "role", render: (text: string) => <Text type="secondary">{text}</Text> },
];

const dataSource: User[] = [
  { key: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
  { key: "2", name: "Jane Smith", email: "jane@example.com", role: "User" },
];

const Users: React.FC = () => {

  const handleNew = () => message.success("New Clicked");
  const handleSave = () => message.success("Save Clicked");
  const handleList = () => message.success("List Clicked");
  const handleEdit = () => message.success("Edit Clicked");


  return <>
      <Toolbar title="Users List"
        showNew={true}
        showSave={true}
        showList={true}
        showEdit={true}
        onNewClick={handleNew}
        onSaveClick={handleSave}
        onListClick={handleList}
        onEditClick={handleEdit}
      />
      <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 5 }} />;
  </> 
};

export default Users;
