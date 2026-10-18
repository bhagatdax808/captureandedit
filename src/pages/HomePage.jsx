import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Milestone from '../components/Milestone';
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
      <Milestone onOpenChat={onOpenChat} />
      <WhyChooseMe />
      <Services onOpenChat={onOpenChat} />
      <RibbonShowcase />
      <Testimonial />
      <Faq />
      <Contact />
    </div>
  );
}