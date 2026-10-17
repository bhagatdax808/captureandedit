import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Hero from '../components/Hero';
import About from '../components/About';
import Milestone from '../components/Milestone';
import Portfolio from '../components/Portfolio';
import WhyChooseMe from '../components/WhyChooseMe';
import Testimonial from '../components/Testimonial';
import Services from '../components/Services';
import RibbonShowcase from '../components/RibbonShowcase';
import Faq from '../components/Faq';
import Contact from '../components/Contact';

export default function HomePage({ onOpenChat }) {
  return (
    <div className="home-page-container">
      <Hero onOpenChat={onOpenChat} />
      <About onOpenChat={onOpenChat} />
      <div className="section-cta-divider">
        <Link to="/about" className="section-explore-link">
          <span>Discover full story & studio philosophy</span>
          <ArrowUpRight size={18} />
        </Link>
      </div>

      <Milestone onOpenChat={onOpenChat} />

      <Portfolio />
      <div className="section-cta-divider">
        <Link to="/projects" className="section-explore-link">
          <span>Explore all 24+ archived projects & metadata</span>
          <ArrowUpRight size={18} />
        </Link>
      </div>

      <WhyChooseMe />

      <Services onOpenChat={onOpenChat} />
      <div className="section-cta-divider">
        <Link to="/services" className="section-explore-link">
          <span>View custom packages & interactive price estimator</span>
          <ArrowUpRight size={18} />
        </Link>
      </div>

      <RibbonShowcase />

      <Testimonial />
      <div className="section-cta-divider">
        <Link to="/reviews" className="section-explore-link">
          <span>Read all verified client stories & feedback</span>
          <ArrowUpRight size={18} />
        </Link>
      </div>

      <Faq />
      <div className="section-cta-divider">
        <Link to="/faq" className="section-explore-link">
          <span>Search comprehensive knowledge base & shoot guide</span>
          <ArrowUpRight size={18} />
        </Link>
      </div>

      <Contact />
    </div>
  );
}