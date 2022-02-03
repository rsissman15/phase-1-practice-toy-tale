let addToy = false;



document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  //const toyForm=document.querySelector(".add-toy-form")
  getToys();
  
  


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });



function getToys(){
  fetch("http://localhost:3000/toys")
  .then(res=>res.json())
  .then(toys=>{
    toys.forEach(toy=>{
      renderAToy(toy);
    })
  })
}

function renderAToy(toy){
  const toyCard=document.createElement('div');
  toyCard.className='card';

  //Creating the toy name
  const toyName=document.createElement('h2');
  toyName.innerText=toy.name;

  //Creating the image
  const toyImage=document.createElement('img');
  toyImage.src=toy.image;
  toyImage.className='toy-avatar';

  //Creating paragraphs withlikes
  const toyParagraph=document.createElement('p');
  toyParagraph.innerText=`${toy.likes} Likes`;

  //Creating like button
  const toyButton=document.createElement('button');
  toyButton.className='like-btn';
  toyButton.id=toy.id;
  toyButton.innerText="Like <3"


  //Append elements to DOM
  toyCard.append(toyName,toyImage,toyParagraph,toyButton);
  const toyCollection=document.querySelector("#toy-collection");
  toyCollection.append(toyCard);

  toyButton.addEventListener("click",e=>{
    const currentLikesText=e.target.previousElementSibling.innerText
    const actualLikes=currentLikesText.split(" ")[0];
    const updatedLikes=parseInt(actualLikes)+1;
    e.target.previousElementSibling.innerText=`${updatedLikes} Likes`;
    

  })
  }

  

//Function to create a new toy
// function newToyForm(newToy){
  toyFormContainer.addEventListener('submit',e=>{
    e.preventDefault();
    postToy(e.target.name.value,e.target.image.value)
  })

  function postToy(name,url){

    fetch('http://localhost:3000/toys',{
      method: 'POST',
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
  
      body: JSON.stringify({
        "name": name,
        "image": url,
        "likes": 0
    })
  })
    .then(res=>res.json())
    .then(data=>renderAToy(data))
  
  }




});
