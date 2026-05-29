// Wait for everything including GSAP to fully load
window.addEventListener('load', function () {

  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // ── CURSOR ──────────────────────────────────────────────
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    gsap.set(cursor, { x: mx, y: my });
  });

  (function tick() {
    fx += (mx - fx) * 0.1;
    fy += (my - fy) * 0.1;
    gsap.set(follower, { x: fx, y: fy });
    requestAnimationFrame(tick);
  })();

  var hoverEls = document.querySelectorAll('a, button, .pcard, .acard, .pill, .tag, .soc-link, .cbtn, .fb');
  hoverEls.forEach(function (el) {
    el.addEventListener('mouseenter', function () { cursor.classList.add('hovered'); follower.classList.add('hovered'); });
    el.addEventListener('mouseleave', function () { cursor.classList.remove('hovered'); follower.classList.remove('hovered'); });
  });

  if ('ontouchstart' in window) { cursor.style.display = 'none'; follower.style.display = 'none'; }

  // ── NAVBAR ──────────────────────────────────────────────
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Active nav link
  var sections = document.querySelectorAll('section[id]');
  var navAs = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', function () {
    var cur = '';
    sections.forEach(function (s) { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
    navAs.forEach(function (a) { a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--tp)' : ''; });
  }, { passive: true });

  // ── HAMBURGER ───────────────────────────────────────────
  var hbg = document.getElementById('hamburger');
  var mob = document.getElementById('mobileMenu');
  hbg.addEventListener('click', function () {
    hbg.classList.toggle('open');
    mob.classList.toggle('open');
    document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
  });
  mob.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      hbg.classList.remove('open');
      mob.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── HERO ANIMATIONS ─────────────────────────────────────
  var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('.hero-tag', { opacity: 0, y: 20, duration: 0.7, delay: 0.2 })
    .from('.hero-title .line', { opacity: 0, y: 70, duration: 0.9, stagger: 0.15 }, '-=0.3')
    .from('.hero-sub', { opacity: 0, y: 20, duration: 0.7 }, '-=0.4')
    .from('.hero-bio', { opacity: 0, y: 20, duration: 0.7 }, '-=0.4')
    .from('.hero-cta', { opacity: 0, y: 20, duration: 0.7 }, '-=0.3')
    .from('.hero-scroll', { opacity: 0, duration: 0.6 }, '-=0.2')
    .from('.hero-visual', { opacity: 0, x: 60, duration: 0.9, ease: 'power2.out' }, '-=0.8');

  // Floating card
  gsap.to('.hero-card', { y: -14, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.5 });

  // ── SCROLL ANIMATIONS ───────────────────────────────────
  function sa(sel, props, trigger) {
    gsap.from(sel, Object.assign({}, props, {
      scrollTrigger: { trigger: trigger || sel, start: 'top 87%', toggleActions: 'play none none none' }
    }));
  }

  document.querySelectorAll('.sec-label').forEach(function (el) {
    gsap.from(el, { opacity: 0, x: -30, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } });
  });

  document.querySelectorAll('.sec-title').forEach(function (el) {
    gsap.from(el, { opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none none' } });
  });

  gsap.from('.about-text p', { opacity: 0, y: 30, stagger: 0.15, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: '.about-text', start: 'top 82%', toggleActions: 'play none none none' } });
  gsap.from('.tag', { opacity: 0, scale: 0.85, stagger: 0.08, duration: 0.5, ease: 'back.out(1.7)', scrollTrigger: { trigger: '.about-tags', start: 'top 88%', toggleActions: 'play none none none' } });
  gsap.from('.acard', { opacity: 0, x: 40, stagger: 0.15, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: '.about-cards', start: 'top 82%', toggleActions: 'play none none none' } });
  gsap.from('.skill-box', { opacity: 0, y: 40, stagger: 0.12, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: '.skills-grid', start: 'top 82%', toggleActions: 'play none none none' } });
  gsap.from('.pill', { opacity: 0, scale: 0.8, stagger: 0.04, duration: 0.4, ease: 'back.out(1.7)', scrollTrigger: { trigger: '.skills-grid', start: 'top 80%', toggleActions: 'play none none none' } });
  gsap.from('.pcard', { opacity: 0, y: 50, stagger: 0.1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.projects-grid', start: 'top 82%', toggleActions: 'play none none none' } });
 

  // Parallax shapes
  gsap.to('.sh1', { y: -100, ease: 'none', scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 2 } });
  gsap.to('.sh2', { y: 80, ease: 'none', scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1.5 } });

  // ── PROJECT FILTER ──────────────────────────────────────
  var fbs = document.querySelectorAll('.fb');
  var pcards = document.querySelectorAll('.pcard');
  fbs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      fbs.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.dataset.f;
      pcards.forEach(function (c) {
        var show = f === 'all' || c.dataset.c === f;
        if (show) {
          c.classList.remove('hidden');
          gsap.fromTo(c, { opacity: 0, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out' });
        } else {
          gsap.to(c, { opacity: 0, y: -10, scale: 0.95, duration: 0.3, ease: 'power2.in', onComplete: function () { c.classList.add('hidden'); } });
        }
      });
    });
  });

  // ── CARD TILT ───────────────────────────────────────────
  pcards.forEach(function (c) {
    c.addEventListener('mousemove', function (e) {
      var rect = c.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      var y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
      gsap.to(c, { rotateY: x, rotateX: -y, duration: 0.4, ease: 'power1.out', transformPerspective: 800 });
    });
    c.addEventListener('mouseleave', function () {
      gsap.to(c, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
    });
  });

  // ── SMOOTH SCROLL ───────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    });
  });

});