import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, X, Maximize2 } from 'lucide-react';
import { projectsData, getProjectById } from '../data/projectsData';

export default function ProjectDetailPage({ onOpenChat }) {
  const { id } = useParams();
  const project = getProjectById(id);
  const [activePhoto, setActivePhoto] = useState(null);

  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [id]);

  if (!project) {
    return (
      <div className="project-detail-not-found">
        <h2>Project not found</h2>
        <Link to="/projects" className="btn-back">
          Back to Projects
        </Link>
      </div>
    );
  }

  // Next and Previous projects navigation
  const currentIndex = projectsData.findIndex((p) => p.id === project.id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];
  const prevProject = projectsData[(currentIndex - 1 + projectsData.length) % projectsData.length];

  return (
    <div className="project-detail-page can-project-detail">
      {/* =========================================================
          SCREENSHOT 2: IMMERSIVE FULL-WIDTH HERO STAGE
          ========================================================= */}
      <section className="can-detail-hero" aria-label="Project Hero">
        <div className="can-detail-hero-media">
          <img
            src={project.image}
            alt={project.title}
            className="can-detail-hero-img"
          />
          <div className="can-detail-hero-overlay" />
        </div>

        <div className="can-detail-hero-content">
          <h1 className="can-detail-hero-title">{project.title}</h1>
          {project.tagline && (
            <p className="can-detail-hero-subtitle">{project.tagline}</p>
          )}
        </div>
      </section>

      {/* =========================================================
          SCREENSHOT 3: PROJECT INFO SECTION (SPECS + NARRATIVE + FEATURED PHOTO)
          ========================================================= */}
      <section className="can-project-info-section">
        <div className="page-container">
          <div className="can-project-info-grid">
            {/* Left Column: Heading */}
            <div className="can-pi-header-col">
              <h2 className="can-pi-main-heading">Project info</h2>
            </div>

            {/* Middle Column: 2x2 Specs & Descriptive Narrative */}
            <div className="can-pi-details-col">
              {/* 2-Column x 2-Row Specifications */}
              <div className="can-pi-specs-grid">
                <div className="can-pi-spec-item">
                  <span className="can-pi-spec-label">Date</span>
                  <span className="can-pi-spec-value">{project.date}</span>
                </div>

                <div className="can-pi-spec-item">
                  <span className="can-pi-spec-label">Category</span>
                  <span className="can-pi-spec-value">{project.category}</span>
                </div>

                <div className="can-pi-spec-item">
                  <span className="can-pi-spec-label">Space Plan</span>
                  <span className="can-pi-spec-value">{project.spacePlan}</span>
                </div>

                <div className="can-pi-spec-item">
                  <span className="can-pi-spec-label">Timeline</span>
                  <span className="can-pi-spec-value">{project.timeline}</span>
                </div>
              </div>

              {/* Rich Project Narrative */}
              <p className="can-pi-narrative-text">{project.desc}</p>
            </div>

            {/* Right Column: Featured Image with Rounded Corners */}
            <div className="can-pi-photo-col">
              <div
                className="can-pi-photo-frame"
                onClick={() =>
                  setActivePhoto({
                    url: project.secondaryImage || project.image,
                    caption: `${project.title} — Featured Frame`
                  })
                }
              >
                <img
                  src={project.secondaryImage || project.image}
                  alt={project.title}
                  className="can-pi-photo-img"
                  loading="lazy"
                />
                <div className="can-photo-zoom-scrim">
                  <Maximize2 size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SCREENSHOT 3: 2-COLUMN PHOTO GALLERY GRID
          ========================================================= */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="can-gallery-duo-section">
          <div className="page-container">
            <div className="can-gallery-duo-grid">
              {project.gallery.map((item, index) => (
                <div
                  key={index}
                  className="can-duo-card"
                  onClick={() => setActivePhoto(item)}
                >
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="can-duo-img"
                    loading="lazy"
                  />
                  <div className="can-duo-overlay-scrim">
                    <span className="can-duo-hover-label">
                      <Maximize2 size={16} /> View Frame
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation to Next / Previous Projects */}
      <section className="can-project-nav-section">
        <div className="page-container">
          <div className="can-project-nav-grid">
            <Link to={`/projects/${prevProject.id}`} className="can-pnav-card prev">
              <span className="can-pnav-dir">
                <ArrowLeft size={16} /> Previous Project
              </span>
              <h4 className="can-pnav-title">{prevProject.title}</h4>
              <span className="can-pnav-meta">{prevProject.date} &bull; {prevProject.category}</span>
            </Link>

            <Link to={`/projects/${nextProject.id}`} className="can-pnav-card next">
              <span className="can-pnav-dir">
                Next Project <ArrowRight size={16} />
              </span>
              <h4 className="can-pnav-title">{nextProject.title}</h4>
              <span className="can-pnav-meta">{nextProject.date} &bull; {nextProject.category}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Fullscreen Photo Lightbox Modal */}
      {activePhoto && (
        <div
          className="lightbox-overlay-backdrop"
          onClick={() => setActivePhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="lightbox-overlay-close-btn"
            onClick={() => setActivePhoto(null)}
            aria-label="Close photo view"
          >
            <X size={26} />
          </button>

          <div
            className="lightbox-overlay-container"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activePhoto.url}
              alt={activePhoto.caption}
              className="lightbox-full-img"
            />
            {activePhoto.caption && (
              <div className="lightbox-caption-box">
                <p className="lightbox-caption-text">{activePhoto.caption}</p>
                <span className="lightbox-project-badge">{project.title} &bull; {project.date}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
