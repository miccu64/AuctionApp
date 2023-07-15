/**
 * @param {number} yearsToAdd
 * @returns {Date}
 */
export function createDateWithAddedYears(yearsToAdd) {
  const currentYear = new Date()
  currentYear.setFullYear(currentYear.getFullYear() + yearsToAdd)
  return currentYear
}
