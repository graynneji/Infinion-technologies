# Installing and Running the Project Locally

This guide will help you set up and run this project on your local machine.

---

## Prerequisites

Make sure you have the following installed:

- **Node.js** (v20 or higher) → [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **Yarn**
- Optional: **Git** (if cloning the repo)

Check installation:

```bash
node -v
npm -v
```

---

## 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Run the Development Server

```bash
npm run dev
```

By default, the app will be available at:

```
http://localhost:5173
```

---

## 4. Build for Production (Optional)

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

---

## 5. Preview Production Build (Optional)

```bash
npm run preview
```

---

## Notes

- Make sure your `.env` file is properly configured if the project requires environment variables.
- For any issues during installation, ensure Node.js and package manager versions meet the prerequisites.
