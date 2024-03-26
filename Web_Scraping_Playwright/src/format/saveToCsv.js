import { format } from '@fast-csv/format';
import fs from 'fs';
import hierarchy from '../helpers/hierarchy.js';

export default async function saveArticlesToCSV(fileName, articles) {
  const FileName = `${fileName}.csv`;
  const csvStream = format({
    headers: [
      'Rank',
      'Title',
      'URL',
      'Author',
      'Article Age',
      // 'Comments Link',
      'Comments Count',
      'Comment ID',
      'Comment User',
      'Comment Age',
      'Comment Hierarchy',
      'Comment Text'
    ],
    writeHeaders: true,
    // Ensure we properly handle multi-line fields and potential delimiters in text
    shouldQuote: (value, { header }) =>
      header === 'Comment Text' || value.includes(',')
  });

  const CreateCsvFile = fs.createWriteStream(FileName);

  CreateCsvFile.on('finish', () =>
    console.log('** successfully ** Saved articles to CSV as', FileName)
  );

  csvStream.pipe(CreateCsvFile);

  articles.forEach((article) => {
    // Write the article row first
    csvStream.write({
      Rank: article.rank,
      Title: article.title,
      URL: article.url,
      Author: article.author,
      'Article Age': article.age,
      // 'Comments Link': article.commentsLink,
      'Comments Count': article.comments ? article.comments.length : 0
    });

    // Then, iterate through each comment and write it
    article.comments?.forEach((comment) => {
      let hierarchyLevel = hierarchy(comment.indent);
      csvStream.write({
        Rank: '', // Empty for comments
        Title: '',
        URL: '',
        Author: '',
        'Comments Link': '',
        'Comments Count': '',
        'Comment ID': comment.id,
        'Comment User': comment.user,
        'Comment Age': comment.age,
        'Comment Hierarchy': hierarchyLevel,
        'Comment Text': comment.text // Replace newlines to keep each comment in one row; adjust as needed
      });
    });
  });

  csvStream.end();
}
