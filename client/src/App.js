import './App.css';
import { Route, Routes } from "react-router-dom";
import LandingPage from './components/LandingPage.jsx'
import Home from './components/Home.jsx';
import Details from './components/Details.jsx'
import Form from './components/Form.jsx'



function App() {
  return (
    <Routes>
      <Route exact path='/' element={<LandingPage />} />
      <Route path='/home' element={<Home />} />
      <Route path='/dogs/:id' element={<Details />} />
      <Route path='/dogs' element={<Form />} />
    </Routes>

  );
};

export default App;