Backend

A professional Node.js/Express backend for the Field Reservation App, utilizing SQLite for data persistence.

Features





User registration (POST /api/register)



Field reservation with 1.5-hour conflict checking (POST /api/reserve)



Availability checking for fields (GET /api/availability)

Setup





Navigate to the backend folder: cd backend



Install dependencies: npm install



Start the server: npm start

Environment Variables





PORT: Server port (default: 3001). Set in .env file.

API Endpoints





POST /api/register





Body: { username, email, password }



Response: { success: boolean, error?: string }



POST /api/reserve





Body: { user, field, date, time }



Response: { success: boolean, error?: string }



GET /api/availability





Query: ?field=<field>&date=<date>



Response: { slots: boolean[] } (true if reserved)

Structure





src/config/: Database configuration (database.js)



src/controllers/: API logic (apiController.js)



src/routes/: API routes (api.js)



src/utils/: Constants (constants.js)



src/middleware/: Error handling (errorHandler.js)



server.js: Main server file