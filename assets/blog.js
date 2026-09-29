/* Two effects, no dependencies.

   Entrances use IntersectionObserver rather than a scroll listener: the browser
   decides when an element crosses the viewport, so nothing runs on frames where
   nothing changed. Elements are marked hidden from here, not in the HTML, so a
   reader with JS disabled or broken sees the article rather than an empty page.

   Both honour prefers-reduced-motion by doing nothing at all. */

(function () {
    var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---- language
       The attribute is set on <html> before paint by an inline script in the head,
       so the page never flashes the wrong language. This only wires the buttons and
       remembers the choice. */
    var root = document.documentElement;
    var sw = document.querySelector('.langswitch');
    if (sw) {
        sw.addEventListener('click', function (e) {
            var b = e.target.closest('button');
            if (!b) return;
            var lang = b.dataset.lang;
            root.setAttribute('data-lang', lang);
            root.setAttribute('lang', lang === 'zh' ? 'zh-Hans' : 'en');
            try { localStorage.setItem('blog-lang', lang); } catch (_) {}
            sw.querySelectorAll('button').forEach(function (x) {
                x.setAttribute('aria-pressed', String(x.dataset.lang === lang));
            });
        });
    }

    /* ---- entrances */
    var targets = document.querySelectorAll('article > *, .stat');
    if (!still && 'IntersectionObserver' in window) {
        targets.forEach(function (el) { el.classList.add('reveal'); });
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (!e.isIntersecting) return;
                // Stagger the cells of a stat row so it assembles rather than blinks.
                var sibs = e.target.parentElement.classList.contains('stats')
                    ? Array.prototype.indexOf.call(e.target.parentElement.children, e.target)
                    : 0;
                e.target.style.transitionDelay = (sibs * 70) + 'ms';
                e.target.classList.add('in');
                io.unobserve(e.target);
            });
        }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
        targets.forEach(function (el) { io.observe(el); });
    }

    /* ---- reading progress */
    var bar = document.querySelector('.progress');
    if (bar && !still) {
        var tick = false;
        addEventListener('scroll', function () {
            if (tick) return;
            tick = true;
            requestAnimationFrame(function () {
                var h = document.documentElement.scrollHeight - innerHeight;
                bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + '%';
                tick = false;
            });
        }, { passive: true });
    }
})();
