import { chromium } from 'playwright';
import parseArticleData from './parse/articleData.js';
import parseComments from './parse/comments.js';

export default async function Main(numArticles, numComments) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://news.ycombinator.com');
  console.log('** Opened Hacker News');
  const articles = await parseArticleData(page, numArticles).then(
    (articles) => {
      return parseComments(page, articles, numComments);
    }
  );
  console.log('** Closed Hacker News');
  await browser.close();
  return articles;
}
