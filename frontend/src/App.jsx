import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddProblem from "./pages/AddProblem";
import EditProblem from "./pages/EditProblem";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-problem" element={<AddProblem />} />
        <Route path="/edit-problem/:id" element={<EditProblem />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;