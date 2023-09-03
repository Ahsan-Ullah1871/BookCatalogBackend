### Introduction

Welcome to the Book Catalog API documentation! This API serves as the backend
system for the Book Catalog platform, where users can explore and discover
various books across different genres and authors.

## Features

- Browse a vast collection of books.
- Search for books based on titles, authors, or genres.
- View detailed information about a specific book.
- Add new books to the catalog.
- Update existing book information.
- Delete books from the catalog.
- order some books
- User list
- user details
- Profile information

### Live Link: https://books-catalog-by-postgeres.vercel.app/api/v1

### Application Routes:

#### User

- api/v1/auth/signup (POST)
- api/v1/users (GET)
- api/v1/users/dcc91137-5a5e-48a2-93c5-dd02ea5ba6f5 (Single GET)
- api/v1/users/6177a5b87d32123f08d2f5d4 (PATCH)
- api/v1/users/dcc91137-5a5e-48a2-93c5-dd02ea5ba6f5 (DELETE)
- api/v1/profile (GET)

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/3182270a-4fab-4b64-bdc6-855242f9e59b (Single GET)
- api/v1/categories/3182270a-4fab-4b64-bdc6-855242f9e59b (PATCH)
- api/v1/categories/3182270a-4fab-4b64-bdc6-855242f9e59b (DELETE)

### Books

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/:categoryId/category (GET)
- api/v1/books/:id (GET)
- api/v1/books/:id (PATCH)
- api/v1/books/:id (DELETE)

### Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET)
- api/v1/orders/:orderId (GET)

### Header params (For private route)

| Parameter       | Type     | Description                    |
| --------------- | -------- | ------------------------------ |
| `authorization` | `string` | The token of user after login. |

### authorization example (can use for test)

authorization:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkY2M5MTEzNy01YTVlLTQ4YTItOTNjNS1kZDAyZWE1YmE2ZjUiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2OTM2ODI1MTQsImV4cCI6MTY5NjI3NDUxNH0.Xwtk88YU4NpASKbjhzxYGPiALLXPyVfVXLuP1bFUQzM
