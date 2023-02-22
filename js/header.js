function headerWork()
{
    const headerMenu = document.getElementById('header-items');
    const headerToggle = document.getElementById('header-item-toggle');
    const headerClose = document.getElementById('header-item-close');
    
    if (headerToggle)
    {
        headerToggle.addEventListener('click', () => {
            headerMenu.classList.add('show-menu');
        });
    }
    
    if(headerClose)
    {
        headerClose.addEventListener('click', () => {
            headerMenu.classList.remove('show-menu');
        });
    }
    
    
    const itemLink = document.querySelectorAll('.header_item_link');
    function linkAction()
    {
        const headerMenu = document.getElementById('header-items');
        headerMenu.classList.remove('show-menu');
    }
    itemLink.forEach(n => n.addEventListener('click', linkAction));
}
headerWork();


function changeTheme()
{
    const themeButton = document.getElementById('theme-button');
    const darkTheme = 'dark-theme';
    const iconTheme = 'ri-sun-line';
    
    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');
    
    const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
    const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';
    
    if (selectedTheme)
    {
        document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
        themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme);
    }
    
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    });
}
changeTheme();