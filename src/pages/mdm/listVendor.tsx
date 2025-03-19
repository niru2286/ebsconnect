import React, { useState } from "react";
import TableComponent from "../../services/tableComponent"
import Toolbar from "../shared/Toolbar";
import useTableData from "../../services/tableServices";

const ListVendors = () => {
    const apiUrl = "https://jsonplaceholder.typicode.com/users"; // Example API
    const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
    const [searchText, setSearchText] = useState("");
    const { data } = useTableData({ apiUrl });
    const columns = [
      { title: "ID", dataIndex: "id", sorter: (a, b) => a.id - b.id },
      { title: "Name", dataIndex: "name", sorter: (a, b) => a.name.localeCompare(b.name) },
      { title: "Email", dataIndex: "email", sorter: (a, b) => a.email.localeCompare(b.email) },
      { title: "Company", dataIndex: ["company", "name"] }, // Nested data access
    ];
  
    // Callback function to get selected rows
    const handleRowSelect = (selectedRows: any[]) => {
      console.log("Selected Users:", selectedRows);
      setSelectedUsers(selectedRows);
    };
  
    return (
      <div>
        <Toolbar title="Vendor List"
         tableRef={data} // ✅ Pass Table Ref
         onSearch={setSearchText}
         showSearch={true}
         showExport={true}
         showFilter={true}                  
         showNew={true} showEdit={true} showList={true} showSave={true} />

        <TableComponent apiUrl={apiUrl}  searchText={searchText} 
        columns={columns} 
        onRowSelect={handleRowSelect} />
  
        {/* Display Selected Rows */}
        {selectedUsers.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <h3>Selected Users:</h3>
            <ul>
              {selectedUsers.map((user) => (
                <li key={user.id}>
                  {user.name} ({user.email})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  export default ListVendors;