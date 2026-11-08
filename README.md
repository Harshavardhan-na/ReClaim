# ReClaim – Intelligent Campus Lost & Found Platform

> **"Lost Something? Find It. Found Something? Return It."**  
> *AWS Cloud-Based Web Application developed for AWS Solution Architecture Internal Assessment III at VIT-AP University.*

---

## 📌 Project Overview

**ReClaim** is a modern, responsive, SaaS-style web application built for university campuses to streamline lost and found operations. It bridges students, faculty, and university security personnel into a unified digital registry with role-based access, high-resolution photographic proof, location tagging, and safe verification channels.

### Planned AWS Cloud Architecture (Manual Integration Ready)
The frontend has been developed and structured to connect seamlessly to the following AWS services:
1. **Amazon S3** – Static website hosting and direct image storage with presigned URLs.
2. **Amazon CloudFront** – Global CDN for lightning-fast frontend delivery and asset caching.
3. **Amazon Cognito** – User pool authentication for students and campus security administrators.
4. **AWS Lambda** – Serverless backend microservice functions handling REST requests.
5. **Amazon API Gateway** – Secured REST API routes mapped directly to Lambda authorizers.
6. **Amazon DynamoDB** – Fast, scalable NoSQL database storing items and user profiles.
7. **Amazon CloudWatch** – Centralized application monitoring, alarms, and audit logs.

---

## 🎨 Color Palette & Design System

- **Primary**: `#142D4E` (Deep Navy)
- **Secondary**: `#0F9D92` (Teal)
- **Background**: `#F5F8FC` (Off-white/Light Slate)
- **Cards**: `#FFFFFF` (White with subtle drop shadows)
- **Text Primary**: `#142D4E` (Dark Navy)
- **Text Secondary**: `#475569` (Slate)
- **Success**: `#10B981` (Emerald Green)
- **Warning**: `#F59E0B` (Amber Orange)
- **Danger**: `#EF4444` (Crimson Red)

---

## 📂 Project Folder Structure

```text
ReClaim/
├── public/
│   └── favicon.svg              # Custom ReClaim SVG branding icon
├── src/
│   ├── assets/                  # Brand assets and identifiers
│   │   └── index.js
│   ├── components/              # Reusable SaaS UI components
│   │   ├── FilterBar.jsx        # Search, category, location, and status filters
│   │   ├── Footer.jsx           # University footer with planned AWS services
│   │   ├── ItemCard.jsx         # Card with photo, status, category, and metadata
│   │   ├── Modal.jsx            # Reusable dialog for edit and delete actions
│   │   ├── Navbar.jsx           # Responsive navbar with quick role switch pill
│   │   ├── Sidebar.jsx          # Role-aware sidebar for student & admin consoles
│   │   ├── StatCard.jsx         # Metric card with visual indicators
│   │   └── StatusBadge.jsx      # AVAILABLE, CLAIMED, and RETURNED badges
│   ├── context/
│   │   ├── AuthContext.jsx      # Role & user state (Student vs Admin simulation)
│   │   └── ItemContext.jsx      # Persistent item CRUD & metric calculations
│   ├── data/
│   │   └── sampleData.js        # Realistic sample campus lost & found records
│   ├── layouts/
│   │   ├── DashboardLayout.jsx  # Layout with sidebar drawer & header
│   │   └── MainLayout.jsx       # Public layout with top navbar & footer
│   ├── pages/
│   │   ├── AdminDashboard.jsx   # Admin statistics & master status controller
│   │   ├── AdminManageItemsPage.jsx # Full admin table (view, edit, delete, status)
│   │   ├── BrowseItemsPage.jsx  # Search & multi-filter catalogue
│   │   ├── ItemDetailsPage.jsx  # Full details, large photo & contact actions
│   │   ├── LandingPage.jsx      # Hero, features, 3-step guide & recent feed
│   │   ├── LoginPage.jsx        # Email, password, show/hide, demo quick-fill
│   │   ├── MyPostsPage.jsx      # User's own posts with edit and delete
│   │   ├── PostItemPage.jsx     # Report found item with image preview
│   │   ├── RegisterPage.jsx     # Student-only registration form
│   │   └── UserDashboard.jsx    # Student statistics & quick actions
│   ├── services/
│   │   └── api.js               # Clean REST adapter ready for Amazon API Gateway
│   ├── App.jsx                  # React Router configuration
│   ├── index.css                # SaaS design tokens, utilities & responsive rules
│   └── main.jsx                 # Application entry point
├── index.html                   # HTML template with Google Fonts (Inter & Plus Jakarta Sans)
├── package.json                 # Dependencies (React, React Router, Lucide React, Vite)
├── vite.config.js               # Vite configuration (port 3000)
└── README.md
```

---

## 🚀 How to Run the Website

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation & Startup Commands

1. **Open terminal inside the project directory:**
   ```bash
   cd "C:\Users\N.Harsha Vardhan\Downloads\Reclaim"
   ```

2. **Install dependencies (if not already installed):**
   ```bash
   npm install
   ```

3. **Start the local Vite development server:**
   ```bash
   npm run dev
   ```

4. **Open your web browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) (or the URL printed in the terminal).

5. **Build for Production (Amazon S3 Deployment):**
   ```bash
   npm run build
   ```
   *The optimized static assets will be generated in the `dist/` directory, ready to upload directly to your Amazon S3 hosting bucket.*

---

## 👥 Demo Authentication & Role Testing

To quickly test both the **Normal Student** and **Administrator** interfaces:

| Role | Email | Password | Allowed Capabilities |
| :--- | :--- | :--- | :--- |
| **Normal Student** | `student@vitap.ac.in` | `password123` | View all items, report found items, edit/delete own posts, view finder contact. Cannot edit other posts or change item status. |
| **Administrator** | `admin@vitap.ac.in` | `password123` | View all items, report items, edit/delete any post, and change statuses (`AVAILABLE`, `CLAIMED`, `RETURNED`). |

> **Pro Tip:** A **Role Switch** pill (`Role: STUDENT / ADMIN [Switch]`) is conveniently pinned in the top navigation bar and sidebar. You can switch between Student and Admin views with a single click at any time without re-typing credentials!

---

## 🔌 Future AWS Integration Instructions

The `src/services/api.js` file has been prepared with modular endpoints:
- `getItems(filters)` ➔ `GET /items`
- `getItemById(id)` ➔ `GET /items/{id}`
- `createItem(data)` ➔ `POST /items`
- `updateItem(id, data)` ➔ `PUT /items/{id}`
- `deleteItem(id)` ➔ `DELETE /items/{id}`
- `updateItemStatus(id, status)` ➔ `PATCH /items/{id}/status`
- `uploadItemPhoto(file)` ➔ `POST /media/presign-upload` (Amazon S3 direct PUT)

When your Amazon API Gateway and Cognito resources are provisioned:
1. Create a `.env` file in the project root:
   ```env
   VITE_API_GATEWAY_BASE_URL=https://your-api-id.execute-api.us-east-1.amazonaws.com/prod
   VITE_USE_AWS_BACKEND=true
   ```
2. The service layer will automatically switch from local state to live API Gateway REST calls.
