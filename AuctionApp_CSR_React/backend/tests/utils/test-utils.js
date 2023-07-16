import { createUser } from '../../services/user-service.js'

/**
 * @param {number} yearsToAdd
 * @returns {Date}
 */
export function createDateWithAddedYears(yearsToAdd) {
  const currentYear = new Date()
  currentYear.setFullYear(currentYear.getFullYear() + yearsToAdd)
  return currentYear
}

/**
 * @returns {Promise<import('../../models/user.js').User>}
 */
export async function createNotNullTestUser() {
  const user = await createUser('a', 'a', 'a')
  expect(user).not.toBeNull()
  return user
}

export const testBaseUrl = 'http://localhost:3001/'
