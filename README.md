# 💸Discount Deals - Full Stack Web Application

A full-stack web application that allows users to browse, search, and save the best discount deals across categories. Admins can manage deals, and users can mark favorites — all built with a modern tech stack.

##  Tech Stack

### Frontend (React + Vite)
- React 18
- Vite
- React Router DOM
- Tailwind CSS (or CSS Modules if used)
- Axios

### Backend (Spring Boot)
- Spring Boot 
- Hibernate
- PostgreSQL / H2 (for dev/testing)
- JPA Auditing (for timestamps)
- Spring Security (optional: if roles are protected)

##  Features

### Role-based Access
- **Guest**: Can browse all public deals.
- **User**: Can browse, search, and save favorite deals.
- **Admin**: Can create, update, and delete deals.

###  Deals Management
- Admins can post and delete deals.
- Each deal has:
    - Title
    - Description
    - Category
    - Expiry Date
    - Optional Image
- Expired deals are automatically hidden from user view.

### Deal Filtering & Search
- Search by keyword in title or description.
- Filter by category and expiry.

###  Favorites
- Users can save and manage favorite deals.
- Favorite deals persist using localStorage (or backend if implemented).

## 📁 Project Structure

```
/discount-deals/
├── backend/               # Spring Boot API
│   ├── src/main/java/com/discountdeals/...
│   ├── src/main/resources/application.yml
│   └── pom.xml
├── frontend/              # React/Vite SPA
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

##  Getting Started

### Prerequisites
- Node.js ≥ 18
- Java ≥ 17
- Maven or Gradle
- PostgreSQL (or use H2 for testing)

### 🔧 Backend Setup

```bash
cd backend
# Update application.yml with DB config if using PostgreSQL
./mvnw spring-boot:run
```

**Application runs at**: `http://localhost:8080`

### ⚛️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

**Frontend runs at**: `http://localhost:5173`

Make sure the API base URL is configured correctly in Axios (usually `http://localhost:8080`).

## API Overview

| Endpoint               | Method | Description                  |
|------------------------|--------|------------------------------|
| `/api/deals`           | GET    | Fetch all deals              |
| `/api/deals/{id}`      | GET    | Fetch single deal            |
| `/api/deals`           | POST   | Create new deal (Admin only) |
| `/api/deals/{id}`      | DELETE | Delete deal (Admin only)     |
| `/api/deals/search`    | GET    | Search deals by keyword      |

## Authentication (Optional Enhancement)
- Role stored in localStorage or managed via Spring Security
- Future enhancement: JWT auth and protected routes

##  Future Enhancements
- Deal rating system
- Notifications for expiring deals
- Pagination & infinite scroll
- Social login integration



##  Resources

- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [React Docs](https://reactjs.org/)
- [PostgreSQL](https://www.postgresql.org/)

##  Author

**Roja Kasula**  
Project for Full Stack Development – Section 2504 FT SWD  
GitHub: [Your GitHub URL]  
Deployed Link: [Deployment URL if hosted]

