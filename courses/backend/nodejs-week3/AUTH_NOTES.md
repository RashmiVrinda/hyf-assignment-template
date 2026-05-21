# Authorization Documentation (Part C)

## How to Log In
1. Send a `POST` request to `/api/users/login` with `email` and `password`.
2. The server returns a JSON object containing a `token`.

## Using the Authorization Mechanism
- **Headers**: All protected requests must include the header `Authorization: Bearer <your_token>`.
- **Improved Error Handling**:
    - `401 Unauthorized`: Returned if the token is missing, expired, or doesn't exist in the database `tokens` table.
    - `403 Forbidden`: Returned if the token is invalid (wrong signature) or if the user lacks the required role (e.g., a standard 'user' trying to access 'admin' routes).

## Role Permissions
- **Public**: Anyone can `GET` snippets (no token required).
- **Logged In**: Any valid token can `POST` or `PUT` snippets.
- **Admin Only**: Only tokens with `role: "admin"` can `DELETE` snippets.

## How to Log Out
- Send a `POST` request to `/api/users/logout-token` with the token in the header.
- This removes the token from the database, immediately invalidating it.