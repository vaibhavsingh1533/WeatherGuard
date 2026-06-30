# 🌦️ WeatherGuard Admin

A secure, invite-only weather alert platform that allows users to request access through Google Sign-In. Administrators can review and approve requests, after which approved users receive automated weather alerts through a Telegram bot.

---

## 🚀 Features

* 🔐 Google Authentication (Firebase)
* 👤 Invite-only access workflow
* ✅ Admin approval dashboard
* 🤖 Telegram Bot integration
* 🌤 Live weather data using OpenWeather API
* ⏰ Automated weather alerts using Cron Jobs
* 📊 Modern React Admin Dashboard
* 🗄 MongoDB database with NestJS backend

---

## 🛠 Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* Firebase Authentication
* Axios

### Backend

* NestJS
* TypeScript
* MongoDB
* Mongoose
* Telegraf (Telegram Bot)
* Axios
* NestJS Schedule (Cron)

---

## 📁 Project Structure

```
WeatherGuard
│
├── api
│   ├── src
│   │   ├── auth
│   │   ├── admin
│   │   ├── telegram
│   │   ├── weather
│   │   ├── cron
│   │   └── schemas
│   └── package.json
│
├── admin
│   ├── src
│   │   ├── pages
│   │   ├── services
│   │   ├── firebase.ts
│   │   └── App.tsx
│   └── package.json
│
└── README.md
```

---

# System Architecture

```
Google Login
      │
      ▼
React Frontend
      │
      ▼
NestJS API
      │
      ▼
MongoDB Database
      │
      ├─────────────► Admin Dashboard
      │                     │
      │                     ▼
      │               Approve User
      │                     │
      ▼                     ▼
Telegram Bot ◄──────────────┘
      │
      ▼
Weather Alerts (Cron Job)
```

---

# Database Schema

## User Collection

| Field          | Type   | Description              |
| -------------- | ------ | ------------------------ |
| name           | String | User Name                |
| email          | String | User Email               |
| provider       | String | Google                   |
| role           | String | admin / user             |
| status         | String | new / pending / approved |
| telegramChatId | String | Telegram Chat ID         |
| createdAt      | Date   | Creation Time            |

---

# Data Flow

### 1. Authentication

* User signs in with Google.
* Firebase authenticates the user.
* User information is sent to the NestJS backend.
* The backend creates the user if they do not already exist.

### 2. Request Access

* New users click **Request Access**.
* User status changes from `new` to `pending`.

### 3. Admin Approval

* Admin logs into the dashboard.
* Pending users are displayed.
* Admin clicks **Approve**.
* User status changes to `approved`.

### 4. Telegram Integration

* User connects their Telegram account.
* Telegram Chat ID is stored in MongoDB.
* When approved, the user receives a Telegram notification.

### 5. Weather Alerts

* A scheduled cron job runs periodically.
* The application fetches live weather information from OpenWeather.
* Weather alerts are sent only to users whose status is **approved**.

---

# API Endpoints

## Authentication

```
POST /auth/login
POST /auth/request-access
```

## Admin

```
GET /admin/pending-users
PATCH /admin/approve/:id
```

## Telegram

```
POST /telegram/connect
```

## Weather

```
GET /weather
GET /weather/message
```

---

# Environment Variables

## Backend (.env)

```
MONGODB_URI=

WEATHER_API_KEY=

TELEGRAM_BOT_TOKEN=
```

## Frontend (.env)

```
VITE_API_URL=http://localhost:3000
```

---

# Installation

## Clone Repository

```
git clone https://github.com/vaibhavsingh1533/WeatherGuard.git
```

---

## Backend

```
cd api

npm install

npm run start:dev
```

---

## Frontend

```
cd admin

npm install

npm run dev
```

---

# Demo Flow

1. Login with Google.
2. Request access.
3. Admin reviews pending requests.
4. Admin approves the user.
5. Telegram sends an approval notification.
6. Scheduled weather alerts are delivered to approved users.

---

# Future Improvements

* JWT-based authentication and authorization.
* Role-based route guards.
* Multiple weather locations.
* Email notifications.
* User profile management.
* Admin analytics dashboard.
* Production-ready Telegram account linking.

---

# Author

**Vaibhav Singh**

GitHub: https://github.com/vaibhavsingh1533


