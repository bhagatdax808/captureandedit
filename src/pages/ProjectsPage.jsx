import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeroStage from '../components/PageHeroStage';
import { projectsData } from '../data/projectsData';

export default function ProjectsPage({ onOpenChat }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 768 : false));
  const gridRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Items per page: 6 on desktop (2 rows of 3), 3 on mobile
  const itemsPerPage = isMobile ? 3 : 6;
  const totalPages = Math.ceil(projectsData.length / itemsPerPage);

  const displayedProjects = projectsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Smooth entrance stagger on page change
  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.can-project-card');
      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: 'power3.out',
          }
        );
      }
    }
  }, [currentPage]);

  return (
    <div className="page-wrapper projects-archive-page can-projects-page">
      {/* Hero Stage Frame */}
      <PageHeroStage
        titleMain="project®"
        titleTag="Selected Works"
        description="A curated monograph of architectural sanctuaries, spatial installations, and intimate cinema documented worldwide."
        bgImage="/photos/PtOmfIDqFPfLwMMucdVIw0jwKwk.webp"
      />

      {/* =========================================================
          SCREENSHOT 1: 3-COLUMN CARD GRID WITH TITLE & DATE
          ========================================================= */}
      <section className="can-projects-grid-section" ref={gridRef}>
        <div className="page-container">
          <div className="can-projects-grid">
            {displayedProjects.map((item) => (
              <Link
                key={item.id}
                to={`/projects/${item.id}`}
                className="can-project-card"
                aria-label={`View ${item.title}`}
              >
                <div className="can-card-img-wrapper">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="can-card-img"
                    loading="lazy"
                  />
                </div>

                <div className="can-card-meta-row">
                  <h3 className="can-card-title">{item.title}</h3>
                  <span className="can-card-date">{item.date}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="can-projects-pagination" aria-label="Projects Pagination">
              <button
                type="button"
                className="can-pag-btn can-pag-nav"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous Page"
              >
                <ChevronLeft size={16} />
                <span>Prev</span>
              </button>

              <div className="can-pag-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    className={`can-pag-num ${currentPage === pageNum ? 'is-active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                    aria-label={`Page ${pageNum}`}
                    aria-current={currentPage === pageNum ? 'page' : undefined}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="can-pag-btn can-pag-nav"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}