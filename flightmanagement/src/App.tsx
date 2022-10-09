import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './screens'
import { Header, LinkRedirect } from './components';
import { useEffect } from 'react';
import { getflights } from './services/ApiServices';

function App() {
  const pathname = window.location.pathname;

  useEffect(() => {
    // if (pathname == '/') {
    //   window.location.pathname = '/';
    // }
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
          {/* <Route path="/:some" element={<LinkRedirect />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
