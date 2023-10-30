let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//Fetch Toys from server
fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then((data) => {
    data.forEach(toy => renderToys(toy));
    });

//Render toy cards
function renderToys(toys){
  let newToy = document.createElement('div');
  let toyCollection = document.getElementById('toy-collection');
  newToy.className = "card";
  newToy.innerHTML = `
    <h2>${toys.name}</h2>
    <img src="${toys.image}" class="toy-avatar"/>
    <p>${toys.likes}</p>
    <button class="like-btn" id="${toys.id}">Likes</button>
  `
  //Update likes
  newToy.querySelector('.like-btn').addEventListener('click', () =>{
    toys.likes+= 1
    let numberOfLikes = newToy.querySelector('p')
    numberOfLikes.textContent = toys.likes
    updateLikes(toys)
  })

  toyCollection.appendChild(newToy);
  
};

//Submit New Toys
let toyForm = document.getElementsByClassName('add-toy-form')[0];
toyForm.addEventListener('submit', submitToy);

function submitToy(e){
  e.preventDefault();
  let toyObj ={
    name:e.target.name.value,
    image:e.target.image.value,
    likes: 0
  }
  renderToys(toyObj);
  submittedToy(toyObj)
}

//POST Request
function submittedToy(toyObj){
 fetch(`http://localhost:3000/toys`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}

//PATCH Request to update likes
function updateLikes(toyObj){
  fetch(`http://localhost:3000/toys/${toyObj.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))

}

