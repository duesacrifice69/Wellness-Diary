import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout";
import AboutUs from "./pages/About/AboutUs";
import Services from "./pages/Services/Services";
import Articles from "./pages/Articles/View/AllArticles/AllArticles";
import Article from "./pages/Articles/View/Article/Article";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import AuthLayout from "./pages/Auth/Layout";
import { useAuth } from "./context/AuthContext";
import ArticlesLayout from "./pages/Articles/View/Layout.jsx";
import BMI from "./pages/Tests/BMI/BMI.jsx";
import BloodPressure from "./pages/Tests/BloodPressure/BloodPressure.jsx";
import BloodSugar from "./pages/Tests/BloodSugar/BloodSugar.jsx";
import FBC from "./pages/Tests/FBC/FBC.jsx";
import TestsLayout from "./pages/Tests/Layout.jsx";
import Cholesterol from "./pages/Tests/Cholesterol/Cholesterol.jsx";
import AddArticle from "./pages/Articles/Add/AddArticle.jsx";
import EditArticle from "./pages/Articles/Edit/EditArticle.jsx";

export default function App() {
  const { user, isAdmin } = useAuth();

  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<Layout />}>
        <Route path="/*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Services" element={<Services />} />
      </Route>
      {/* Private Pages */}
      <Route element={user ? <Layout /> : <Navigate to="/Login" replace />}>
        <Route element={<ArticlesLayout />}>
          <Route path="/Articles" element={<Articles />} />
          <Route path="/Articles/:id" element={<Article />} />
        </Route>
        <Route element={<TestsLayout />}>
          <Route path="/Tests/BloodPressure" element={<BloodPressure />} />
          <Route path="/Tests/BMI" element={<BMI />} />
          <Route path="/Tests/Cholesterol" element={<Cholesterol />} />
          <Route path="/Tests/BloodSugar" element={<BloodSugar />} />
          <Route path="/Tests/FBC" element={<FBC />} />
        </Route>
      </Route>
      {/* Admin Pages */}
      <Route element={isAdmin ? <Layout /> : <Navigate to="/" replace />}>
        <Route path="/Articles/Add" element={<AddArticle />} />
        <Route path="/Articles/:id/Edit" element={<EditArticle />} />
      </Route>
      {/* Auth Pages */}
      <Route element={user ? <Navigate to="/" replace /> : <Layout auth />}>
        <Route element={<AuthLayout />}>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
        </Route>
      </Route>
    </Routes>
  );
}
