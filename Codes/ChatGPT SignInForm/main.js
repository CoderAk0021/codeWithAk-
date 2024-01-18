
let input = document.querySelector("input")
let emailLabel = document.querySelector(".email")
input.addEventListener("focus", () => {
  if (input.value == "")
  {
    input.style.borderColor = "#32A175"
    emailLabel.style.setProperty("--labelColor", "#32A175")
    emailLabel.style.setProperty("--labelFontSize", "12px")

    emailLabel.style.setProperty("--labelzIndex", "1")
    emailLabel.style.setProperty("--labelTop", "-23px")
    emailLabel.style.setProperty("--labelLeft","-263px")
  }

})

input.addEventListener("blur",()=>{
  if(input.value == "")
  {
   input.style.borderColor="lightgray"
   
   emailLabel.style.setProperty("--labelColor", "gray")
   emailLabel.style.setProperty("--labelFontSize", "17px")
   
   emailLabel.style.setProperty("--labelzIndex", "-1")
   emailLabel.style.setProperty("--labelTop", "-1px")
  }
})

window.onload = (event) => {
  input.focus()
};
