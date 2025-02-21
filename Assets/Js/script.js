

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
// function closeDropdown() {
//     const dropdownMenus = document.getElementsByClassName("dropdown-menu");
//     if (dropdownMenus.length > 0) {
//         dropdownMenus[0].style.display = "none"; 
//     }
// }
// document.addEventListener("DOMContentLoaded", function () {
//     const dropdown = document.querySelector(".nav-item.dropdown");

//     dropdown.addEventListener("mouseenter", function () {
//         const dropdownMenus = document.getElementsByClassName("dropdown-menu");
//         if (dropdownMenus.length > 0) {
//             dropdownMenus[0].style.display = "block"; 
//         }
//     });
//     dropdown.addEventListener("mouseleave", function () {
//         const dropdownMenus = document.getElementsByClassName("dropdown-menu");
//         if (dropdownMenus.length > 0) {
//             dropdownMenus[0].style.display = "none";
//         }
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll(".nav-item.dropdown");

    dropdowns.forEach((dropdown) => {
        const dropdownMenu = dropdown.querySelector(".dropdown-menu");

        if (dropdownMenu) {
            dropdown.addEventListener("mouseenter", function () {
                dropdownMenu.style.display = "block"; // Show only this dropdown
            });

            dropdown.addEventListener("mouseleave", function () {
                dropdownMenu.style.display = "none"; // Hide only this dropdown
            });

            // Close dropdown when an item is clicked
            dropdownMenu.querySelectorAll(".dropdown-item").forEach((item) => {
                item.addEventListener("click", function () {
                    dropdownMenu.style.display = "none";
                });
            });
        }
    });
});




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
function showToast(message) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            borderradius: '20px',
            background: "rgba(255,255,255,0.9)",
            fontWeight: 'bold',
            color: 'black',
            fontsize: '20px'

        },
    }).showToast();
}


function launchConfetti() {
    const canvas = document.querySelector('.confetti-canvas');
    const card = document.querySelector('.referfriend');

    // Set canvas size
    canvas.width = card.offsetWidth;
    canvas.height = card.offsetHeight;

    const confettiInstance = confetti.create(canvas, { resize: true });

    confettiInstance({
        particleCount: 3000,
        spread: 300,
        startVelocity: 50,
        origin: { y: 0.99 },
        colors: ['#ff5f6d', '#ffc371', '#6a5acd', '#4fc3f7', '#81c784']
    });
    setTimeout(startConfetti, 50);
}

// Trigger confetti when card is 80% visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
            launchConfetti();
            observer.unobserve(entry.target); // Trigger only once
        }
    });
}, {
    threshold: 0.8
});
// document.addEventListener('DOMContentLoaded', () => {
setTimeout(() => {
    observer.observe(document.querySelector('.referfriend'));
}, 5000);
// });
// -------------------------------------------------------------------------------- Load theme from localStorage -----------------------------------------------------------------------------

function loadPage(page) {
    // document.getElementById("content").style.display = "none";
    fetch(page)
        .then(response => response.text())
        .then(data => {
            window.scrollTo(0, 0);
            document.getElementById("content").innerHTML = data;
        })
        .catch(error => console.error("Error loading the page:", error))

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

 }

// -----------------------------------------------------------------------------popup -----------------------------------------------------------------------------------
const opendailog = () => {
    const dailog = document.querySelector('.dailog')
    const body = document.querySelector('.body')
    if (dailog.classList.contains('d-none')) {
        dailog.classList.remove('d-none')
        body.classList.add('blur')
    }
    else {
        dailog.classList.add('d-none')
        body.classList.remove('blur')

    }

}
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("myForm");
    const countrySelect = document.getElementById("countrySelect");
    const stateSelectContainer = document.getElementById("stateSelect2");
    const stateSelect = document.getElementById("stateSelect");

    let statesData = []; // Store states JSON data

    // Load country list from JSON
    fetch("./Assets/Json/country.json")
        .then(response => response.json())
        .then(data => {
            countrySelect.innerHTML = ""; // Clear existing options
            data.forEach(country => {
                let option = document.createElement("option");
                option.value = country.code;
                option.textContent = country.name;
                countrySelect.appendChild(option);
            });

            // Ensure "United States" is selected by default
            countrySelect.value = "US";
            updateStateField(); // Call after setting default country
        })
        .catch(error => console.error("Error loading country JSON:", error));

    // Load state list from JSON
    fetch("./Assets/Json/states.json")
        .then(response => response.json())
        .then(data => {
            statesData = data; // Store states data
            populateStates(); // Populate state dropdown
            updateStateField(); // Ensure state field visibility on load
        })
        .catch(error => console.error("Error loading states JSON:", error));

    // Populate states dropdown
    function populateStates() {
        stateSelect.innerHTML = ""; // Clear existing states
        statesData.forEach(state => {
            let option = document.createElement("option");
            option.value = state.code;
            option.textContent = state.name;
            stateSelect.appendChild(option);
        });

        // Set the first state as default (e.g., Alaska)
        if (statesData.length > 1) {
            stateSelect.value = statesData[0].code;
        }
    }

    // Update state field based on country selection
    function updateStateField() {
        if (countrySelect.value === "US") {
            stateSelectContainer.classList.remove("d-none"); // Show state field
            stateSelect.disabled = false;

            // Ensure first state is selected by default
            if (statesData.length > 0) {
                stateSelect.value = statesData[1].code;
            }
        } else {
            stateSelectContainer.classList.add("d-none"); // Hide state field
            stateSelect.disabled = true;
            stateSelect.value = ""; // Clear state selection
        }
    }

    // Ensure state field shows up when changing country
    countrySelect.addEventListener("change", updateStateField);

    // Form submit event
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const firstName = document.querySelector("input[placeholder='First Name']").value.trim();
        const lastName = document.querySelector("input[placeholder='Last Name']").value.trim();
        const email = document.querySelector("input[placeholder='Email']").value.trim();
        const countryName = countrySelect.options[countrySelect.selectedIndex].text;
        const stateName = stateSelect.disabled ? "null" : stateSelect.options[stateSelect.selectedIndex].text;

        // Email validation pattern
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Validation checks
        if (!firstName || !lastName || !email) {
            // alert("Please fill in all required fields.");
            showToast("Please fill in all required fields.")
            return;
        }

        if (!emailPattern.test(email)) {
            // alert("Please enter a valid email address.");
            showToast("Please enter a valid email address.")
            return;
        }

        const emailText = `
            First Name: ${firstName}
            Last Name: ${lastName}
            Email: ${email}
            Country: ${countryName}
            State: ${stateName}
        `;

        const requestBody = {
            subject: "Booster Loan Waitlist",
            text: emailText
        };

        // Send request
        fetch("https://pke7n2df83.execute-api.us-east-1.amazonaws.com/default/sendEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Server responded with ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                alert("Email sent successfully!");
                console.log("Success:", data);
                form.reset(); // Reset form fields

                // Ensure default selections are set after reset
                countrySelect.value = "US";
                populateStates();
                updateStateField();
            })
            .catch(error => {
                alert(`Failed to send email. Error: ${error.message}`);
                console.error("Error:", error);
            });
    });
});

const support = (event) => {

    event.preventDefault(); // Prevent default form submission

    const fullNameInput = document.querySelector("input[placeholder='Full Name']");
    const emailInput = document.querySelector("input[placeholder='Email']");
    const messageInput = document.querySelector("textarea");

    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!fullName || !email || !message) {
        // alert("Please fill in all required fields.");
        showToast("Please fill in all required fields.")
        return;
    }

    const requestBody = {
        subject: "Contact Us",
        text: `
                Full Name: ${fullName}
                Email: ${email}
                Message: ${message}
            `
    };

    fetch("https://pke7n2df83.execute-api.us-east-1.amazonaws.com/default/sendEmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then(data => {
            // alert("Message sent successfully!");
            showToast('Message sent successfully!')
            console.log("Success:", data);
            fullNameInput.value = "";
            emailInput.value = "";
            messageInput.value = "";
        })
        .catch(error => {
            // alert("Failed to send message. Please try again.");
            showToast('Failed to send message. Please try again.')
            // console.error("Error:", error);
        });

}

const newsletter = (event) => {
    event.preventDefault(); // Prevents page from refreshing on form submission

    const fullNameInput = document.getElementById("Fullname");
    const emailInput = document.getElementById("Email");

    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();

    // Email validation regex pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if required fields are filled
    if (!fullName || !email) {
        // alert("Please fill in all required fields.");
        showToast('Please fill in all required fields.')
        return;
    }

    // Validate email format
    if (!emailPattern.test(email)) {
        // alert("Please enter a valid email address.");
        showToast('Please enter a valid email address.')
        return;
    }

    const requestBody = {
        subject: "Newsletter",
        text: `Full Name: ${fullName}\nEmail: ${email}`
    };

    fetch("https://pke7n2df83.execute-api.us-east-1.amazonaws.com/default/sendEmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // alert("Message sent successfully!");
            showToast('Message sent Successfully !')
            console.log("Success:", data);
            fullNameInput.value = "";
            emailInput.value = "";
        })
        .catch(error => {
            // alert(`Failed to send message. Error: ${error.message}`);
            showToast(`Failed to send message. Error: ${error.message}`)
            // console.error("Error details:", error);
        });
};
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