# Customer Backend API

A RESTful API for managing customer data with Express.js and MongoDB.

## Setup

**Install & Run:**
```bash
npm install
cp .env.example .env  # Update with your MongoDB URI
npm run dev           # Development
npm start             # Production
```

Server runs on `http://localhost:5000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/api/customers` | Get all customers |
| POST | `/api/customers` | Create customer |
| PUT | `/api/customers/:id` | Update customer |
| DELETE | `/api/customers/:id` | Delete customer |

## Request Body Examples

**POST/PUT /api/customers**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "address": "Optional"
}
```

## Response Format

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* customer object */ }
}
```

## Tech Stack
- Node.js, Express, MongoDB, Mongoose

## License
ISC
