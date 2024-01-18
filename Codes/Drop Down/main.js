
const wrapper = document.querySelector(".wrapper"),
  selectBtn = document.querySelector(".display i"),
  displayName = document.querySelector(".name")
  searchInp = wrapper.querySelector("input"),
  options = wrapper.querySelector(".options"),
  optionBox = wrapper.querySelector(".option-box")
  
let countries = ["Afghanistan", "Algeria", "Argentina", "Australia", "Bangladesh", "Belgium", "Bhutan",
                 "Brazil", "Canada", "China", "Denmark", "Ethiopia", "Finland", "France", "Germany",
                 "Hungary", "Iceland", "India", "Indonesia", "Iran", "Italy", "Japan", "Malaysia",
                 "Maldives", "Mexico", "Morocco", "Nepal", "Netherlands", "Nigeria", "Norway", "Pakistan",
                 "Peru", "Russia", "Romania", "South Africa", "Spain", "Sri Lanka", "Sweden", "Switzerland",
                 "Thailand", "Turkey", "Uganda", "Ukraine", "United States", "United Kingdom", "Vietnam"];

function addCountry(selectedCountry) {
  options.innerHTML = "";
  countries.forEach(country => {
    let isSelected = country == selectedCountry ? "selected" : "";
    let div = `<div onclick="updateName(this)" class="${isSelected}">${country}</div>`;
    options.insertAdjacentHTML("beforeend", div);
  });
}
addCountry();

function updateName(selecteddiv) {
  searchInp.value = "";
  addCountry(selecteddiv.innerText);
  displayName.innerText= selecteddiv.innerText;
  optionBox.style.height = "0"
  optionBox.style.padding = "0"
  optionBox.style.overflow = "hidden"
  selectBtn.setAttribute("class","fa fa-angle-down")
}

searchInp.addEventListener("keyup", () => {
  let arr = [];
  let searchWord = searchInp.value.toLowerCase();
  arr = countries.filter(data => {
    return data.toLowerCase().startsWith(searchWord);
  }).map(data => {
    let isSelected = data == displayName.innerText ? "selected" : "";
    return `<div onclick="updateName(this)" class="${isSelected}">${data}</div>`;
  }).join("");
  options.innerHTML = arr ? arr : `<p style="margin-top: 10px; font-weight:600">Oops! Country not found</p>`;
});

selectBtn.addEventListener("click", () =>{
  if(selectBtn.className === "fa fa-angle-down")
  {
   selectBtn.setAttribute("class","fa fa-angle-up")
   optionBox.style.height="auto"
   optionBox.style.padding="15px"
   optionBox.style.overflow="initial"
  }
  else{
    selectBtn.setAttribute("class","fa fa-angle-down")
    optionBox.style.height = "0"
    optionBox.style.padding = "0"
    optionBox.style.overflow = "hidden"
  }
})



searchInp.addEventListener("keyup", () => {
  let arr = [];
  let searchWord = searchInp.value.toLowerCase();
  arr = countries.filter(data => {
    return data.toLowerCase().startsWith(searchWord);
  }).map(data => {
    let isSelected = data == displayName.innerText ? "selected" : "";
    return `<p onclick="updateName(this)" class="${isSelected}">${data}</p>`;
  }).join("");
  options.innerHTML = arr ? arr : `<p style="margin-top: 10px; font-weight:600">Oops! Country not found</p>`;
});
