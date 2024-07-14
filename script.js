const categoryDiv = document.getElementById("categoryDiv");
const harryPotterBtn = document.getElementById("harryPotterBtn");
const dogsBtn = document.getElementById("dogsBtn");
const catsBtn = document.getElementById("catsBtn");
const randomBtn = document.getElementById("randomBtn");
const changeCategoryDiv = document.getElementById("changeCategoryDiv");
const changeCategoryBtn = document.getElementById("changeCategoryBtn");
const imageNumber1 = document.getElementById("imageNumber1");
const imageNumber2 = document.getElementById("imageNumber2");
const imageNumber3 = document.getElementById("imageNumber3");
const imageNumber4 = document.getElementById("imageNumber4");
const imageNumber5 = document.getElementById("imageNumber5");
const imageNumber6 = document.getElementById("imageNumber6");
const imageNumber7 = document.getElementById("imageNumber7");
const imageNumber8 = document.getElementById("imageNumber8");
const imageNumber9 = document.getElementById("imageNumber9");
const imageNumber10 = document.getElementById("imageNumber10");
const imageNumber11 = document.getElementById("imageNumber11");
const imageNumber12 = document.getElementById("imageNumber12");
const imageNumber13 = document.getElementById("imageNumber13");
const imageNumber14 = document.getElementById("imageNumber14");
const imageNumber15 = document.getElementById("imageNumber15");
const imageNumber16 = document.getElementById("imageNumber16");
const imageNumber17 = document.getElementById("imageNumber17");
const imageNumber18 = document.getElementById("imageNumber18");
const imageNumber19 = document.getElementById("imageNumber19");
const imageNumber20 = document.getElementById("imageNumber20");
const imageNumber21 = document.getElementById("imageNumber21");
const imageNumber22 = document.getElementById("imageNumber22");
const imageNumber23 = document.getElementById("imageNumber23");
const imageNumber24 = document.getElementById("imageNumber24");
const cards = document.querySelectorAll(".memory-card");
let imagesArray = [];
let isGameOver = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Harry Potter
harryPotterBtn.addEventListener("click", getHarryPotterList);
function getHarryPotterList() {
  categoryDiv.innerText = "The Game Has Started With The Category of Harry Potter";
  changeCategoryDiv.classList.remove("not-display-element");
  changeCategoryBtn.addEventListener("click", () => {window.location.reload()});
  fetch("https://hp-api.onrender.com/api/characters")
  .then (response => response.json())
  .then (data => {
      // console.log(data);
      for (let i = 0; i < data.length; i++) {                     // מכיוון שיש המון דמויות בלי לינק של תמונה, יצרתי מסנן
        if (data[i].image && data[i].image !== "") {
          imagesArray.push(data[i].image);
        }
      } 
      // console.log(imagesArray);
      pushRandomImagesFromArray(imagesArray)
  })
  .catch(error => console.log(error));
}

// Dogs
dogsBtn.addEventListener("click", getDogsList);
function getDogsList() {
  categoryDiv.innerText = "The Game Has Started With The Category of Dogs";
  changeCategoryDiv.classList.remove("not-display-element");
  changeCategoryBtn.addEventListener("click", () => {window.location.reload()});
  for (let i = 0; i < 12; i++) {
  fetch("https://dog.ceo/api/breeds/image/random")
  .then (response => response.json())
  .then (data => {
      // console.log(data);
      imagesArray.push(data.message);
      if (imagesArray.length === 12){
        // console.log(imagesArray);
        pushRandomImagesFromArray(imagesArray);
      }
  })
  .catch(error => console.log(error));
  }
}

// Cats
catsBtn.addEventListener("click", getCatsList);
function getCatsList() {
  categoryDiv.innerText = "The Game Has Started With The Category of Cats";
  changeCategoryDiv.classList.remove("not-display-element");
  changeCategoryBtn.addEventListener("click", () => {window.location.reload()});
  for (let i = 0; i < 3; i++) {
  fetch("https://api.thecatapi.com/v1/images/search?limit=10")
  .then (response => response.json())
  .then (data => {
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (data[i].url && data[i].url !== "") {
          imagesArray.push(data[i].url);
        }
      } 
      // console.log(imagesArray);
      if (imagesArray.length === 30){
        // console.log(imagesArray);
        pushRandomImagesFromArray(imagesArray);
      } 
  })
  .catch(error => console.log(error));
  }
}

// Random
randomBtn.addEventListener("click", getRandomList);
function getRandomList() {  
  let randomArray = [];
  let fetchPromises = [];
  categoryDiv.innerText = "The Game Has Started With The Category of Random";
  changeCategoryDiv.classList.remove("not-display-element");
  changeCategoryBtn.addEventListener("click", () => {window.location.reload()});
// Fetch Harry Potter images
fetchPromises.push(      
  fetch("https://hp-api.onrender.com/api/characters")
    .then(response => response.json())
    .then(data => {
      let harryPotterTempArray = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].image && data[i].image !== "") {
          harryPotterTempArray.push(data[i].image);
        }
      }
      for (let j = 0; j < 4; j++) {
        let image;
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * harryPotterTempArray.length);
          image = harryPotterTempArray[randomIndex];
        } while (randomArray.includes(image));
        randomArray.push(image);
        harryPotterTempArray.splice(randomIndex, 1); // Remove the used image
      }
    })
    .catch(error => console.log('Harry Potter API error:', error))
);
  // Fetch Dog images
  for (let i = 0; i < 4; i++) {
    fetchPromises.push(
      fetch("https://dog.ceo/api/breeds/image/random")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (!randomArray.includes(data.message)) {
          randomArray.push(data.message); // Add pairs
        } else {
          i--; // Retry if duplicate found
        }
      })
      .catch(error => console.log('Dog API error:', error))
    );
  }
  // Fetch Cat images
  fetchPromises.push(
    fetch("https://api.thecatapi.com/v1/images/search?limit=10")
    .then(response => response.json())
    .then(data => {
      let catImages = [];
      for (let i = 0; i < data.length; i++) {
        if (!catImages.includes(data[i].url)) {
          catImages.push(data[i].url);
          if (catImages.length === 4) break; // Stop when there are 4 images
        }
      }
      randomArray = randomArray.concat(catImages);
    })
    .catch(error => console.log('Cat API error:', error))
  );
  // Wait for all fetch requests to complete
  Promise.all(fetchPromises)
    .then(() => {
      // console.log('All fetch requests completed');
      // console.log('Random Array:', randomArray);
      pushRandomImagesFromArray(randomArray);
    })
    .catch(error => console.log('Error in fetching images:', error));
}


function pushRandomImagesFromArray(imagesArray) {
  imageNumber1.src = imagesArray[0];
  imageNumber2.src = imagesArray[0];
  imageNumber3.src = imagesArray[1];
  imageNumber4.src = imagesArray[1];
  imageNumber5.src = imagesArray[2];
  imageNumber6.src = imagesArray[2];
  imageNumber7.src = imagesArray[3];
  imageNumber8.src = imagesArray[3];
  imageNumber9.src = imagesArray[4];
  imageNumber10.src = imagesArray[4];
  imageNumber11.src = imagesArray[5];
  imageNumber12.src = imagesArray[5];
  imageNumber13.src = imagesArray[6];
  imageNumber14.src = imagesArray[6];
  imageNumber15.src = imagesArray[7];
  imageNumber16.src = imagesArray[7];
  imageNumber17.src = imagesArray[8];
  imageNumber18.src = imagesArray[8];
  imageNumber19.src = imagesArray[9];
  imageNumber20.src = imagesArray[9];
  imageNumber21.src = imagesArray[10];
  imageNumber22.src = imagesArray[10];
  imageNumber23.src = imagesArray[11];
  imageNumber24.src = imagesArray[11];
  cards.forEach((card) => card.addEventListener("click", flipCard));
}  

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  isGameOver++;
  if (isGameOver === 12) {
    categoryDiv.innerText = "You have successfully completed the game! Redirecting You Back To The Main Page...";
    function reloadPage() { window.location.reload() }
    setTimeout(reloadPage, 5000);
  } else {
    resetBoard();
  }
  
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

(function() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 24);
    card.style.order = randomPos;
  });
})();

// cards.forEach((card) => card.addEventListener("click", flipCard));
