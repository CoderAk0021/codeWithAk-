let navBtn = document.querySelector(".nav-bar-btn")
let header = document.querySelector(".sticky-nav")
let mainContainer = document.querySelector("main")

navBtn.addEventListener("click", Expand)





links = [
  { 'thumbnail': 'thumbnails/carousel.jpg', 'name': 'Wallpaper Carousel', 'downloadid': '15UIDzWc8wjQFEzBL6cSsdCftpDDptFau', 'description': 'A superb Wallpaper carousel made with HTML CSS and JavaScript'},
  { 'thumbnail': 'thumbnails/chatGptLogin.jpg', 'name': 'ChatGPT SignInForm', 'downloadid': '16XhcEEMmiW5iYxwoD_KoXcazv1vhy03x', 'description': 'It is the clone of the chatGPT login page.' },
  { 'thumbnail': 'thumbnails/loginForm.jpg', 'name': 'Login Form', 'downloadid': '16UVjJiME3xo-zeQv3w1i84Al8EcbFsoO', 'description': 'A beautiful template of login form.' },
  { 'thumbnail': 'thumbnails/otpValidator.jpg', 'name': 'OTP Validator', 'downloadid': '1MJ7b9BzGVwKZAo3TFCYN4Ddq5xRrB6SM', 'description': 'It will provide you an idea to make a operational OTP Validator.' },
  { 'thumbnail': '/thumbnails/RegistrationForm.jpg', 'name': 'Registration Form', 'downloadid': '16ZNaloZTQMJLAFVKDOXOfx9kpPbH4mXD', 'description': 'It is a school registration form and it has all concept for handling and viewing pdfs.' },
    { 'thumbnail': 'thumbnails/calendar.jpg', 'name': 'Calendar', 'downloadid': '15gxNKPcOIjD5vjoSlQgoYtGxSObel40d', 'description': 'A basic calendar that will give you an idea to develop your own calendar.' },
      { 'thumbnail': 'thumbnails/Timer.jpg', 'name': 'Timer', 'downloadid': '', 'description': 'A simple yet beautiful stop watch made by using HTML CSS and JavaScript' },
      { 'thumbnail': 'thumbnails/currencyConverter.jpg', 'name': 'Currency Converter', 'downloadid': '1G129AL56nRKZo3FuzA0O4mQzXvk1_Lk3', 'description': 'A real time currency exchange web app made using html css and javascript.' },
      { 'thumbnail': 'thumbnails/DropDown.jpg', 'name': 'Drop Down', 'downloadid': '16S-GaIyjk7cIoFoJp7ySOSiJ1aKFFcJY', 'description': 'A beautiful drop-down with search facility, definitely you will love it' },
      { 'thumbnail': 'thumbnails/profileCard.jpg', 'name': 'Profile Card', 'downloadid': '15g18T6Omb4ru_42n5vvn_TxLiV1nbavR', 'description': 'This is a profile card that will give you a start to make some crazy profile cards.' },
      { 'thumbnail': 'thumbnails/QuizApp.jpg', 'name': 'Quiz App', 'downloadid': '19TnhBQkXrPwCOs_Nmqd4sGRSArugXUvG', 'description': 'This is a very interesting quiz app that will give you four option to select and also provide you the result in a dashboard.' },
      { 'thumbnail': 'thumbnails/YouTubeTab.jpg', 'name': 'Youtube Tab', 'downloadid': '16Rc5TF_9d8NhOEc_MtLMcZT5YBneheMK', 'description': 'We are familiar with the YouTube scrolling tabs ,this is the clone of it' }
  ]


function Expand()
{
  header_height = header.offsetHeight;
  if((header_height == 61) || (header_height == 130) )
  {
    header.style.height = (header_height == 61) ? '130px' : '61px';
    navBtn.style.outline = (header_height == 61) ? '2px solid #828CFF' : 'none'
  }
  else if(header_height == 118 || header_height == 230){
    header.style.height = (header_height == 118) ? '230px' : '118px';
    navBtn.style.outline = (header_height == 118) ? '4px solid #828CFF' : 'none'
  }
  
  
}

function download(fileId) {
  // Construct the direct download link
  const downloadLink = `https://drive.google.com/file/d/${fileId}/view?usp=drivesdk`;

  // Create a link element
  const link = document.createElement('a');
  link.href = downloadLink;
  link.target = '_blank_';
  link.download = `downloaded-file-${fileId}.zip`; // Set a default file name

  // Append the link to the document
  document.body.appendChild(link);

  // Trigger a click event on the link to start the download
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
}

function insertCard() {
  for (let i = 0; i < links.length; i++)
  {
    card = ` 
    <section class="card">
      <div class="image">
         <img src="${links[i].thumbnail}">
      </div>
      <div class="discription">
        <h3 class="title">${links[i].name}</h3>
        <p class="about">${links[i].description}</p>
      </div>
      <div class="btns">
        <a href="viewCode.html?file=${links[i].name}&description=${links[i].description}&thumbnail=${links[i].thumbnail}" id="viewCode" class="btn" target="_self">View</a>

        <a href="https://drive.google.com/file/d/${links[i].downloadid}/view?usp=drivesdk" target="_blank_" class="btn" id="download">Download</a>
      </div>
    </section>`
    mainContainer.insertAdjacentHTML('beforeend',card)
  }
}
insertCard()



document.querySelector('.search-bar input').addEventListener('input', function () {
  const searchTerm = this.value.trim();
  const filteredProjects = filterProjects(searchTerm);
  displayProjects(filteredProjects);
});


// Function to filter projects based on search input
function filterProjects(searchTerm) {
  const filteredProjects = links.filter(project=> project.name.toLowerCase().includes(searchTerm.toLowerCase()));
  return filteredProjects;
}

// Function to display filtered projects
function displayProjects(filteredProjects) {
  
  mainContainer.innerHTML = '';

  if (filteredProjects.length === 0) {
    mainContainer.innerHTML = '<p style="font-weight: 450; color: red; text-align: center;">No matching projects found.</p>';
  } else {
    filteredProjects.forEach(project => {
      const projectElement = `
      <section class="card">
          <div class="image">
               <img src="${project.thumbnail}">
          </div>
          <div class="discription">
             <h3 class="title">${project.name}</h3>
             <p class="about">${project.description}</p>
          </div>
          <div class="btns">
              <a href="viewCode.html?file=${project.name}&description=${project.description}&thumbnail=${project.thumbnail}" id="viewCode" class="btn" target="_self">View</a>
              <a href="https://drive.google.com/file/d/${project.downloadid}/view?usp=drivesdk" target="_blank_" class="btn" id="download">Download</a>
           </div>
       </section>`
      mainContainer.insertAdjacentHTML("beforeend",projectElement)
    });
  }
}


