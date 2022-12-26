import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./views/Loader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const Home = lazy(() => import("./views/Home"));
const VgDetail = lazy(() => import("./views/VgDetail"));
const Form = lazy(() => import("./views/Form"));
const InvalidPath = lazy(() => import("./views/InvalidPath"));

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/videogame" element={<Form />} />
            <Route path="/videogame/:id" element={<VgDetail />} />
            <Route path="/*" element={<InvalidPath />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  )
}