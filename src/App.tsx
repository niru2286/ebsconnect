import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ Correct import
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/mdm/home";
import Users from "./pages/mdm/Users";
import "antd/dist/reset.css";
import { AuthProvider } from "./auth/AuthProvider";
import Login from "./pages/accounts/login";
import ProtectedRoute from "./auth/ProtectedRoute";
import CreateVendor from "./pages/mdm/createVendor";

console.log("App.tsx is rendering...");

const App: React.FC = () => {
  return (
    <AuthProvider> 
      <BrowserRouter> 
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/reset" element={<Reset />} />
          {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/" element={<AdminLayout />}>
              <Route index element={<Home />} />
              <Route path="vendors/new" element={<CreateVendor />} />
              <Route path="users/list" element={<Users />} />
              <Route path="vendors/list" element={<ListVendors />} />            
            </Route>
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
