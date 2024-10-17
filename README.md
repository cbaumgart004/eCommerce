# E-Commerce API

## Description

This API provides back-end access to a Postgres database allowing you to store products by category, manage inventory, adjust pricing, assign tags to products, and much more. There is no UI for this project, but does allow robust use of GET, POST, PUT, and DELETE requests that can be managed through applications such as insomnia

## Table of Contents (Optional)

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

- npm i
- initialize postgres in the db folder by using psql -U postgres, entering your password, and importing the schema file using the postgres command \i schema.sql
- Exit postgres, return to the root, and run npm run seed (optional)
- This will seed your database with sample data

## Usage

The repository for this project can be found [here](https://github.com/cbaumgart004/eCommerce/blob/main/Assets/eCommerce.mp4)
Using an application such as insomnia, users can peform the following tasks:

- Get All Categories
- Get All Products
- Get All Tags
- Get Product by ID
- Get Category by ID
- Get Tag by ID
- Add Category
- Add Product
- Add Tag
- Add a Tag to a Product
- Modify other Attributes to a Product
- Modify a Category
- Modify a Tag
- Delete Categories
- Delete Products
- Delete Tags
  You can see an example use case in this image
  ![alt here](assets/eCommerceInsomnia.jpg)
  You can also see a video walkthrough [here](https://github.com/cbaumgart004/eCommerce)

## Credits

This project was created by [Chris Baumgart](https://github.com/cbaumgart004) and was heavily influenced by expertise gained in the Module 18 challenge

## License

## This project is licensed with an MIT License which can be viewed [here](https://github.com/cbaumgart004/eCommerce/blob/main/LICENSE).

## Tests

- Get All Categories
- GET localhost:3001/api/categories

- Get All Products

GET localhost:3001/api/products

- Get All Tags
  GET localhost:3001/api/tags

- Get Product by ID
- GET localhost:3001/api/products/6

- Get Category by ID

GET localhost:3001/api/categories/1

- Get Tag by ID

localhost:3001/api/tags/1

- Add Category

POST localhost:3001/api/categories
JSON
{
"category_name": "Lunch Items"
}

- Add Product

POSTlocalhost:3001/api/products
JSON

{
"product_name": "Basketball",
"price": 200.00,
"stock": 3,
"category_id": 1,
"tagIds": []
}

- The tagIds field is optional

* Add Tag

POST localhost:3001/api/tags
JSON
{
"tag_name": "Orange"
}

- Add a Tag to a Product

PUT localhost:3001/api/products/6
JSON{
"product_name": "Basketball",
"price": 199.99,
"stock": 4,
"category_id": 2,
"tagIds": [9]
}

- Modify other Attributes to a Product

SEE TEST ABOVE

- Modify a Category

PUT localhost:3001/api/categories/6
{
"category_name": "Dinner Items"
}

- Modify a Tag

PUT localhost:3001/api/tags/1
JSON
{
"tag_name": "Rock Music"
}

- Delete Categories

DELETE localhost:3001/api/categories/6

- Delete Products

DELETE localhost:3001/api/products/2

- Delete Tags

DELETE localhost:3001/api/tags/9
