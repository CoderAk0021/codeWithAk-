const codeBlock = document.getElementById("codeBlock");
const tabs = document.querySelectorAll(".tab");
const projectInfo = document.getElementById("projectInfo");

const urlParams = new URLSearchParams(window.location.search);
const fileName = urlParams.get('file');
const fileDesc = urlParams.get('description');
const fileThumb = urlParams.get('thumbnail');

// 1. Check if we have data
if(!fileName) {
    document.body.innerHTML = "<h2 style='text-align:center; margin-top:50px;'>Error: No project selected.</h2>";
}

// 2. Render Sidebar
function renderInfo() {
  projectInfo.innerHTML = `
    <img src="${fileThumb}" alt="${fileName}">
    <h2 style="color:var(--text-main); margin-bottom:0.5rem; font-size:1.5rem;">${fileName}</h2>
    <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:1.5rem; line-height:1.6;">${fileDesc}</p>
    <div style="border-top:1px solid var(--border); padding-top:1rem;">
      <p style="font-weight:600; font-size:0.9rem; margin-bottom:10px;">Technologies:</p>
      <div style="display:flex; gap:10px;">
        <i class="fa-brands fa-html5 fa-2x" style="color:#e34c26"></i>
        <i class="fa-brands fa-css3-alt fa-2x" style="color:#264de4"></i>
        <i class="fa-brands fa-js fa-2x" style="color:#f0db4f"></i>
      </div>
    </div>
  `;
}

// 3. Fetch Code Logic
async function loadCode(fileType) {
  let actualFile = 'index.txt'; // Using your naming convention
  let langClass = 'language-html';

  if (fileType === 'css') {
    actualFile = 'style.css';
    langClass = 'language-css';
  } else if (fileType === 'js') {
    actualFile = 'main.js';
    langClass = 'language-javascript';
  }

  codeBlock.textContent = "Fetching code...";
  codeBlock.className = ''; 
  codeBlock.classList.add(langClass);

  try {
    const response = await fetch(`Codes/${fileName}/${actualFile}`);
    if (!response.ok) throw new Error("File not found");
    
    const text = await response.text();
    codeBlock.textContent = text;
    Prism.highlightElement(codeBlock);
    
  } catch (error) {
    codeBlock.textContent = `// Error: Could not load ${actualFile}.\n// Please ensure the file exists in the Codes/${fileName}/ folder.`;
  }
}

// 4. Tab Switching
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    loadCode(tab.dataset.type);
  });
});

renderInfo();
loadCode('html'); // Initial Load
