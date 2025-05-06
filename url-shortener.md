# URL Shortener – Setup & Test Instructions

## 🔧 Setup

1. Clone the repository.
2. cd backend
2. Run `npm install` to install dependencies.
3. Start the app: `npm run dev`
4. Visit: `http://localhost:3001`

## 🔗 API Endpoints

| Method | Endpoint              | Description                       |
|--------|-----------------------|-----------------------------------|
| POST   | /encode               | Encode long URL                   |
| POST   | /decode               | Decode to original URL            |
| GET    | /statistic/:url_path | Get stats for a short URL         |
| GET    | /list                | List all shortened URLs           |
| GET    | /:url_path           | Redirect to original long URL     |

## ✅ Tests

Run tests with:

npm test

For Frontend

1. cd frontend
2. Run `npm install` to install dependencies.
3. Start the app: `npm run start`
4. Visit: `http://localhost:3001`

Routes
Home Page
localhost:3000/

Url list Page
localhost:3000/list

