export default async function parseArticleData(page, numArticles) {
  page.on('console', (msg) => console.log('LOG:', msg.text())); // Listen for console messages and log them to node
  return page.evaluate((num) => {
    const data = Array.from(document.querySelectorAll('.athing')).slice(0, num); // Uses `num` to determine how many articles to select
    return data.map((article, idx) => {
      console.log('Fetching Article', idx + 1);
      const titleElement = article.querySelector('.titleline a'); // Selects the title and url of the article
      const rank = article.querySelector('.rank').textContent; // Selects the rank of the article
      const title = titleElement ? titleElement.textContent : '';
      const url = titleElement ? titleElement.getAttribute('href') : '';
      const subline = article.nextElementSibling;
      const points = subline.querySelector('.score')
        ? subline.querySelector('.score').textContent
        : '';
      const author = subline.querySelector('.hnuser')
        ? subline.querySelector('.hnuser').textContent
        : '';
      const age = subline.querySelector('.age').textContent;
      const commentsLinkElement = subline.querySelector('a[href^="item?id="]');
      const commentsLink = commentsLinkElement
        ? commentsLinkElement.getAttribute('href')
        : '';
      return { rank, title, url, points, author, age, commentsLink };
    });
  }, numArticles); // `numArticles` is passed here from the outer scope into `page.evaluate()`
}
