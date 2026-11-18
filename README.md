# MindPulse Frontend

Frontend web application untuk **MindPulse**, platform journaling berbasis AI yang membantu pengguna memahami kondisi emosional, memantau kesehatan mental, serta mendeteksi risiko burnout melalui analisis sentimen dan feedback personal.

Aplikasi ini dibangun menggunakan **React.js** dan **Vite**, serta terintegrasi dengan Backend API dan AI Microservice MindPulse.

---

# Features

## Authentication

* User Registration
* User Login
* JWT-based Authentication
* Protected Routes

## Dashboard

* Ringkasan kondisi emosional pengguna
* Hasil analisis burnout terbaru
* AI-generated feedback
* Statistik jurnal pengguna

## Daily Journal

* Menulis jurnal harian
* Menampilkan riwayat jurnal
* Melihat hasil analisis sentimen
* Menampilkan status emosi dari setiap jurnal

## Profile Management

* Menampilkan informasi pengguna
* Logout akun

## Responsive Interface

* Tampilan modern dan responsif
* User-friendly experience
* Optimized for desktop and mobile devices

---

# Project Structure

```bash
src/
│
├── assets/
│   ├── dashboard.png
│   ├── diary.png
│   ├── email.png
│   ├── hero.png
│   ├── logo.png
│   ├── logout.png
│   └── profile.png
│
├── components/
│   ├── Navbar.jsx
│   └── ProtectedRouted.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Diary.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Profile.jsx
│
├── api.js
├── App.jsx
├── main.jsx
└── index.css
```

---

# Tech Stack

### Frontend Framework

* React.js
* Vite

### Routing

* React Router DOM

### HTTP Client

* Axios

### Styling

* CSS3
* Responsive Layout

### State Management

* React Hooks

---

# Installation

## Clone Repository

```bash
git clone https://github.com/shafdaafryanda/Capstone-Project.git

cd Capstone-Project
```

## Install Dependencies

```bash
npm install
```

---

# Running Project

Development Mode

```bash
npm run dev
```

Aplikasi akan berjalan pada:

```text
http://localhost:5173
```

---

# Application Pages

## Login Page

Fitur:

* Login pengguna
* Validasi email dan password
* Redirect ke Dashboard setelah berhasil login

Route:

```text
/login
```

---

## Register Page

Fitur:

* Registrasi akun baru
* Validasi data pengguna
* Redirect ke Login setelah registrasi berhasil

Route:

```text
/register
```

---

## Dashboard Page

Fitur:

* Menampilkan ringkasan aktivitas pengguna
* Menampilkan hasil burnout analysis terbaru
* Menampilkan AI feedback
* Menampilkan informasi kondisi emosional pengguna

Route:

```text
/dashboard
```

---

## Diary Page

Fitur:

* Menulis jurnal harian
* Melihat riwayat jurnal
* Menampilkan hasil analisis sentimen
* Menampilkan tanggal jurnal

Route:

```text
/diary
```

---

## Profile Page

Fitur:

* Menampilkan informasi akun pengguna
* Logout akun

Route:

```text
/profile
```

---

# Authentication Flow

1. User melakukan login.
2. Backend mengembalikan JWT Token.
3. Token disimpan pada browser.
4. Protected Route memvalidasi token.
5. User dapat mengakses halaman yang membutuhkan autentikasi.

Flow:

```text
Login
   │
   ▼
JWT Token
   │
   ▼
Local Storage
   │
   ▼
Protected Routes
```

---

# Backend Integration

Frontend berkomunikasi dengan Backend API menggunakan Axios.

Contoh endpoint yang digunakan:

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Journals

```http
GET    /api/journals
POST   /api/journals
```

### Burnout Analysis

```http
GET /api/burnout/latest
```

---

# UI Assets

Aplikasi menggunakan beberapa aset visual untuk meningkatkan pengalaman pengguna:

| Asset         | Description        |
| ------------- | ------------------ |
| hero.png      | Hero section image |
| logo.png      | MindPulse logo |
| dashboard.png | Dashboard icon     |
| diary.png     | Diary icon         |
| profile.png   | Profile icon       |
| logout.png    | Logout icon        |
| email.png     | Email illustration |

---

# Build for Production

Membuat build production:

```bash
npm run build
```

Hasil build akan tersedia pada folder:

```text
dist/
```

Preview build:

```bash
npm run preview
```

---