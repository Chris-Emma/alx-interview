#!/usr/bin/node

const request = require('request');

if (process.argv.length < 3) {
  console.log('Usage: ./0-starwars_characters.js <Movie.id>');
  process.exit(1);
}

const movieId = process.argv[2];
const apiUrl = `https://swapi-api.alx-tools.com/api/films/${movieId}`;

// Function to fetch data from the given URL
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (response.statusCode !== 200) {
        reject(
          new Error(`Failed to load data, status code: ${response.statusCode}`)
        );
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
};

fetchData(apiUrl)
  .then((movieData) => {
    const characterPromises = movieData.characters.map(
      (characterUrl) => fetchData(characterUrl)
    );
    return Promise.all(characterPromises);
  })
  .then((characters) => {
    characters.forEach((character) => {
      console.log(character.name);
    });
  })
  .catch((error) => {
    console.log('Error:', error.message);
  });
