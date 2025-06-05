// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
        } else {
            header.style.backgroundColor = '#2c3e50';
        }
    });
    
    // Add fade-in animation for manual items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe manual list items
    const manualItems = document.querySelectorAll('.manual-content li');
    manualItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
});

// Add toggle functionality for example content
document.addEventListener('DOMContentLoaded', function() {
    // Add toggle functionality for example content
    const toggleButtons = document.querySelectorAll('.toggle-example');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const exampleContent = button.nextElementSibling;
            if (exampleContent.style.display === 'none' || exampleContent.style.display === '') {
                exampleContent.style.display = 'block';
                button.textContent = 'Skrýt příklad s Filipem';
            } else {
                exampleContent.style.display = 'none';
                button.textContent = 'Příklad s Filipem';
            }
        });
    });
});
