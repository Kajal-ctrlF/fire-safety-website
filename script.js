// FireShield - Single Page Application
'use strict';

// Product & category data loaded from assets/js/products-data.js

// Mega menu: Category → Sub Category → Products
const categoryCatalog = [
  {
    name: 'Fire Extinguishers',
    icon: '🧯',
    subs: [
      { name: 'Dry Powder', products: ['ABC 6kg', 'ABC Dry Powder', 'Water Type 9L'] },
      { name: 'CO₂ & Foam', products: ['CO₂ 4.5kg', 'AFFF Foam 9L', 'Water Type 9L'] }
    ]
  },
  {
    name: 'Fire Hydrant Systems',
    icon: '💧',
    subs: [
      { name: 'Hydrant Kits', products: ['Complete Kit', 'Landing Valve', 'Diesel Pump 1000 LPM'] },
      { name: 'Yard Hydrants', products: ['Stand Post 4-Way', 'Double Outlet Valve', 'RRL Hose Line'] }
    ]
  },
  {
    name: 'Fire Alarm Systems',
    icon: '🔔',
    subs: [
      { name: 'Control Panels', products: ['Addressable 8-Zone', 'Conventional 4-Zone'] },
      { name: 'Devices', products: ['Manual Call Point', 'Sounder with Strobe'] }
    ]
  },
  {
    name: 'Smoke Detectors',
    icon: '💨',
    subs: [
      { name: 'Detectors', products: ['Photoelectric', 'Ionization', 'Multi-Sensor'] },
      { name: 'Accessories', products: ['Detector Base with Isolator'] }
    ]
  },
  {
    name: 'Emergency Lights',
    icon: '💡',
    subs: [
      { name: 'Exit Lighting', products: ['LED Exit 3hr', 'Twin Spot', 'Bulkhead IP65'] },
      { name: 'Signage Lights', products: ['Running Man Combo', 'Exit Sign Unit'] }
    ]
  },
  {
    name: 'Safety Signages',
    icon: '⚠️',
    subs: [
      { name: 'Fire Signs', products: ['Signage Set 10pc', 'Photoluminescent Pack', 'Extinguisher Board'] },
      { name: 'Site Signs', products: ['Assembly Point Post', 'Custom Boards'] }
    ]
  },
  {
    name: 'PPE Equipment',
    icon: '🦺',
    subs: [
      { name: 'Head & Body', products: ['Firefighter Helmet', 'Proximity Suit', 'Safety Boots'] },
      { name: 'Breathing', products: ['SCBA Set 6.8L'] }
    ]
  },
  {
    name: 'Fire Fighting Accessories',
    icon: '🔧',
    subs: [
      { name: 'Hoses & Reels', products: ['Hose Reel 30m', 'RRL Hose 63mm', 'Fire Blanket'] },
      { name: 'Couplings', products: ['Storz Coupling Set', 'Branch Pipes'] }
    ]
  }
];

const trustedBrands = ['Honeywell', 'Bosch', 'Siemens', 'Tyco', 'Johnson Controls', 'Schneider', 'ISI', 'BIS'];

let scrollRevealObserver = null;
let aboutRevealObserver = null;

// ==================== SPA STATE ====================
let currentPage = 'home';
let currentCategory = null;
let currentProductId = null;
let currentPageNum = 1;
const productsPerPage = 12;
let filteredProducts = [...products];

// ==================== SPA NAVIGATION ====================
function closeNavDropdowns() {
  const categoriesNav = document.getElementById('categoriesNavItem');
  categoriesNav?.classList.remove('is-open');
  document.getElementById('categoriesNavBtn')?.setAttribute('aria-expanded', 'false');
}

function toggleCategoryDropdown(e) {
  e.preventDefault();
  e.stopPropagation();
  const item = document.getElementById('categoriesNavItem');
  if (!item) return;
  const willOpen = !item.classList.contains('is-open');
  closeNavDropdowns();
  if (willOpen) {
    item.classList.add('is-open');
    document.getElementById('categoriesNavBtn')?.setAttribute('aria-expanded', 'true');
  }
}

function goToCategory(categoryName, e) {
  navigateTo('category', categoryName, e);
}

function navigateTo(page, param = null, e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  currentPage = page;
  currentCategory = param;

  closeNavDropdowns();

  // Close mobile menu
  document.getElementById('mobileNav')?.classList.remove('open');
  document.getElementById('hamburger')?.classList.remove('open');

  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });

  const activeNav = {
    home: 'home',
    products: 'products',
    category: 'categories',
    about: 'about',
    contact: 'contact',
    'product-details': 'products'
  }[page];
  if (activeNav) {
    document.querySelector(`[data-nav="${activeNav}"]`)?.classList.add('active');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderPage();
}

function afterPageRender(callback) {
  const app = document.getElementById('app');
  if (!app) return;

  app.classList.remove('page-visible');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      app.classList.add('page-visible');
      initPageMedia();
      initScrollReveal();
      if (typeof callback === 'function') callback();
    });
  });
}

function renderPage() {
  const app = document.getElementById('app');
  if (!app) return;
  
  switch(currentPage) {
    case 'home':
      app.innerHTML = getHomePage();
      afterPageRender();
      break;
    case 'products':
      app.innerHTML = getProductsPage();
      afterPageRender(() => filterProducts());
      break;
    case 'category':
      if (!currentCategory) {
        currentPage = 'products';
        app.innerHTML = getProductsPage();
        afterPageRender(() => filterProducts());
        return;
      }
      app.innerHTML = getCategoryPage(currentCategory);
      afterPageRender(() => filterCategoryProducts());
      break;
    case 'about':
      app.innerHTML = getAboutPage();
      afterPageRender();
      break;
    case 'contact':
      app.innerHTML = getContactPage();
      afterPageRender();
      break;
    case 'product-details':
      app.innerHTML = getProductDetailsPage(currentProductId);
      afterPageRender();
      break;
    default:
      app.innerHTML = getHomePage();
      afterPageRender();
  }
}

function initHeroVideo() {
  const video = document.querySelector('.hero-video');
  if (!video) return;

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;

  const playPromise = video.play();
  if (playPromise?.catch) {
    playPromise.catch(() => {
      video.closest('.hero-media')?.classList.add('video-fallback');
    });
  }
}

function initPageMedia() {
  initHeroVideo();
  initBackgroundVideos();
}

// ==================== PAGE BANNER BACKGROUND (image only — video is home hero only) ====================
function getPageBannerMedia() {
  return `
      <div class="page-banner-media" aria-hidden="true">
        <img class="page-banner-bg" src="assets/images/page-banner-bg.png" alt="">
      </div>`;
}

function initBackgroundVideos() {
  document.querySelectorAll('.hero-video, .hero-media video[autoplay]').forEach(video => {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {
        video.closest('.page-banner-media, .hero-media')?.classList.add('video-fallback');
      });
    }
  });
}

// ==================== PAGE TEMPLATES ====================
function getHomePage() {
  return `
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-media" aria-hidden="true">
        <img class="hero-gif" src="assets/videos/fire-safety-bg.gif" alt="" onerror="this.hidden=true">
        <video class="hero-video" autoplay muted loop playsinline preload="auto" poster="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80">
          <source src="assets/videos/fire-safety-bg.mp4" type="video/mp4">
          <source src="assets/videos/fire-safety-bg.webm" type="video/webm">
        </video>
      </div>
      <div class="container">
        <div class="hero-content reveal-left">
          <div class="hero-eyebrow">
            <span>🏆</span>
            <span>Trusted by 1000+ Industrial Clients</span>
          </div>
          <h1 class="hero-title">
            Complete Fire Safety &<br>
            <span class="highlight">Protection Solutions</span>
          </h1>
          <p class="hero-desc">
            Trusted supplier of fire extinguishers, hydrant systems, fire alarms, smoke detectors, emergency equipment, and industrial fire protection products.
          </p>
          <div class="hero-btns">
            <a href="#about" class="btn btn-primary" onclick="navigateTo('about')">Read More</a>
            <a href="#contact" class="btn btn-outline" onclick="navigateTo('contact')">Contact Us</a>
          </div>
          <div class="hero-stats">
            <div>
              <span class="hero-stat-num" data-target="1000">0</span>
              <span class="hero-stat-label">Happy Customers</span>
            </div>
            <div>
              <span class="hero-stat-num" data-target="500">0</span>
              <span class="hero-stat-label">Products</span>
            </div>
            <div>
              <span class="hero-stat-num" data-target="10">0</span>
              <span class="hero-stat-label">Years Experience</span>
            </div>
            <div>
              <span class="hero-stat-num" data-target="24">0</span>
              <span class="hero-stat-label">24/7 Support</span>
            </div>
          </div>
        </div>
        <div class="hero-image reveal-right">
          <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80" alt="Fire Safety Equipment">
          <div class="hero-badge">
            <span class="hero-badge-icon">✅</span>
            <div class="hero-badge-text">
              <strong>100% Certified</strong>
              <span>All Products ISI Approved</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Category Showcase -->
    <section class="section-pad bg-light">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Browse By Category</span>
          <h2 class="section-title">Complete Fire Safety <span class="text-red">Solutions</span></h2>
          <p class="section-sub">Comprehensive range of fire safety equipment</p>
        </div>
        
        <div class="categories-grid">
          ${getCategoryCards()}
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="section-pad">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Featured Products</span>
          <h2 class="section-title">Best Selling <span class="text-red">Products</span></h2>
        </div>
        
        <div class="products-grid">
          ${products.filter(p => p.popular).slice(0, 8).map(p => createProductCard(p)).join('')}
        </div>

        <div class="text-center" style="margin-top: 3rem;">
          <a href="#products" class="btn btn-primary" onclick="navigateTo('products')">View All Products</a>
        </div>
      </div>
    </section>

    <!-- About Preview -->
    <section class="section-pad bg-light">
      <div class="container">
        <div class="about-split about-reveal-section">
          <div class="about-img-wrap">
            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80" alt="About FireGuard Pro">
            <div class="about-exp-badge">
              <strong>10+</strong>
              <span>Years<br>Experience</span>
            </div>
          </div>
          <div class="about-content-block">
            <span class="section-label">About Us</span>
            <h2 class="section-title">Protecting Lives &<br><span class="text-red">Assets Since 2014</span></h2>
            <p class="section-sub" style="margin-bottom: 2rem;">
              FireShield is a leading supplier of fire safety equipment and industrial protection solutions.
            </p>
            
            <div class="about-stats-row">
              <div class="about-stat-card">
                <span class="num">1000+</span>
                <span class="label">Happy Customers</span>
              </div>
              <div class="about-stat-card">
                <span class="num">500+</span>
                <span class="label">Products</span>
              </div>
            </div>

            <div class="values-list">
              <div class="value-item">
                <div class="value-dot"></div>
                <p class="value-text"><strong>Certified Products:</strong> All products meet ISI standards</p>
              </div>
              <div class="value-item">
                <div class="value-dot"></div>
                <p class="value-text"><strong>Expert Support:</strong> 24/7 technical assistance</p>
              </div>
              <div class="value-item">
                <div class="value-dot"></div>
                <p class="value-text"><strong>Fast Delivery:</strong> Quick dispatch nationwide</p>
              </div>
            </div>

            <a href="#about" class="btn btn-primary" style="margin-top: 2rem;" onclick="navigateTo('about')">Learn More</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Services / Why Choose Us -->
    <section class="section-pad">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Our Services</span>
          <h2 class="section-title">Your Trusted <span class="text-red">Safety Partner</span></h2>
          <p class="section-sub">End-to-end fire protection with certified equipment and expert support</p>
        </div>
        
        <div class="why-grid">
          <div class="why-card floating-card reveal" style="--stagger-i: 0">
            <div class="why-icon">✅</div>
            <h3 class="why-title">Certified Products</h3>
            <p class="why-desc">All products are ISI certified and meet international safety standards.</p>
          </div>
          <div class="why-card floating-card reveal" style="--stagger-i: 1">
            <div class="why-icon">🚚</div>
            <h3 class="why-title">Fast Delivery</h3>
            <p class="why-desc">Quick dispatch and delivery across India with installation services.</p>
          </div>
          <div class="why-card floating-card reveal" style="--stagger-i: 2">
            <div class="why-icon">👨‍🔧</div>
            <h3 class="why-title">Expert Engineers</h3>
            <p class="why-desc">Certified fire safety engineers for consultation and installation.</p>
          </div>
          <div class="why-card floating-card reveal" style="--stagger-i: 3">
            <div class="why-icon">🏭</div>
            <h3 class="why-title">Industrial Grade</h3>
            <p class="why-desc">Heavy-duty equipment designed for industrial applications.</p>
          </div>
          <div class="why-card floating-card reveal" style="--stagger-i: 4">
            <div class="why-icon">📞</div>
            <h3 class="why-title">24/7 Support</h3>
            <p class="why-desc">Round-the-clock customer support and emergency response.</p>
          </div>
          <div class="why-card floating-card reveal" style="--stagger-i: 5">
            <div class="why-icon">🛡️</div>
            <h3 class="why-title">Warranty Protection</h3>
            <p class="why-desc">Comprehensive warranty with free maintenance during warranty period.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Industries -->
    <section class="section-pad bg-light">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Industries We Protect</span>
          <h2 class="section-title">Built For <span class="text-red">High-Risk Environments</span></h2>
          <p class="section-sub">Fire protection solutions for facilities where uptime, compliance, and safety matter every day.</p>
        </div>

        <div class="industry-grid">
          ${getIndustryCards()}
        </div>
      </div>
    </section>

    <!-- Statistics Counter -->
    <section class="stats-section" aria-label="Company statistics">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item reveal">
            <span class="stat-num counter-animate" data-target="60" data-suffix="+">0</span>
            <span class="stat-label">Years Experience</span>
          </div>
          <div class="stat-item reveal">
            <span class="stat-num counter-animate" data-target="100" data-suffix="+">0</span>
            <span class="stat-label">Countries Served</span>
          </div>
          <div class="stat-item reveal">
            <span class="stat-num counter-animate" data-target="1000" data-suffix="+">0</span>
            <span class="stat-label">Projects Completed</span>
          </div>
          <div class="stat-item reveal">
            <span class="stat-num counter-animate" data-target="500" data-suffix="+">0</span>
            <span class="stat-label">Products In Stock</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section-pad testimonials-section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Client Reviews</span>
          <h2 class="section-title">What Our <span class="text-red">Clients Say</span></h2>
        </div>
        
        <div class="testi-grid">
          <div class="testi-card reveal" style="--stagger-i: 0">
            <div class="testi-stars">★★★★★</div>
            <p class="testi-text">
              "FireGuard Pro equipped our entire manufacturing facility. Professional installation and excellent product quality."
            </p>
            <div class="testi-author">
              <div class="testi-avatar">RK</div>
              <div>
                <strong>Rajesh Kumar</strong>
                <span>Safety Manager, Tata Steel</span>
              </div>
            </div>
          </div>
          <div class="testi-card reveal" style="--stagger-i: 1">
            <div class="testi-stars">★★★★★</div>
            <p class="testi-text">
              "We've been sourcing fire equipment from FireGuard Pro for 5 years. Consistent quality and excellent service."
            </p>
            <div class="testi-author">
              <div class="testi-avatar">SP</div>
              <div>
                <strong>Sunita Patel</strong>
                <span>Facility Head, Infosys Campus</span>
              </div>
            </div>
          </div>
          <div class="testi-card reveal" style="--stagger-i: 2">
            <div class="testi-stars">★★★★★</div>
            <p class="testi-text">
              "Government approved vendor with proper documentation. Made our compliance audit seamless."
            </p>
            <div class="testi-author">
              <div class="testi-avatar">AM</div>
              <div>
                <strong>Arjun Mehta</strong>
                <span>Director, Municipal Corporation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Brands -->
    <section class="section-pad-sm brands-section">
      <div class="container">
        <div class="section-header" style="margin-bottom: 2rem;">
          <span class="section-label">Trusted Brands</span>
          <h2 class="section-title">We Supply <span class="text-red">Premium Brands</span></h2>
        </div>
        
        <div class="brands-marquee" aria-label="Trusted brands">
          <div class="brands-track">
            ${getBrandItems()}
            ${getBrandItems()}
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Preview -->
    <section class="section-pad">
      <div class="container">
        <div class="contact-preview-grid">
          <div class="reveal-left">
            <span class="section-label">Get In Touch</span>
            <h2 class="section-title">Need Fire Safety <span class="text-red">Solutions?</span></h2>
            <p class="section-sub" style="margin-bottom: 2rem;">
              Contact our expert team for consultation, quotations, or emergency support.
            </p>
            
            <div class="contact-info-list">
              <div class="contact-info-item">
                <div class="contact-info-icon">📍</div>
                <div>
                  <strong>Office Address</strong>
                  <span>Plot 42, Industrial Area Phase-II<br>New Delhi - 110020, India</span>
                </div>
              </div>
              <div class="contact-info-item">
                <div class="contact-info-icon">📞</div>
                <div>
                  <strong>Phone Number</strong>
                  <span><a href="tel:+911800123456">1800-123-4567</a> (Toll Free)</span>
                </div>
              </div>
              <div class="contact-info-item">
                <div class="contact-info-icon">📧</div>
                <div>
                  <strong>Email Address</strong>
                  <span><a href="mailto:sales@fireguardpro.com">sales@fireguardpro.com</a></span>
                </div>
              </div>
              <div class="contact-info-item">
                <div class="contact-info-icon">⏰</div>
                <div>
                  <strong>Business Hours</strong>
                  <span>Monday - Saturday: 9:00 AM - 7:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div class="contact-cta-box reveal-right">
            <h3>Request a Quote</h3>
            <p>Get competitive pricing for your fire safety requirements.</p>
            <a href="#contact" class="btn btn-white" onclick="navigateTo('contact')">Contact Us Now</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function getProductsPage() {
  return `
    <div class="page-banner">
      ${getPageBannerMedia()}
      <div class="container">
        <div class="page-banner-content">
          <div class="breadcrumb">
            <a href="#home" onclick="navigateTo('home')">Home</a>
            <span>/</span>
            <span class="current">Products</span>
          </div>
          <h1>All Products</h1>
          <p>Browse our complete range of fire safety equipment</p>
        </div>
      </div>
    </div>

    <div class="filter-bar">
      <div class="container">
        <div class="filter-bar-inner">
          <div class="filter-search-wrap">
            <span class="filter-search-icon" aria-hidden="true"></span>
            <input type="text" id="productSearch" placeholder="Search products..." onkeyup="filterProducts()">
          </div>
          <select class="filter-select" id="categoryFilter" onchange="filterProducts()">
            <option value="">All Categories</option>
            ${[...new Set(products.map(p => p.category))].map(cat => 
              `<option value="${cat}">${cat}</option>`
            ).join('')}
          </select>
          <select class="filter-select" id="brandFilter" onchange="filterProducts()">
            <option value="">All Brands</option>
            <option value="FireShield">FireShield</option>
            <option value="Honeywell">Honeywell</option>
            <option value="Bosch">Bosch</option>
            <option value="Siemens">Siemens</option>
          </select>
          <select class="filter-select" id="fireTypeFilter" onchange="filterProducts()">
            <option value="">All Fire Types</option>
            <option value="electrical">Electrical</option>
            <option value="class-a">Class A</option>
            <option value="class-b">Class B</option>
            <option value="industrial">Industrial</option>
          </select>
          <select class="filter-select" id="sortFilter" onchange="filterProducts()">
            <option value="default">Sort By: Default</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>
    </div>

    <section class="section-pad">
      <div class="container">
        <div class="shop-layout">
          <aside class="sidebar">
            <div class="sidebar-header">
              <h3>Filters</h3>
              <button class="sidebar-clear" onclick="clearFilters()">Clear All</button>
            </div>
            
            <div class="filter-group">
              <h4 class="filter-group-title">Price Range</h4>
              <div class="filter-group-body">
                <label class="filter-checkbox">
                  <input type="radio" name="price" value="0-5000" onchange="filterProducts()">
                  <span>Under ₹5,000</span>
                </label>
                <label class="filter-checkbox">
                  <input type="radio" name="price" value="5000-10000" onchange="filterProducts()">
                  <span>₹5,000 - ₹10,000</span>
                </label>
                <label class="filter-checkbox">
                  <input type="radio" name="price" value="10000-25000" onchange="filterProducts()">
                  <span>₹10,000 - ₹25,000</span>
                </label>
                <label class="filter-checkbox">
                  <input type="radio" name="price" value="25000-999999" onchange="filterProducts()">
                  <span>Above ₹25,000</span>
                </label>
              </div>
            </div>

            <div class="filter-group">
              <h4 class="filter-group-title">Rating</h4>
              <div class="filter-group-body">
                <label class="filter-checkbox">
                  <input type="radio" name="rating" value="4.5" onchange="filterProducts()">
                  <span>★★★★★ 4.5 & above</span>
                </label>
                <label class="filter-checkbox">
                  <input type="radio" name="rating" value="4" onchange="filterProducts()">
                  <span>★★★★☆ 4.0 & above</span>
                </label>
              </div>
            </div>
          </aside>

          <div>
            <div class="products-header">
              <p id="productCount">Loading products...</p>
            </div>
            <div class="products-grid" id="productsGrid"></div>
            <div class="pagination" id="pagination"></div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function getCategoryIntroHtml(categoryName) {
  const meta = categoryMeta[categoryName];
  if (!meta) return '';
  const count = products.filter((p) => p.category === categoryName).length;

  return `
    <section class="section-pad-sm category-intro-section bg-light">
      <div class="container">
        <div class="category-intro-grid reveal-flip">
          <div class="category-intro-media">
            <img src="${meta.image}" alt="${categoryName}" loading="lazy" width="600" height="450">
            <span class="category-intro-count">${count} Products Listed</span>
          </div>
          <div class="category-intro-content">
            <span class="section-label">${meta.tagline}</span>
            <h2 class="section-title">${categoryName}</h2>
            <p class="category-intro-desc">${meta.description}</p>
            ${meta.overview ? `<p class="category-intro-desc">${meta.overview}</p>` : ''}
            <ul class="category-highlights">
              ${meta.highlights.map((h) => `<li><span class="highlight-dot" aria-hidden="true"></span>${h}</li>`).join('')}
            </ul>
            ${meta.standards ? `<p class="category-standards"><strong>Standards &amp; Compliance:</strong> ${meta.standards}</p>` : ''}
          </div>
        </div>
        ${meta.applications?.length ? `
        <div class="category-applications reveal">
          <h3 class="category-applications-title">Typical Applications</h3>
          <div class="category-applications-grid">
            ${meta.applications.map((app) => `<span class="category-app-tag">${app}</span>`).join('')}
          </div>
        </div>` : ''}
      </div>
    </section>`;
}

function initCategoryIntroPage() {
  const root = document.getElementById('categoryIntroRoot');
  if (!root) return;
  const categoryName = root.dataset.category || document.body.dataset.category;
  if (!categoryName) return;
  root.outerHTML = getCategoryIntroHtml(categoryName);

  const bottomRoot = document.getElementById('categoryBottomRoot');
  if (bottomRoot) {
    bottomRoot.outerHTML = getCategoryBottomHtml(categoryName);
  }

  setTimeout(initScrollReveal, 50);
}

function getCategoryPage(categoryName) {
  const meta = categoryMeta[categoryName];

  return `
    <div class="page-banner">
      ${getPageBannerMedia()}
      <div class="container">
        <div class="page-banner-content">
          <div class="breadcrumb">
            <a href="#home" onclick="navigateTo('home')">Home</a>
            <span>/</span>
            <a href="#products" onclick="navigateTo('products')">Products</a>
            <span>/</span>
            <span class="current">${categoryName}</span>
          </div>
          <h1>${categoryName}</h1>
          <p>${meta?.short || 'Browse our certified fire safety products'}</p>
        </div>
      </div>
    </div>

    ${getCategoryIntroHtml(categoryName)}

    <div class="filter-bar">
      <div class="container">
        <div class="filter-bar-inner">
          <div class="filter-search-wrap">
            <span class="filter-search-icon" aria-hidden="true"></span>
            <input type="text" id="categorySearch" placeholder="Search ${categoryName.toLowerCase()}..." onkeyup="filterCategoryProducts()">
          </div>
          <select class="filter-select" id="categorySortFilter" onchange="filterCategoryProducts()">
            <option value="default">Sort By: Default</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>
    </div>

    <section class="section-pad">
      <div class="container">
        <div class="products-header">
          <p id="categoryProductCount">Loading products...</p>
        </div>
        <div class="products-grid" id="categoryProductsGrid"></div>
      </div>
    </section>

    ${getCategoryBottomHtml(categoryName)}
  `;
}

function getCategoryBottomHtml(categoryName) {
  const meta = categoryMeta[categoryName];
  if (!meta) return '';

  return `
    <section class="section-pad-sm category-bottom-section">
      <div class="container">
        <div class="category-bottom-grid reveal">
          <div class="category-bottom-card">
            <h3>Why Choose FireShield ${categoryName}?</h3>
            <p>${meta.overview || meta.description}</p>
          </div>
          <div class="category-bottom-card">
            <h3>Compliance &amp; Documentation</h3>
            <p>All products in this category are supplied with test certificates and conformity documentation suitable for fire audits, insurance surveys and statutory inspections. Our team assists with BOQ preparation, submittals and technical clarifications for consultant and contractor projects.</p>
            ${meta.standards ? `<p class="category-standards"><strong>Applicable standards:</strong> ${meta.standards}</p>` : ''}
          </div>
          <div class="category-bottom-card accent">
            <h3>Need a Custom Quote?</h3>
            <p>Share your project requirements — our fire safety engineers will recommend the right product mix, quantities and installation approach for your facility.</p>
            <a href="contact.html" class="btn btn-primary" onclick="if(typeof navigateTo==='function'){event.preventDefault();navigateTo('contact');}" style="margin-top: 1rem;">Request Consultation</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function getAboutPage() {
  return `
    <div class="page-banner">
      ${getPageBannerMedia()}
      <div class="container">
        <div class="page-banner-content">
          <div class="breadcrumb">
            <a href="#home" onclick="navigateTo('home')">Home</a>
            <span>/</span>
            <span class="current">About Us</span>
          </div>
          <h1>About FireShield</h1>
          <p>Leading supplier of fire safety equipment since 2014</p>
        </div>
      </div>
    </div>

    <section class="section-pad">
      <div class="container">
        <div class="about-split about-reveal-section">
          <div class="about-img-wrap">
            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80" alt="About FireGuard Pro">
            <div class="about-exp-badge">
              <strong>10+</strong>
              <span>Years<br>Experience</span>
            </div>
          </div>
          <div class="about-content-block">
            <span class="section-label">Our Story</span>
            <h2 class="section-title">Protecting Lives &<br><span class="text-red">Assets Since 2014</span></h2>
            <p style="color: var(--muted); line-height: 1.8; margin-bottom: 1.5rem;">
              FireShield was founded in 2014 by a team of fire safety engineers with a vision to make world-class fire protection equipment accessible to every business and home in India.
            </p>
            <p style="color: var(--muted); line-height: 1.8; margin-bottom: 2rem;">
              Today, we serve over 1000+ clients including government departments, PSUs, hospitals, malls, factories, and residential complexes across India. Our commitment to quality, certification, and customer service has made us a trusted name in the fire safety industry.
            </p>
            
            <div class="about-stats-row">
              <div class="about-stat-card">
                <span class="num">1000+</span>
                <span class="label">Happy Customers</span>
              </div>
              <div class="about-stat-card">
                <span class="num">500+</span>
                <span class="label">Products</span>
              </div>
              <div class="about-stat-card">
                <span class="num">50+</span>
                <span class="label">Cities Served</span>
              </div>
              <div class="about-stat-card">
                <span class="num">100%</span>
                <span class="label">ISI Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad bg-light">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Our Values</span>
          <h2 class="section-title">Mission, Vision & <span class="text-red">Core Values</span></h2>
        </div>
        
        <div class="why-grid">
          <div class="why-card floating-card reveal">
            <div class="why-icon">🎯</div>
            <h3 class="why-title">Our Mission</h3>
            <p class="why-desc">To make world-class fire safety equipment accessible to every home, business and government facility in India at fair prices with expert support.</p>
          </div>
          <div class="why-card floating-card reveal">
            <div class="why-icon">🔭</div>
            <h3 class="why-title">Our Vision</h3>
            <p class="why-desc">To be the #1 fire safety partner for India's industrial and infrastructure growth through technology, certification and 24/7 service excellence.</p>
          </div>
          <div class="why-card floating-card reveal">
            <div class="why-icon">💎</div>
            <h3 class="why-title">Our Values</h3>
            <p class="why-desc">Quality without compromise. Transparency in every transaction. Rapid response when it matters most. Safety as our personal responsibility.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Certifications</span>
          <h2 class="section-title">Certified & <span class="text-red">Approved</span></h2>
          <p class="section-sub">All our products meet national and international safety standards</p>
        </div>
        
        <div class="brands-grid">
          <div class="brand-item reveal"><span class="brand-name">ISI Certified</span></div>
          <div class="brand-item reveal"><span class="brand-name">PESO Registered</span></div>
          <div class="brand-item reveal"><span class="brand-name">BIS Approved</span></div>
          <div class="brand-item reveal"><span class="brand-name">ISO 9001:2015</span></div>
          <div class="brand-item reveal"><span class="brand-name">CE Certified</span></div>
          <div class="brand-item reveal"><span class="brand-name">LPCB Listed</span></div>
        </div>
      </div>
    </section>
  `;
}

function getContactPage() {
  return `
    <div class="page-banner">
      ${getPageBannerMedia()}
      <div class="container">
        <div class="page-banner-content">
          <div class="breadcrumb">
            <a href="#home" onclick="navigateTo('home')">Home</a>
            <span>/</span>
            <span class="current">Contact Us</span>
          </div>
          <h1>Contact Us</h1>
          <p>Get in touch with our expert team</p>
        </div>
      </div>
    </div>

    <section class="section-pad">
      <div class="container">
        <div class="contact-preview-grid">
          <div class="reveal-left">
            <span class="section-label">Get In Touch</span>
            <h2 class="section-title">Contact Our <span class="text-red">Expert Team</span></h2>
            
            <div class="contact-info-list">
              <div class="contact-info-item">
                <div class="contact-info-icon">📍</div>
                <div>
                  <strong>Office Address</strong>
                  <span>Plot 42, Industrial Area Phase-II<br>New Delhi - 110020, India</span>
                </div>
              </div>
              <div class="contact-info-item">
                <div class="contact-info-icon">📞</div>
                <div>
                  <strong>Phone Number</strong>
                  <span><a href="tel:+911800123456">1800-123-4567</a> (Toll Free)<br><a href="tel:+919876543210">+91 98765 43210</a> (Emergency)</span>
                </div>
              </div>
              <div class="contact-info-item">
                <div class="contact-info-icon">📧</div>
                <div>
                  <strong>Email Address</strong>
                  <span><a href="mailto:sales@fireshield.com">sales@fireshield.com</a><br><a href="mailto:support@fireshield.com">support@fireshield.com</a></span>
                </div>
              </div>
              <div class="contact-info-item">
                <div class="contact-info-icon">⏰</div>
                <div>
                  <strong>Business Hours</strong>
                  <span>Monday - Saturday: 9:00 AM - 7:00 PM<br>Sunday: Closed (Emergency: 24/7)</span>
                </div>
              </div>
            </div>
          </div>

          <div class="reveal-right">
            <div style="background: #fff; padding: 2.5rem; border-radius: var(--radius); box-shadow: var(--shadow-lg);">
              <h3 style="font-family: var(--font-h); font-size: 1.4rem; margin-bottom: 1.5rem;">Send Us a Message</h3>
              <form onsubmit="submitContactForm(event)">
                <div style="margin-bottom: 1.25rem;">
                  <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.9rem;">Full Name *</label>
                  <input type="text" required style="width: 100%; padding: 0.75rem; border: 1.5px solid var(--border); border-radius: var(--radius-sm); font-size: 0.95rem; outline: none; transition: var(--t);" placeholder="Enter your name">
                </div>
                <div style="margin-bottom: 1.25rem;">
                  <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.9rem;">Email Address *</label>
                  <input type="email" required style="width: 100%; padding: 0.75rem; border: 1.5px solid var(--border); border-radius: var(--radius-sm); font-size: 0.95rem; outline: none; transition: var(--t);" placeholder="Enter your email">
                </div>
                <div style="margin-bottom: 1.25rem;">
                  <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.9rem;">Phone Number *</label>
                  <input type="tel" required style="width: 100%; padding: 0.75rem; border: 1.5px solid var(--border); border-radius: var(--radius-sm); font-size: 0.95rem; outline: none; transition: var(--t);" placeholder="Enter your phone">
                </div>
                <div style="margin-bottom: 1.25rem;">
                  <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.9rem;">Message *</label>
                  <textarea required rows="4" style="width: 100%; padding: 0.75rem; border: 1.5px solid var(--border); border-radius: var(--radius-sm); font-size: 0.95rem; outline: none; transition: var(--t); resize: vertical;" placeholder="Enter your message"></textarea>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad-sm bg-light">
      <div class="container">
        <div style="border-radius: var(--radius); overflow: hidden; height: 400px;">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.2873573891897!2d77.31489931508047!3d28.619394982422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM3JzA5LjgiTiA3N8KwMTgnNTkuNiJF!5e0!3m2!1sen!2sin!4v1234567890" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div>
      </div>
    </section>
  `;
}

function getProductDetailsPage(productId) {
  const product = products.find(p => p.id === parseInt(productId));
  if (!product) return '<div class="container section-pad"><p>Product not found</p></div>';

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return `
    <div class="page-banner">
      ${getPageBannerMedia()}
      <div class="container">
        <div class="page-banner-content">
          <div class="breadcrumb">
            <a href="#home" onclick="navigateTo('home')">Home</a>
            <span>/</span>
            <a href="#products" onclick="navigateTo('products')">Products</a>
            <span>/</span>
            <a href="#category" onclick="navigateTo('category', '${product.category}')">${product.category}</a>
            <span>/</span>
            <span class="current">${product.name}</span>
          </div>
          <h1>${product.name}</h1>
        </div>
      </div>
    </div>

    <section class="section-pad">
      <div class="container">
        <div class="product-detail-grid">
          <div class="reveal-left product-detail-image">
            <img src="${product.image}" alt="${product.name}" width="600" height="450" loading="lazy">
          </div>

          <div class="reveal-right product-detail-info">
            <p class="product-cat">${product.subCategory || product.category}</p>
            <h1>${product.name}</h1>
            
            <div class="product-rating" style="margin-bottom: 1.5rem;">
              <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
              <span class="rating-count">${product.rating} (${product.reviews} reviews)</span>
            </div>

            <div style="margin-bottom: 2rem;">
              <div style="display: flex; align-items: baseline; gap: 1rem; margin-bottom: 0.5rem; flex-wrap: wrap;">
                <span style="font-family: var(--font-h); font-size: 2.5rem; font-weight: 700; color: var(--red);">₹${product.price.toLocaleString()}</span>
                <span style="font-size: 1.2rem; color: var(--muted); text-decoration: line-through;">₹${product.oldPrice.toLocaleString()}</span>
                <span style="background: var(--red); color: #fff; padding: 0.25rem 0.75rem; border-radius: 4px; font-weight: 700; font-size: 0.85rem;">-${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%</span>
              </div>
              <p style="color: var(--muted); font-size: 0.9rem;">Inclusive of all taxes · BIS / ISI aligned range</p>
            </div>

            <div class="product-detail-block">
              <h3>Product Description</h3>
              <p class="product-detail-text">${product.longDescription || product.description}</p>
            </div>

            ${product.applications?.length ? `
            <div class="product-detail-block">
              <h3>Recommended Applications</h3>
              <div class="product-app-tags">
                ${product.applications.map((app) => `<span class="category-app-tag">${app}</span>`).join('')}
              </div>
            </div>` : ''}

            <div class="product-detail-block">
              <h3>Key Features</h3>
              <ul class="product-feature-list">
                ${product.features.map(f => `<li><span class="feature-check">✓</span><span>${f}</span></li>`).join('')}
              </ul>
            </div>

            ${product.specifications ? `
              <div class="product-detail-block">
                <h3>Technical Specifications</h3>
                <table class="product-spec-table">
                  ${Object.entries(product.specifications).map(([key, value]) => `
                    <tr>
                      <td>${key}</td>
                      <td>${value}</td>
                    </tr>
                  `).join('')}
                </table>
              </div>
            ` : ''}

            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              <button class="btn btn-primary" onclick="navigateTo('contact')" style="flex: 1;">Request Quote</button>
              <button class="btn btn-outline" onclick="alert('Brochure download feature coming soon!')" style="flex: 1;">Download Brochure</button>
            </div>

            <div style="margin-top: 2rem; padding: 1.5rem; background: rgba(214,40,40,0.05); border-left: 4px solid var(--red); border-radius: var(--radius-sm);">
              <p style="font-weight: 600; margin-bottom: 0.5rem;">Need Help?</p>
              <p style="color: var(--muted); font-size: 0.9rem; margin-bottom: 1rem;">Contact our experts for product consultation and bulk orders.</p>
              <a href="tel:+911800123456" style="color: var(--red); font-weight: 700;">📞 1800-123-4567</a>
            </div>
          </div>
        </div>

        ${relatedProducts.length > 0 ? `
          <div>
            <h2 style="font-family: var(--font-h); font-size: 1.8rem; text-align: center; margin-bottom: 2rem;">Related <span style="color: var(--red);">Products</span></h2>
            <div class="products-grid">
              ${relatedProducts.map(p => createProductCard(p)).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </section>
  `;
}


// ==================== HELPER FUNCTIONS ====================
function getCategoryCards() {
  const icons = {
    'Fire Extinguishers': '🧯', 'Fire Hydrant Systems': '💧', 'Fire Alarm Systems': '🔔',
    'Smoke Detectors': '💨', 'Emergency Lights': '💡', 'Safety Signages': '⚠️',
    'PPE Equipment': '🦺', 'Fire Fighting Accessories': '🔧'
  };

  return Object.entries(categoryMeta).map(([name, meta], index) => {
    const count = products.filter((p) => p.category === name).length;
    return `
    <div class="cat-card reveal-flip" style="--stagger-i: ${index}" onclick='goToCategory(${JSON.stringify(name)}, event)'>
      <img src="${meta.image}" alt="${name}" class="cat-card-img" loading="lazy" width="400" height="220">
      <div class="cat-card-overlay"></div>
      <div class="cat-card-body">
        <div class="cat-card-icon">${icons[name] || '🔥'}</div>
        <h3 class="cat-card-name">${name}</h3>
        <p class="cat-card-count">${count}+ Products</p>
        <span class="cat-card-btn">View All</span>
      </div>
    </div>`;
  }).join('');
}

function createProductCard(product) {
  return `
    <div class="product-card reveal">
      <div class="product-img-wrap" onclick="viewProductDetails(${product.id})">
        <img src="${product.image}" alt="${product.name}" loading="lazy" width="600" height="450">
        ${product.certified ? '<span class="product-badge">ISI Certified</span>' : ''}
        ${product.popular ? '<span class="product-badge red">Popular</span>' : ''}
      </div>
      <div class="product-body">
        <p class="product-cat">${product.subCategory || product.category}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.longDescription || product.description}</p>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="product-price">
          ₹${product.price.toLocaleString()}
          <span class="old-price">₹${product.oldPrice.toLocaleString()}</span>
        </div>
        <div class="product-actions">
          <button class="btn btn-primary" onclick="viewProductDetails(${product.id})">View Details</button>
          <button class="btn btn-outline" onclick="navigateTo('contact')">Get Quote</button>
        </div>
      </div>
    </div>
  `;
}

function viewProductDetails(productId) {
  currentProductId = productId;
  navigateTo('product-details');
}

// ==================== FILTER FUNCTIONS ====================
function filterProducts() {
  const searchQuery = document.getElementById('productSearch')?.value.toLowerCase() || '';
  const categoryFilter = document.getElementById('categoryFilter')?.value || '';
  const brandFilter = document.getElementById('brandFilter')?.value || '';
  const fireTypeFilter = document.getElementById('fireTypeFilter')?.value || '';
  const sortFilter = document.getElementById('sortFilter')?.value || 'default';
  
  const priceRange = document.querySelector('input[name="price"]:checked')?.value || '';
  const minRating = parseFloat(document.querySelector('input[name="rating"]:checked')?.value) || 0;
  
  filteredProducts = products.filter(product => {
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery) && 
        !product.category.toLowerCase().includes(searchQuery)) {
      return false;
    }
    
    if (categoryFilter && product.category !== categoryFilter) {
      return false;
    }

    if (brandFilter && getProductBrand(product) !== brandFilter) {
      return false;
    }

    if (fireTypeFilter && !getProductFireTypes(product).includes(fireTypeFilter)) {
      return false;
    }
    
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      if (product.price < min || product.price > max) {
        return false;
      }
    }
    
    if (product.rating < minRating) {
      return false;
    }
    
    return true;
  });
  
  switch (sortFilter) {
    case 'name-asc':
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'price-asc':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'popular':
      filteredProducts.sort((a, b) => b.reviews - a.reviews);
      break;
  }
  
  currentPageNum = 1;
  displayProducts();
  updateProductCount();
}

function getProductBrand(product) {
  const brandMap = {
    'Fire Alarm Systems': 'Honeywell',
    'Smoke Detectors': 'Bosch',
    'Emergency Lights': 'Siemens',
    'Fire Hydrant Systems': 'FireShield'
  };
  return brandMap[product.category] || 'FireShield';
}

function getProductFireTypes(product) {
  const text = `${product.name} ${product.category} ${product.description}`.toLowerCase();
  const types = ['industrial'];

  if (text.includes('electrical') || text.includes('co') || text.includes('alarm') || text.includes('detector')) {
    types.push('electrical');
  }
  if (text.includes('abc') || text.includes('foam') || text.includes('blanket')) {
    types.push('class-a', 'class-b');
  }
  if (text.includes('hydrant') || text.includes('hose') || text.includes('ppe')) {
    types.push('class-a');
  }

  return [...new Set(types)];
}

function displayProducts() {
  const container = document.getElementById('productsGrid');
  if (!container) return;
  
  const start = (currentPageNum - 1) * productsPerPage;
  const end = start + productsPerPage;
  const pageProducts = filteredProducts.slice(start, end);
  
  if (pageProducts.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--muted);">No products found. Try adjusting your filters.</p>';
    return;
  }
  
  container.innerHTML = pageProducts.map(product => createProductCard(product)).join('');
  
  setTimeout(initScrollReveal, 100);
  updatePagination();
}

function updateProductCount() {
  const countElement = document.getElementById('productCount');
  if (countElement) {
    countElement.textContent = `Showing ${filteredProducts.length} product(s)`;
  }
}

function updatePagination() {
  const paginationContainer = document.getElementById('pagination');
  if (!paginationContainer) return;
  
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  if (totalPages <= 1) {
    paginationContainer.innerHTML = '';
    return;
  }
  
  let paginationHTML = '<div class="pagination-inner">';
  
  paginationHTML += `
    <button class="pagination-btn ${currentPageNum === 1 ? 'disabled' : ''}" 
            onclick="changePage(${currentPageNum - 1})" 
            ${currentPageNum === 1 ? 'disabled' : ''}>
      ← Previous
    </button>
  `;
  
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPageNum - 1 && i <= currentPageNum + 1)) {
      paginationHTML += `
        <button class="pagination-btn ${i === currentPageNum ? 'active' : ''}" 
                onclick="changePage(${i})">
          ${i}
        </button>
      `;
    } else if (i === currentPageNum - 2 || i === currentPageNum + 2) {
      paginationHTML += '<span class="pagination-dots">...</span>';
    }
  }
  
  paginationHTML += `
    <button class="pagination-btn ${currentPageNum === totalPages ? 'disabled' : ''}" 
            onclick="changePage(${currentPageNum + 1})" 
            ${currentPageNum === totalPages ? 'disabled' : ''}>
      Next →
    </button>
  `;
  
  paginationHTML += '</div>';
  paginationContainer.innerHTML = paginationHTML;
}

function changePage(page) {
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  if (page < 1 || page > totalPages) return;
  
  currentPageNum = page;
  displayProducts();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function clearFilters() {
  const searchInput = document.getElementById('productSearch');
  if (searchInput) searchInput.value = '';
  
  ['categoryFilter', 'brandFilter', 'fireTypeFilter', 'sortFilter'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  
  document.querySelectorAll('input[name="price"]').forEach(input => { input.checked = false; });
  document.querySelectorAll('input[name="rating"]').forEach(input => { input.checked = false; });
  
  filterProducts();
}


// ==================== CATEGORY FILTER ====================
function filterCategoryProducts() {
  const searchQuery = document.getElementById('categorySearch')?.value.toLowerCase() || '';
  const sortFilter = document.getElementById('categorySortFilter')?.value || 'default';
  
  let categoryProducts = products.filter(p => p.category === currentCategory);
  
  if (searchQuery) {
    categoryProducts = categoryProducts.filter(p => 
      p.name.toLowerCase().includes(searchQuery) || 
      p.description.toLowerCase().includes(searchQuery)
    );
  }
  
  switch (sortFilter) {
    case 'name-asc':
      categoryProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      categoryProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'price-asc':
      categoryProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      categoryProducts.sort((a, b) => b.price - a.price);
      break;
    case 'popular':
      categoryProducts.sort((a, b) => b.reviews - a.reviews);
      break;
  }
  
  displayCategoryProducts(categoryProducts);
}

function displayCategoryProducts(categoryProducts) {
  const container = document.getElementById('categoryProductsGrid');
  const countElement = document.getElementById('categoryProductCount');
  
  if (!container) return;
  
  if (categoryProducts.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--muted);">No products found in this category.</p>';
    if (countElement) countElement.textContent = 'No products found';
    return;
  }
  
  container.innerHTML = categoryProducts.map(product => createProductCard(product)).join('');
  
  if (countElement) {
    countElement.textContent = `Showing ${categoryProducts.length} product(s)`;
  }
  
  setTimeout(initScrollReveal, 100);
}

// ==================== SEARCH ====================
function toggleSearch() {
  const searchOverlay = document.getElementById('searchOverlay');
  if (searchOverlay) {
    searchOverlay.classList.toggle('open');
    if (searchOverlay.classList.contains('open')) {
      document.getElementById('searchInput')?.focus();
    }
  }
}

function closeSearchOverlay(event) {
  if (event.target.id === 'searchOverlay') {
    toggleSearch();
  }
}

function performSearch() {
  liveSearch();
}

function liveSearch() {
  const searchInput = document.getElementById('searchInput');
  const query = searchInput?.value.trim().toLowerCase() || '';
  const searchResults = document.getElementById('searchResults');
  if (!searchResults) return;

  if (!query) {
    searchResults.innerHTML = '';
    return;
  }

  const matchedProducts = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query)
  );

  const matchedCategories = categoryCatalog.filter(c =>
    c.name.toLowerCase().includes(query) ||
    c.subs.some(s => s.name.toLowerCase().includes(query) || s.products.some(pr => pr.toLowerCase().includes(query)))
  );

  const matchedBrands = trustedBrands.filter(b => b.toLowerCase().includes(query));

  if (!matchedProducts.length && !matchedCategories.length && !matchedBrands.length) {
    searchResults.innerHTML = '<p class="search-live-empty">No results found. Try another keyword.</p>';
    return;
  }

  let html = '';

  if (matchedCategories.length) {
    html += `<div class="search-live-group"><h4>Categories</h4>`;
    html += matchedCategories.slice(0, 4).map(c => `
      <div class="search-live-item" onclick='goToCategory(${JSON.stringify(c.name)}, event); toggleSearch();'>
        <span style="font-size:1.4rem">${c.icon}</span>
        <div><strong>${c.name}</strong><span>${c.subs.length} sub-categories</span></div>
      </div>
    `).join('');
    html += `</div>`;
  }

  if (matchedBrands.length) {
    html += `<div class="search-live-group"><h4>Brands</h4>`;
    html += matchedBrands.slice(0, 5).map(b => `
      <div class="search-live-item" onclick="navigateTo('products'); toggleSearch();">
        <span style="font-size:1.2rem">🏷️</span>
        <div><strong>${b}</strong><span>View related products</span></div>
      </div>
    `).join('');
    html += `</div>`;
  }

  if (matchedProducts.length) {
    html += `<div class="search-live-group"><h4>Products (${matchedProducts.length})</h4>`;
    html += matchedProducts.slice(0, 5).map(p => `
      <div class="search-live-item" onclick="viewProductDetails(${p.id}); toggleSearch();">
        <img src="${p.image}" alt="">
        <div>
          <strong>${p.name}</strong>
          <span>${p.category} · ₹${p.price.toLocaleString()}</span>
        </div>
      </div>
    `).join('');
    if (matchedProducts.length > 5) {
      html += `<a href="#products" class="mega-view-all" style="display:block;text-align:center;margin-top:0.5rem" onclick="navigateTo('products'); toggleSearch();">View all ${matchedProducts.length} products →</a>`;
    }
    html += `</div>`;
  }

  searchResults.innerHTML = html;
}

function displaySearchResults(results) {
  liveSearch();
}

// ==================== MOBILE MENU ====================
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  const hamburger = document.getElementById('hamburger');
  
  if (mobileNav && hamburger) {
    mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open');
  }
}

// ==================== ANIMATIONS ====================
function animateCounterElement(counter) {
  if (counter.dataset.animated === 'true') return;
  counter.dataset.animated = 'true';

  const target = parseInt(counter.getAttribute('data-target'), 10);
  const suffix = counter.getAttribute('data-suffix') || '';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(target * eased);
    counter.textContent = `${value}${suffix}`;
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = `${target}${suffix}`;
    }
  }

  requestAnimationFrame(update);
}

function initGridStagger() {
  const gridSelector = '.categories-grid, .products-grid, .why-grid, .stats-grid, .industry-grid, .testi-grid, .category-applications-grid, .category-bottom-grid, .brands-grid';
  document.querySelectorAll(gridSelector).forEach((grid) => {
    [...grid.children].forEach((child, index) => {
      child.style.setProperty('--stagger-i', index);
      if (!child.classList.contains('reveal') &&
          !child.classList.contains('reveal-flip') &&
          !child.classList.contains('reveal-left') &&
          !child.classList.contains('reveal-right')) {
        child.classList.add('reveal');
      }
    });
  });
}

function initHeroEntrance() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  requestAnimationFrame(() => hero.classList.add('is-ready'));

  hero.querySelectorAll('.reveal-left, .reveal-right').forEach((el, index) => {
    setTimeout(() => el.classList.add('visible'), 100 + index * 120);
  });

  hero.querySelectorAll('.hero-stat-num[data-target]').forEach((el, index) => {
    setTimeout(() => animateCounterElement(el), 500 + index * 120);
  });
}

function initScrollReveal() {
  if (scrollRevealObserver) {
    scrollRevealObserver.disconnect();
  }

  initGridStagger();

  const revealSelector = '.reveal, .reveal-left, .reveal-right, .reveal-flip, .reveal-scale, .reveal-header, .counter-animate, .hero-stat-num';
  const revealTargets = document.querySelectorAll(revealSelector);

  document.querySelectorAll('.section-header').forEach((header) => {
    header.classList.add('reveal-header');
  });

  scrollRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      if (el.matches('.reveal, .reveal-left, .reveal-right, .reveal-flip, .reveal-scale, .reveal-header')) {
        el.classList.add('visible');
      }
      if (el.matches('.counter-animate, .hero-stat-num')) {
        animateCounterElement(el);
      }
      scrollRevealObserver.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  if (!revealTargets.length) {
    initHeroEntrance();
    initAboutSectionReveal();
    document.querySelectorAll('.reveal-header').forEach((header) => scrollRevealObserver.observe(header));
    return;
  }

  revealTargets.forEach((el) => {
    if (el.closest('.hero')) return;
    if (el.classList.contains('hero-stat-num') && el.closest('.hero')) return;

    const stagger = el.style.getPropertyValue('--stagger-i');
    if (stagger !== '') {
      el.style.transitionDelay = `${Math.min(parseInt(stagger, 10), 10) * 75}ms`;
    }

    scrollRevealObserver.observe(el);
  });

  document.querySelectorAll('.reveal-header').forEach((header) => scrollRevealObserver.observe(header));
  initHeroEntrance();
  initAboutSectionReveal();
}

function initAboutSectionReveal() {
  if (aboutRevealObserver) {
    aboutRevealObserver.disconnect();
  }

  const sections = document.querySelectorAll('.about-reveal-section');
  if (!sections.length) return;

  aboutRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const section = entry.target;
      section.classList.add('is-visible');
      aboutRevealObserver.unobserve(section);

      /* Longest chain: content 0.2s delay + 1.2s duration = 1.4s */
      setTimeout(() => {
        section.classList.add('animation-complete');
      }, 1500);
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });

  sections.forEach((section) => aboutRevealObserver.observe(section));
}

function getIndustryCards() {
  const industries = [
    {
      name: 'Oil & Gas',
      desc: 'Foam systems, hydrants, monitors, and emergency response equipment.',
      image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=700&q=80'
    },
    {
      name: 'Data Centers',
      desc: 'Smoke detection, clean-agent planning, alarms, and rapid escalation.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=80'
    },
    {
      name: 'Construction',
      desc: 'Portable extinguishers, safety signage, PPE, and temporary fire points.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80'
    },
    {
      name: 'Airports',
      desc: 'Emergency lighting, alarms, hose reels, and evacuation-ready systems.',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=80'
    },
    {
      name: 'Warehouses',
      desc: 'Sprinkler support, hydrants, smoke detectors, and aisle safety signage.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=80'
    },
    {
      name: 'Manufacturing',
      desc: 'Industrial-grade extinguishers, alarms, PPE, and compliance support.',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=700&q=80'
    }
  ];

  return industries.map(industry => `
    <article class="industry-card reveal">
      <img src="${industry.image}" alt="${industry.name}">
      <div class="industry-overlay"></div>
      <div class="industry-body">
        <h3>${industry.name}</h3>
        <p>${industry.desc}</p>
        <a href="#contact" class="btn-read-more" onclick="navigateTo('contact')">Read More →</a>
      </div>
    </article>
  `).join('');
}

function getBrandItems() {
  return ['Honeywell', 'Bosch', 'Siemens', 'Tyco', 'Johnson Controls', 'Schneider', 'ISI', 'BIS'].map(brand => `
    <div class="brand-item"><span class="brand-name">${brand}</span></div>
  `).join('');
}

function revealOnScroll() {
  initScrollReveal();
}

function initSiteEffects() {
  if (!document.querySelector('.scroll-progress')) {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progress);
  }

  updateScrollProgress();
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  document.body.classList.add('site-loaded');
}

function updateScrollProgress() {
  const progress = document.querySelector('.scroll-progress');
  if (!progress) return;

  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const width = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.transform = `scaleX(${Math.min(Math.max(width, 0), 100) / 100})`;
}

// ==================== HEADER SCROLL ====================
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// ==================== CONTACT FORM ====================
function submitContactForm(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  
  let isValid = true;
  form.querySelectorAll('[required]').forEach(field => {
    if (!field.value.trim()) {
      isValid = false;
      field.style.borderColor = 'var(--red)';
    } else {
      field.style.borderColor = 'var(--border)';
    }
  });
  
  if (!isValid) {
    alert('Please fill in all required fields');
    return;
  }
  
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    alert('Thank you! Your message has been sent. We will contact you within 2 hours.');
    form.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1500);
}

// ==================== INITIALIZE SPA ====================
document.addEventListener('DOMContentLoaded', () => {
  initSiteEffects();

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#categoriesNavItem')) {
      closeNavDropdowns();
    }
  });

  document.getElementById('categoriesDropdown')?.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Load home page by default
  renderPage();
  initCategoryIntroPage();
  
  // Smart search — live results
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    let searchDebounce;
    searchInput.addEventListener('input', () => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(liveSearch, 180);
    });
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }
  
  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    renderPage();
  });
});

console.log('🔥 FireShield SPA Loaded Successfully!');
