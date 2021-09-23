/**
 *
 * Landing Page exercise.
 * Code builds navegation dynamically,
 * scrolls to sections from navegation,
 * and highlights navegation link in navegation bar upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/


// Get elements from the DOM
const sections = document.querySelectorAll('section');
const mainNav = document.querySelector('.main-nav');
const openMenu = document.querySelector('.open-menu');
const cancelMenu = document.querySelector('.closed-menu');
const btnContainer = document.querySelector('.top-btn');
const mainContainer = document.querySelector('main');
const heroSection =document.querySelector('.hero-section');



// Event listens for document to load and runs makeActive function
document.addEventListener('DOMContentLoad', makeActive);



/*
	* @description: create nav-links dynamically and appends them to DOM
	* @param {} 
	* @return {} 
*/
function createNav() {
    const fragment = document.createDocumentFragment();
    const navUl = document.createElement('ul');
    navUl.setAttribute('class', 'nav-links');

    // loops thru sections, creates elements, appends to DOM
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

// Call function
createNav();



/*
	* @description: checks whether the passed section ID matches menu item data-nav attribute
	* @param {document element} visible section upon scrolling html page
	* @return {} 
*/
function makeActive(navEl){

    // get all nav-links 
    const navLinks = document.querySelectorAll(`.nav-links li`);
    let activeLink;

    for(link of navLinks){

        // get nav-link attribute and check if it matches function param(NavEl)
        activeLink = link.getAttribute('data-nav');
        if(navEl === activeLink){
            link.classList.add('active');
        } else{
            link.classList.remove('active');
        }
    }
}



// Listens form scroll event and calls grabActiveSection function
document.addEventListener('scroll', grabActiveSection);


/*
	* @description: checks sections visibility upon scrolling & grabs current section
	* @param {} 
	* @return {} 
*/
function grabActiveSection() {
    let currentSection;
    for (section of sections){

        // stores section top value
        const sectionTop = section.offsetTop;

        // stores section third part of height
        const sectionHeight= section.clientHeight/3;

        if(pageYOffset >= sectionTop - sectionHeight){
            currentSection = section.id;
            makeActive(currentSection);
        }
    }
}


/*
	* @description: scrolls nav-links to view respective section
	* @param {} 
	* @return {} 
*/
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

// Call function
scrollToSection();


/*
	* @description: creates button to scroll to top
	* @param {} 
	* @return {} 
*/
function createtoTopBtn(){
    const button = document.createElement('button');
    btnContainer.appendChild(button);
    button.id="scrollToTop";
    button.innerHTML = '<i class="fas fa-chevron-up"></i>';
}

// Call function
createtoTopBtn();


// Events listens for scroll event and calls showToTopBtn function 
document.addEventListener('scroll', showToTopBtn);


/*
	* @description: shows and hides to-top-btn based on document scroll value
	* @param {} 
	* @return {} 
*/
function showToTopBtn(){
    if(pageYOffset >= 800){
        btnContainer.classList.add('show');
    } else{
        btnContainer.classList.remove('show');
    }
}


// Add scroll to top behavior to to-top-btn
btnContainer.addEventListener('click', () =>{
    heroSection.scrollIntoView({behavior: "smooth"});
});


// Open and Closing mobile menu functionality 
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


/*
	* @description: adds main element hight dynamically
	* @param {} 
	* @return {} 
*/
function setMainHeight(){
    const header = document.querySelector('header');
    const height = header.offsetHeight;
    mainContainer.style.paddingTop = height + 'px';
}

window.addEventListener('resize', setMainHeight);
window.addEventListener('load', setMainHeight);


// Sets top value of main-nav element depending on viewport width
function setmainNavHeight(){
    if(window.innerWidth <= 823) {
        const header = document.querySelector('header');
        const height = header.offsetHeight;
        mainNav.style.top = height + 'px';
       }
}

window.addEventListener('resize', setmainNavHeight);
window.addEventListener('load', setmainNavHeight);



