function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger(min, max) {
  return Math.round((max - min) * Math.random() + min);
}

function getLastWord(string) {
  const words = string.split(' ');
  return words.at(-1);
}

function upperFirstChar(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export { getRandomArrayElement, getRandomInteger, getLastWord, upperFirstChar};
