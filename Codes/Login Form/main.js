
let pass = document.querySelector(".pass input")
let emailSpan = document.querySelector(".email span")
let passSpan = document.querySelector(".pass span")
let btn = document.querySelector("button")

let showBtn = document.querySelector("label")
let show = document.querySelector(".show input")

email.addEventListener("input",()=>{
  
  if(email.value != "")
  {
  email.style.backgroundColor="#2962FF47"
  email.style.borderWidth="2px"
  emailSpan.style.borderWidth="2px"
  email.style.borderColor="#4D5CFC"
  emailSpan.style.backgroundColor="#4D5CFC"
  }
  else{
    email.style.backgroundColor="#fff"
    email.style.borderWidth="1px"
    emailSpan.style.borderWidth="1px"
    email.style.borderColor="#4D5CFC"
    emailSpan.style.backgroundColor = "#7782FB"
  }
  
})


pass.addEventListener("input",()=>{
  
  if(pass.value != "")
  {
  pass.style.backgroundColor="#2962FF47"
  pass.style.borderWidth="2px"
  passSpan.style.borderWidth="2px"
  pass.style.borderColor="#4D5CFC"
  passSpan.style.backgroundColor="#4D5CFC"
  
  }
  else{
    pass.style.backgroundColor="#fff"
    pass.style.borderWidth="1px"
    passSpan.style.borderWidth="1px"
    pass.style.borderColor="#4D5CFC"
    passSpan.style.backgroundColor = "#7782FB"
    
  }
  
})


showBtn.addEventListener("click",()=>{
  if(!show.checked)
  {
    pass.setAttribute("type","text")
  }
  else{
    pass.setAttribute("type","password")
  }
})