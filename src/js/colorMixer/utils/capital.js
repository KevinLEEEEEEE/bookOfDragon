/**
 * @param {string} text
 */
export default function capital(text) {
  const array = text.split('');

  array[0] = array[0].toUpperCase();

  return array.join('');
}