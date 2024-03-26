// take in parameters from the command line ( node index.js      File Name, Save Path, # of Articles )
import saveArticlesToCSV from './src/format/saveToCsv.js';
import main from './src/main.js';

const args = process.argv.slice(2);
// Assuming the first argument is fileName and the second is numArticles
const fileName = args[0] || 'noFileName'; // Use default if undefined
// Parse numArticles from arguments, default to 10 if undefined, and enforce a maximum of 30
let numArticles = args[1] ? parseInt(args[1], 10) : 10;
numArticles = numArticles > 30 ? 30 : numArticles;
const fetchAllComments = args[2] === undefined;
let numComments = fetchAllComments ? 'all' : parseInt(args[2], 10);
(async () => {
  if (!args[0]) {
    console.log(`Missing 'fileName'. Using default value: '${fileName}'`);
  }
  if (!args[1]) {
    console.log(`Missing 'numArticles'. Using default value: ${numArticles}`);
  } else if (args[1] && parseInt(args[1], 10) > 30) {
    console.log(`'numArticles' exceeds the limit of 30. Limiting to 30.`);
  }
  if (fetchAllComments) {
    console.log(
      'No specific number of comments provided. Will fetch all comments.'
    );
  }
  const articles = await main(numArticles, numComments);
  console.log('** Articles Fetched:', JSON.stringify(articles, null, 2));
  await saveArticlesToCSV(fileName, articles);
})();
