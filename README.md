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
```bash
token: access-token
```


## Screenshot

Login Endpoint:
![image](https://github.com/sahilsuman933/pixelwand-assignment/assets/34382211/a2afd3a2-02b2-46ba-a9ed-1d32e1a35132)

Signup Endpoint: 
![image](https://github.com/sahilsuman933/pixelwand-assignment/assets/34382211/4aaf118d-ac36-4098-a44e-c816a500ec07)

Logout Endpoint:
![image](https://github.com/sahilsuman933/pixelwand-assignment/assets/34382211/e336dc5c-b13e-456d-bd2d-9ec8e13599f8)

Protected Route with invalid access token:
![image](https://github.com/sahilsuman933/pixelwand-assignment/assets/34382211/bdf2a8d6-9d89-4a5b-a811-0771f8b32d79)

Protected Route with valid access token:
![image](https://github.com/sahilsuman933/pixelwand-assignment/assets/34382211/0e6ba494-37d6-4913-8624-a69e23b67c6d)

API Endpoint Test Using Mocha:
![image](https://github.com/sahilsuman933/pixelwand-assignment/assets/34382211/336ca91a-bbbe-40df-9156-8c3553255f0b)

