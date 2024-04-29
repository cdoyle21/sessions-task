# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

Create a copy of the .env.example file and rename it to .env

Run the development server:

```bash
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Unit tests

```
# Run unit tests for the coding test
npm run test
```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Notes

After using the search bar to find a product, if you filter by category and then change the sort order, the filtered products will load without taking into account the search value added within the search bar.

This is because when the sort button is clicked, a request is made to `getCategoryProducts` and so the whole set of filtered results are returned sorted. The search term is not taken into account as this functionality was not available with the fake store API.

I could have added my own sorting logic and for instance sorted products by price. Then set the state of the filteredData to what was returned eg:

    `const sortedResults: ItemProps[] = [...data].sort((a, b) => {
      const priceA = parseInt(a.price, 10);
      const priceB = parseInt(b.price, 10);

      return priceA - priceB;
    });`

However, I wanted to show that I could use the API to sort with params sent instead. And the only sorting available with the API was `asc` and `desc` of the product ID.
