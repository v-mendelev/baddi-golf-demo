// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (toggle && nav) {
    toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
    });
}

// Smooth scroll for in-page links
document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        nav?.classList.remove('open');
        toggle?.setAttribute('aria-expanded', 'false');
    }
});

// Lightweight contact form: build mailto as fallback (no backend)
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Honeypot
        if (form.website && form.website.value.trim() !== '') return;

        const name = form.fullname.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();
        const fmt = form.format.value;
        const msg = form.message.value.trim();
        const consent = form.consent.checked;

        if (!name || !email || !consent) {
            alert('Bitte füllen Sie die Pflichtfelder aus und stimmen Sie der Datenschutz zu.');
            return;
        }

        const subject = encodeURIComponent('Anfrage: Probestunde / Unterricht');
        const body = encodeURIComponent(
            `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone}\nFormat: ${fmt}\n\nNachricht:\n${msg}`
        );

        // Replace with real address when ready
        window.location.href = `mailto:info@baddi-golf.de?subject=${subject}&body=${body}`;
        form.reset();
    });
}
