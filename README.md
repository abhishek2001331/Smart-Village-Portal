# Smart Village Portal (स्मार्ट विलेज पोर्टल)

A production-ready full-stack **MERN Application** connecting village residents with Gram Panchayat administration. Facilitating transparent public service tracking, government schemes exploration, grievance redressal, agriculture advisories, emergency helplines, local employment, and analytical administrative management.

---

## 🌟 Key Features & Highlights

### 1. Dual User Roles & JWT Authentication
- **Citizen Portal**: Registration, Login, Profile Management, Complaint Registration, Real-time Ticket Status Tracking, and Scheme Search.
- **Admin Control Center**: Statistical overview dashboard, interactive Chart.js analytics, Complaint lifecycle management, and full CRUD over all 10 village modules.

### 2. Multi-Language Support (English & Hindi)
- Seamless bilingual toggle (`EN | हिंदी`) across navigation header, hero banners, notice board, and form controls.

### 3. Smart Grievance Management
- Automatic Ticket ID Generation (e.g. `CMP-20260913-W892`).
- 9 Complaint Categories: *Water, Electricity, Roads, Sanitation, Street Lights, Education, Health, Agriculture, Other*.
- Lifecycle Statuses: *Pending, In Progress, Resolved, Rejected* with official admin responses.
- Public Ticket Tracking widget accessible directly from the landing page.

### 4. Comprehensive Modules
- **Government Schemes**: Search, category filters (Agriculture, Housing, Health, Pensions), benefits, eligibility, and direct portal links.
- **Village Notices**: Urgent announcement alerts, Gram Sabha meeting schedules, and bilingual content.
- **Agriculture & Mandi**: Crop advisories, seasonal guidance, Mandi commodity prices, and Kisan Call Center (1800-180-1551) helpline.
- **Health Services**: Primary Health Centers, generic pharmacy depots, emergency ambulance (108) shortcuts, OPD timings, and doctors list.
- **Schools & Education**: Local schools directory, headmaster contacts, hostel facilities, and student counts.
- **Local Jobs**: Rural contractual positions, computer operator vacancies, Anganwadi helper posts, and application links.
- **Emergency Helplines**: 24x7 click-to-call shortcuts for Police (112), Ambulance (108), Fire (101), Women Helpline (1090), and Power Substation.
- **Village Services**: Real-time operational status (*Available, Partially Available, Under Maintenance*) for drinking water supply, electricity grid, BharatNet Wi-Fi, and revenue certificates.

---

## 🛠️ Technology Stack

- **Frontend**: React.js (Vite), React Router DOM v6, Axios, Bootstrap 5, FontAwesome 6, Chart.js / `react-chartjs-2`, Google Fonts (Inter & Noto Sans Devanagari).
- **Backend**: Node.js, Express.js REST API architecture, JWT authentication (`jsonwebtoken`), `bcryptjs` password hashing, Mongoose ORM.
- **Database**: MongoDB (MongoDB Atlas ready, with automatic `mongodb-memory-server` zero-config fallback if local Mongo service is offline).

---

## 🔑 Demo Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@smartvillage.gov.in` | `admin123` |
| **Citizen** | `citizen@smartvillage.gov.in` | `citizen123` |

---

## 📂 Project Structure

```
Smart_Village_Portal/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/       # Navbar, Footer, StatCard, Tracker Modal, ProtectedRoute
│   │   ├── context/          # AuthContext, LanguageContext (EN/HI)
│   │   ├── pages/            # Home, Schemes, Notices, Jobs, Agri, Health, Edu, Emergency
│   │   │   ├── citizen/      # CitizenDashboard, MyComplaints, SubmitComplaint, Profile
│   │   │   └── admin/        # AdminDashboard, ManageComplaints, ManageSchemes, Citizens...
│   │   ├── services/         # Axios API configuration
│   │   ├── utils/            # Translations dictionary
│   │   ├── App.jsx           # React Router DOM layout & routes
│   │   ├── index.css         # Modern government portal theme & styling
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── config/               # MongoDB connection with memory-server fallback
│   ├── controllers/          # Express REST API controllers
│   ├── middleware/           # JWT auth & error handling middlewares
│   ├── models/               # 10 Mongoose Schemas (User, Complaint, Scheme, Job...)
│   ├── routes/               # API routes (/api/auth, /api/complaints, /api/schemes...)
│   ├── seed/                 # Database seed script (populates realistic demo data)
│   ├── .env.example
│   ├── app.js                # Express app setup
│   └── server.js             # HTTP server entry point
├── package.json              # Root package.json with scripts
└── README.md
```

---

## 🚀 Installation & Running Guide

### 1. Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### 2. Quick One-Command Setup & Seed
From the project root directory:

```bash
# 1. Install root, server, and client dependencies
npm run install:all

# 2. Seed the database with sample schemes, notices, jobs, complaints & demo accounts
npm run seed

# 3. Start both backend server and frontend client concurrently:
# Open two terminal windows or run individually:
npm run server   # Starts Express API at http://localhost:5000
npm run client   # Starts React Vite Client at http://localhost:5173
```

---

## 📡 REST API Endpoint Documentation

| Endpoint | Method | Access | Description |
| :--- | :--- | :--- | :--- |
| `/api/auth/register` | `POST` | Public | Register new citizen account |
| `/api/auth/login` | `POST` | Public | Authenticate user & get JWT token |
| `/api/auth/profile` | `GET / PUT` | Private | View & update logged-in citizen profile |
| `/api/complaints` | `POST` | Private | Submit complaint & receive ticket ID |
| `/api/complaints/my` | `GET` | Private | Get citizen's filed complaints |
| `/api/complaints/track/:ticketId` | `GET` | Public | Track complaint by ticket ID |
| `/api/complaints/all` | `GET` | Admin | Get all complaints (with filters) |
| `/api/complaints/:id/status` | `PUT` | Admin | Update status & post admin remarks |
| `/api/schemes` | `GET` | Public | List schemes (with search & category filter) |
| `/api/announcements` | `GET` | Public | List village public notices |
| `/api/services` | `GET` | Public | Real-time village services status |
| `/api/admin/dashboard` | `GET` | Admin | Analytical counts & Chart.js datasets |

---

## 📄 License
This project is open-source under the MIT License. Suitable for college final-year software engineering project demonstrations.
