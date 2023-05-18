/**
 * Open the current clicked menu and close the other menus
 * @param {object} event - The DOM event
 */
function openMenu(event) {
    event.stopPropagation();
    event.preventDefault();

    var currentDropDownButton = event.target;
    var currentDropDownMenu = currentDropDownButton.parentNode.querySelector('.dropdown-menu');
    var isOpen = currentDropDownMenu.classList.contains('show');
    var dropDownMenus = document.querySelectorAll('#nav-bar-content .dropdown .dropdown-menu');
    for (var j = 0; j < dropDownMenus.length; j++) {
        dropDownMenus[j].classList.remove('show');
    }

    if (!isOpen) {
        currentDropDownMenu.classList.add('show');
        currentDropDownMenu.querySelector('.dropdown-item:first-child').focus();
    }
}

/**
 * Close the current open menu
 * @param {object} event - The DOM event
 */
function closeMenu(event) {
    var currentDropDownMenu = event.target.closest('.dropdown-menu');
    if (currentDropDownMenu) {
        currentDropDownMenu.classList.remove('show');
        var menuButton = currentDropDownMenu.parentNode.querySelector('.dropdown-toggle');
        menuButton.focus();
    }
}

/**
 * Toggle the navigation content
 * @param {object} event - The DOM event
 */
function toggleNavigation(event) {
    event.stopPropagation();
    event.preventDefault();

    var content = document.getElementById('nav-bar-content');
    var expanded = content.getAttribute('aria-expanded');

    if (expanded === 'true') {
        content.setAttribute('aria-expanded', 'false');
    } else {
        content.setAttribute('aria-expanded', 'true');
    }
}


document.addEventListener('DOMContentLoaded', function () {
    var dropDownToggles = document.querySelectorAll('#nav-bar-content .dropdown-toggle');

    for (var i = 0; i < dropDownToggles.length; i++) {
        dropDownToggles[i].addEventListener('click', openMenu, false);
        dropDownToggles[i].addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeMenu(event);
            }
        }, false);
    }

    document.querySelector('.navbar-toggler').addEventListener('click', toggleNavigation, false);

    document.addEventListener('keydown', function (event) {
        if (event.code === 'Tab') {
            var openMenus = document.querySelectorAll('.dropdown-menu.show');
            for (var j = 0; j < openMenus.length; j++) {
                openMenus[j].classList.remove('show');
            }
        } else if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
            var currentMenu = document.querySelector('.dropdown-menu.show');
            if (currentMenu) {
                var menuItems = currentMenu.querySelectorAll('.dropdown-item');
                if (menuItems.length > 0) {
                    event.preventDefault();
                    var currentIndex = Array.from(menuItems).indexOf(document.activeElement);
                    var newIndex = event.code === 'ArrowDown' ? (currentIndex + 1) % menuItems.length : (currentIndex - 1 + menuItems.length) % menuItems.length;
                    menuItems[newIndex].focus();
                }
            }
        } else if (event.code === 'Escape') {
            var openMenu = document.querySelector('.dropdown-menu.show');
            if (openMenu) {
                closeMenu(event);
            }
        } else if (event.code === 'Space') {
            event.preventDefault();
            event.target.click();
        }
    }, false);
}, false);

function changeFontSize(increaseFactor) {
    var txt = document.getElementById('root');
    var style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
    var currentSize = parseFloat(style);
    txt.style.fontSize = (currentSize + increaseFactor) + 'px';
}


