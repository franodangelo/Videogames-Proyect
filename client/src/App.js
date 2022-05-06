import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './views/Home';
import VgDetail from './views/VgDetail';
import Landing from './views/Landing';
import Form from './views/Form';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Landing/>}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route path='/videogame' element={<Form/>}/>
          <Route path='/videogame/:id' element={<VgDetail/>}/>
          <Route path='/*' element={<h1>Oops! There are no videogames here :(</h1>}/>       
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
