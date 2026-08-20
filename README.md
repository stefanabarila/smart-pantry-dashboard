# Smart Pantry Dashboard

A full-stack web application designed to track and manage pantry inventory. It features a React/TypeScript frontend and a Spring Boot backend, utilizing Spring Security for role-based access control.

## Features
* **Inventory Tracking:** View all pantry items, their quantities, and minimum thresholds.
* **Low Stock Alerts:** Items that drop strictly below their minimum threshold are automatically highlighted in red.
* **Role-Based UI:** 
  * Unauthenticated users can view the inventory list.
  * Only logged-in Admin users can see the "Add Item" form and "Restock" buttons.
* **Add & Restock Items:** Secure API endpoints to add new items and patch existing quantities.
* **Basic Authentication:** Login/Logout functionality wired to Spring Security's in-memory authentication.

## Technologies Used
**Frontend:**
* React + TypeScript
* Vite (Build Tool)
* HTML/CSS (Inline styling for dynamic rendering)

**Backend:**
* Java & Spring Boot
* Spring Security (Basic Auth)
* Spring Data JPA
* JUnit 5 (Unit Testing)

---

## Authentication Credentials
The backend uses in-memory authentication with the following configured users:

| Username | Password | Role | Permissions |
| :--- | :--- | :--- | :--- |
| `admin` | `admin123` | ADMIN | View, Add, Restock |
| `user` | `user123` | USER | View only |

---

## Setup and Installation

### Prerequisites
* Java 17+
* Node.js (v16+)
* npm (Node Package Manager)

### 1. Running the Spring Boot Backend
1. Open the backend folder in your preferred IDE (e.g., IntelliJ IDEA).
2. Ensure your dependencies are installed via Maven.
3. Run the `BackendApplication.java` main class.
4. The backend will start on `http://localhost:8080`.

### 2. Running the React Frontend
1. Open a terminal and navigate to the `frontend` folder.
2. Install the required Node modules:
   ```bash
   npm install
   ```
3. Start the Vite development server:
 ```bash
   npm run dev
 ```
4. The frontend will start on http://localhost:5173. Open this URL in your browser to view the application.
## Decisions & Trade-offs

### Database Selection
I opted to use the H2 in-memory database rather than PostgreSQL for this implementation. This decision was made to prioritize ease of testing and evaluation for the reviewers; it allows the application to be run instantly with zero infrastructure setup or Docker dependencies. 

### Future Improvements
With more time, I would implement these optional enhancements:
*   **Docker Setup:** Add a `docker-compose.yml` file to easily run the app alongside a PostgreSQL database.
*   **Input Validation:** Ensure users cannot enter negative quantities or blank item names.
*   **Better Error Handling:** Return clean, structured error messages from the API instead of standard server stack traces.
*   **Delete Feature:** Add a `DELETE` endpoint so administrators can remove old items from the inventory.
