export default async function parseComments(page, articles, numComments) {
  for (const article of articles) {
    if (article.commentsLink) {
      const commentsUrl = `https://news.ycombinator.com/${article.commentsLink}`;
      await page.goto(commentsUrl);
      console.log(`** Opened Comments Page for article ${article.rank}`);

      // Pass `numComments` to `page.evaluate()` as the second argument
      const additionalData = await page.evaluate(
        (num) => {
          const commentsArray = [];
          const commentElements = document.querySelectorAll(
            '.comment-tree .comtr'
          );
          // Convert NodeList to Array to use Array methods like slice()
          const limitedComments =
            num === 'all'
              ? Array.from(commentElements)
              : Array.from(commentElements).slice(0, num);

          limitedComments.forEach((commentElement) => {
            const id = commentElement.id;
            const user = commentElement.querySelector('.hnuser')?.textContent;
            const age = commentElement.querySelector('.age a')?.textContent;
            const text = commentElement
              .querySelector('.commtext')
              ?.textContent.trim();
            const indent = commentElement.querySelector('.ind img')?.width; // Using width as indent level indicator
            commentsArray.push({ id, user, age, text, indent });
          });
          return commentsArray;
        },
        numComments === 'all' ? 'all' : parseInt(numComments, 10)
      );
      article.comments = additionalData;
    }
  }

  return articles;
}
