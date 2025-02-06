//! Lab Section 1

var menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

//! Part - 1 Getting Started

const mainEl = document.querySelector("main");
mainEl.style.backgroundColor = "var(--main-bg)";

mainEl.innerHTML = "<h1>DOM Manipulation</h1>";
mainEl.classList.add("flex-ctr");

//! Part - 2 Creating a Menu Bar

const topMenuEl = document.getElementById("top-menu");

topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";

topMenuEl.classList.add("flex-around");

//! Part - 3 Adding Menu Buttons

menuLinks.forEach((el) => {
  let menuLinks = document.createElement("a");
  menuLinks.setAttribute("href", el.href);
  menuLinks.textContent = el.text;
  topMenuEl.appendChild(menuLinks);
});

//! Lab Section 2
//! Part - 2 Adding Interactivity

const subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

const topMenuLinks = document.querySelectorAll("nav[id=top-menu] a");
topMenuLinks.forEach((el) => {
  el.addEventListener("click", function (e) {
    e.preventDefault();

    if (e.target.tagName !== "A") return;
    else {
      if (e.target.classList.contains("active")) {
        e.target.classList.toggle("active");
      } else {
        topMenuLinks.forEach((link) => link.classList.remove("active"));
        e.target.classList.toggle("active");
      }
      // filters the selected top menu link
      const selectedMenu = menuLinks.find(
        (item) => item.text === e.target.textContent
      );

      // If no subLinks, hide submenu and exit
      if (!selectedMenu || !selectedMenu.subLinks) {
        subMenuEl.style.top = "0"; // Hide submenu
        return;
      }

      buildSubMenu(subMenuEl, selectedMenu, subMenuEl);

      if (e.target.classList.contains("active")) {
        subMenuEl.style.top = "100%";
      } else {
        subMenuEl.style.top = "0";
      }
    }
  });
});

subMenuEl.addEventListener("click", (e) => {
  e.preventDefault();
  //checks if the child element that triggers the event is a link,
  // if not then do nothing!
  if (e.target.tagName !== "A") return;
  // if is a link, then console to check if that works
  console.log(e.target.textContent);
  // Hides the submenu because we've already selected
  // & remove the active state from the top menu
  subMenuEl.style.top = "0";
  topMenuLinks.forEach((link) => link.classList.remove("active"));
  //updates the body as per the selection of you sub menu's content
  mainEl.innerHTML = `<h1>${e.target.textContent.toUpperCase()}</h1>`;
});

function buildSubMenu(subMenuEl, selectedMenu, subMenuEl) {
  // Clear previous submenu content
  subMenuEl.innerHTML = "";

  // Populate submenu
  selectedMenu.subLinks.forEach((link) => {
    const subLink = document.createElement("a");
    subLink.textContent = link.text;
    subLink.setAttribute("href", link.href);
    subMenuEl.appendChild(subLink);
  });
}
