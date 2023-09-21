## Pixelwand

This is a Backend Dev Intern Test Task given by Pixelwand.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/sahilsuman933/pixelwand-assignment.git
cd pixelwand-assignment
```

2. Install dependencies:

```bash
   npm install
```

3. Set up environment variables:

```
MONGODB_URI=CONNECTION_URL
JWT_SECRET=SECRET
PORT=PORT

```

4. Start the development server:

```bash
  npm start
```

API Endpoints:

## POST /auth/signup

**Description:** User registration endpoint.

**Request:**
```json
{
  "name": "example_user",
  "email": "user@example.com",
  "password": "example_password"
}
```

## POST /auth/login

**Description:** User login endpoint.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "example_password"
}
```
## POST /auth/logout

**Description:** User logout endpoint.

**Header:**
```json
token: access-token
```


## Screenshot
