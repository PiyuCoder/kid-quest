import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import KidsDashboard from "./pages/KidsDashboard";
import ParentsDashboard from "./pages/ParentsDashboard";
import Animals from "./pages/Animals.js";
import Games from "./pages/Games.js";
import Alphabet from "./pages/Alphabet.js";
import Numbers from "./pages/Numbers.js";
import Slate from "./pages/Slate.js";
import Admin from "./pages/Admin.js";
import ColorLayout from "./components/ColorLayout.js";
import LevelOne from "./pages/Color/LevelOne.js";
import Home from "./pages/Color/Home.js";
import Login from "./pages/Login.js";
import LandingPage from "./pages/LandingPage.js";
import Shapes from "./components/Games/Shapes.js";
import FlipTheCard from "./components/Games/FlipTheCard.js";
import AboutPage from "./pages/About.js";
import FinishModal from "./components/Finish.js";
import Register from "./pages/Register.js";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<LandingPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="dashboard" element={<HomePage />} />
      <Route path="kids" element={<KidsDashboard />} />
      <Route path="parents" element={<ParentsDashboard />} />
      <Route path="alphabet" element={<Alphabet />} />
      <Route path="number" element={<Numbers />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="color/" element={<ColorLayout />}>
        <Route path="" element={<Home />} />
        <Route path="lesson" element={<LevelOne />} />
      </Route>

      <Route path="animal" element={<Animals />} />
      <Route path="slate" element={<Slate />} />
      <Route path="games" element={<Games />} />
      <Route path="memory" element={<FlipTheCard />} />
      <Route path="shapes" element={<Shapes />} />
      <Route path="admin" element={<Admin />} />
      <Route path="finish" element={<FinishModal />} />
    </Route>
  )
);
