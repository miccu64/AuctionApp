export function getCurrentDateTime() {
  const d = new Date()
  d.setTime(d.getTime() - new Date().getTimezoneOffset() * 60 * 1000)
  return d
}
