/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const offsetPadding = 250;
let hideNavBar;
let prevScrollpos = window.pageYOffset;
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
const toTopOnScrollHundler = () => {
  // console.log(pageYOffset);
  if (window.pageYOffset >= 100) {
    document.querySelector("#toTop").style.visibility = "visible";
    document.querySelector("#toTop").style.opacity = "1";
  } else {
    document.querySelector("#toTop").style.visibility = "hidden";
    document.querySelector("#toTop").style.opacity = "0";
  }
};
const hideNavBarTimer = () => {
  hideNavBar = setTimeout(() => {
    document.querySelector(".page__header").style.top = `${document.querySelector(".page__header").offsetHeight * -1 -2}`;
  }, 3000);
};
const stopHideNavBarTimer = () => {
  clearTimeout(hideNavBar);
  document.querySelector(".page__header").style.top = "0";
};
const navBarhideHundler = () => {
  stopHideNavBarTimer();
  hideNavBarTimer();
};
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const buildNavBar = () => {
  const navBarUl = document.querySelector("#navbar__list");
  const sections = [...document.querySelectorAll("section")];
  let list = [];
  sections.forEach(function (section) {
    const item = {
      name: section.querySelector("div").querySelector("h2").innerHTML,
      id: section.id,
    };
    list.push(item);
  });
  list.forEach(function (listItem) {
    navBarUl.innerHTML += `<li class=""><a onclick="scrollToSection('#${listItem.id}')" class="menu__link ">${listItem.name}</a></li>`;
  });
  console.log(document.querySelector("section"));
};

// Add class 'active' to section when near top of viewport
const isActiveSectionHundler = () => {
  const sections = document.querySelectorAll("section");
  const navBarItems = document.querySelectorAll(".navbar__menu a");
  for (let i = 0; i < sections.length; i++) {
    if (i < sections.length - 1) {
      if (
        window.pageYOffset >= sections[i].offsetTop - offsetPadding &&
        window.pageYOffset < sections[i + 1].offsetTop - offsetPadding
      ) {
        sections[i].classList.add("your-active-class");
        navBarItems[i].classList.add("active");
      } else {
        sections[i].classList.remove("your-active-class");
        navBarItems[i].classList.remove("active");
      }
    } else if ((i = sections.length - 1)) {
      if (window.pageYOffset >= sections[i].offsetTop - offsetPadding) {
        sections[i].classList.add("your-active-class");
        navBarItems[i].classList.add("active");
      } else {
        sections[i].classList.remove("your-active-class");
        navBarItems[i].classList.remove("active");
      }
    }
  }
};

// Scroll to anchor ID using scrollTO event
const toTop = () => {
  scrollTo(0, 0);
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildNavBar();

// Scroll to section on link click
const scrollToSection = (selcetor) => {
  scrollTo(0, document.querySelector(selcetor).offsetTop);
};
// Set sections as active hundler & navigation bar hundler & back to top butten hundler
window.onscroll = function () {
  toTopOnScrollHundler();
  isActiveSectionHundler();
  navBarhideHundler();
};
