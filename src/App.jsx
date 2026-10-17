import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Agentation } from 'agentation';

gsap.registerPlugin(ScrollTrigger);

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatModal from './components/ChatModal';
import FramerBadge from './components/FramerBadge';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ServicesPage from './pages/ServicesPage';
import ReviewsPage from './pages/ReviewsPage';
import FaqPage from './pages/FaqPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = () => setIsChatOpen(true);
  const handleCloseChat = () => setIsChatOpen(false);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      smoothWheel: true,
      infinite: false,
    });

    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-root">
        <Navbar onOpenChat={handleOpenChat} />
        <main className="main-content-flow">
          <Routes>
            <Route path="/" element={<HomePage onOpenChat={handleOpenChat} />} />
            <Route path="/about" element={<AboutPage onOpenChat={handleOpenChat} />} />
            <Route path="/projects" element={<ProjectsPage onOpenChat={handleOpenChat} />} />
            <Route path="/portfolio" element={<ProjectsPage onOpenChat={handleOpenChat} />} />
            <Route path="/services" element={<ServicesPage onOpenChat={handleOpenChat} />} />
            <Route path="/service" element={<ServicesPage onOpenChat={handleOpenChat} />} />
            <Route path="/reviews" element={<ReviewsPage onOpenChat={handleOpenChat} />} />
            <Route path="/faq" element={<FaqPage onOpenChat={handleOpenChat} />} />
            <Route path="*" element={<HomePage onOpenChat={handleOpenChat} />} />
          </Routes>
        </main>
        <Footer />
        <FramerBadge />
        <ChatModal isOpen={isChatOpen} onClose={handleCloseChat} />
        <Agentation />
      </div>
    </BrowserRouter>
  );
}