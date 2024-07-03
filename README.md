### Technologies Used

- Frontend: React.js, Tailwind CSS
- Backend: Express.js, MongoDB

### Setup Instructions

#### Client (Frontend)

1. **Clone the Repository**

   ```bash
   git clone https://github.com/MohdFahad1/assignment.git
   ```

2. **Navigate to the Client Directory**

   ```bash
   cd client
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Start the Development Server**

   ```bash
   npm run start
   ```

   The client will run on `http://localhost:3000`.

#### Server (Backend)

1. **Navigate to the Server Directory**

   ```bash
   cd server
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Environment Variables**

   Create a `.env` file in the root directory of the server and add the following:

   ```env
   PORT=8000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```

   Replace `<your-mongodb-uri>` with your MongoDB connection URI and `<your-jwt-secret>` with a random string for JWT encryption.

4. **Start the Server**

   ```bash
   npm start
   ```

   The server will run on `http://localhost:8000`.
