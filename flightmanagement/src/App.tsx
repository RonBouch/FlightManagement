import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './screens'
import { Header, PageNotFound } from './components';
import { useContext, useEffect } from 'react';
import { getFlights } from './services/ApiServices';
import { FlightsContext } from './stores/FlightsStore/FlightsContext';

function App() {
  const { flightsStore } = useContext(FlightsContext);

  useEffect(() => {
    const fetchData = async () => {
      const flights = await getFlights();
      flightsStore?.setFlights(flights)
    }
    fetchData()
      .catch(console.error);
  }, [flightsStore])

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
