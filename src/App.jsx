import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout";
import AboutUs from "./pages/About/AboutUs";
import Services from "./pages/Services/Services";
import News from "./pages/News/News";
import Doctors from "./pages/Doctors/Doctors";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import AuthLayout from "./pages/Auth/Layout";
import AddNews from "./pages/AddNews/AddNews";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Doctors" element={<Doctors />} />
        <Route path="/News" element={<News />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Addnews" element={<AddNews />} />
      </Route>
      <Route element={user ? <Navigate to="/" replace /> : <Layout auth />}>
        <Route element={<AuthLayout />}>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
        </Route>
      </Route>
    </Routes>
  );
}
