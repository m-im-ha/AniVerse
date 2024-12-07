import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../provider/Movieprovider";

function Favoritemovies() {
  const { user } = useContext(MovieContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/favorites/${user.userID}`
        );
        if (response.ok) {
          const data = await response.json();
          setFavorites(data);
        } else {
          console.error("Failed to fetch favorites");
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    if (user) fetchFavorites();
  }, [user]);
  return (
    <div>
      <h2>My Favorites</h2>
      <h3>{favorites.length}</h3>
    </div>
  );
}

export default Favoritemovies;
