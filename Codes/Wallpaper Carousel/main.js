
let left = document.querySelector(".left span")
let right = document.querySelector(".right span")
let carousel = document.querySelectorAll(".carousel img")
let dots = document.querySelectorAll(".dots p")
let counter=document.querySelector(".counter")

dots[0].style.backgroundColor="white"
let index = 1

let count = 1


left.addEventListener("click",dec)
right.addEventListener("click",inc)


function dec(){
  if(index > 1 && index <= 4)
  {
  index--
  carousel[index].style.left="-320px"
  let k = index 
  dots[k - 1].style.backgroundColor="white"
  dots[k].style.backgroundColor="#4C4D5C"
  count--;
  counter.innerHTML=count + "/4"
  }
}


function inc(){
  
  if(index >= 0 && index <= 3)
  {
    let r = index
   dots[r].style.backgroundColor="white"
   dots[r-1].style.backgroundColor="#4C4D5C"
  carousel[index].style.left="0px"
  
  index++
  count++;
  counter.innerHTML=count + "/4"
  
  }
}