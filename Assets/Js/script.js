

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
    fetch("./Assets/Json/country.json") 
        .then(response => response.json()) 
        .then(data => {
            const countrySelect = document.getElementById("countrySelect");

            data.forEach(country => {
                let option = document.createElement("option");
                option.value = country.code; 
                option.textContent = country.name; 
                countrySelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error loading JSON:", error));
});
document.addEventListener("DOMContentLoaded", function () {
    fetch("./Assets/Json/states.json")
        .then(response => response.json())
        .then(data => {
            const stateSelect = document.getElementById("stateSelect");
            data.forEach(state => {
                let option = document.createElement("option");
                option.value = state.code;
                option.textContent = state.name;
                stateSelect.appendChild(option);
            })
        })
        .catch(error => console.error("Error loading JSON:", error));
});
document.getElementById('countrySelect').addEventListener('change', function () {
    const country = this.value;
    const stateSelect = document.getElementById('stateSelect');

    if (country === 'US') {
        stateSelect.classList.remove('d-none'); 
    } else {
        stateSelect.classList.add('d-none'); 
        stateSelect.value = null; 
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const countrySelect = document.getElementById("countrySelect");
    const stateSelect = document.getElementById("stateSelect");
    const dialog = document.querySelector(".dailog"); 
    const body = document.querySelector(".body"); 

    function updateStateDropdown() {
        if (countrySelect.value === "United States") {
            stateSelect.innerHTML = '<option value="Alaska" selected>Alaska</option>';
            stateSelect.disabled = false; 
        } else {
            stateSelect.innerHTML = '<option value="" selected>Not Applicable</option>';
            stateSelect.disabled = true; 
        }
    }

    updateStateDropdown();
    countrySelect.addEventListener("change", updateStateDropdown);

    document.getElementById("submitBtn").addEventListener("click", function (event) {
        event.preventDefault(); // Prevents default button behavior

        const firstNameInput = document.querySelector("input[placeholder='First Name']");
        const lastNameInput = document.querySelector("input[placeholder='Last Name']");
        const emailInput = document.querySelector("input[placeholder='Email']");
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = emailInput.value.trim();
        const countryName = countrySelect.options[countrySelect.selectedIndex].text;
        let stateName = stateSelect.disabled ? null : stateSelect.options[stateSelect.selectedIndex].text;

        // Email validation regex pattern
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Check if required fields are filled
        if (!firstName || !lastName || !email) {
            alert("Please fill in all required fields.");
            return;
        }

        // Validate email format
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        const emailText = `
            First Name: ${firstName}
            Last Name: ${lastName}
            Email: ${email}
            Country: ${countryName}
            State: ${stateName ? stateName : "null"}
        `;

        const requestBody = {
            subject: "Booster Loan Waitlist",
            text: emailText
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
            alert("Email sent successfully!");
            console.log("Success:", data);
            firstNameInput.value = "";
            lastNameInput.value = "";
            emailInput.value = "";
            countrySelect.value = "United States";
            updateStateDropdown(); 
            dialog.classList.add("d-none");
            body.classList.remove("blur");
        })
        .catch(error => {
            alert(`Failed to send email. Error: ${error.message}`);
            console.error("Error:", error);
        });
    });
});

const support=(event)=>{
    
    event.preventDefault(); // Prevent default form submission

        const fullNameInput = document.querySelector("input[placeholder='Full Name']");
        const emailInput = document.querySelector("input[placeholder='Email']");
        const messageInput = document.querySelector("textarea");

        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!fullName || !email || !message) {
            alert("Please fill in all required fields.");
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
            alert("Message sent successfully!");
            console.log("Success:", data);
            fullNameInput.value = "";
            emailInput.value = "";
            messageInput.value = "";
        })
        .catch(error => {
            alert("Failed to send message. Please try again.");
            console.error("Error:", error);
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
        alert("Please fill in all required fields.");
        return;
    }

    // Validate email format
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
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
        alert("Message sent successfully!");
        console.log("Success:", data);
        fullNameInput.value = "";
        emailInput.value = "";
    })
    .catch(error => {
        alert(`Failed to send message. Error: ${error.message}`);
        console.error("Error details:", error);
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