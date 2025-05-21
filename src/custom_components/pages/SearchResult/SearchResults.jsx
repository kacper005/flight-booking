import React from "react";
import { useLocation } from "react-router-dom";
import { getSearchFlights } from "@api/flightApi";
import { formatDate2Digit, formatTime2Digit } from "@formatters/DateFormatters";
import { PageTemplate } from "@templates/PageTemplate/PageTempate";
import { Grid } from "@atoms/Grid";
import { LoadingSpinner } from "@atoms/LoadingSpinner";
import { SearchResultCard } from "@organisms/SearchResultCard/SearchResultCard";
import { ActiveSearchPanel } from "@organisms/FlightSearchPanel/ActiveSearchPanel";

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
  const outboundFlightId = params.get("outboundFlightId");
  const returnFlightId = params.get("returnFlightId");
  const adult = parseInt(params.get("adult") || "1");
  const child = parseInt(params.get("child") || "0");
  const infant = parseInt(params.get("infant") || "0");

  const flightParams = {
    from,
    to,
    start,
    end,
    roundTrip,
    outboundFlightId,
    returnFlightId,
  };

  React.useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await getSearchFlights(flightParams);
        setFlights(res.data);
      } catch (err) {
        setError(err.message || "Failed to load flights.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [from, to, start, end, roundTrip]);

  return (
    <PageTemplate>
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <ActiveSearchPanel
          initialFrom={from}
          initialTo={to}
          initialIsRoundTrip={roundTrip === "true"}
          initialDateRange={
            roundTrip === "true" && start && end
              ? [new Date(start), new Date(end)]
              : [null, null]
          }
          initialOneWayDate={
            roundTrip === "false" && start ? new Date(start) : null
          }
          initialPassengers={{ adult, child, infant }}
        />
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "800px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Grid display={"flex"} alignItems={"center"} flexDirection={"column"}>
            {flightsError && (
              <h3 style={{ marginTop: "30px" }}>
                {flightsError || "An error occurred while fetching flights."}
              </h3>
            )}
            {flights?.length === 0 && (
              <h3 style={{ marginTop: "30px" }}>No flights found</h3>
            )}
          </Grid>
        </div>
        {loadingFlights && <LoadingSpinner />}

        {flights?.map((flight, index) => {
          const outbound = flight.outboundFlight || flight;
          const ret = flight.returnFlight;

          const prices = outbound.prices || [];

          const lowestOutboundPrice = prices.reduce(
            (min, p) => (p.price < min ? p.price : min),
            prices[0]?.price || 0
          );

          const adultPrice = lowestOutboundPrice;
          const childPrice = adultPrice * 0.85;
          const totalPrice = adult * adultPrice + child * childPrice;

          return (
            <SearchResultCard
              key={index}
              outboundFlightOriginAirportCode={
                ret?.arrivalAirport?.code || outbound?.departureAirport?.code
              }
              outboundFlightDestinationAirportCode={
                ret?.departureAirport?.code || outbound?.arrivalAirport?.code
              }
              returnFlightOriginAirportCode={outbound?.arrivalAirport?.code}
              returnFlightDestinationAirportCode={
                outbound?.departureAirport?.code
              }
              outboundOperatingAirlineName={outbound?.airline?.name}
              returnOperatingAirlineName={ret?.airline?.name || ""}
              outboundOperatingAirlineLogo={outbound?.airline?.logoFileName}
              returnOperatingAirlineLogo={ret?.airline?.logoFileName || ""}
              outboundFlightDepartureDate={formatDate2Digit(
                outbound?.departureTime
              )}
              returnFlightDepartureDate={
                ret ? formatDate2Digit(ret?.departureTime) : ""
              }
              outboundFlightDepartureTime={formatTime2Digit(
                outbound?.departureTime
              )}
              outboundFlightArrivalTime={formatTime2Digit(
                outbound?.arrivalTime
              )}
              returnFlightDepartureTime={
                ret ? formatTime2Digit(ret?.departureTime) : ""
              }
              returnFlightArrivalTime={
                ret ? formatTime2Digit(ret?.arrivalTime) : ""
              }
              availableClasses={outbound?.availableClasses}
              roundTrip={!!ret}
              price={lowestOutboundPrice}
              currency={prices[0]?.currency || ""}
              totalPrice={totalPrice}
              numAdults={adult}
              numChildren={child}
              numInfants={infant}
              totalPassengers={adult + child + infant}
              outboundFlightId={outbound?.flightId}
              returnFlightId={ret?.flightId}
              adminView={false}
            />
          );
        })}
      </div>
    </PageTemplate>
  );
};
