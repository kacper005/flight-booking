import { Link } from "react-router-dom";
import RecommendationCard from "@atoms/RecommendationCard/RecommendationCard.jsx";
import "./Recommendations.css";

export const Recommendations = () => {
  return (
    <section className={"recommendations"}>
      <h1>Recommendations</h1>
      <div className={"recommendationCardContainer"}>
        <Link
          to={
            "search-results?from=JFK&to=LAX&start=2025-08-15T00%3A00%3A00.000&end=&roundTrip=false&adult=1&child=0&infant=0"
          }
        >
          <RecommendationCard
            imageSrcSet="/recommendations/los_angeles.webp"
            title="Los Angeles"
            departurePoint={"New York"}
            price={"$150"}
            info="Explore iconic beaches, Hollywood glamour, diverse cuisine, and year-round sunshine in the heart of Southern California."
          />
        </Link>
        <Link
          to={
            "search-results?from=OSL&to=AES&start=2025-09-05T00%3A00%3A00.000&end=2025-09-12T00%3A00%3A00.000&roundTrip=true&adult=1&child=0&infant=0"
          }
        >
          <RecommendationCard
            imageSrcSet="/recommendations/aalesund.webp"
            title="Ålesund"
            departurePoint={"Oslo"}
            price={"1200 NOK"}
            info="Discover Norway’s coastal gem with stunning Art Nouveau architecture and panoramic fjord views from Mount Aksla."
          />
        </Link>
        <Link
          to={
            "search-results?from=FCO&to=CDG&start=2025-11-15T00%3A00%3A00.000&end=2025-11-22T00%3A00%3A00.000&roundTrip=true&adult=1&child=0&infant=0"
          }
        >
          <RecommendationCard
            imageSrcSet="/recommendations/paris.webp"
            title="Paris"
            departurePoint={"Rome"}
            price={"€80"}
            info="Stroll charming streets, savor world-class cuisine, and admire iconic landmarks in the romantic heart of art and fashion."
          />
        </Link>
        <Link
          to={
            "search-results?from=DOH&to=SYD&start=2025-09-01T00%3A00%3A00.000&end=2025-09-15T00%3A00%3A00.000&roundTrip=true&adult=1&child=0&infant=0"
          }
        >
          <RecommendationCard
            imageSrcSet="/recommendations/sydney.webp"
            title={"Sydney"}
            departurePoint={"Doha"}
            price={"$1500"}
            info="Enjoy sunny harbor views, world-famous beaches, and landmarks like the Sydney Opera House and Harbour Bridge."
          />
        </Link>
        <Link
          to={
            "search-results?from=WAW&to=KRK&start=2025-07-05T00%3A00%3A00.000&end=&roundTrip=false&adult=1&child=0&infant=0"
          }
        >
          <RecommendationCard
            imageSrcSet="/recommendations/krakow.webp"
            title={"Krakow"}
            departurePoint={"Warszawa"}
            price={"$850"}
            info={
              "Wander medieval streets, explore historic castles, and enjoy vibrant nightlife in Poland’s cultural capital full of charm and history."
            }
          />
        </Link>
        <Link
          to={
            "search-results?from=FRA&to=JFK&start=2025-09-01T00%3A00%3A00.000&end=&roundTrip=false&adult=1&child=0&infant=0"
          }
        >
          <RecommendationCard
            imageSrcSet="/recommendations/new_york.webp"
            title={"New York"}
            departurePoint={"Frankfurt"}
            price={"$900"}
            info={
              "Feel the energy of the city that never sleeps—iconic sights, global flavors, arts, and nonstop urban excitement."
            }
          />
        </Link>
        <Link
          to={
            "search-results?from=ZRH&to=AMS&start=2025-08-01T00%3A00%3A00.000&end=&roundTrip=false&adult=1&child=0&infant=0"
          }
        >
          <RecommendationCard
            imageSrcSet="/recommendations/amsterdam.webp"
            title={"Amsterdam"}
            departurePoint={"Zurich"}
            price={"€120"}
            info={
              "Cruise picturesque canals, explore world-class museums, and enjoy the laid-back vibe of this bike-friendly, historic Dutch capital."
            }
          />
        </Link>
        <Link
          to={
            "search-results?from=GDN&to=WAW&start=2025-06-18T00%3A00%3A00.000&end=&roundTrip=false&adult=1&child=0&infant=0"
          }
        >
          <RecommendationCard
            imageSrcSet="/recommendations/warszawa.webp"
            title={"Warszawa"}
            departurePoint={"Gdansk"}
            price={"$850"}
            info={
              "Experience Poland’s resilient capital with modern flair, historic Old Town, green parks, and a thriving arts and café scene."
            }
          />
        </Link>
      </div>
    </section>
  );
};
