import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Components
import Navbar from './components/Navbar/Navbar';

//Pages
import Home from './pages/Home/Home';
import Books from './pages/Books/Books';
import AddBook from './pages/Books/AddBook';
import EditBook from './pages/Books/EditBook';
import BookDetails from './pages/Books/BookDetails';

//CSS
import './App.css';

function App() {
  return (
    <div className='app-bg'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/books' element={<Books />} />
          <Route path='/books/:id' element={<BookDetails />} />
          <Route path='/addBook' element={<AddBook />} />
          <Route path='/books/editBook/:id' element={<EditBook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
