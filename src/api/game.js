/**
 * API Module for Game Statistics and Backend Integration
 *
 * This module provides stub functions for future backend integration.
 * Replace these with actual API calls when backend is ready.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Save game statistics to backend
 * @param {Object} stats - Game statistics
 * @returns {Promise<Object>} Response from server
 */
export async function saveGameStats(stats) {
  // TODO: Replace with actual API call
  console.log('Saving game stats:', stats);

  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Stats saved successfully',
        data: {
          id: Math.random().toString(36).substr(2, 9),
          ...stats,
          savedAt: new Date().toISOString()
        }
      });
    }, 500);
  });

  // Future implementation:
  // return fetch(`${API_BASE_URL}/stats`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(stats),
  // }).then(res => res.json());
}

/**
 * Get user's game history from backend
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of game records
 */
export async function getGameHistory(userId) {
  console.log('Fetching game history for user:', userId);

  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: []
      });
    }, 300);
  });

  // Future implementation:
  // return fetch(`${API_BASE_URL}/history/${userId}`)
  //   .then(res => res.json());
}

/**
 * Get leaderboard data
 * @param {string} difficulty - Difficulty level
 * @param {number} limit - Number of records to fetch
 * @returns {Promise<Array>} Array of top players
 */
export async function getLeaderboard(difficulty = 'all', limit = 10) {
  console.log('Fetching leaderboard:', { difficulty, limit });

  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: []
      });
    }, 400);
  });

  // Future implementation:
  // return fetch(`${API_BASE_URL}/leaderboard?difficulty=${difficulty}&limit=${limit}`)
  //   .then(res => res.json());
}

/**
 * Submit user feedback
 * @param {Object} feedback - Feedback data
 * @returns {Promise<Object>} Response from server
 */
export async function submitFeedback(feedback) {
  console.log('Submitting feedback:', feedback);

  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Feedback submitted successfully'
      });
    }, 500);
  });

  // Future implementation:
  // return fetch(`${API_BASE_URL}/feedback`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(feedback),
  // }).then(res => res.json());
}

export default {
  saveGameStats,
  getGameHistory,
  getLeaderboard,
  submitFeedback
};
