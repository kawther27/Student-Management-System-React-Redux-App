
# Student Management System – React App

This is a web-based student management system built using **React.js**. The application allows users to log in, view a home page, and perform CRUD (Create, Read, Update, Delete) operations on student data. The app is protected with route guards and uses Redux for state management.

## Features

- Login system with protected and non-protected routes
- Create and manage student profiles
- Secure route navigation with `ProtectedRoute` and `NonProtectedRoute`
- Responsive design using CSS
- State management using Redux
- API communication with Axios
- UI components for navigation and student forms

## Tech Stack

- React.js
- Redux (for managing student and authentication states)
- Axios (API communication)
- CSS for styling
- React Router DOM (for routing)
- Vite (as build tool)

## Folder Structure

```
├── App.jsx
├── App.css
├── index.jsx
├── main.jsx
├── components/
│   ├── NavBar.jsx
│   ├── Login.jsx
│   ├── Home.jsx
│   ├── CreerEtudiant.jsx
│   ├── etudiant.jsx
├── routes/
│   ├── ProtectedRoute.jsx
│   ├── NonProtectedRoute.jsx
├── services/
│   ├── axiosAPI.jsx
│   ├── etudiantService.jsx
├── redux/
│   ├── login.jsx
│   ├── etudiant.jsx
│   ├── index.jsx
├── styles/
│   ├── etudiant.css
│   ├── index.css
```

## Setup Instructions

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server

## State Management

Redux is used in this project to manage:
- **Authentication state** through `loginReducer`
- **Student data** using `studentReducer`

Reducers are combined in `redux/index.jsx`.

## Contributions

Feel free to fork this repository and submit a pull request. All contributions are welcome!

---

Built with ❤️ by Kawther Khlif
