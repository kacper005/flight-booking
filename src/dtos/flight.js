import { PriceDTO } from "./price.js";

/**
 * @typedef {Object} FlightDTO
 * @property {number} flightId
 * @property {string} flightNumber
 * @property {string} departureDate
 * @property {string} arrivalDate
 * @property {string} departureAirport
 * @property {string} arrivalAirport
 * @property {PriceDTO[]} prices
 */

/**
 * @type {FlightDTO}
 */
export const FlightDTO = {
  flightId: 0,
  flightNumber: "",
  departureDate: "",
  arrivalDate: "",
  departureAirport: "",
  arrivalAirport: "",
  prices: [],
};
