# 🚀 Talent Pathway - Service Provider Onboarding Portal

A full-stack MERN (MongoDB, Express.js, React, Node.js) application designed to onboard service providers—similar to platforms like Urban Company. The system allows providers to register, complete multi-step profile setups, upload verification documents, and track application status, while giving admins a centralized portal to review, approve, or reject applicants with remarks.

---

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Local Setup & Installation](#-local-setup--installation)
- [Environment Variables](#-environment-variables)
- [Database Verification](#-database-verification)
- [API Documentation](#-api-documentation)
- [Deliverables Checklist](#-deliverables-checklist)

---

## ✨ Features

### 👤 Service Provider Portal
* **Auth & Profiles:** Registration, JWT authentication, and profile completion.
* **Service Configurations:** Select categories, add skills, set years of experience, and define service locations.
* **Document Management:** Upload profile photos and verification documents.
* **Status Tracking:** View real-time application verification status and edit profiles prior to final approval.

### 🛡️ Admin Portal
* **Management Dashboard:** View all registered service providers and overall onboarding statistics.
* **Filters & Search:** Search providers by name, filter by status (Pending, Approved, Rejected) or service category.
* **Verification Workflow:** Inspect uploaded verification documents, approve or reject applications, and append custom rejection remarks.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Vite, Tailwind CSS, Lucide Icons / UI Components
* **Backend:** Node.js, Express.js, JWT (JSON Web Tokens)
* **Database:** MongoDB (Managed & Verified via **MongoDB Compass**)
* **File Handling:** Multer (Local/Server file upload middleware)
* **Tooling:** VS Code, Git, GitHub, Postman / Bruno

---

## 📁 Project Architecture

The repository is structured to handle both the client-side user interface and server-side API routes seamlessly from a single workspace:

```text
talent-pathway-co/
├── backend/                  # Server-side API & Database models
│   ├── models/               # MongoDB schema models (User, ProviderProfile, etc.)
│   ├── routes/               # Express API endpoints & authentication controllers
│   ├── uploads/              # Uploaded documents & profile image storage
│   ├── server.js             # Main backend server entry point
│   ├── package.json          # Backend dependencies
│   └── .env                  # Backend environment configuration
├── src/                      # React frontend application
│   ├── components/           # Reusable UI components & navigation layouts
│   ├── pages/                # Provider Onboarding, Admin Dashboard, Auth pages
│   └── services/             # Axios/Fetch API client functions
├── public/                   # Static application assets
├── package.json              # Frontend dependencies & Vite setup
└── README.md                 # Project documentation
