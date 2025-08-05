# Discount Deals - Full Stack Web Application

Discount Deals is a full-stack web application that allows users to browse, post, and save promotional deals across various categories. The app features a role-based system (Admin, User, Guest) that enables tailored experiences—Admins can create and manage deals, while Users and Guests can search and view current promotions. Expired deals are automatically hidden from regular users, ensuring a clean and relevant browsing experience. The application aims to help users find the best deals efficiently while providing admins with tools to highlight featured promotions.
# Features

 User Roles
- Guest: Can view all public deals.
- Users: Can save favorite deals and manage their own favorites.
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

# Prerequisites
Node.js
- Java 21
- Maven or Gradle
- MySQL (or use H2 for testing)
- Git


# Project Setup
This project is structured as a full-stack web application with a Spring Boot backend and a React frontend. Below is a guide to set up and run the application locally.

git clone https://github.com/kasularoja/fullstack-project-roja-k.git
cd fullstack-project-roja-k

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

# Wireframes
link to wireframes: https://balsamiq.cloud/sn90nut/p4pvhg9/rA844

#ERD link
link to ERD: https://www.figma.com/board/EXmRu3p5ZxjtNXq7E7kUgt/ERD-DTA-DB-SQL--Community-?node-id=0-1&p=f&t=UzDXzsOvIx1YBywU-0

# Authentication (Optional Enhancement)
- Role stored in localStorage or managed via Spring Security
- Future enhancement: JWT auth and protected routes

# Future Enhancements
- Deal rating system
- Notifications for expiring deals
- Pagination & infinite scroll
- Social login integration
- User profile management
# Testing
- Unit tests for backend using JUnit
- Integration tests for API endpoints
- Frontend testing with React Testing Library
- Backend testing with Postman 
# Resources

- [Spring Boot Docs]
- [React Docs]
- [Vite Docs]


# Author

Roja Kasula
Project for Full Stack Development – Section 2504 FT SWD  
GitHub: [https://github.com/kasularoja/fullstack-project-roja-k.git]  


