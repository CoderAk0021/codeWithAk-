
let input = document.querySelector("input")
let search = document.querySelector("main span")
let resultSection = document.querySelector(".result")

let info = document.querySelector(" .info")


let msg = document.querySelector(".msg")

search.addEventListener("click",()=>{
  let pinValue = input.value
 
  pinFinder(pinValue);
})




function animation()
{
  let el = `<div class='animation-box'>
              <p></p>
              <span>Searching...</span>
            </div>`;
    info.innerHTML= el
}

function pinFinder(pinValue)
{
  input.value=pinValue
  
  animation();
 setTimeout(()=>{
   fetch( `https://api.postalpincode.in/pincode/${pinValue}`).then(response => response.json()).then(response =>{
  info.innerHTML=""
  
  msg.innerHTML = response[0].Message
  for(let i = 0;i < response[0].PostOffice.length;i++)
  {
    
    const box = `
    <div class="container">
    <div class='name'>
                <header>Name : </header>
                <p>${response[0].PostOffice[i].Name}</p>
              </div>
              <div class='block'>
               <header>Block : </header>
               <p>${response[0].PostOffice[i].Block}
               </p>
               </div>
             <div class="branchType">
   <header>Branch Type :</header> 
   <p>${response[0].PostOffice[i].BranchType}</p> 
   </div> <div class = "deliveryStatus" >
     <header>Delivery Status: </header> 
     <p>${response[0].PostOffice[i].DeliveryStatus} </p> 
     </div> <div class = "circle">
      <header>Circle : </header>
      <p>${response[0].PostOffice[i].Circle} </p> </div> 
      <div class = "district">
       <header>District : </header> 
       <p>${response[0].PostOffice[i].District} </p> 
       </div> 
       <div class = "division">
            <header>Division : </header> <p>${response[0].PostOffice[i].Division} </p> 
       </div> 
       <div class = "region" >
         <header>Region : </header> 
         <p>${response[0].PostOffice[i].Region}</p> </div> 
         <div class = "state">
         <header>State : </header> 
         <p>${response[0].PostOffice[i].State} </p></div> 
         <div class = "country">
      <header>Country : </header> 
      <p>${response[0].PostOffice[i].Country} </p> </div>
      </div>`
    info.innerHTML= info.innerHTML + box
  }
  
}
  ).catch(err => console.error(err));
 },3000)

}
  
