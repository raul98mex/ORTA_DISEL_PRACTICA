document.addEventListener("DOMContentLoaded", function () {
  // Menu items logic
  const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach(item => {
    item.addEventListener("click", function () {
        const targetId = this.getAttribute("data-target");
        const submenu = document.getElementById(targetId);
        const arrow = this.querySelector(".arrow");
        const isOpen = submenu && submenu.classList.contains("active");

        // Close all submenus
        document.querySelectorAll(".submenu").forEach(menu => {
            if (menu !== submenu) {
                menu.classList.remove("active");
                menu.style.display = "none";
            }
        });

        // Reset all arrows
        document.querySelectorAll(".arrow").forEach(a => {
            if (a !== arrow) {
                a.style.transform = "rotate(0deg)";
                a.style.color = ""; // Reset color
            }
        });

        // Toggle clicked submenu
        if (submenu) {
            if (isOpen) {
                submenu.classList.remove("active");
                submenu.style.display = "none";
                if (arrow) {
                    arrow.style.transform = "rotate(0deg)";
                    arrow.style.color = ""; // Reset color
                }
            } else {
                submenu.classList.add("active");
                submenu.style.display = "block";
                if (arrow) {
                    arrow.style.transform = "rotate(90deg)";
                    arrow.style.transition = "transform 0.5s";
                    arrow.style.color = "#DD2624"; // Set arrow color to orange
                }
            }
        }
    });
});

  // Sidebar toggle logic
  const toggleButton = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const navbar = document.querySelector('.navbar');
  const workspace = document.querySelector('.workspace');
  const body = document.body;

  let sidebarVisible = true;
  let hoverEnabled = true;
  let hoverSidebarEnabled = false; // Set to false at start to keep sidebar fixed on page load

  // Add transition style to sidebar
  if (sidebar) {
    sidebar.style.transition = 'left 0.3s';
    sidebar.style.position = 'fixed';
    sidebar.style.left = '0';
    sidebar.style.top = '0';
    sidebar.style.height = '100%';
  }

  // Add transition to workspace for smooth resizing
  if (workspace) {
    workspace.style.transition = 'margin-left 0.3s, width 0.3s';
  }

  const savedSidebarState = localStorage.getItem('sidebarState');
  if (savedSidebarState === 'closed') {
    sidebarVisible = false;
    hoverSidebarEnabled = true;
    sidebar.style.left = '-250px';
    navbar.style.left = '0';
    navbar.style.width = '100vw';
    workspace.style.marginLeft = '0';
    workspace.style.width = '100vw';
    body.classList.remove('with-sidebar');
    body.classList.add('no-sidebar');
    sidebar.classList.add('sidebar-hidden');
  } else {
    sidebarVisible = true;
    hoverSidebarEnabled = false;
    sidebar.style.left = '0';
    navbar.style.width = 'calc(100vw - 250px)';
    workspace.style.marginLeft = '250px';
    workspace.style.width = 'calc(100vw - 250px)';
    body.classList.remove('no-sidebar');
    body.classList.add('with-sidebar');
    sidebar.classList.remove('sidebar-hidden');
  }

  if (toggleButton && sidebar) {
    toggleButton.addEventListener('click', () => {
      sidebarVisible = !sidebarVisible;

      if (!sidebarVisible) {
        hoverEnabled = true;
        hoverSidebarEnabled = true;
        localStorage.setItem('sidebarState', 'closed');
        sidebar.style.left = '-250px';
        navbar.style.left = '0';
        navbar.style.width = '100vw';
        workspace.style.marginLeft = '0';
        workspace.style.width = '100vw';
        body.classList.remove('with-sidebar');
        body.classList.add('no-sidebar');
        sidebar.classList.add('sidebar-hidden');
      } else {
        hoverEnabled = true;
        hoverSidebarEnabled = false;
        localStorage.setItem('sidebarState', 'open');
        sidebar.style.left = '0';
        navbar.style.width = 'calc(100vw - 250px)';
        workspace.style.marginLeft = '250px';
        workspace.style.width = 'calc(100vw - 250px)';
        body.classList.remove('no-sidebar');
        body.classList.add('with-sidebar');
        sidebar.classList.remove('sidebar-hidden');
      }
    });
  }

  const hoverZone = document.createElement('div');
  hoverZone.style.position = 'fixed';
  hoverZone.style.left = '0';
  hoverZone.style.top = '0';
  hoverZone.style.width = '10px';
  hoverZone.style.height = '100vh';
  hoverZone.style.zIndex = '1000';
  hoverZone.style.cursor = 'pointer';
  hoverZone.style.background = 'transparent';
  document.body.appendChild(hoverZone);

  hoverZone.addEventListener('mouseenter', () => {
    if (hoverSidebarEnabled && hoverEnabled && !sidebarVisible) {
      sidebarVisible = true;
      if (sidebar) sidebar.style.left = '0';
      if (navbar) {
        navbar.style.width = 'calc(100vw - 250px)';
      }
      if (workspace) {
        workspace.style.marginLeft = '250px';
        workspace.style.width = 'calc(100vw - 250px)';
      }
      body.classList.remove('no-sidebar');
      body.classList.add('with-sidebar');
      if (sidebar) sidebar.classList.remove('sidebar-hidden');
    }
  });

  if (sidebar) {
    sidebar.addEventListener('mouseleave', () => {
      if (hoverSidebarEnabled && hoverEnabled && sidebarVisible) {
        sidebarVisible = false;
        sidebar.style.left = '-250px';
        navbar.style.left = '0';
        navbar.style.width = '100vw';
        workspace.style.marginLeft = '0';
        workspace.style.width = '100vw';
        body.classList.remove('with-sidebar');
        body.classList.add('no-sidebar');
        sidebar.classList.add('sidebar-hidden');
      }
    });
  }

});

//Dark mode//
  const toggleButton = document.getElementById('theme-toggle');
  const body = document.body;
  toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
  });
  // Load theme from localStorage
  window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
      body.classList.add('dark-mode');
    }
  });

