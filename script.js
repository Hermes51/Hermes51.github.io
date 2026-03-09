// ===== NAV ACTIVE LINK ON SCROLL =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove("active"));
      const id = entry.target.getAttribute("id");
      const activeLink = document.querySelector(`nav a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add("active");
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));


// ===== CONTACT FORM =====
// Using FormSubmit.co — no backend needed.
// First submission will ask you to confirm your email, then it works forever.
// If you want to handle it with JS instead, you can use fetch below:

const form = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = form.querySelector("button[type='submit']");
    const originalText = btn.innerHTML;
    btn.innerHTML = "Envoi en cours...";
    btn.disabled = true;

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if (response.ok) {
        feedback.textContent = "✓ Message envoyé ! Je te répondrai dès que possible.";
        feedback.className = "form-feedback success";
        feedback.style.display = "block";
        form.reset();
      } else {
        throw new Error("Erreur serveur");
      }
    } catch (err) {
      feedback.textContent = "✗ Erreur lors de l'envoi. Contacte-moi directement par mail.";
      feedback.className = "form-feedback error";
      feedback.style.display = "block";
    }

    btn.innerHTML = originalText;
    btn.disabled = false;

    setTimeout(() => {
      feedback.style.display = "none";
    }, 6000);
  });
}

// Cache le scroll hint après le premier scroll
const scrollHint = document.querySelector(".scroll-hint");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    scrollHint.classList.add("hidden");
  }
}, { once: true });