import React from "react";
import { PageTemplate } from "@templates/PageTemplate/PageTempate";
import { Button } from "@atoms/Button";
import { SearchResultCard } from "@organisms/SearchResultCard/SearchResultCard";
import { useLocation } from "react-router-dom";
import { getSearchFlights } from "@api/flightApi";

export const SearchResults = () => {
  const [flights, setFlights] = React.useState([]);
  const [loadingFlights, setLoading] = React.useState(true);
  const [flightsError, setError] = React.useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const from = params.get("from");
  const to = params.get("to");
  const start = params.get("start");
  const end = params.get("end");
  const roundTrip = params.get("roundTrip");

  React.useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await getSearchFlights({ from, to, start, end, roundTrip });
        setFlights(res.data);
      } catch (err) {
        setError(err.message || "Failed to load flights.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [from, to, start, end, roundTrip]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("no-NO", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <PageTemplate>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-around",
          width: "100%",
          maxWidth: "1000px",
          gap: "16px",
        }}
      >
        <div style={{ width: "25%" }}>
          <h4>Filters</h4>
          <br />
          <p style={{ marginBottom: "10px" }}>Flight changes</p>
          <label style={{ display: "block", marginBottom: "8px" }}>
            <input
              type="checkbox"
              style={{ width: "24px", height: "24px", marginRight: "8px" }}
            />{" "}
            Show all
          </label>
          <label style={{ display: "block", marginBottom: "8px" }}>
            <input
              type="checkbox"
              style={{ width: "24px", height: "24px", marginRight: "8px" }}
            />{" "}
            Direct
          </label>
          <label style={{ display: "block", marginBottom: "8px" }}>
            <input
              type="checkbox"
              style={{ width: "24px", height: "24px", marginRight: "8px" }}
            />{" "}
            1 stop
          </label>
          <label style={{ display: "block", marginBottom: "8px" }}>
            <input
              type="checkbox"
              style={{ width: "24px", height: "24px", marginRight: "8px" }}
            />{" "}
            2+ stops
          </label>
          <br />
          <p>Price</p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input style={{ height: "35px", width: "60px", padding: "4px" }} />{" "}
            -
            <input style={{ height: "35px", width: "60px", padding: "4px" }} />
          </div>
          <br />
          <Button>Save Search</Button>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {loadingFlights && <h3>Loading Flights...</h3>}
            {flightsError && (
              <h3>
                {flightsError || "An error occurred while fetching flights."}
              </h3>
            )}
            {flights?.length === 0 && <h3>No flights found</h3>}
          </div>

          {flights?.map((flight, index) => {
            const outbound = flight.outboundFlight || flight;
            const ret = flight.returnFlight;

            const prices = outbound.prices || [];

            const lowestOutboundPrice = prices.reduce(
              (min, p) => (p.price < min ? p.price : min),
              prices[0]?.price || 0
            );

            return (
              <SearchResultCard
                key={index}
                price={lowestOutboundPrice}
                currency={prices[0]?.currency || ""}
                outbandFlightDepartureTime={formatTime(outbound.departureTime)}
                outbandFlightArrivalTime={formatTime(outbound.arrivalTime)}
                returnFlightDepartureTime={
                  ret ? formatTime(ret.departureTime) : ""
                }
                returnFlightArrivalTime={ret ? formatTime(ret.arrivalTime) : ""}
                roundTrip={!!ret}
                outboundOperatingAirlineName={outbound.airline?.name}
                returnOperatingAirlineName={ret?.airline?.name}
                outboundOperatingAirlineLogo={outbound.airline?.logoFileName}
                returnOperatingAirlineLogo={ret?.airline?.logoFileName}
                outbandFlightDepartureDate={formatDate(outbound.departureTime)}
                returnFlightDepartureDate={
                  ret ? formatDate(ret.departureTime) : ""
                }
                outbandFlightArrivalDate={outbound.arrivalTime?.split("T")[0]}
                returnFlightArrivalDate={ret?.arrivalTime?.split("T")[0] || ""}
                outbandFlightOriginAirportCode={outbound.arrivalAirport?.code}
                outbandFlightDestinationAirportCode={
                  outbound.departureAirport?.code
                }
                returnFlightOriginAirportCode={ret?.arrivalAirport?.code}
                returnFlightDestinationAirportCode={ret?.departureAirport?.code}
                availableClasses={outbound.availableClasses}
                extraFeatures={outbound.extraFeatures}
              />
            );
          })}
        </div>
      </div>
    </PageTemplate>
  );
};
