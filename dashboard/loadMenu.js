function handleLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('courseData'); // Remove courseData from localStorage
    sessionStorage.removeItem('authToken');
    
    // Clear browser history
    history.replaceState(null, null, '/dev/nocodb/');
    window.location.href = '/dev/nocodb/';
}

(async function loadGlobalMenu() {
  try {
    const response = await fetch('../menu.html');
    if (!response.ok) throw new Error('Failed to load menu');
    const menuHTML = await response.text();
    
    const menuContainer = document.createElement('div');
    menuContainer.id = 'global-menu';
    menuContainer.innerHTML = menuHTML;
    
    document.body.insertBefore(menuContainer, document.body.firstChild);
    
    // Resaltar enlace activo
    const currentPath = window.location.pathname;
    document.querySelectorAll('.global-menu a').forEach(link => {
      if (link.href === window.location.href || 
          currentPath.includes(link.getAttribute('href'))) {
        link.classList.add('text-blue-600', 'font-medium');
        link.classList.remove('text-gray-600');
      }
    });
    
  } catch (error) {
    console.error('Error loading global menu:', error);
  }
})();