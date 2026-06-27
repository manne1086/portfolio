/**
 * Dynamic Scroll Animations & Transitions
 * Brings the portfolio to life as users scroll
 */

// ============================================
// INTERSECTION OBSERVER FOR SCROLL REVEALS
// ============================================

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: stop observing after reveal
      // revealObserver.unobserve(entry.target);
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

// Observe all reveal elements
document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
  revealObserver.observe(el);
});

// ============================================
// PARALLAX EFFECT ON SCROLL
// ============================================

const parallaxElements = document.querySelectorAll('[data-parallax]');

if (parallaxElements.length > 0) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
      const yOffset = scrollY * speed;
      el.style.transform = `translateY(${yOffset}px)`;
    });
  }, false);
}

// ============================================
// FLOATING ICONS ANIMATION TRIGGER
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const floatingIcons = document.querySelectorAll('.deco-float-icon');
  const heroSection = document.getElementById('hero');

  const iconObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        floatingIcons.forEach((icon, index) => {
          setTimeout(() => {
            icon.classList.add('visible');
          }, index * 200);
        });
      }
    });
  }, { threshold: 0.3 });

  if (heroSection) {
    iconObserver.observe(heroSection);
  }
});

// ============================================
// HERO SECTION ENTRANCE ANIMATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const heroLeft = document.querySelector('.hero-left');
  const heroRight = document.querySelector('.hero-right');

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (heroLeft) heroLeft.classList.add('entered');
        if (heroRight) heroRight.classList.add('entered');
      }
    });
  }, { threshold: 0.3 });

  const hero = document.getElementById('hero');
  if (hero) heroObserver.observe(hero);
});

// ============================================
// SECTION TITLE SLIDE-IN ANIMATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const sectionTitles = document.querySelectorAll('.section-title');

  sectionTitles.forEach(title => {
    // Wrap text in span if not already wrapped
    if (!title.querySelector('.section-title-inner')) {
      const text = title.textContent;
      title.innerHTML = `<span class="section-title-inner">${text}</span>`;
    }

    const titleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('entered');
        }
      });
    }, { threshold: 0.3 });

    titleObserver.observe(title);
  });
});

// ============================================
// SKILL CARDS HOVER LIFT & STAGGER ON SCROLL
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const skillCards = document.querySelectorAll('.skill-card');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 50);
      }
    });
  }, { threshold: 0.2 });

  skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    skillObserver.observe(card);
  });
});

// ============================================
// PROJECT CARDS TILT & SHADOW ON SCROLL
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) * 0.1;
      const rotateY = (centerX - x) * 0.1;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });

  // Stagger on scroll reveal
  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 60);
      }
    });
  }, { threshold: 0.2 });

  projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    projectObserver.observe(card);
  });
});

// ============================================
// HACKATHON CARDS SLIDE-IN ANIMATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const hackathonCards = document.querySelectorAll('.hackathon-card');

  const hackObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, index * 80);
      }
    });
  }, { threshold: 0.2 });

  hackathonCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-40px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    hackObserver.observe(card);
  });
});

// ============================================
// TIMELINE ITEMS STAGGERED REVEAL
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const timelineItems = document.querySelectorAll('.timeline-item');

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, index * 70);
      }
    });
  }, { threshold: 0.2 });

  timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    timelineObserver.observe(item);
  });
});

// ============================================
// ACHIEVEMENT CARDS BOUNCE & SCALE REVEAL
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const achievementCards = document.querySelectorAll('.achievement-card');

  const achieveObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'scale(1)';
        }, index * 50);
      }
    });
  }, { threshold: 0.2 });

  achievementCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.85)';
    card.style.transition = 'opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
    achieveObserver.observe(card);
  });
});

// ============================================
// SCROLL-BASED NAVBAR EFFECTS
// ============================================

let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const nav = document.querySelector('nav');
  
  if (nav) {
    if (scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  lastScrollY = scrollY;
});

// ============================================
// HIGHLIGHT MARKER ANIMATION ON SCROLL
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const highlightMarkers = document.querySelectorAll('.highlight-marker');

  const markerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('lit');
      } else {
        entry.target.classList.remove('lit');
      }
    });
  }, { threshold: 0.5 });

  highlightMarkers.forEach(marker => {
    markerObserver.observe(marker);
  });
});

// ============================================
// SMOOTH SCROLL BEHAVIOR FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================
// CONTACT LINKS SCALE ON HOVER
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const contactLinks = document.querySelectorAll('.contact-link');

  contactLinks.forEach(link => {
    link.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease';
    
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'scale(1.05)';
    });

    link.addEventListener('mouseleave', () => {
      link.style.transform = 'scale(1)';
    });
  });
});

// ============================================
// ABOUT CARD ROTATION ON SCROLL
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const aboutCards = document.querySelectorAll('.about-card');

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'rotateY(0deg) rotateX(0deg)';
        }, index * 100);
      }
    });
  }, { threshold: 0.2 });

  aboutCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'rotateY(-10deg) rotateX(5deg)';
    card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    card.style.transformStyle = 'preserve-3d';
    card.style.perspective = '1000px';
    cardObserver.observe(card);
  });
});

// ============================================
// STAT BOXES COUNTER ANIMATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const statBoxes = document.querySelectorAll('.stat-box .number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        const text = entry.target.textContent.trim();
        const number = parseInt(text) || text;
        
        if (typeof number === 'number') {
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target, 0, number, 800);
        }
      }
    });
  }, { threshold: 0.5 });

  statBoxes.forEach(box => {
    counterObserver.observe(box);
  });

  function animateCounter(element, start, end, duration) {
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const current = Math.floor(start + (end - start) * progress);
      element.textContent = current + '+';

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }
});

// ============================================
// PAGE LOADER AUTO-HIDE
// ============================================

window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hide');
    }, 1200);
  }
});

// ============================================
// SCROLL-BASED OPACITY GRADIENT
// ============================================

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const distance = sectionTop - scrollY;

    // Fade in elements as they approach the viewport center
    if (distance > -sectionHeight && distance < window.innerHeight) {
      const opacity = 1 - Math.abs(distance) / (window.innerHeight + sectionHeight);
      section.style.opacity = Math.min(opacity + 0.3, 1);
    }
  });
});

// ============================================
// CURSOR TRAIL ANIMATION
// ============================================

const cursorTrail = document.getElementById('cursor-trail');
let mouseX = 0;
let mouseY = 0;
let trailX = 0;
let trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function updateTrail() {
  trailX += (mouseX - trailX) * 0.15;
  trailY += (mouseY - trailY) * 0.15;

  if (cursorTrail) {
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top = trailY + 'px';
    cursorTrail.style.opacity = '0.7';
  }

  requestAnimationFrame(updateTrail);
}

updateTrail();

// ============================================
// BACK-TO-TOP BUTTON SCROLL REVEAL
// ============================================

const backTopBtn = document.getElementById('back-top');
if (backTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backTopBtn.style.opacity = '1';
      backTopBtn.style.pointerEvents = 'auto';
    } else {
      backTopBtn.style.opacity = '0';
      backTopBtn.style.pointerEvents = 'none';
    }
  });

  backTopBtn.style.transition = 'opacity 0.3s ease';
  backTopBtn.style.opacity = '0';
}

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING ON SCROLL
// ============================================

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// ============================================
// SVG LINE DRAW ANIMATION ON SCROLL
// ============================================

function drawSVGPath(svgElement) {
  const path = svgElement.querySelector('path');
  if (!path) return;

  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
  path.style.transition = 'stroke-dashoffset 1s ease';

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        path.style.strokeDashoffset = '0';
      }
    });
  }, { threshold: 0.3 });

  observer.observe(svgElement);
}

document.querySelectorAll('.tear-divider svg').forEach(svg => {
  drawSVGPath(svg);
});

// ============================================
// MOUSE POSITION BASED LIGHT SOURCE
// ============================================

document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.skill-card, .project-card, .achievement-card, .about-card');

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const distance = Math.sqrt(Math.pow(x - rect.width / 2, 2) + Math.pow(y - rect.height / 2, 2));
    const maxDistance = Math.sqrt(Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2));

    if (distance < maxDistance) {
      const intensity = 1 - distance / maxDistance;
      card.style.boxShadow = `
        var(--shadow),
        0 0 ${intensity * 20}px ${intensity * 10}px rgba(244, 196, 48, ${intensity * 0.3})
      `;
    } else {
      card.style.boxShadow = 'var(--shadow)';
    }
  });
});

console.log('✨ Dynamic scroll animations loaded! The portfolio now responds to your scroll.');
