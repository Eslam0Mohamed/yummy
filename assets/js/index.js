console.log("Eslam Mohamed Ali ");
const leftSideWidth = $(".left-side").outerWidth() ;
const leftSide = $(".left-side") ;
const sidebarContainer = $(".sidebar-container") ;
const bars = $(".bars") ;
const sidebarItem = $(".sidebar-item")
let flag = false;
console.log(sidebarItem);
let rowData = document.querySelector(".row")

const nameRegex = /[a-zA-Z]+\s[a-zA-Z]+$/
console.log("the test of name regex "+nameRegex.test("Eslam ohamed"));
const mailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/
console.log("the test of email regex "+mailRegex.test("Eslam20@gmail.com"));
const phoneRegex = /^01[0125][0-9]{8}$/
console.log("the test of phone regex "+phoneRegex.test("01275772311"));
const passwordRegex = /^\w{8,}$/
console.log("the test of password regex "+passwordRegex.test("eslam2002"));
const ageRegex = /^\d{2}$/
console.log("the test of age regex "+ageRegex.test("10"));


// ^ Sidebar Effect #############

bars.on("click",function(){
 if(flag==false) // closed
 {
  openSideBar()
  flag = true;
 }
  else{
    closeSideBar()
    flag = false;
  }
})
function openSideBar(){
 sidebarContainer.animate({left:0},500)

 bars.removeClass("fa-bars")
 bars.addClass("fa-xmark")
 sidebarItem.animate({opacity:1,marginLeft:0,marginTop:20},500)
}
function closeSideBar(){
 sidebarContainer.animate({left:-leftSideWidth},500)
  sidebarItem.animate({opacity:0,marginLeft:-50,marginTop:50},500)
 bars.removeClass("fa-xmark")
 bars.addClass("fa-bars")
}
// ^ Loading Effect #############

function showLoading(){
 document.querySelector(".loading").classList.add("d-flex")
 document.querySelector(".loading").classList.remove("d-none")
}
function hideLoading(){
 document.querySelector(".loading").classList.add("d-none")
 document.querySelector(".loading").classList.remove("d-flex")
}
async function getmeal(){
  showLoading()
  const response =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
  const data =await response.json()
  // console.log(data.meals);
  displayMeals(data.meals)
  hideLoading()
}

getmeal()
//  ^  display All Meals ################################

function displayMeals(meals){
  let cartona = ""
  for(let meal of meals){
    // console.log(meal);
    
cartona+=`
        <div class="col-md-3" onclick="getMealDetails(${meal.idMeal})">
          <div class="inner position-relative">
            <div class="image-meal">
              <img src="${meal.strMealThumb}" alt="image for ${meal.strMeal} meal" class="img-fluid">
            </div>
            <div class="overlay text-black position-absolute end-0 bottom-0 start-0 overflow-hidden top-100 w-100 d-flex justify-content-center align-items-center">
              <h3>${meal.strMeal}</h3>
            </div>
          </div>
        </div>
`
  }
  rowData.innerHTML = cartona
}
//  ^  showSerachContainer ################################

function showSerachContainer(){
  rowData.innerHTML = ""
  showLoading()
   let searchbox = `
  <div class="col-md-6 px-3">
    <input onkeyup="searchByName(this.value)" type="search" class="form-control mb-3 search-name" placeholder="Search By Name">
  </div>
    <div class="col-md-6 px-3">
    <input onkeyup="searchByFirstLetter(this.value)" type="search" class="form-control mb-3 search-name"  placeholder="Search By First Letter">
   `
rowData.innerHTML = searchbox
hideLoading()
}
//  ^ searchByName  ################################

async function searchByName(name){
  showLoading()
  const response =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
  const data =await response.json()
  console.log(data.meals)
  if(name.length > 4){ displayMeals(data.meals)}
  hideLoading()
    return
}
//  ^ searchByFirstLetter  ################################

async function searchByFirstLetter(letter){
  // if(letter==""){letter = "a"}
  showLoading()
  const response =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
  const data =await response.json()
  console.log(data.meals)
  displayMeals(data.meals)
  hideLoading()
}

//  ^ Meal Details  ################################
async function getMealDetails(id){
  showLoading()
const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  const data = await response.json()
  // console.log(data.meals);
  displayMealDetails(data.meals)
  hideLoading()
}
function displayMealDetails(mealDetails){
  let recipes = "";
  let ingredients
  let measres
  for(let i=1 ;i<=20;i++){
 ingredients = mealDetails[0][`strIngredient${i}`]
 measres = mealDetails[0][`strMeasure${i}`]

if(ingredients!=="" && measres !== ""){
  console.log();
  recipes += `<li>${measres} ${ingredients}</li>`
}

}
let tags = mealDetails[0].strTags?mealDetails[0].strTags.split(",").map(function(tag){
  return `<li>${tag}</li>`}).join("") : "No Tags"
let box = `
<div class="col-md-4">
<img src="${mealDetails[0].strMealThumb}" class="img-fluid" alt="image For ${mealDetails[0].strMeal}">
<h3 class="">${mealDetails[0].strMeal}</h3>
</div>
<div class="col-md-8">
<h2 class="">Instructions</h2>
<p class="">${mealDetails[0].strInstructions}</p>
<h2>Area : ${mealDetails[0].strArea}</h2>
<h2>Category : ${mealDetails[0].strCategory} </h2>
<h2>Recipes : </h2>
<ul class="d-flex flex-wrap gap-3 recipes-ul">${recipes}</ul>
<h2>Tags : </h2>
<ul class="d-flex tags-ul">${tags}</ul>
<ul class="d-flex info-ul">
  <li><a href="${mealDetails[0].strYoutube}">Youtube</a></li>
  <li><a href="${mealDetails[0].strSource}">Source</a></li>

</ul>
</div>

`
rowData.innerHTML = box

// let counterMeasure = 1
// // let strMeasure = "strMeasure" + counter
// let strMeasure = []
// for([index,value] of  Object.entries(mealDetails[0])){
// if(index == "strMeasure" + counterMeasure && value !==" "){
// console.log(value);
// strMeasure.push(value)
// counterMeasure++
// }
// }

// console.log(strMeasure);

}
//  ^ Get Meals Categories  ################################

async function getCategories(){
  showLoading()
   const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  const data = await response.json()
  displayCategories(data.categories)
  hideLoading()
}
//  ^ Display Meals Categories  ################################

 function displayCategories(data){
  let cartona =""
console.log(data);
for(cate of data){
  cartona+=`
        <div class="col-lg-3 col-md-4 text-center g-4" onclick="getMealsByCategory('${cate.strCategory}')">
          <div class="inner position-relative">
            <div class="image-meal">
              <img src="${cate.strCategoryThumb}" class="rounded-circle" alt="image for ${cate.strCategory} meal" class="img-fluid">
            </div>
            <div class="d-flex flex-column align-items-center overlay text-black position-absolute end-0 bottom-0 start-0 overflow-hidden top-100 w-100">
              <h3>${cate.strCategory}</h3>
              <p class="text-center text-black fw-600">${cate.strCategoryDescription}</p>
            </div>
          </div>
        </div>
`
}
rowData.innerHTML = cartona
 }

async function getMealsByCategory(category){
  showLoading()
const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
const data = await response.json()
// console.log(data.meals);
const meals = data.meals
rowData.innerHTML = ""
 displayMeals(meals)
 hideLoading()
}
// getMealsByCategory("Beef")

//  ^ Display Meals Areas  ################################

async function getAreas(){
  showLoading()
   const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  const data = await response.json()
  displayAreas(data.meals)
  hideLoading()
}
function displayAreas(meals){
  console.log(meals);
  let cartona=""
for(areaMeal of meals){
cartona += `
<div class="col-lg-3 col-md-4 g-sm-4 text-center">
<div onclick="filterByArea('${areaMeal.strArea}')">
<i class="fa-solid fa-house-laptop fa-4x"></i>
<h3>${areaMeal.strArea}</h3>

</div>
</div>

`
}
rowData.innerHTML=cartona

}
async function filterByArea(area){
  showLoading()
const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
const data = await response.json()
displayMeals(data.meals)
hideLoading()
}
// ^ Display Meals ingrediants  ################################

async function getIngrediants(){
  showLoading()
   const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
   const data = await response.json()
   displayIngerdiants(data.meals)
   hideLoading()
  }

function displayIngerdiants(data){
  let cartona=""
  console.log(data);
  let slicedData = data.slice(0,20)
  console.log(slicedData);

for(ing of slicedData){
cartona += `
<div class="col-lg-3 col-md-4 g-sm-4 text-center ingrediant">
<div onclick="filterByingrediant('${ing.strIngredient}')">
<i class="fa-solid fa-drumstick-bite fa-4x"></i>
<h3>${ing.strIngredient}</h3>
<p>${ing.strDescription?.split(" ").slice(0,20).join(" ")}</p>

</div>
</div>

`
}
rowData.innerHTML=cartona
}

async function filterByingrediant(ingName){
showLoading()
const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingName}`)
const data = await response.json()
console.log(data.meals);
displayMeals(data.meals)
hideLoading()
}
function loading(){
 console.log("DEVOOOOOOOOOOOOOO");
//  $(".loading").fadeIn(5000)

}
function contactUs(){
  showLoading()
  
let cartona = `


<form class="form" onsubmit="submitValidate()">
    <p class="title">Contact Us </p>
    <p class="message">Contact Us To Make an Order From Our Resturent. </p>
      
        <label>
            <input onkeyup="validInput(this,nameRegex)" placeholder="" type="text" class="input">
            <span>Your Name</span>
          <p class=" d-none bg-danger desc p-2 rounded-2 error" >Please Enter Valid Name "Eslam Mohamed"</p>

        </label>
  
            
            <label>
            <input onkeyup="validInput(this,phoneRegex)"  placeholder="" type="number" class="input">
            <span>Your phone</span>
            <p class=" d-none bg-danger p-2 rounded-2 error">Please Enter Valid Phone Number "012 folloed by 8 numbers"</p>
        </label>

    <label>
        <input onkeyup="validInput(this,mailRegex)" placeholder="" type="email" class="input">
        <span>Email</span>
        <p class="d-none bg-danger p-2 rounded-2 error">Please Enter Valid Email "Eslam@gmail.com"</p>
    </label> 
           <label>
        <input  placeholder="" type="text" class="input meal">
        <span>Your Meal Please</span>
    </label>  
   
    <button class="submit" >Submit</button>
</form>

`
rowData.innerHTML = cartona
hideLoading()
}

//  <label>
//         <input onkeyup="validInput(this,passwordRegex)" required="" placeholder="" type="password" class="input">
//         <span>Password</span>
//     </label>
//     <label>
//         <input onkeyup="validInput(this,passwordRegex)" required="" placeholder="" type="password" class="input">
//         <span>Confirm password</span>
//     </label>

// ^ Validation Of Contact Inputs  ################################

function validInput(e,regex){
  const errorMsg = e.parentElement.querySelector(".error");
  if(regex.test(e.value)){
  e.style.borderColor = "green"
 errorMsg.classList.add("d-none")
 errorMsg.classList.remove("d-block")
  return true
}
else{
   e.style.borderColor = "red"
errorMsg.classList.add("d-block")
errorMsg.classList.remove("d-none")
return false
}

}

function submitValidate(){
    let nameInput = document.querySelector('input[type="text"]');
  let phoneInput = document.querySelector('input[type="number"]');
  let mailInput = document.querySelector('input[type="email"]');
  let mealInput = document.querySelector('.meal');
   const validName = validInput(nameInput, nameRegex);
  const validPhone = validInput(phoneInput, phoneRegex);
  const validEmail = validInput(mailInput, mailRegex);
if(validName&&validPhone&&validEmail){
nameInput.value = ""
phoneInput.value=""
mailInput.value=""
mealInput.value=""
Swal.fire({
  title: "Your Order is sent !!! ",
  icon: "success",
  draggable: true
});
rowData.innerHTML=""
getmeal()
}
else{
  console.log("oops");

  Swal.fire({
  title: "oops error occuired ",
  icon: "error",
  draggable: true
});
  
}
}