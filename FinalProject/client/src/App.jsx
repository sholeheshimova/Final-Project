import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Catogories from "./pages/Catogoires";
import Accessories from "./pages/Accessories";
import Favorites from "./pages/Favorites";
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
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
        <Route path='/login' element={<Login />}/>
        <Route path='/admin' element={<Admin />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </>
  );
}

export default App;
