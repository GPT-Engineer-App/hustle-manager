import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Home from './components/Home';
import Transactions from './components/Transactions';
import About from './components/About';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <header className="bg-blue-500 text-white p-4">
          <nav className="container mx-auto flex justify-between">
            <div className="text-xl font-bold">Sneaker Accounting App</div>
            <div>
              <Link to="/" className="mr-4">Home</Link>
              <Link to="/transactions" className="mr-4">Transactions</Link>
              <Link to="/about">About</Link>
            </div>
          </nav>
        </header>
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between">
            <div>&copy; 2023 Sneaker Accounting App</div>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;