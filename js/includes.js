/**
 * The 4% Project — HTML Include Loader
 * Fetches header.html and footer.html and injects them into placeholder elements.
 * Sets active nav link based on current page.
 */
(function () {
    'use strict';

    // Detect base path (works both on GitHub Pages /4percent/ and a custom domain /)
    const scriptTag = document.currentScript;
    const scriptSrc = scriptTag ? scriptTag.src : '';
    const basePath  = scriptSrc.includes('/4percent/')
        ? '/4percent/'
        : '/';

    /**
     * Fetch an HTML partial and inject into a target element
     */
    function loadInclude(targetSelector, url, callback) {
        const target = document.querySelector(targetSelector);
        if (!target) return;

        fetch(url)
            .then(function (res) {
                if (!res.ok) throw new Error('Failed to load ' + url);
                return res.text();
            })
            .then(function (html) {
                target.innerHTML = html;
                if (callback) callback(target);
            })
            .catch(function (err) {
                console.warn('[4% includes]', err.message);
            });
    }

    /**
     * Mark the correct nav link as active based on current page filename
     */
    function setActiveNav() {
        const path     = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        const pageKey  = filename.replace('.html', '') || 'index';

        document.querySelectorAll('.nav-links a[data-page]').forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageKey) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Mobile menu toggle (called from header button onclick)
     */
    window.toggleMenu = function () {
        const nav = document.getElementById('nav-links');
        if (!nav) return;
        const open = nav.style.display === 'flex';
        nav.style.display = open ? 'none' : 'flex';
        nav.style.flexDirection = open ? '' : 'column';
        nav.style.position      = open ? '' : 'absolute';
        nav.style.top           = open ? '' : '64px';
        nav.style.left          = open ? '' : '0';
        nav.style.right         = open ? '' : '0';
        nav.style.background    = open ? '' : '#fff';
        nav.style.padding       = open ? '' : '1rem 2rem 1.5rem';
        nav.style.boxShadow     = open ? '' : '0 8px 20px rgba(0,0,0,0.1)';
    };

    // Load header first, then set active state
    loadInclude('#site-header', basePath + 'includes/header.html', function () {
        setActiveNav();
    });

    // Load footer
    loadInclude('#site-footer', basePath + 'includes/footer.html');

})();
