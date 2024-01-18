

let api = `https://restcountries.com/v3.1/all`
var currencyCodes = [];
var countries = []

fetch(api)
  .then(response => response.json())
  .then(data => {
   
    for (let i = 0;i < data.length;i++) {
       
      for(const code in data[i].currencies)
      {
        let newObj = {
          value : `${code}`,
          flag : data[i].flags.png,
          name : data[i].name.official
          }
       
     currencyCodes.push(newObj)
      }
      
    }
   

    addCountry(currencyCodes)
    
  })
  .catch(error => console.error(error));



let fromDropdown = document.querySelector(".from-dropdown")
let toDropdown = document.querySelector(".to-dropdown")
let fromSearchInput = document.querySelector(".from input")
let toSearchInput = document.querySelector(".to input")
let amount = document.querySelector(".input-field input")
let display = document.querySelectorAll(".display "),
selectBtn = document.querySelectorAll(".display i"),
  displayName = document.querySelectorAll(".name"),
  options = document.querySelectorAll(".options"),
  optionBox = document.querySelectorAll(".option-box"),
  screen = document.querySelector(".screen");


let k = 0;

function addCountry(selectedCountry) {
  options[0].innerHTML = "";
  options[1].innerHTML=""
  for(let i = 0;i < currencyCodes.length;i++) {
    let isSelected = currencyCodes[i].value == selectedCountry ? "selected" : "";
    let div = `<div onclick="updateName(this)" class="${isSelected}">
    <img src =${currencyCodes[i].flag} width="30px">
    <p>
    <span class="code"value = ${currencyCodes[i].value}>${currencyCodes[i].value}</span> <span class="country">${currencyCodes[i].name}
    </span>
    </p>
    </div>`;
      let divEl = `<div onclick="uptodateName(this)" class="${isSelected}">
        <img src =${currencyCodes[i].flag} width="30px">
        <p>
        <span class="code"value = ${currencyCodes[i].value}>${currencyCodes[i].value}</span> <span class="country">${currencyCodes[i].name}
        </span>
        </p>
        </div>`;
    
    options[0].insertAdjacentHTML("beforeend", div);
    options[1].insertAdjacentHTML("beforeend", divEl);
    
    k++;
  }
}

function updateName(selecteddiv) {
  display[0].style.border="1px solid lightgray"
  fromSearchInput.value = "";
  displayName[0].innerHTML= selecteddiv.innerHTML ;
  
  optionBox[0].style.height = "0"
  optionBox[0].style.padding = "0"
  optionBox[0].style.overflow = "hidden"
  selectBtn[0].setAttribute("class","fa fa-angle-down")
  
}
function uptodateName(selecteddiv) {
  display[1].style.border="1px solid lightgray"
  toSearchInput.value = "";
  displayName[1].innerHTML= selecteddiv.innerHTML ;
  
  optionBox[1].style.height = "0"
  optionBox[1].style.padding = "0"
  optionBox[1].style.overflow = "hidden"
  selectBtn[1].setAttribute("class","fa fa-angle-down")
  
}



selectBtn[0].addEventListener("click", () => {
  if (selectBtn[0].className === "fa fa-angle-down")
  {
    display[0].style.border="1.2px solid #4F5AD2"
    selectBtn[0].setAttribute("class", "fa fa-angle-up")
    optionBox[0].style.height = "auto"
    optionBox[0].style.padding = "15px"
    optionBox[0].style.overflow = "initial"
  }
  else {
    display[0].style.border="1px solid lightgray"
    selectBtn[0].setAttribute("class", "fa fa-angle-down")
    optionBox[0].style.height = "0"
    optionBox[0].style.padding = "0"
    optionBox[0].style.overflow = "hidden"
  }
})
selectBtn[1].addEventListener("click", () => {
  if (selectBtn[1].className === "fa fa-angle-down")
  {
    display[1].style.border="1px solid #4F5AD2"
    selectBtn[1].setAttribute("class", "fa fa-angle-up")
    optionBox[1].style.height = "auto"
    optionBox[1].style.padding = "15px"
    optionBox[1].style.overflow = "initial"
  }
  else {
    display[1].style.border="1px solid lightgray"
    selectBtn[1].setAttribute("class", "fa fa-angle-down")
    optionBox[1].style.height = "0"
    optionBox[1].style.padding = "0"
    optionBox[1].style.overflow = "hidden"
  }
})

fromSearchInput.addEventListener("keyup", () => {
  let arr = [];
  let searchWord = fromSearchInput.value.toUpperCase();
  arr = currencyCodes.filter(data=>{
  
    return data.value.startsWith(searchWord);
  
    
  }).map(data => {
    let isSelected = data.value == displayName[0].innerText ? "selected" : "";
    return `
      <div onclick="updateName(this)" class="${isSelected}">
        <img src="${data.flag}" width="30px">
        <p>
                <span class="code"value = ${data.value}>${data.value}</span>
                <span class = "country" > ${data.name}
                </span>
                </p>
      </div>
    `;
  }).join("");


  options[0].innerHTML = arr ? arr : `<p style="margin-top: 10px; font-weight:600">Oops! Country code not found</p>`;
});


toSearchInput.addEventListener("keyup", () => {
  let arr = [];
  let searchWord = toSearchInput.value.toUpperCase();
  arr = currencyCodes.filter(data=>{
  
    return data.value.startsWith(searchWord);
  
    
  }).map(data => {
    let isSelected = data.value == displayName[1].innerText ? "selected" : "";
    return `
      <div onclick="uptodateName(this)" class="${isSelected}">
        <img src="${data.flag}" width="30px">
        <p>               
        <span class="code"value = ${data.value}>${data.value}</span> 
        <span class = "country" > ${ data.name}
          </span>
          </p>
      </div>
    `;
  }).join("");


  options[1].innerHTML = arr ? arr : `<p style="margin-top: 10px; font-weight:600">Oops! Country code not found</p>`;
});




function getExchange(){
  try {
    let from = document.querySelector(".from-dropdown .display .code").innerHTML
  let to = document.querySelector(".to-dropdown .display .code").innerHTML
  
fetch(`https://api.exchangerate.host/latest?base=${from}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error retrieving exchange rates');
    }
  })
  .then(data => {
   
    const exchangeRate = data.rates[to];
    
     var fromAmount = document.querySelector(".input-field input").value == "" ? 1 : document.querySelector(".input-field input").value;
    const toAmount = fromAmount * exchangeRate;
    screen.innerHTML="Getting Exchange rate ...🤑"
    setTimeout(()=>{
      screen.innerHTML= `${fromAmount} ${from} is equal to ${toAmount} ${to}`
    },2000)
    
  })
  .catch(error => {
    console.error(error);
  });

  } catch (e) {
    screen.innerHTML="Select countrycodes and enter amount "
  }
  
  
}


