import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import BunnyList from './pages/BunnyList';
import Chicks from './pages/Chicks';
import Goats from './pages/Goats';
import ContactSection from './pages/ContactSection';
import Gallery from './pages/Gallery';
import Footer from './components/Footer';
import BunnyCare from './pages/BunnyCare';
import Temp from './components/Temp';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/holland_lop" element={<BunnyList />} />
        <Route path="/chicks-eggs" element={<Chicks />} />
        <Route path="/goats" element={<Goats />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/bunny-care" element={<BunnyCare />} />
        <Route path="/temp" element={<Temp />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
