const Papa = require('papaparse');
const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
  let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQovPFa77EBWZpzu4Z4bGx0Jw1_U-K7sXhoUmyY2e8yW-uJDdrBNyX2JHU7wFmRLy0R3wEKiGMKL4su/pub?gid=1491816533&single=true&output=csv";
  // let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQovPFa77EBWZpzu4Z4bGx0Jw1_U-K7sXhoUmyY2e8yW-uJDdrBNyX2JHU7wFmRLy0R3wEKiGMKL4su/pub?gid=1491816533&single=true&output=csv";

  // Eleventy Fetch caches API results, to prevent new requests on every site re-build.
  const results = await EleventyFetch(url, {
    duration: "1d", // save for 1 day
    type: "text"
  });

  const parsedResult = await Papa.parse(results);

  console.log(parsedResult);

  const data = [];
  parsedResult.data.forEach((row, i) => {
    if (i !== 0) {
      data.push({
        title: row[0],
        year: row[1],
        content: row[2],
        era: row[3]
      });
    }
  });
  console.log(data);

  return data;
};
