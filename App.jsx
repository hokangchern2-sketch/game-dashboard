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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9uDZebWbGfaRxQQN13xqu3vSez2Z816JHe-0b4Dxz9mSV1cM0SMrMRyg&s=10",
  },
  {
    id: 8,
    title: "FC 26",
    platform: "PC",
    rating: 5,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9uDZebWbGfaRxQQN13xqu3vSez2Z816JHe-0b4Dxz9mSV1cM0SMrMRyg&s=10",
  },
  {
    id: 2,
    title: "Left 4 Dead 2",
    platform: "PC",
    rating: 4,
    image:
      "https://www.gamespot.com/wp-content/uploads/original/mig/2/6/9/6/2222696-box_l4d2.png?w=217",
  },
  {
    id: 3,
    title: "Marvel Rivals",
    platform: "PC",
    rating: 3,
    image:
      "https://prismusercontent.com/discord/icons/1239432280770871326/9f0bb55e316e6ed23d0453606bd3df12.png?size=512",
  },
  {
    id: 4,
    title: "God of War",
    platform: "PlayStation",
    rating: 5,
    image:
      "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/gow20th.png",
  },
  {
    id: 5,
    title: "Hitman World Of Assasinations",
    platform: "PlayStation",
    rating: 4,
    image:
      "https://static0.hardcoregamerimages.com/wordpress/wp-content/uploads/2023/01/hitman-woa.jpg",
  },
  {
    id: 6,
    title: "GTA V",
    platform: "Xbox",
    rating: 5,
    image:
      "https://bd-live-21.slatic.net/kf/Sdfbda162a1e2418bb1c162c1c67a8211r.jpg",
  },
];

const fallbackImage =
  "https://placehold.co/800x600/111/daa520?text=Game";

function App() {
  // ========================================
  // STATE
  // ========================================

  const [games, setGames] = useState(initialGames);
  const [currentPlatform, setCurrentPlatform] = useState("All");

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [platform, setPlatform] = useState("PC");
  const [rating, setRating] = useState("5");

  // ========================================
  // FILTER GAMES
  // ========================================

  const filteredGames =
    currentPlatform === "All"
      ? games
      : games.filter(
          (game) => game.platform === currentPlatform
        );

  // ========================================
  // PLATFORM COUNTS
  // ========================================

  const getPlatformCount = (platformName) => {
    return games.filter(
      (game) => game.platform === platformName
    ).length;
  };

  // ========================================
  // ADD GAME
  // ========================================

  const handleSubmit = (event) => {
    event.preventDefault();

    const newGame = {
      id: Date.now(),
      title: title.trim(),
      platform: platform,
      rating: Number(rating),
      image: image.trim() || fallbackImage,
    };

    setGames((currentGames) => [
      ...currentGames,
      newGame,
    ]);

    // Clear form
    setTitle("");
    setImage("");
    setPlatform("PC");
    setRating("5");
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <>
      {/* BACKGROUND */}
      <div className="background-lines"></div>

      {/* MAIN CONTAINER */}
      <main className="container">

        {/* =========================
            HEADER
        ========================== */}

        <header className="header">

          <div className="brand">

            <div className="logo">
              <img
                src="https://png.pngtree.com/png-clipart/20220603/original/pngtree-game-stick-icon-design-png-image_7903151.png"
                alt="GameVault Logo"
              />
            </div>

            <div>
              <h1>
                Game<span>Vault</span>
              </h1>

              <p>Game Collection</p>
            </div>

          </div>

          {/* GAME COUNTER */}

          <div className="counter">

            <strong>
              {games.length}
            </strong>

            <small>
              OF 10 TOTAL
            </small>

          </div>

        </header>

        {/* =========================
            DASHBOARD
        ========================== */}

        <section className="dashboard">

          {/* LEFT SIDE */}

          <div className="games-area">

            <div className="game-grid">

              {filteredGames.length === 0 ? (

                <div className="empty">
                  No games found.
                </div>

              ) : (

                filteredGames.map((game) => (

                  <article
                    className="game-card"
                    key={game.id}
                  >

                    <img
                      src={game.image}
                      alt={game.title}
                      onError={(event) => {
                        event.currentTarget.src =
                          fallbackImage;
                      }}
                    />

                    <div className="game-info">

                      <div className="game-platform">
                        {game.platform}
                      </div>

                      <h2>
                        {game.title}
                      </h2>

                      <div>

                        <span className="stars">
                          {"★".repeat(game.rating)}
                          {"☆".repeat(5 - game.rating)}
                        </span>

                        <span className="rating">
                          {game.rating} / 5
                        </span>

                      </div>

                    </div>

                  </article>

                ))

              )}

            </div>

          </div>

          {/* =========================
              RIGHT SIDEBAR
          ========================== */}

          <aside className="sidebar">

            {/* PLATFORM PANEL */}

            <div className="panel">

              <div className="panel-title">
                PLATFORMS
              </div>

              <button
                className={`platform ${
                  currentPlatform === "All"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setCurrentPlatform("All")
                }
              >
                <span>All</span>

                <strong>
                  {games.length}
                </strong>
              </button>

              <button
                className={`platform ${
                  currentPlatform === "PC"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setCurrentPlatform("PC")
                }
              >
                <span>PC</span>

                <strong>
                  {getPlatformCount("PC")}
                </strong>
              </button>

              <button
                className={`platform ${
                  currentPlatform === "PlayStation"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setCurrentPlatform("PlayStation")
                }
              >
                <span>PlayStation</span>

                <strong>
                  {getPlatformCount(
                    "PlayStation"
                  )}
                </strong>
              </button>

              <button
                className={`platform ${
                  currentPlatform === "Xbox"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setCurrentPlatform("Xbox")
                }
              >
                <span>Xbox</span>

                <strong>
                  {getPlatformCount("Xbox")}
                </strong>
              </button>

            </div>

            {/* ADD GAME */}

            <div className="add-panel">

              <h2>
                ADD GAME
              </h2>

              <form
                id="gameForm"
                onSubmit={handleSubmit}
              >

                <input
                  type="text"
                  placeholder="Game title"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  required
                />

                <input
                  type="url"
                  placeholder="Image URL"
                  value={image}
                  onChange={(event) =>
                    setImage(event.target.value)
                  }
                />

                <select
                  value={platform}
                  onChange={(event) =>
                    setPlatform(event.target.value)
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

                <select
                  value={rating}
                  onChange={(event) =>
                    setRating(event.target.value)
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

                <button
                  type="submit"
                  className="add-button"
                >
                  + ADD TO VAULT
                </button>

              </form>

            </div>

          </aside>

        </section>

      </main>
    </>
  );
}

export default App;