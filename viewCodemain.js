const codeBlock = document.querySelector("code")
const htmlTab = document.querySelectorAll(".tabs span")[0]
const cssTab = document.querySelectorAll(".tabs span")[1]
const jsTab = document.querySelectorAll(".tabs span")[2];
const profileCard = document.querySelector(".project-card")
const urlParams = new URLSearchParams(window.location.search);

// Get the value of the "file" parameter
const fileName = urlParams.get('file');
const fileDiscription = urlParams.get('description')
const fileThumbnail = urlParams.get('thumbnail')


function insertCard(fileName,fileDiscription,fileThumbnail){
  const card = `
  <div class="image">
     <img src="${fileThumbnail}">
   </div> 
   <div class = "info">
    <div class="name">
        <p class="head">Project Name</p>
            <span>${fileName}</span>
    </div> 
    <div class = "links">
      <p class="head">Link</p> 
        <a href = "#"disabled>Coming Soon</a> 
    </div> 
    </div>`
    profileCard.insertAdjacentHTML("beforeend",card)
}
insertCard(fileName,fileDiscription,fileThumbnail)
htmlTab.addEventListener("click",showHTML);
cssTab.addEventListener("click",showCSS);
jsTab.addEventListener("click",showJS);

async function displayCode(file) {
  
  try {
    const response = await fetch(`/Codes/${fileName}/${file}`);
    const htmlContent = await response.text();
    
    codeBlock.textContent = htmlContent;
    Prism.highlightElement(codeBlock);
  } catch (error) {
    
  }
}


function showHTML()
{
  codeBlock.classList.remove('language-css', 'language-javascript')
  htmlTab.style.backgroundColor = "black"
  cssTab.style.backgroundColor = "#6E6E6E"
  jsTab.style.backgroundColor = "#6E6E6E"
  codeBlock.classList.add('language-html')
  displayCode('index.txt')
}
function showCSS()
{
  cssTab.style.backgroundColor = "black"
  htmlTab.style.backgroundColor = "#6E6E6E"
  jsTab.style.backgroundColor = "#6E6E6E"
  codeBlock.classList.remove('language-html', 'language-javascript')
  codeBlock.classList.add('language-css')
  displayCode('style.css')
}
function showJS()
{
  jsTab.style.backgroundColor = "black"
  cssTab.style.backgroundColor = "#6E6E6E"
  htmlTab.style.backgroundColor = "#6E6E6E"
  codeBlock.classList.remove('language-html', 'language-css')
  codeBlock.classList.add('language-javascript')
  displayCode('main.js')
  
}


showHTML()

