import { useState } from "react";
import "./App.css";

 

// ========================================
// GAME DATA
// ========================================

const initialGames = [

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
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9uDZebWbGfaRxQQN13xqu3vSez2Z816JHe-0b4Dxz9mSV1cM0SMrMRyg&s=10"
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
  }

];


// ========================================
// MAIN APP
// ========================================

function App() {

  // ======================================
  // STATE
  // ======================================

  const [games, setGames] =
    useState(initialGames);

  const [currentPlatform, setCurrentPlatform] =
    useState("All");

  const [newGame, setNewGame] = useState({
    title: "",
    image: "",
    platform: "PC",
    rating: 5
  });


  // ======================================
  // FILTER GAMES
  // ======================================

  const filteredGames = games.filter(
    function (game) {

      if (currentPlatform === "All") {
        return true;
      }

      return game.platform === currentPlatform;

    }
  );


  // ======================================
  // ADD GAME
  // ======================================

  function handleSubmit(event) {

    event.preventDefault();


    // Get title

    const title =
      newGame.title.trim();


    // Check if title is empty

    if (title === "") {

      alert("Please enter a game title.");

      return;

    }


    // Create new game

    const game = {

      id: Date.now(),

      title: title,

      platform: newGame.platform,

      rating: Number(newGame.rating),

      image:
        newGame.image.trim() ||
        "https://placehold.co/800x600/111/daa520?text=Game"

    };


    // Add new game

    setGames([
      ...games,
      game
    ]);


    // Clear form

    setNewGame({

      title: "",

      image: "",

      platform: "PC",

      rating: 5

    });

  }


  // ======================================
  // RETURN WEBSITE
  // ======================================

  return (

    <div className="app">


      {/* ==================================
          HEADER
      ================================== */}

      <header className="header">

        <h1>
          🎮 Game Collection Dashboard
        </h1>

        <p>
          Manage and explore your game collection
        </p>

      </header>



      {/* ==================================
          MAIN
      ================================== */}

      <main className="container">


        {/* ==================================
            COLLECTION HEADER
        ================================== */}

        <section className="collection-section">

          <div className="collection-header">

            <div>

              <h2>
                My Game Collection
              </h2>

              <p>
                Browse games by platform
              </p>

            </div>


            <div className="total-games">

              <strong>
                {games.length}
              </strong>

              <span>
                Total Games
              </span>

            </div>

          </div>



          {/* ==================================
              PLATFORM FILTER
          ================================== */}

          <div className="filters">

            <button
              className={
                currentPlatform === "All"
                  ? "platform active"
                  : "platform"
              }

              onClick={() =>
                setCurrentPlatform("All")
              }
            >
              All ({games.length})
            </button>


            <button
              className={
                currentPlatform === "PC"
                  ? "platform active"
                  : "platform"
              }

              onClick={() =>
                setCurrentPlatform("PC")
              }
            >
              PC
            </button>


            <button
              className={
                currentPlatform === "PlayStation"
                  ? "platform active"
                  : "platform"
              }

              onClick={() =>
                setCurrentPlatform("PlayStation")
              }
            >
              PlayStation
            </button>


            <button
              className={
                currentPlatform === "Xbox"
                  ? "platform active"
                  : "platform"
              }

              onClick={() =>
                setCurrentPlatform("Xbox")
              }
            >
              Xbox
            </button>

          </div>



          {/* ==================================
              GAME COUNT
          ================================== */}

          <p className="results">

            Showing{" "}

            <strong>
              {filteredGames.length}
            </strong>

            {" "}games

          </p>



          {/* ==================================
              GAME GRID
          ================================== */}

          <div className="game-grid">

            {filteredGames.length > 0 ? (

              filteredGames.map(
                function (game) {

                  return (

                    <GameCard
                      key={game.id}
                      game={game}
                    />

                  );

                }
              )

            ) : (

              <div className="empty">

                No games found.

              </div>

            )}

          </div>

        </section>



        {/* ==================================
            ADD GAME
        ================================== */}

        <section className="add-section">

          <h2>
            ➕ Add a New Game
          </h2>

          <p>
            Add a game to your collection.
          </p>


          <form
            className="game-form"
            onSubmit={handleSubmit}
          >


            {/* TITLE */}

            <div className="form-group">

              <label htmlFor="title">
                Game Title
              </label>

              <input
                id="title"
                type="text"
                placeholder="Enter game title"
                value={newGame.title}

                onChange={
                  function (event) {

                    setNewGame({

                      ...newGame,

                      title:
                        event.target.value

                    });

                  }
                }

              />

            </div>



            {/* IMAGE */}

            <div className="form-group">

              <label htmlFor="image">
                Image URL
              </label>

              <input
                id="image"
                type="text"
                placeholder="Paste image URL"
                value={newGame.image}

                onChange={
                  function (event) {

                    setNewGame({

                      ...newGame,

                      image:
                        event.target.value

                    });

                  }
                }

              />

            </div>



            {/* PLATFORM */}

            <div className="form-group">

              <label htmlFor="platform">
                Platform
              </label>

              <select
                id="platform"

                value={newGame.platform}

                onChange={
                  function (event) {

                    setNewGame({

                      ...newGame,

                      platform:
                        event.target.value

                    });

                  }
                }
              >

                <option value="PC">
                  PC
                </option>

                <option value="PlayStation">
                  PlayStation
                </option>

                <option value="Xbox">
                  Xbox
                </option>

              </select>

            </div>



            {/* RATING */}

            <div className="form-group">

              <label htmlFor="rating">
                Rating
              </label>

              <select
                id="rating"

                value={newGame.rating}

                onChange={
                  function (event) {

                    setNewGame({

                      ...newGame,

                      rating:
                        Number(
                          event.target.value
                        )

                    });

                  }
                }
              >

                <option value="1">
                  1 / 5
                </option>

                <option value="2">
                  2 / 5
                </option>

                <option value="3">
                  3 / 5
                </option>

                <option value="4">
                  4 / 5
                </option>

                <option value="5">
                  5 / 5
                </option>

              </select>

            </div>



            {/* BUTTON */}

            <button
              className="add-button"
              type="submit"
            >
              Add Game
            </button>

          </form>

        </section>

      </main>

    </div>

  );

}


// ========================================
// GAME CARD COMPONENT
// ========================================

function GameCard({ game }) {

  // ======================================
  // CREATE STARS
  // ======================================

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


  // ======================================
  // GAME CARD
  // ======================================

  return (

    <article className="game-card">


      {/* IMAGE */}

      <div className="image-container">

        <img
          src={game.image}
          alt={game.title}

          onError={
            function (event) {

              event.target.src =
                "https://placehold.co/800x600/111/daa520?text=Game";

            }
          }

        />

      </div>


      {/* INFORMATION */}

      <div className="game-info">


        <div className="game-platform">

          {game.platform}

        </div>


        <h2>

          {game.title}

        </h2>


        <div className="rating-container">

          <span className="stars">

            {stars}

          </span>

          <span className="rating">

            {game.rating} / 5

          </span>

        </div>

      </div>

    </article>

  );

}


export default App;
