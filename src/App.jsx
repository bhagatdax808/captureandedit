import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { Agentation } from 'agentation';

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
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.__lenis = lenis;
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
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