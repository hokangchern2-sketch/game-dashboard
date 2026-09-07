// ========================================
// GAME DATA
// ========================================

let games = [

  {
    id: 1,
    title: "FC 26",
    platform: "PlayStation", 
    rating: 5,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9uDZebWbGfaRxQQN13xqu3vSez2Z816JHe-0b4Dxz9mSV1cM0SMrMRyg&s=10"
  },

  {
    id: 8,
    title: "FC 26",
    platform: "PC",
    rating: 5,
    image:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9uDZebWbGfaRxQQN13xqu3vSez2Z816JHe-0b4Dxz9mSV1cM0SMrMRyg&s=10"

  },

  {
    id: 2,
    title: "Left 4 Dead 2",
    platform: "PC",
    rating: 4,
    image:
      "https://www.gamespot.com/wp-content/uploads/original/mig/2/6/9/6/2222696-box_l4d2.png?w=217"
  },

  {
    id: 3,
    title: "Marvel Rivals",
    platform: "PC",
    rating: 3,
    image:
      "https://prismusercontent.com/discord/icons/1239432280770871326/9f0bb55e316e6ed23d0453606bd3df12.png?size=512"
  },

  {
    id: 4,
    title: "God of War",
    platform: "PlayStation",
    rating: 5,
    image:
      "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/gow20th.png"
  },

  {
    id: 5,
    title: "Hitman World Of Assasinations",
    platform: "PlayStation",
    rating: 4,
    image:
      "https://static0.hardcoregamerimages.com/wordpress/wp-content/uploads/2023/01/hitman-woa.jpg"
  },

  {
    id: 6,
    title: "GTA V",
    platform: "Xbox",
    rating: 5,
    image:
      "https://bd-live-21.slatic.net/kf/Sdfbda162a1e2418bb1c162c1c67a8211r.jpg"
  },



];


// ========================================
// VARIABLES
// ========================================

const gameGrid =
  document.getElementById("gameGrid");

const totalGames =
  document.getElementById("totalGames");

const allCount =
  document.getElementById("allCount");

const gameForm =
  document.getElementById("gameForm");

let currentPlatform = "All";


// ========================================
// DISPLAY GAMES
// ========================================

function displayGames() {

  gameGrid.innerHTML = "";


  // Filter

  let filteredGames = games.filter(
    function(game) {

      if (currentPlatform === "All") {
        return true;
      }

      return game.platform === currentPlatform;

    }
  );


  // Empty state

  if (filteredGames.length === 0) {

    gameGrid.innerHTML = `

      <div class="empty">

        No games found.

      </div>

    `;

    return;
  }


  // Create cards

  filteredGames.forEach(
    function(game, index) {

      const card =
        document.createElement("article");


      card.className =
        "game-card";


      

      // Stars

      let stars = "";

      for (
        let i = 1;
        i <= 5;
        i++
      ) {

        if (i <= game.rating) {

          stars += "★";

        } else {

          stars += "☆";

        }

      }


      card.innerHTML = `

        <img
          src="${game.image}"
          alt="${game.title}"
          onerror="
            this.src =
            'https://placehold.co/800x600/111/daa520?text=Game'
          "
        >

        <div class="game-info">

          <div class="game-platform">
            ${game.platform}
          </div>

          <h2>
            ${game.title}
          </h2>

          <div>

            <span class="stars">
              ${stars}
            </span>

            <span class="rating">
              ${game.rating} / 5
            </span>

          </div>

        </div>

      `;


      gameGrid.appendChild(card);

    }
  );


  // Update count

  totalGames.textContent =
    games.length;

  allCount.textContent =
    games.length;

}


// ========================================
// PLATFORM FILTER
// ========================================

const platformButtons =
  document.querySelectorAll(
    ".platform"
  );


platformButtons.forEach(
  function(button) {

    button.addEventListener(
      "click",
      function() {

        // Remove active

        platformButtons.forEach(
          function(btn) {

            btn.classList.remove(
              "active"
            );

          }
        );


        // Add active

        button.classList.add(
          "active"
        );


        // Get platform

        currentPlatform =
          button.dataset.platform;


        // Refresh

        displayGames();

      }
    );

  }
);


// ========================================
// ADD GAME
// ========================================

gameForm.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();


    const title =
      document.getElementById(
        "title"
      ).value.trim();


    const image =
      document.getElementById(
        "image"
      ).value.trim();


    const platform =
      document.getElementById(
        "platformInput"
      ).value;


    const rating =
      Number(
        document.getElementById(
          "rating"
        ).value
      );


    // Create game

    const newGame = {

      id: Date.now(),

      title: title,

      platform: platform,

      rating: rating,

      image:
        image ||
        "https://placehold.co/800x600/111/daa520?text=Game"

    };


    // Add to array

    games.push(newGame);


    // Clear form

    gameForm.reset();


    // Display

    displayGames();

  }
);


// ========================================
// INITIAL DISPLAY
// ========================================

displayGames();