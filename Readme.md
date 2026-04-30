# Task Management System

A full-stack task management application built with:

* Node.js (Express.js)
* EJS (Server-side rendering)
* PostgreSQL
* Sequelize ORM
* Session-based authentication

---

# 🚀 Getting Started

Follow these steps exactly to run the project locally.

---

## 1. Clone the Repository

```bash
git clone <your-repo-url>
cd task-manager
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Setup Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Update `.env`:

```env
PORT=3000

DB_HOST=127.0.0.1
DB_USER=postgres
DB_PASS=yourpassword
DB_NAME=task_manager

SESSION_SECRET=your_super_secret_key
```

---

## 4. Setup PostgreSQL Database

Create database manually:

```sql
CREATE DATABASE task_manager;
```

---

## 5. Run Migrations

```bash
npx sequelize-cli db:migrate
```

---

## 6. Seed Demo Data

```bash
npx sequelize-cli db:seed:all
```

---

## 7. Start the Server

```bash
npm start
```

---

## 8. Open in Browser

```
http://localhost:3000
```

---

# 🔐 Demo Credentials

### Admin

* Email: [admin@test.com](mailto:admin@test.com)
* Password: password123

### Member

* Email: [member@test.com](mailto:member@test.com)
* Password: password123

---

# 📊 Features

## Admin

* Create projects
* Create and assign tasks
* Edit and delete tasks
* View analytics dashboard

## Member

* View assigned tasks
* Update task status

---

# ⚙️ Available Scripts

```bash
npm start
npm run migrate
npm run seed
```

---

# ⚠️ Common Issues

### Sequelize Config Error

Ensure `.sequelizerc` points to:

```
src/config/config.js
```

---

### Database Connection Error

* PostgreSQL must be running
* Check `.env` credentials

---

### Tables Not Found

```bash
npx sequelize-cli db:migrate
```

---

### Login Not Working

```bash
npx sequelize-cli db:seed:all
```

---

# 📁 Project Structure

```
src/
  config/
  controllers/
  middlewares/
  models/
  routes/
  services/
  views/
```

---

# 🧠 Notes

* Do NOT commit `.env`
* Use `.env.example`
* Uses session-based authentication (no JWT)

---

# 👨‍💻 Author

Manas Singh
