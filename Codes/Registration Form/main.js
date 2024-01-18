
const tabBtn = document.querySelectorAll(".tab")
const containers = document.querySelectorAll('.personal-details, .document-details, .subject-details');
let borders = document.querySelectorAll(".border")
const head = document.querySelector(".head p")
const classDrop = document.querySelectorAll(".value span")
const classDropDown = document.querySelector(".drop-container")
const streamSelect = document.querySelector(".stream-select")
const subjectSelect = document.querySelector(".subject-select")
const documentError = document.querySelectorAll(".data .error")




classDropDown.style.display="none"


const heading = ["Personal Details","Subject Details","Document Details"]

const subjects = [
  [
    "Physics","Chemistry","Maths","English","Computer science","Economics"],
    [
      "Accountancy","Business Studies","English","computer science","Economics"],
  [
    "Political science","Civics","History","Geography","English","Economics"
        ],
  ]






borders[0].classList.add('display')
tabBtn[0].classList.add("active")


tabBtn.forEach((btn,index)=>{
   btn.addEventListener("click",()=>{
     document.querySelector(".main-container").scrollLeft = containers[index].offsetWidth * index
     head.innerHTML=heading[index]
     tabBtn.forEach(btn => btn.classList.remove("active"))
     btn.classList.add("active")
     borders.forEach(border => border.classList.remove("display"))
     borders[index].classList.add('display')
   })
})


classDrop[1].addEventListener("click",()=>{
    classDropDown.style.display="flex"
  const options = classDropDown.querySelectorAll("label")
  options.forEach((option,index) =>{
    option.addEventListener("click",()=>{
      classDropDown.style.display="none"
      classDrop[0].innerHTML= option.querySelector("input").value
    })
  })
})

document.addEventListener("click",(event)=>{
   if(!(classDropDown.contains(event.target)) && !(classDrop[1].contains(event.target)))
   {
     classDropDown.style.display="none"
   }
})


streamSelect.addEventListener("change",()=>{
   let id = streamSelect.value
   subjectSelect.innerHTML=""
   if(id != -1)
   {
   subjects[id].forEach(subject => 
   {
     let option = `<option>${subject}</subject>`
     subjectSelect.insertAdjacentHTML("beforeend",option)
   })
   }
   })
   
   
   
   
   const fileInput = document.querySelectorAll('.data input');
   
   // Get the file preview container element
   const filePreview = document.querySelectorAll('.preview-container');
   
   
   // Add an event listener to the file input
 fileInput.forEach((files,index)=> {
   files.addEventListener('change', function(event) {
         // Get the selected file
         const file = event.target.files[0];
         // Create a FileReader object
     if (!(file.name.toLowerCase().endsWith('.pdf'))) {
       documentError[index].innerHTML = "Select .pdf format file"
       return
     }
         const reader = new FileReader();
   
         // Set up the FileReader onload event
         reader.onload = function() {
             // Create an image element to day the file preview
    const uint8Array = new Uint8Array(reader.result);
    documentError[index].innerHTML = ""
      pdfjsLib.getDocument(uint8Array).promise.then(function(pdf) {
            // Render the first page of the PDF document
            pdf.getPage(1).then(function(page) {
                  const viewport = page.getViewport({ scale: 1 });
                  const canvas = document.createElement('canvas');
                  const context = canvas.getContext('2d');
                  canvas.width = viewport.width;
                  canvas.height = viewport.height;
      
                  // Render the PDF page on the canvas
                  const renderTask = page.render({
                    canvasContext: context,
                    viewport: viewport
                  });
       renderTask.promise.then(function() {
       filePreview[index].innerHTML = '';
       filePreview[index].appendChild(canvas);
       });
       });
       });
       };
       reader.readAsArrayBuffer(file);
       });
 })
 
 