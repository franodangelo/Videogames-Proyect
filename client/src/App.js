import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import VgDetail from "./views/VgDetail";
import Form from "./views/Form";
import InvalidPath from "./views/InvalidPath";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route exact path='/home' element={<Home />} />
          <Route path='/videogame' element={<Form />} />
          <Route path='/videogame/:id' element={<VgDetail />} />
          <Route path='/*' element={<InvalidPath />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};