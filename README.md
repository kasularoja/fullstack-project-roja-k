# Discount Deals - Full Stack Web Application

A full-stack web application that allows users to browse, search, and save the best discount deals across categories. Admins can manage deals, and users can mark favorites — all built with a modern tech stack.

# Features

 User Roles
- Guest: Can view all public deals.
- User: Can save favorite deals and manage their own favorites.
- Admin: Can post, update, and delete any deal.

Deal Management
- Admins can Create, Read, Update, and Delete (CRUD) deals.
- Deals have title, description, price, discount price, category, and expiry date.

Favorites
- Users can mark deals as favorites.
- Favorites are listed in a personalized "Favorites" view.
- Users can remove favorites as needed.

# Search & Filtering
- Search deals by keywords.
- Filter deals by categories (e.g., Electronics, Fashion, Grocery, etc.).

### Expiry Management
- Expired deals are automatically hidden from regular users.
- Admins can still manage expired deals.

##  Tech Stack

### Frontend (React + Vite)
- React 18
- Vite
- React Router DOM

### Backend (Spring Boot)
- Spring Boot 
- Spring Data JPA
- MySQL
-Rest APIs

## Project Structure

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

##  Installation & Setup Instructions

# Prerequisites
- Node.js ≥ 18
- Java ≥ 17
- Maven or Gradle
- PostgreSQL (or use H2 for testing)

# Backend Setup

```bash
cd backend
# Update application.yml with DB config if using PostgreSQL
./mvnw spring-boot:run
```

Application runs at: `http://localhost:8080`

#Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

Make sure the API base URL is configured correctly in Axios (usually `http://localhost:8080`).

# API Overview

| Endpoint                             | Method | Description                   |
|--------------------------------------|--------|-------------------------------|
| `/api/deals`                         | GET    | Fetch all deals               |
| `/api/deals/{id}`                    | GET    | Fetch single deal             |
| `/api/deals`                         | POST   | Create new deal (Admin only)  |
| `/api/deals/{id}`                    | DELETE | Delete deal (Admin only)      |
| `/api/deals/{id}`                    | PUT    | Update deal (Admin only)      |
| `/api/users/{id}/favorites`          | GET    | Get user favorites            |
| `/api/users/{id}/favorites`          | POST   | Add to favorites              |
| `/api/users/{id}/favorites/{dealId}` | DELETE | Remove from favorites |



# Authentication (Optional Enhancement)
- Role stored in localStorage or managed via Spring Security
- Future enhancement: JWT auth and protected routes

# Future Enhancements
- Deal rating system
- Notifications for expiring deals
- Pagination & infinite scroll
- Social login integration
- User profile management

# Resources

- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [React Docs](https://reactjs.org/)
- [PostgreSQL](https://www.postgresql.org/)

# Author

Roja Kasula
Project for Full Stack Development – Section 2504 FT SWD  
GitHub: [https://github.com/kasularoja/fullstack-project-roja-k.git]  


