import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import TopSellers from "./components/home/TopSellers";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true,     // Animations occur only once when scrolling down
    });
  }, []);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author" element={<Author />} />
        <Route path="/item-details/:nftId" element={<ItemDetails />} />
        <Route path="/author/:authorId" element={<Author />} />
        <Route path="/nft/:id" element={<ItemDetails />} /> 
        <Route path="/nft-image" element={<ItemDetails />} /> 
        <Route path="/top-sellers/:top-SellersId" element={<TopSellers />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
