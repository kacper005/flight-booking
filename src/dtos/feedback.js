import { UserDTO } from "./user.js";

/**
 * @typedef {Object} FeedbackDTO
 * @property {number} feedbackId
 * @property {UserDTO|null} userId
 * @property {number} rating
 * @property {string} comment
 * @property {string} createdAt
 */

/**
 * @type {FeedbackDTO}
 */
export const FeedbackDTO = {
  feedbackId: 0,
  userId: null,
  rating: 0,
  comment: "",
  createdAt: "",
};
