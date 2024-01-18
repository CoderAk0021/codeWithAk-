
let right = document.querySelector(".right")
let left = document.querySelector(".left")
let container = document.querySelector(".tab_container")


right.addEventListener("click",()=>{
  let l = container.scrollLeft
  container.scroll({
  left: l + 150,
  behavior: 'smooth'
});

})


left.addEventListener("click",()=>{
  let r = container.scrollLeft
  container.scroll({
  left: r - 150,
  behavior: 'smooth'
});
})
