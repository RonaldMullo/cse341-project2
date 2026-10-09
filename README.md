# Psychology Clinic API

## CSE 341 – Project 2

A RESTful API developed using Node.js, Express.js, and MongoDB for managing fictitious psychology clinic patients and therapy sessions.

This project was created for the CSE 341 Web Services course at BYU–Idaho.

All patient and session records are fictitious and used exclusively for academic purposes.

## Technologies

- Node.js
- Express.js
- MongoDB Atlas
- Swagger UI and swagger-autogen
- GitHub OAuth 2.0 with Passport.js
- express-validator
- express-session
- Render

## Database Collections

### Patients

Stores fictitious patient information, including:

- firstName
- lastName
- birthDate
- gender
- email
- phone
- emergencyContact
- status

### Sessions

Stores fictitious therapy session information, including:

- patientId
- sessionDate
- sessionNumber
- sessionType
- reason
- notes
- nextSession

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /patients | Retrieve all patients |
| GET | /patients/{id} | Retrieve a patient by ID |
| POST | /patients | Create a patient |
| PUT | /patients/{id} | Update a patient |
| DELETE | /patients/{id} | Delete a patient |
| GET | /sessions | Retrieve all sessions |
| GET | /sessions/{id} | Retrieve a session by ID |
| POST | /sessions | Create a session |
| PUT | /sessions/{id} | Update a session |
| DELETE | /sessions/{id} | Delete a session |

## Authentication

The API implements GitHub OAuth 2.0 authentication using Passport.js.

The following operations require authentication:

- POST, PUT, and DELETE for Patients
- POST, PUT, and DELETE for Sessions

Authentication routes include:

- GET /auth/github
- GET /auth/github/callback
- GET /auth/profile
- GET /auth/login-failed
- GET /auth/logout

Unauthenticated requests to protected endpoints return HTTP 401.

## Validation and Error Handling

The API validates incoming data using express-validator and provides appropriate HTTP status codes:

- 200 – Successful request
- 201 – Resource created
- 400 – Invalid request data
- 401 – Authentication required
- 404 – Resource not found
- 500 – Internal server error

## Local Setup

1. Clone the repository.
2. Run `npm install`.
3. Create a `.env` file containing `MONGODB_URI`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, and `SESSION_SECRET`.
4. Configure a GitHub OAuth application with the appropriate callback URL.
5. Start the application using the configured npm start script.
6. Open `/api-docs` to explore the Swagger documentation.

Never commit the `.env` file or expose credentials.

## Deployment

**GitHub Repository:**  
https://github.com/RonaldMullo/cse341-project2

**Render Application:**  
https://cse341-project2-323l.onrender.com

**Swagger Documentation:**  
https://cse341-project2-323l.onrender.com/api-docs/

## Individual Contributions

Developed individually by Ronald Mullo.

Key contributions include implementing the Patients and Sessions CRUD operations, MongoDB integration, request validation, error handling, GitHub OAuth authentication, protected routes, Swagger documentation, and Render deployment.

### Week 05 Improvements

1. Improved Swagger authentication documentation by organizing the OAuth failure endpoint under the Authentication category.
2. Added comprehensive project documentation covering architecture, endpoints, security, setup, and deployment.

## Author

Ronald Mullo  
CSE 341 – Web Services  
BYU–Idaho