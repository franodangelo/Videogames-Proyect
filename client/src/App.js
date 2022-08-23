import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import VgDetail from './views/VgDetail';
import Form from './views/Form';
import InvalidPath from './views/InvalidPath';
import Landing from './views/Landing';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={Landing} />
          <Route exact path='/home' element={<Home />} />
          <Route path='/videogame' element={<Form />} />
          <Route path='/videogame/:id' element={<VgDetail />} />
          <Route path='/*' element={<InvalidPath />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};