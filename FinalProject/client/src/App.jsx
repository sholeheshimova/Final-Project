import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Catogories from "./pages/Catogoires";
import Premium from "./pages/Premium";
import Favorites from "./pages/Favorites";
import Trailers from "./pages/Trailers";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/marvels/:id" element={<Details />} />
          <Route path="/categories" element={<Catogories />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/marvels/trailers/:id" element={<Trailers />} />
        </Route>
        <Route path='/login' element={<Login />}/>
        <Route path='/admin' element={<Admin />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </>
  );
}

export default App;
