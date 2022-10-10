import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './screens'
import { Header, PageNotFound } from './components';
import { useEffect } from 'react';
import { getflights } from './services/ApiServices';

function App() {

  useEffect(() => {
    const fetchData = async () => {
      getflights()
    }
    fetchData()
      .catch(console.error);
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
