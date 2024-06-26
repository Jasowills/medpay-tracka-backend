
# medpay-tracka-backend API Documentation

## Overview

This document outlines the endpoints available in the medpay-tracka backend API for testing and integration.

## Authentication Routes

### Register User

- **POST** `/api/auth/register`

  Registers a new user.

  **Request Body:**
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "userName": "string",
    "password": "string",
    "email": "string" // Optional if using Google login
  }
  ```

- **POST** `/api/auth/login`

  Logs in a user.

  **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

## Transaction Routes

### Create Transaction

- **POST** `/api/transactions`

  Creates a new transaction for the authenticated user.

  **Request Body:**
  ```json
  {
    "description": "string",
    "category": "string",
    "amount": number,
    "type": "income" | "expense"
  }
  ```

### Get Transactions

- **GET** `/api/transactions`

  Retrieves all transactions for the authenticated user.

## Analytics Routes

### Get Income and Expense

- **GET** `/api/analytics/income-expense`

  Retrieves total income and expense for the authenticated user.

### Get Top Categories

- **GET** `/api/analytics/top-categories`

  Retrieves top categories by total amount for the authenticated user.

### Get Weekly Income and Expense

- **GET** `/api/analytics/weekly-income-expense`

  Retrieves weekly income and expense totals for the authenticated user.

## Notes

- Replace `"string"`, `number`, and `"income" | "expense"` with actual values when testing.
- Ensure proper authentication via JWT for protected routes (`/api/transactions`, `/api/analytics`).
- All endpoints are RESTful and follow standard HTTP methods (POST, GET, PUT, DELETE).
- Make sure to update the .env.sample and rename to .env with all the proper fields updated. 