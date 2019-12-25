export const MAXIMUM_TEST_DATA = 1000

/**
 * Returns a random integer between [min,max),
 *  *the max is exclusive*
 * @param min
 * @param max
 * @return number
 */
export const randomInt = (min = 0, max = 100) => {
  const MIN = Math.ceil(min)
  const MAX = Math.floor(max)
  return Math.floor(Math.random() * (MAX - MIN)) + MIN
}
