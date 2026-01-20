import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./cafe/Login";
import Sidebar from "./cafe/Sidebar";
import Dashboard from "./cafe/DashboardTable";
import ManageMenu from "./cafe/ManageMenu";
import ManageTable from "./cafe/ManageTable";
import Billing from "./cafe/Billing";
import Orders from "./cafe/Orders";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/dashboard" element={<Sidebar />}>
        <Route index element={<Dashboard />} />
        <Route path="menu" element={<ManageMenu />} />
        <Route path="tables" element={<ManageTable />} />
        <Route path="billing" element={<Billing />} />
        <Route path="order" element={<Orders />} />
      </Route>
    </Routes>
  );
}

export default App;

