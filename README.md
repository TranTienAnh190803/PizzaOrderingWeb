# PizzaOrderingWeb

1. Description: Developed a pizza ordering web application with separate functionalities for customers,administrators, and delivery staff. The application enables order placement, item management, anddelivery tracking through role-based access control.

2. Scale: Personal project.

3. Tech Stack: ASP.NET Core Web API, ReactJS, Axios, SQL Server, JWT, Bootstrap, CSS.

4. Key Feature:

   - Three distinct user roles:
     - User: View pizza menu, choose sizes and quantities, place orders.
     - Admin: Manage pizza items, set prices by size, apply discounts, upload images.
     - Delivery Staff: View assigned orders and update delivery status.
   - Pizza Management:
     - Multiple sizes per pizza with dynamic pricing.
     - Discount calculation and real-time official price rendering.
     - Image uploading and Base64 handling for storage & display.
   - Authentication & Authorization:
     - JWT-based login for secure and role-based API access.
     - Route protection and conditional rendering based on role.
   - Admin Dashboard:
     - Manage all dishes, filter by category, update details.
     - Upload images through FormData and preview before submission.
   - Delivery Tracking:
     - Orders are assigned to delivery staff.
     - Status updates handled through backend APIs.

5. Result:

   - Developed full role-based pizza ordering flow (User, Admin, Delivery).
   - Built real-time admin dashboard with image upload & pricing control
   - Integrated secure JWT authentication with protected routes

6. Source Code: https://github.com/TranTienAnh190803/PizzaOrderingWeb

7. Diagram: https://drive.google.com/drive/folders/10X9TJoo0hLvU5rjdwVHco7uFUV3pFgNu?usp=sharing
