// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { HomePage } from './screens'
import { Header, LinkRedirect } from './components';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useEffect } from 'react';
import { getflights } from './services/ApiServices';

function App() {
  const pathname = window.location.pathname;

  useEffect(() => {
    if (pathname == '/') {
      // window.location.pathname = '/admin';
    }
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
        {/* <ToastContainer position='top-center' /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:some" element={<LinkRedirect />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
