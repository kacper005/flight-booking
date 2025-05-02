import { BookingDTO } from "./booking.js";
import { FeedbackDTO } from "./feedback.js";

/**
 * @typedef {Object} UserDTO
 * @property {number} userId
 * @property {string} email
 * @property {string} password
 * @property {number} phone
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} dateOfBirth
 * @property {string} country
 * @property {string} gender
 * @property {string} role
 * @property {string} createdAt
 * @property {BookingDTO[]} bookings //Saved trips
 * @property {FeedbackDTO[]} feedbacks //User feedbacks
 */

/**
 * @type {UserDTO}
 */
export const UserDTO = {
  userId: 0,
  email: "",
  password: "",
  phone: 0,
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  country: "",
  gender: "",
  role: "",
  createdAt: "",
  bookings: [],
  feedbacks: [],
};
