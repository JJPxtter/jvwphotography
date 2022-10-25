function CloseMenu()    
{    
    var menuList = document.getElementById("menu");
    var content = document.getElementById("content");     
    if (menuList.className == "menuOn")    
    {    
        content.className = "box menuOn"; 
        menuList.className = "menuOff";    
    } else    
    {    
      content.className = "box menuOff"; 
        menuList.className = "menuOn";    
    }    
} 

const hamburgerMenu = document.querySelector("#hamburger-menu");

function toggleNav() {
  // Toggle: Hamburger Open/Close
  hamburgerMenu.classList.toggle("active");
}

// Events Listeners
hamburgerMenu.addEventListener("click", toggleNav);
navItems.forEach((nav) => {
  nav.addEventListener("click", toggleNav);
});
