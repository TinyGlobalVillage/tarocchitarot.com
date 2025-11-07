// Get the elements
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const sidebarLinks = document.querySelectorAll('.sidebar a');
const nav = document.getElementById('main-nav');
const mobileHomeIcon = document.querySelector('.mobile-home-icon');
const subscribeButton = document.querySelector('a[href="#contact"]');
const desktopHomeIcon = document.querySelector('.home-icon-desktop');
const sidebarHomeIcon = document.querySelector('.home-icon-sidebar');
const width = window.innerWidth;
const height = window.innerHeight;
const arrowUp = document.getElementById('scroll-arrow-up');
const arrowDown = document.getElementById('scroll-arrow-down');

function scrollToSection(event) {
    event.preventDefault(); // Prevent default anchor behavior

    const targetId = this.getAttribute('href'); // Get the target section ID, e.g., "#contact"
    const targetElement = document.querySelector(targetId); // Select the target element

    if (targetElement) {
        const navbarHeight = document.querySelector('nav') ? document.querySelector('nav').offsetHeight : 0; // Get the navbar height, or 0 if navbar doesn't exist
        const isMobile = window.innerWidth <= 885; // Check if screen width is less than or equal to 885px

        let targetPosition = targetElement.offsetTop - navbarHeight; // Calculate scroll position accounting for navbar height

        // If it's a mobile screen (<= 885px), make sure it scrolls exactly to the top of the section
        if (isMobile) {
            targetPosition = targetElement.offsetTop; // Scroll to the exact top of the section in mobile
        }

        // Smooth scroll to the target section
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Update the URL hash
        history.pushState(null, null, targetId);
    }
}

// Apply the scroll behavior to all service-related links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', scrollToSection);
});


// Function to check if the link is internal
function isInternalLink(link) {
    return link.getAttribute('href').startsWith('#'); // True for internal links
}

// Function to handle all sidebar links
function handleSidebarLinks(event) {
    const href = this.getAttribute('href'); // Get the href of the link

    if (isInternalLink(this)) {
        // Internal link - use scroll behavior
        scrollToSection.call(this, event);
    } else {
        // External link - allow default behavior
        window.open(href, '_blank'); // Open external links in a new tab
    }
}

// Add event listeners to all sidebar links
sidebarLinks.forEach(link => {
    link.addEventListener('click', handleSidebarLinks);
});

// Scroll to the home section and update the address bar
function scrollToHome() {
    const homeSection = document.querySelector('#home');

    // if (homeSection) {
    //     // const homePosition = homeSection.offsetTop - navbarHeight;

    //     window.scrollTo({
    //         top: homePosition,
    //         behavior: 'smooth'
    //     });

    //     history.pushState(null, null, '#home');
    // }

    if (targetElement) {
        const isMobile = window.innerWidth <= 885; // Check if screen width is less than or equal to 885px

        let targetPosition;

        if (isMobile) {
            // For mobile, scroll to the exact top of the section
            targetPosition = targetElement.offsetTop;
        } else {
            // For desktop, account for navbar height
            const navbarHeight = document.querySelector('nav') ? document.querySelector('nav').offsetHeight : 0;
            targetPosition = targetElement.offsetTop - navbarHeight;
        }

        // Smooth scroll to the target section
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Update the URL hash
        history.pushState(null, null, targetId);
    }
}

// Desktop Home Icon
if (desktopHomeIcon) {
    desktopHomeIcon.addEventListener('click', function (e) {
        e.preventDefault();
        scrollToHome(); // Custom scroll function
    });
}

// Sidebar Home Icon

if (sidebarHomeIcon) {
    sidebarHomeIcon.addEventListener('click', function (e) {
        e.preventDefault();
        scrollToHome(); // Same function can be used here
    });
}
// Event listener for mobile home icon - removed preventDefault to allow default anchor behavior
if (mobileHomeIcon) {
    mobileHomeIcon.addEventListener('click', function (e) {
        scrollToHome(); // Custom scroll behavior to #home
    });
}




// Add event listeners for all sidebar links
sidebarLinks.forEach(link => {
    link.addEventListener('click', scrollToSection);
});

// Toggle the sidebar and mobile home icon visibility
function toggleSidebar() {
    // Toggle the 'open' class for the sidebar
    sidebar.classList.toggle('open');

    // Toggle the 'active' class for hamburger menu (for transforming into X)
    hamburger.classList.toggle('active');

    // Toggle the visibility of the mobile home icon based on sidebar state
    if (sidebar.classList.contains('open')) {
        // Hide the mobile home icon when the sidebar is open
        mobileHomeIcon.style.display = 'none';
    } else {
        // Show the mobile home icon when the sidebar is closed
        mobileHomeIcon.style.display = 'none';
    }

    // Change the hamburger icon to 'X' when the sidebar is open, and reset when closed
    hamburger.innerHTML = hamburger.classList.contains('active') ? '&times;' : '&#9776;';
}

// Close the sidebar when a link is clicked
function closeSidebar() {
    sidebar.classList.remove('open'); // Close sidebar
    hamburger.classList.remove('active'); // Reset hamburger icon to normal
    hamburger.innerHTML = '&#9776;'; // Reset icon

}

// Event listener for hamburger to toggle sidebar
hamburger.addEventListener('click', toggleSidebar);

// Close sidebar when any sidebar link is clicked
sidebarLinks.forEach(link => {
    link.addEventListener('click', closeSidebar);
});


// Enable scroll function
// function enableScroll() {
//     window.removeEventListener('wheel', preventScroll);
//     window.removeEventListener('touchmove', preventScroll);
//     window.removeEventListener('keydown', preventArrowKeys);
// }

function preventScroll(e) {
    e.preventDefault();
}

function preventArrowKeys(e) {
    if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}

// Ensure proper resizing behavior between mobile and desktop view
function handleResize() {
    const screenWidth = window.innerWidth;

    if (screenWidth > 767) {
        mobileHomeIcon.style.display = 'none'; // Hide mobile home icon in desktop view
    } else {
        mobileHomeIcon.style.display = 'block'; // Show mobile home icon in mobile view
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const faqQuestions = document.querySelectorAll('.faq-questions h3');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            const parentDiv = this.parentElement;
            parentDiv.classList.toggle('active');

            const answer = parentDiv.querySelector('p, ul');
            if (answer.style.maxHeight) {
                // Collapse the answer
                answer.style.maxHeight = null;
            } else {
                // Expand the answer
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});
window.addEventListener('DOMContentLoaded', () => {
    let lastScrollTop = 0;

    const handleScroll = () => {
        const windowScrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.body.scrollHeight;

        // Detect scrolling direction
        const scrollingUp = windowScrollY < lastScrollTop;
        lastScrollTop = windowScrollY;

        // Show/hide mobile-home-icon and up arrow based on scroll position
        if (windowScrollY > windowHeight * 0.25) {
            arrowUp.style.opacity = '1';
            mobileHomeIcon.style.display = 'inline-block'; // Show icon
        } else {
            arrowUp.style.opacity = '0';
            mobileHomeIcon.style.display = 'none'; // Hide icon at the top
        }

        // Manage visibility of down arrow
        if ((windowHeight + windowScrollY) >= docHeight) {
            arrowDown.style.opacity = '0';  // Hide down arrow at bottom
            arrowUp.style.opacity = '1';    // Show up arrow at bottom
        } else {
            arrowDown.style.opacity = '1';  // Show down arrow if not at the bottom
        }

        // Ensure mobile-home-icon is visible when scrolling up past 80% threshold
        if (scrollingUp && windowScrollY > windowHeight * 0.8) {
            mobileHomeIcon.style.display = 'inline-block';
        }
    };

    // Scroll listener
    window.addEventListener('scroll', handleScroll);

    // Scroll to top and hide the mobile home icon
    const scrollToTopAndHideIcon = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        arrowUp.style.opacity = '0';  // Hide up arrow
        arrowDown.style.opacity = '1';  // Show down arrow
        mobileHomeIcon.style.display = 'none';  // Hide mobile home icon
    };

    // Handle mobile-home-icon click
    if (mobileHomeIcon) {
        mobileHomeIcon.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToTopAndHideIcon();
        });
    }

    // Handle sidebarHomeIcon click if it exists
    if (sidebarHomeIcon) {
        sidebarHomeIcon.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToTopAndHideIcon();
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const popupOverlay = document.querySelector('.popup-overlay');
    const closeButton = document.querySelector('.close-popup');
    const popupContent = document.querySelector('.popup-content');

    // Show popup after 3 seconds
    setTimeout(() => {
        popupOverlay.style.display = 'flex';  // Ensure it's visible
        popupOverlay.style.opacity = '1';
        // console.log('Popup displayed');
    }, 3000);  // Popup appears after 3 seconds

    // Close popup when clicking the close button
    closeButton.addEventListener('click', () => {
        popupOverlay.style.display = 'none';  // Hide when close button is clicked
        // console.log('Popup closed by close button');
    });

    // Close popup when clicking outside of the popup-content
    popupOverlay.addEventListener('click', (event) => {
        if (!popupContent.contains(event.target)) {
            popupOverlay.style.display = 'none';  // Close if clicked outside of popup content
            // console.log('Popup closed by clicking outside');
        }
    });

    // Prevent closing when clicking inside the popup-content
    popupContent.addEventListener('click', (event) => {
        event.stopPropagation();  // Stop the event from bubbling up to the overlay
    });
});

// Define error handler for any potential errors
function errorHandler(error) {
    console.error('Error: ', error);
}


// Check for persistent storage availability
navigator.storage.persist().then(persistent => {

}).catch(errorHandler);

if (window.showOpenFilePicker) {
    // Use File System Access API if available
    async function requestFileAccess() {
        try {
            const [fileHandle] = await window.showOpenFilePicker();
            const file = await fileHandle.getFile();
            console.log(`Opened file: ${file.name}`);
        } catch (error) {
            console.error('Error accessing file:', error);
        }
    }

    // Example usage
    requestFileAccess();
} else {



}
// Automatically insert the current year into the footer
document.getElementById('current-year').textContent = new Date().getFullYear();


window.addEventListener('DOMContentLoaded', (event) => {
    // Check if there is a hash in the URL
    const hash = window.location.hash;
    if (hash) {
        // Use the hash to find the target element
        const targetElement = document.querySelector(hash);

        if (targetElement) {
            // Scroll smoothly to the element and align it to the top of the viewport
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
});

// Helper function to set a cookie
function setCookie(name, value, hours) {
    const d = new Date();
    d.setTime(d.getTime() + (hours * 60 * 60 * 1000)); // Set the expiration time
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
    console.log(`${name} cookie set with value: ${value}, expires in: ${hours} hours`);
}

// Helper function to get a cookie value
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to check if the user has subscribed or seen the popup in the last 6 hours
function checkSubscription() {
    const subscribed = getCookie("subscribed"); // Check if user is subscribed
    const popupSeen = getCookie("popupSeen");   // Check if popup was seen in last 6 hours

    console.log("subscribed:", subscribed); // Log subscribed status
    console.log("popupSeen:", popupSeen);   // Log popupSeen status

    // If no cookie found, show the popup and set "popupSeen"
    if (!subscribed && !popupSeen) {
        console.log("Popup will be shown after delay");
        setTimeout(() => {
            document.querySelector('.popup-overlay').style.display = 'flex';
            // After showing popup, set popupSeen cookie to prevent immediate re-showing
            setCookie("popupSeen", "true", 6);
        }, 3000); // Show the popup after 3 seconds
    } else {
        console.log("Popup not shown, user either subscribed or has seen it recently.");
    }
}

// Function to close the popup and set the "subscribed" cookie
function closePopup() {
    document.querySelector('.popup-overlay').style.display = 'none';
    setCookie("subscribed", "true", 6); // Set the "subscribed" cookie for 6 hours
}

// Event listener for the close button
document.querySelector('.close-popup').addEventListener('click', closePopup);

// Event listener to close the popup if clicked outside of it
document.querySelector('.popup-overlay').addEventListener('click', function (e) {
    if (e.target === this) {
        closePopup();
    }
});

// Check subscription status on page load
window.onload = checkSubscription;
