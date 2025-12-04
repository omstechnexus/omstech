
//Header Scroll
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header')
    function changeHeaderBg() {
        if (window.scrollY > 0) {
            header.classList.add('slide-down')

        } else {
            header.classList.remove('slide-down')
        }
    }
    // Initial check
    changeHeaderBg()
    window.addEventListener('scroll', changeHeaderBg)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            changeHeaderBg()

        }
    })

})


// const mainHeader = document.querySelector('.main-header')
// if (mainHeader) {
//     window.addEventListener('scroll', () => {
//         if (window.scrollY > 0) {
//             mainHeader.classList.add('slide-down')

//         } else {
//             mainHeader.classList.remove('slide-down')
//         }
//     })

// }



// Theme Toggle

const themeToggle = document.getElementById('theme-toggle')

themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark')
    const isDark = document.documentElement.classList.contains('dark')

    if (isDark) {
        themeToggle.classList.remove('fa-moon')
        themeToggle.classList.add('fa-sun')
    } else {
        themeToggle.classList.remove('fa-sun')
        themeToggle.classList.add('fa-moon')
    }

    localStorage.setItem("theme", isDark ? 'dark' : 'light');

})
if (localStorage.getItem("theme") === 'dark') {
    document.documentElement.classList.add('dark')
    themeToggle.classList.remove('fa-moon')
    themeToggle.classList.add('fa-sun')
}








const sideMenu = document.getElementById("mobile-menu");
const menuToggle = document.querySelector("#menu-toggle")
const menuOverlay = document.getElementById("menu-overlay")
const collapseMenu = document.getElementById("collapse-menu")


menuToggle.addEventListener("click", () => {
    sideMenu.classList.toggle("fade")
})

menuOverlay.addEventListener('click', () => {
    sideMenu.classList.remove("fade")
})

collapseMenu.addEventListener('click', () => {
    sideMenu.classList.remove('fade')
})


// Swiper



function useSwiper(className, spv) {
    const swiper = new Swiper(`${className}`, {
        slidesPerView: spv,
        spaceBetween: 10,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        loop: true,
        effect: "slide",
        direction: "horizontal",
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },

        // Navigation arrows
        navigation: {
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },

        }

    })
    return swiper

}


const mySwiper = document.querySelector('.swiper')
if (mySwiper) {
    useSwiper('.swiper', 1)
}

// Observer for Skills (About Page)

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress')
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%'
                }, 200)
            });
            observer.unobserve(entry.target)
        }
    })
})

const skillContainer = document.querySelector('.skill-container')
if (skillContainer) {
    console.log("Skill Present")
    observer.observe(skillContainer)
}
// NB: querySelectorAll returns a nodelist even if that element is not present on a page hence it is always true
const slider = document.querySelectorAll('.slider')
const faders = document.querySelectorAll('.faders')
const bottomFaders = document.querySelectorAll('.bottom-faders');
const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear')
            appearOnScroll.unobserve(entry.target)
        }
    })
}, {
    threshold: 0,
    rootMargin: '0px 0px -200px 0px '
})

if (slider.length > 0) {
    console.log("Slider Class Present in this Page")
    slider.forEach(slide => {
        appearOnScroll.observe(slide)
    })
} else {
    console.log('Slider class not present')
}

if (faders.length > 0) {
    faders.forEach(fader => {
        appearOnScroll.observe(fader)
    })
}


if (bottomFaders.length > 0) {
    bottomFaders.forEach(bottomFader => {
        appearOnScroll.observe(bottomFader)
    })
}


function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer)
        } else {
            element.textContent = Math.floor(start)
        }
    }, 16)
}


const statsObserver = new IntersectionObserver((entries, statsObserver) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            const counters = entry.target.querySelectorAll('.counter')
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target)
            })
            statsObserver.unobserve(entry.target)
        }
    })
}, {
    threshold: 0.5
})
const statsSection = document.querySelector('.stats')
if (statsSection) {
    statsObserver.observe(statsSection)
}


// const swiper = new Swiper('.swiper', {
//     slidesPerView: 3,
//     // Optional parameters
//     direction: 'horizontal',
//     loop: true,

//     // If we need pagination
//     pagination: {
//         el: '.swiper-pagination',
//     },

//     // Navigation arrows
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },

//     // And if we need scrollbar
//     scrollbar: {
//         el: '.swiper-scrollbar',
//     },
// });


// Form Submission

function validateName(val) {
    // Validate Username
    if (val.trim() === "") {
        return "Username is required"
    }
    return null
}


function validateEmail(val) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val.trim() === "") {
        return "Email is required"

    } else if (!emailRegex.test(val.trim())) {
        return "Invalid email"
    }

    return null
}


function validatePhone(val) {
    // Validate Phome
    const phoneRegex = /^(?:\+234|234|0)[7-9][0-1, 3-9][0-9]{8}$/;
    if (val.trim() === "") {
        return "Phone number is required"

    }
    else if (!phoneRegex.test(val.trim())) {
        return "Invalid phone number format"
    }

    return null

}
const form = document.querySelector('form')
const username = document.getElementById("uName")
const userphone = document.getElementById("uPhone")
const useremail = document.getElementById("uEmail")
const nameError = document.querySelector('.username p')
const phoneError = document.querySelector('.userphone p')
const emailError = document.querySelector('.useremail p')


if (form) {
    // Name Valdiation
    username.addEventListener('blur', (e) => {
        const message = validateName(e.target.value)
        nameError.textContent = message
    })
    username.addEventListener('input', (e) => {
        const message = validateName(e.target.value)
        nameError.textContent = message

    })

    // Phone Number Validation
    userphone.addEventListener('blur', (e) => {
        const message = validatePhone(e.target.value)
        phoneError.textContent = message
    })
    userphone.addEventListener('input', (e) => {
        const message = validatePhone(e.target.value)
        phoneError.textContent = message
    })


    // Email Validation

    useremail.addEventListener('blur', (e) => {
        const message = validateEmail(e.target.value)
        emailError.textContent = message
    })
    useremail.addEventListener('input', (e) => {
        const message = validateEmail(e.target.value)
        emailError.textContent = message
    })


}







function handleSubmit() {

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let isValid = true

        // Validate Name

        if (validateName(username.value) !== null) {
            isValid = false
        }
        // Validate Phone
        if (validatePhone(userphone.value) !== null) {
            isValid = false
        }

        // Validate Email
        if (validateEmail(useremail.value) !== null) {
            isValid = false
        }
        if (isValid) {
            alert("FOrm Submitted ")
            //Send EMail here 
            form.reset()
            // // Reset Error Messages 
            nameError.textContent = ""
            phoneError.textContent = ""
            emailError.textContent = ""
        }
    })
}

if (form) {
    handleSubmit()
}


//Email sender

/*function emailSend(){
    Email.send({
    host: "okealeander@gamil.com",
    username: "alexanderoke21@gmail.com",
    password: "",
    to: "",
    from: "",
    subject: "",
    body:""
    
    
    
    }).then(()=>{alert("Message sent Succefully")}).catch()
} */