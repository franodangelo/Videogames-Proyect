import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './views/Home';
import VgDetail from './views/VgDetail';
import Landing from './views/Landing/Landing.jsx';
import Form from './views/Form';
import InvalidPath from './views/InvalidPath';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route exact path='/' element={<Landing/>}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route path='/videogame' element={<Form/>}/>
          <Route path='/videogame/:id' element={<VgDetail/>}/>
          <Route path='/*' element={<InvalidPath/>}/>       
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
