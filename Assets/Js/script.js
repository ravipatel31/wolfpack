

// ---------------------------------------------------------------------------------------- Fore theme -----------------------------------------------------------
function toggleTheme() {
    document.body.classList.toggle('light-theme');

    // Save user preference
    if (document.body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
}
window.onload = function () {
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
    }
};
// -----------------------------------------------------------------------------------------Active url ---------------------------------------------------------------
function setActive(element) {
    // Remove 'active' class from all nav links
    document.querySelectorAll(".nav-link").forEach(item => {
        item.classList.remove("active");
    });

    // Add 'active' class to the clicked link
    element.classList.add("active");
}

// ------------------------------------------------------------------------------------ showmore -----------------------------------------------------------------------
function showmore(element) {
    const siblings = element.nextElementSibling;
    if (siblings.lastElementChild.classList.contains('text-up')) {
        siblings.lastElementChild.classList.remove('text-up');
        siblings.lastElementChild.classList.add('text-down');
        element.innerHTML = '-'
    }
    else {
        siblings.lastElementChild.classList.add('text-up');
        siblings.lastElementChild.classList.remove('text-down');
        element.innerHTML = '+'

    }
    //    console.log(siblings.lastElementChild.classList);

}


// -------------------------------------------------------------------------------- Load theme from localStorage -----------------------------------------------------------------------------

function loadPage(page) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data;
        })
        .catch(error => console.error("Error loading the page:", error));
    setTimeout(otherfunctions, 500);
}

// Load the home page by default when the site first opens
document.addEventListener("DOMContentLoaded", async function () {
    await loadPage('./Pages/Dashboard.html');
});

// ----------------------------------------------------------------------------------------- ANimations -------------------------------------------------------------------------------------
const otherfunctions = () => {
    // console.log(document.getElementById('hero-heading'))
    const text = "Invest Now, Pay Later";
    let i = 0;
    function typeEffect() {
        if (i < text.length) {
            document.getElementById("hero-heading").innerHTML += text.charAt(i);
            i++;
            setTimeout(typeEffect, 50);
        }
    }
    setTimeout(typeEffect, 500);
    gsap.registerPlugin(ScrollTrigger);

    // Debugging: Check if elements exist

    gsap.to(".scale", {
        scale: 1,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".scale",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
    gsap.to(".opacity", {
        opacity: 1,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".opacity",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    gsap.from(".hero-text, .hero-btn", {
        opacity: 0,
        y: 50,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".hero",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.section').forEach((section, i) => {
        gsap.from(section, {
            opacity: 0,
            y: 100,
            duration: 2,
            scrollTrigger: {
                trigger: section,
                // start: 'top 80%',
                toggleActions: 'play play none none'
            }
        });
    });

    gsap.to(".zoom-box",
        {
            scale: 1, opacity: 1, duration: 3, ease: "power2.out",
            scrollTrigger: {
                trigger: ".zoom-box",
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        }
    );


    gsap.set(".left-box", { x: 457, opacity: 0 });
    gsap.set(".right-box", { x: -457, opacity: 0 });

    // Animate side boxes outward
    gsap.to(".left-box", {
        x: 0, opacity: 1, duration: 2, ease: "power2.out", scrollTrigger: {
            trigger: ".left-box",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
    gsap.to(".right-box", {
        x: 0, opacity: 1, duration: 2, ease: "power2.out", scrollTrigger: {
            trigger: ".right-box",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
}

// -----------------------------------------------------------------------------popup -----------------------------------------------------------------------------------
 const opendailog = ()=>{
    const dailog=   document.querySelector('.dailog')
    const body =   document.querySelector('.body')
    if (dailog.classList.contains('d-none')){
       dailog.classList.remove('d-none')
       body.classList.add('blur')
    }
    else{
        dailog.classList.add('d-none')
        body.classList.remove('blur')

    }
        
 }

// ----------------------------------------------------------------------------------------- Mail ----------------------------------------------------------------------------------------

// (function() {
//     emailjs.init("YOUR_USER_ID"); // Get from EmailJS dashboard
// })();

// document.getElementById("emailForm").addEventListener("submit", function(event) {
//     event.preventDefault();

//     emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
//         from_name: document.getElementById("name").value,
//         from_email: document.getElementById("email").value,
//         message: document.getElementById("message").value
//     })
//     .then(function(response) {
//         alert("Email sent successfully!");
//     }, function(error) {
//         alert("Failed to send email. Try again.");
//     });
// });