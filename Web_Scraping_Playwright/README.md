# Take Home Assignment 1

### Question 1

In this assignment, you will create a basic script on [Hacker News](https://news.ycombinator.com/) using JavaScript and Microsoft's [Playwright](https://playwright.dev/) framework.

1. Install node modules by running `npm i`.

2. Edit the `index.js` file in this project to go to [Hacker News](https://news.ycombinator.com/) and save the title and URL of the top 10 articles to a CSV file. You can run your script with the `node index.js` command.

Note that you are welcome to update Playwright or install other packages as you see fit.
-----

## How Code Works: 
Install the required dependencies:
```npm install```
-----
To run the script, use the following command:
```node index.js [new csv  file name] [number of articles Limit: 30] [number of comments]```

[file name]: The name of the output file without extension (e.g., output). If not specified, a default value will be used "noFileName.csv".

[number of articles]: The number of articles to fetch. If this parameter is not provided, a default value 10 will be assumed .

[number of comments]: The number of comments to fetch for each article. If omitted, the script will attempt to fetch all comments available.

Example: ```node index.js myOutput 5 10```
This command will process 5 articles and up to 10 comments for each article, saving the output to myOutput.csv.
-----
Running the script without specifying parameters:
```node index.js```
This will use default values for the file name, number of articles, and number of comments.
-----

Things I've Added 
- Eslint
- Prettier
- Paramiter inserts
- More article data
- Comments
- Modularized code

Todo:
- Improve error handling- Improve comprehensive error handling throughout the script to gracefully manage and log exceptions, improving reliability.
- Paramiters exceeding the limit (additional pages) - Extend the script to handle cases where the requested number of articles or comments exceeds the initial limit, possibly by fetching additional pages of data.
