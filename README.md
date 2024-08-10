# Price Pulse

## Team members:
    Niv Zindorf
    Chen Michaeli
    Eddy Movshovich
    Gil Semel

## Description of the project
  Introducing a browser plugin that helps you find the best time to purchase e-commerce products by analyzing historical and current price trends.

  ### Flow of usage
  1. Browse for a product on an e-commerce site.
  2. Press the plugin button.
  3. View one of the following components
    - Trends View: A graphical view of price records from the last year, showing the price trend.
    - Histogram View: A histogram of the average price per week of a product, indicating the uniqueness of the price.
    - Insights View: Displays the pre-calculated insights for the viewed product, provides a price prediction and helps users decide on their next steps.

  ### Our service
  1. Saves consumers money.
  2. Empower consumer data driven decisions.
  3. Increase price transparency & market competition.
  4. Market potential – growing interest in smart shopping tools.
  5. Potential partnerships with E-Commerce shops - boosts sales off season.

## Running The Project

### Requirements
- Node.js
- NPM
- PNPM
- MySQL Server
- MySQL Workbench
- Google Chrome

### How To Create The Database
1. Create an SQL Server on localhost with the following settings:
   - **Port**: `3306`
   - **Username**: `root`
   - **Password**: `123456`
2. Open MySQL Workbench, connect to the server you just created, and create a database called `trends`.
3. Clone this repository to your PC.
4. Open a terminal in the `/Trends` directory of this project, then run `npm install` and wait for the dependencies to install.
5. In the same directory (`/Trends`), run `npx nx serve api-price-insights` to run the API that controls the database.
6. Enter `http://localhost:3005/swagger` in your browser's address bar to access the Swagger UI.
7. Execute the following commands in this exact order using the Swagger UI:
   - `GET /api/db/create`
   - `GET /api/db/populate`
   - `POST /api/calculate/insight`
8. Terminate the API by pressing `Ctrl + C` in the terminal you used in step 5.

### How To Build And Install the Chrome Plugin
1. Open a terminal in the `/Trends` directory of this project, then run `npm install` and wait for the dependencies to install.
2. In the same directory (`/Trends`), run `npx nx build ui-plugin`.
3. The built Chrome plugin folder is located at `Trends/dist/apps/ui-plugin`.
4. Follow [this guide](https://www.youtube.com/watch?v=oswjtLwCUqg) to install the plugin you just built (`Trends/dist/apps/ui-plugin`).

### How To Run The Whole Project
1. Open a terminal in the `/saleor-storefront` directory of this project, 
2. In the same directory (`/saleor-storefront`), run `npx pnpm dev` and wait for it to finish (do not close this terminal!).
3. Open another terminal in the `/Trends` directory and run `npx nx serve api` (do not close this terminal!).
4. Enter `http://localhost:3000/` in your browser's address bar to access the mock e-commerce site.
5. Navigate to a product page, and run the plugin.
6. Enjoy! :)

## Project design and code
### Design
We have a few services:
1. Mock site of ECommerce products. Used for demonstration of our plugin abilities.
    
2. UI React application. The user interface, a Chrome plugin which has 3 main components
  - Graph of the price trend of a product throughout time.
  - Prompt with data driven recommendations.
    For example, which shop has the current best price. In which month buying is usually     
    recommended and when to avoid buying. General statistics such as the relation between the current
    price and the average price. What is the relation of the price to the distribution of price along time.
    Standard deviation of the price trend and more.
  - Histogram of average price distribution along past weeks.  

      In addition the UI has state, it includes user settings that are stored in the local storage of the browser.
      You can customize all of the components and we support a dark mode.
    
4. Api backend service. This service exposes two endpoints for the UI client, and gets data from the database:
    - Get the insights (prompt and histogram data) for the current product based on the product id / name.
    - Get the data for the graph of price over time by product id / name.
    
5. Schedualed job backend service. This service is runnable as a schedualed job (we decided on once a day),
    The service gets fresh data about products from the database and then process it. It produces the data driven
    insights for the prompt and histogram and also injects the db with the insights and graph data of price over time.

6. Database, SQL. Stores the data of products, shops, insights, price trend data.

  ### Code
We built our project in a framework - nx monorepo. This helped us keep all of our code in one repo!
Under apps folder (in Trends project) we have 3 folders of 3 different services.
1. api: containes the code for the service mentioned in point 3 above. The backend framework is Fastify.
2. api-price-insights: containes the code for services mentioned in point 4, 5 above. The backend framework is Fastify.
3. ui-plugin: contines the code for the UI app mentioned in point 2 above. The frontend framework is React.
4. Under saleor-storefront project folder is the code for the Mock site of ECommerce products.

## Features and Algorithms
  ### Algorithms 
  #### Scheduled Job
  - The scheduled job queries data resources for fresh daily data during each run.
  - This data is then inserted into the database using a generic flow for DB population.
  - The job calculates and adjusts new insights based on the fresh data.
  - It also computes the new histogram data.
  - The insights and histogram data are stored in the products table, with each product receiving its own insights text for optimized display on the corresponding product page.
  
  #### Insight Calculation
  - The scheduled job iterates over each product in the database.
  - It determines which stores are selling the product.
  - The job fetches price records of the item from each store.
  - The algorithm calculates the maximum, minimum, and average prices of the product to display in the insights.
  - It also calculates the standard deviation of the price to understand its uniqueness.
  - The algorithm uses price record timestamps to determine the best and worst months to purchase the product.
  - It identifies the cheapest store currently selling the product.
  - Another insight provided is the "rarity" of the price, which is determined by analyzing two years of weekly average prices.
  - For the histogram, the algorithm sorts prices into weekly buckets over two years, calculates the weekly average price, and determines the distribution of this price.
  
  #### General Flow
  - The user visits a site that supports our plugin (such as the mock website).
  - The plugin analyzes the context of the current page and identifies the product name.
  - The name is sent as input to two different APIs:
  - The first is the Insights API, which retrieves the pre-calculated insights text and histogram data.
  - The second fetches all relevant price records from the stores that sell the product.
  - In case of any kind of error or unsupported product, the plugin will present an error message stating the issue.
      
  ### Features
  #### Developer and Backend Features
  - A script generates mock data for testing the insights algorithm.
  - The script accepts a price margin and time intervals to generate price trends for the product.
  - This CSV data is used to populate the SQL database using a dedicated "developer" API.
  - An API is also provided to create the SQL schema for easy local debugging.
  - The SQL infrastructure is adaptable to developer needs through dynamic SQL queries, which can filter data on demand.
  - All SQL data is modeled as TypeScript interfaces for easy type checking and error reduction.
  - The API services support a Swagger environment for easier API debugging.
  
  #### UI Features
  - User preferences are persistent per user browser environment and are stored in local storage.
  - Preferences can be restored to default settings.
  - The plugin supports dark mode.
  - Users can enable and disable stores based on their interests.
  - The plugin UI has three main components:
    1. **Trends View**: A graphical view of price records from the last year, showing the price trend.
    2. **Histogram View**: A histogram of the average price per week of a product, indicating the uniqueness of the price.
    3. **Insights View**: Displays the pre-calculated insights for the viewed product, helping users decide on their next steps.


  ## Explanation about the evolution of the project
We have started the project with the following potential challenges and development assumptions.
Furthermore, we started with only the components of the graph data and prompt with data driven recomendations in mind (without distribution histogram).
  
Potential challenges:
1. Real-time data processing
2. Accurate insights based on our analysis
3. Finding historical price data from a wide range of e-commerce sites
4. Getting e-commerce platforms to integrate and share data
5. Ensuring correct and consistent web scraping across different sites

Development assumptions:
1. Due to resource constraints, we manually created data using existing information available online rather than
 implementing a full web scraping solution.
2. Our single initial data source is Amazon, Ksp and Ivory and we assume there is the same id and name to the products.
3. We designed our initial model and infrastructure with future scalability in mind with the possibility of deploying on "Kubernetes".
4. For our initial analysis, we utilized basic mathematical tools.
5. We assume that prices change up to once a day.

After the midterm meeting, following Yael's recommendation we have decided to add the distribution data component with the histogram. This decision involved:
1. Creating a UI component on the front end of a histogram.
2. Changing the schemas of the api service.
3. Change in the schedualed job service of the data processing flow.
 In short, Calculating distribution of prices over two years time by bucketing them into weeks and taking the average of buckets. This data later is presented on the histogram UI component.

In addition, after the midterm meeting we have also decided on a UI refactor of the components and added user settings for personal customization and stored them in local storage and dark mode view.
We also enabled support for multiple stores.

After the final meeting following the recommendation of Michael (the external judge :) ) we added a prompt recommendation that indicates if the price is expected to go down or up.
