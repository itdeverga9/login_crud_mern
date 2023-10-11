import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Layout from "./pages/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="" element={<Layout />}>
          <Route index element={<Dashboard />} />
          {/* <Route path="/user" element={<User />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
