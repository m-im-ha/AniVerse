# Programming Hero - B10A10-AniVerse.

# **AniVerse**

**AniVerse** is a web application that allows users to explore, add, update, and manage movies dynamically. The platform is built to deliver a seamless user experience, offering responsive design, secure authentication, and engaging UI/UX features.


### Links

- Live Site URL: [live site](https://movieauth-4d4c6.web.app/)

---

## **Built With**

- **Frontend**
  - ReactJS
    - React Hooks: useState, useEffect, Context API
    - React Router DOM for dynamic routing
  - TailwindCSS
  - DaisyUI
  - Vite (for fast builds and development)

- **Backend**
  - Firebase (Authentication)
  - Node.js (Express)
  - MongoDB (Database)

- **Additional Libraries**
  - Swiper.js
  - React Toastify
  - React Icons
  - React Hook Form

---

## **Features**

### **1. Dynamic Page Title**
- The page title dynamically updates based on the current route for better user experience and SEO.

### **2. User Authentication**
- Powered by Firebase Authentication.
- Users can log in, register, and update their profiles.
- Protected routes ensure sensitive features are accessible only to authenticated users.

### **3. Movie Management**
- **Add Movie**: Users can add new movies with details like title, genre, poster, duration, year, description, and rating.
- **Update Movie**: Easily edit existing movie details with real-time updates to the list.
- **View Movie Details**: A detailed page for each movie, showcasing all its information.

### **4. Search and Filter Movies**
- A powerful search bar lets users find movies by title.
- Filter movies dynamically by genre or rating.

### **5. Toaster Notifications**
- Real-time feedback for actions like adding, updating, or failing authentication using `react-toastify`.

### **6. Smooth Animations**
- Enhance user engagement with Swiper.js carousels, AOS (Animate on Scroll), and subtle hover effects.

### **7. Responsive Design**
- A mobile-first approach ensures the app looks and works great on all screen sizes, from smartphones to desktops.

### **8. Context API Integration**
- Manages global state such as authentication status and the list of movies.

### **9. Reusable Components**
- Built using a modular component-based approach for scalability and maintainability.

