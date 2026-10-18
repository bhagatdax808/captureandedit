import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatModal from './components/ChatModal';
import FramerBadge from './components/FramerBadge';
import InitialLoader from './components/InitialLoader';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ServicesPage from './pages/ServicesPage';
import NotFoundPage from './pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

function AppContent() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const location = useLocation();

  const handleOpenChat = () => setIsChatOpen(true);
  const handleCloseChat = () => setIsChatOpen(false);

  const isProjectDetail = location.pathname.startsWith('/project/') || location.pathname.startsWith('/projects/');
  const knownRoutes = ['/', '/about', '/projects', '/portfolio', '/services', '/service'];
  const is404 = !isProjectDetail && !knownRoutes.includes(location.pathname);

  return (
    <div className={`app-root ${is404 ? 'is-not-found-page' : ''}`}>
      {showLoader && <InitialLoader onComplete={() => setShowLoader(false)} />}
      <Navbar onOpenChat={handleOpenChat} />
      <main className="main-content-flow">
        <Routes>
          <Route path="/" element={<HomePage onOpenChat={handleOpenChat} />} />
          <Route path="/about" element={<AboutPage onOpenChat={handleOpenChat} />} />
          <Route path="/projects" element={<ProjectsPage onOpenChat={handleOpenChat} />} />
          <Route path="/project/:id" element={<ProjectDetailPage onOpenChat={handleOpenChat} />} />
          <Route path="/projects/:id" element={<ProjectDetailPage onOpenChat={handleOpenChat} />} />
          <Route path="/portfolio" element={<ProjectsPage onOpenChat={handleOpenChat} />} />
          <Route path="/services" element={<ServicesPage onOpenChat={handleOpenChat} />} />
          <Route path="/service" element={<ServicesPage onOpenChat={handleOpenChat} />} />
          <Route path="*" element={<NotFoundPage onOpenChat={handleOpenChat} />} />
        </Routes>
      </main>
      {!is404 && <Footer onOpenChat={handleOpenChat} />}
      {!is404 && <FramerBadge />}
      <ChatModal isOpen={isChatOpen} onClose={handleCloseChat} />
    </div>
  );
}

export default function App() {
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
      <AppContent />
    </BrowserRouter>
  );
}