# Game Platform Project

A modern web application for gamers to connect, compete, and track their progress. Built with Next.js 14 and featuring a clean, responsive design.

## 🌟 Features

- **Authentication System**

  - User registration and login
  - Session management with cookies
  - Role-based access control (Player, Designer)

- **User Profiles**

  - Custom avatars using DiceBear API
  - Following/Followers system
  - Points tracking for players
  - Profile customization

- **Leaderboard System**
  - Real-time rankings
  - Points-based competition
  - Performance tracking

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone https://github.com/ali0083moi/web-project-frontend.git
cd game-platform
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Run the development server

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Frontend**

  - Next.js 14
  - React
  - TypeScript
  - Tailwind CSS

- **Authentication**

  - Custom JWT implementation
  - Secure cookie-based sessions

- **API**
  - Next.js API Routes
  - RESTful architecture

## 📁 Project Structure

```
├── app/
│ ├── api/ # API routes
│ ├── auth/ # Authentication pages
│ ├── leaderboard/ # Leaderboard feature
│ └── ...
├── components/
│ ├── shared/ # Reusable components
│ └── ...
├── public/ # Static assets
└── ...
```

## 🔐 Authentication API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - New user registration
- `GET /api/auth/check` - Check authentication status
- `POST /api/auth/logout` - User logout

## 👥 User Roles

- **Player**

  - Can participate in games
  - Track points and rankings
  - Follow other users

- **Designer**
  - Special privileges
  - Access to design tools
  - Custom profile features

## 🎮 Mock Users for Testing

```javascript
// Test Player Account
Email: test@example.com
Password: password123
// Test Designer Account
Email: test2@example.com
Password: password123
```

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [DiceBear Avatars](https://www.dicebear.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---
