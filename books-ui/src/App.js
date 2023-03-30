import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Authors from './components/Authors';
import EditAuthor from './components/Authors/EditAuthor';
import Books from './components/Books';
import NotFound from './components/NotFound';
import Layout from './components/Layout';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />} >
          <Route path='/' element={<Home />} />
          <Route path='/authors' element={<Authors />} />
          <Route path='/authors/:id' element={<EditAuthor />} />
          <Route path='/books' element={<Books />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;