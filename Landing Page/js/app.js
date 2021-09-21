const sections = document.querySelectorAll('section');
const mainNav = document.querySelector('.main-nav');
const openMenu = document.querySelector('.open-menu');
const cancelMenu = document.querySelector('.closed-menu');

document.addEventListener('DOMContentLoad', makeActive);

// Grab and make active navlink
function makeActive(navEl){
    const navLinks = document.querySelectorAll(`.nav-links li`);
    let activeLink;
    for(link of navLinks){
        activeLink = link.getAttribute('data-nav');
        if(navEl === activeLink){
            link.classList.add('active');
        } else{
            link.classList.remove('active');
        }
    }
}


// Open and Closing menu functionality
openMenu.addEventListener('click', () => {
    openMenu.classList.add('hide');
    cancelMenu.classList.add('show');
    mainNav.classList.add('active');
});

cancelMenu.addEventListener('click', () => {
    openMenu.classList.remove('hide');
    cancelMenu.classList.remove('show');
    mainNav.classList.remove('active');
});


// Creates a fragment of the navegation links and appends
// them to the DOM
function createNav() {
    const fragment = document.createDocumentFragment();
    const navUl = document.createElement('ul');
    navUl.setAttribute('class', 'nav-links');

    for(let i = 0; i < sections.length; i++){
        const sectionId = sections[i].getAttribute('id');
        const navLi = document.createElement('li');
        const navImg = document.createElement('img');
        const navLink = document.createElement('a');

        navLi.setAttribute('data-nav', `${sectionId}`);
        navImg.setAttribute('src', `images/mycollection/svg/${sectionId}.svg`);
        navImg.setAttribute('class', 'nav-link-icon');
        navLink.setAttribute('herf', `#${sectionId}`);
        navLink.textContent = `${sectionId}`;

        navLi.appendChild(navImg);
        navLi.appendChild(navLink);
        navUl.appendChild(navLi);
        fragment.appendChild(navUl);
    }

    mainNav.appendChild(fragment);
}
createNav();


document.addEventListener('scroll', grabActiveSection);
function grabActiveSection() {
    let currentSection;
    for (section of sections){
        // const box = section.getBoundingClientRect();
        const sectionTop = section.offsetTop;
        const sectionHeight= section.clientHeight/3;
        // const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        
        if(pageYOffset >= sectionTop - sectionHeight){
            currentSection = section.id;
            makeActive(currentSection);
        }
        console.log(pageYOffset, sectionTop, sectionHeight);
    }
}

scrollToSection();
function scrollToSection(){
    const navLinks = document.querySelectorAll(`.nav-links li`);
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            let navEl = link.getAttribute('data-nav');
            const sec = document.querySelector(`#${navEl}`);
            sec.scrollIntoView({behavior: "smooth", block: "start"});
        });
    });
}


