# 🧾 AI Invoice Parser UI

Frontend for the **AI Invoice Parser** application — a tool to upload invoice files (PDF/images), extract their content using AI, and view/manage them in a dashboard.

> 🌐 Built with [Next.js](https://nextjs.org/), styled using [Tailwind CSS](https://tailwindcss.com/), and designed to connect to a FastAPI backend.

---

## 🚀 Features

- 🔒 User authentication (Login & Register)
- 📤 Upload invoice images
- 📁 Dashboard to view & delete uploaded files
- 👁️ View extracted invoice content
- 🧊 Glassmorphic, responsive UI
- 🌙 Dark theme and modern design

---

## 🧑‍💻 Technologies Used

- **Frontend**: Next.js 15, Tailwind CSS
- **Backend (API)**: FastAPI (served separately)
- **State**: React Hooks
- **Auth**: Token-based (stored in localStorage)

---

## 💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/harshitabisht05/invoice-parser-ui.git
cd invoice-parser-ui
```
### 2. Install Dependencies

```bash
npm install
```
### 3. Setup Environment Variables
Create a ```.env.local``` file at the root:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```
### 4. Start the Dev Server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📁 Project Structure
```bash
.
├── app/
│   ├── dashboard/          # File list + file details
│   ├── upload/             # File upload page
│   ├── login/, register/   # Auth pages
│   └── components/         # Reusable components (Navbar, Features, etc.)
├── public/
│   └── images/             # Backgrounds, logos, etc.
├── .env.local
├── README.md
├── package.json
└── next.config.js
```
