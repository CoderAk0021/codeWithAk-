const mainContainer = document.querySelector("#mainContainer");
const searchInput = document.querySelector("#searchInput");
const paginationContainer = document.querySelector("#paginationControls");
const themeToggle = document.querySelector("#themeToggle");
const htmlElement = document.documentElement;

// --- 1. Data ---
const projects = [
  { thumbnail: 'thumbnails/carousel.jpg', name: 'Wallpaper Carousel', downloadid: '15UIDzWc8wjQFEzBL6cSsdCftpDDptFau', description: 'A smooth 3D wallpaper carousel interaction.' },
  { thumbnail: 'thumbnails/chatGptLogin.jpg', name: 'ChatGPT SignIn', downloadid: '16XhcEEMmiW5iYxwoD_KoXcazv1vhy03x', description: 'Pixel-perfect clone of the ChatGPT login UI.' },
  { thumbnail: 'thumbnails/loginForm.jpg', name: 'Modern Login', downloadid: '16UVjJiME3xo-zeQv3w1i84Al8EcbFsoO', description: 'Clean login form with validation.' },
  { thumbnail: 'thumbnails/otpValidator.jpg', name: 'OTP Validator', downloadid: '1MJ7b9BzGVwKZAo3TFCYN4Ddq5xRrB6SM', description: 'Secure OTP entry system with auto-focus.' },
  { thumbnail: 'thumbnails/RegistrationForm.jpg', name: 'Registration Form', downloadid: '16ZNaloZTQMJLAFVKDOXOfx9kpPbH4mXD', description: 'Student registration with file upload preview.' },
  { thumbnail: 'thumbnails/calendar.jpg', name: 'Dynamic Calendar', downloadid: '15gxNKPcOIjD5vjoSlQgoYtGxSObel40d', description: 'Interactive calendar with event handling.' },
  { thumbnail: 'thumbnails/Timer.jpg', name: 'Stopwatch Pro', downloadid: '', description: 'Precise timer with lap functionalities.' },
  { thumbnail: 'thumbnails/currencyConverter.jpg', name: 'Currency Converter', downloadid: '1G129AL56nRKZo3FuzA0O4mQzXvk1_Lk3', description: 'Real-time API based currency conversion.' },
  { thumbnail: 'thumbnails/DropDown.jpg', name: 'Smart Dropdown', downloadid: '16S-GaIyjk7cIoFoJp7ySOSiJ1aKFFcJY', description: 'Searchable dropdown menu component.' },
  { thumbnail: 'thumbnails/profileCard.jpg', name: 'Profile Card', downloadid: '15g18T6Omb4ru_42n5vvn_TxLiV1nbavR', description: 'Social profile card with hover effects.' },
  { thumbnail: 'thumbnails/QuizApp.jpg', name: 'Quiz Application', downloadid: '19TnhBQkXrPwCOs_Nmqd4sGRSArugXUvG', description: 'Full featured quiz app with score tracking.' },
  { thumbnail: 'thumbnails/YouTubeTab.jpg', name: 'YouTube Tabs', downloadid: '16Rc5TF_9d8NhOEc_MtLMcZT5YBneheMK', description: 'Horizontal scrollable categories.' },
  { thumbnail: 'thumbnails/PinChecker.jpg', name: 'Pin Finder', downloadid: '1y_ht6tEvzu2LEPFt-n2P7q_63-0IA4i9', description: 'Location utility based on Pincodes.' }
];

// --- 2. Pagination State ---
let currentPage = 1;
const rows = 6; // Projects per page

// --- 3. Render Function with Pagination ---
function displayList(items, wrapper, rows_per_page, page) {
    wrapper.innerHTML = "";
    page--;

    let start = rows_per_page * page;
    let end = start + rows_per_page;
    let paginatedItems = items.slice(start, end);

    if (paginatedItems.length === 0) {
        wrapper.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">No projects found.</p>';
        return;
    }

    paginatedItems.forEach(item => {
        const card = `
        <section class="card">
            <div class="image">
                <img src="${item.thumbnail}" alt="${item.name}" loading="lazy">
            </div>
            <div class="description">
                <h3 class="title">${item.name}</h3>
                <p class="about">${item.description}</p>
            </div>
            <div class="btns">
                <a href="viewCode.html?file=${encodeURIComponent(item.name)}&description=${encodeURIComponent(item.description)}&thumbnail=${encodeURIComponent(item.thumbnail)}" class="btn btn-view">
                    <i class="fa-regular fa-eye"></i> View Code
                </a>
                <a href="https://drive.google.com/file/d/${item.downloadid}/view?usp=drivesdk" target="_blank" class="btn btn-down">
                    <i class="fa-solid fa-download"></i> Download
                </a>
            </div>
        </section>`;
        wrapper.insertAdjacentHTML('beforeend', card);
    });
}

function setupPagination(items, wrapper, rows_per_page) {
    wrapper.innerHTML = "";
    let page_count = Math.ceil(items.length / rows_per_page);
    
    // Only show pagination if more than 1 page
    if (page_count < 2) return;

    for (let i = 1; i < page_count + 1; i++) {
        let btn = paginationButton(i, items);
        wrapper.appendChild(btn);
    }
}

function paginationButton(page, items) {
    let button = document.createElement('button');
    button.innerText = page;
    button.classList.add('page-btn');
    if (currentPage == page) button.classList.add('active');

    button.addEventListener('click', function () {
        currentPage = page;
        displayList(items, mainContainer, rows, currentPage);
        
        let current_btn = document.querySelector('.page-btn.active');
        current_btn.classList.remove('active');
        button.classList.add('active');
        
        // Scroll to top of main
        document.querySelector('.section-title').scrollIntoView({behavior: 'smooth'});
    });

    return button;
}

// --- 4. Search Logic ---
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = projects.filter(p => p.name.toLowerCase().includes(term));
    currentPage = 1; // Reset to page 1 on search
    displayList(filtered, mainContainer, rows, currentPage);
    setupPagination(filtered, paginationContainer, rows);
});

// --- 5. Theme Toggle Logic ---
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    themeToggle.innerHTML = newTheme === 'light' 
        ? '<i class="fa-solid fa-moon"></i>' 
        : '<i class="fa-solid fa-sun"></i>';
    
    // Optional: Save to local storage
    localStorage.setItem('theme', newTheme);
});

// Check Local Storage on load
const savedTheme = localStorage.getItem('theme');
if(savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'light' 
        ? '<i class="fa-solid fa-moon"></i>' 
        : '<i class="fa-solid fa-sun"></i>';
}

// Initial Load
displayList(projects, mainContainer, rows, currentPage);
setupPagination(projects, paginationContainer, rows);
