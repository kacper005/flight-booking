import { UserDTO } from "./user.js";
import { FlightDTO } from "./flight.js";

/**
 * @typedef {Object} BookingDTO
 * @property {number} bookingId
 * @property {string} bookingDate
 * @property {UserDTO|null} user
 * @property {FlightDTO[]} flights
 */

/**
 * @type {BookingDTO}
 */
export const BookingDTO = {
  bookingId: 0,
  bookingDate: "",
  user: null,
  flights: [],
};
