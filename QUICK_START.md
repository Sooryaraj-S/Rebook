# Rebook - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites Installed?
- ✅ Node.js v14+
- ✅ MongoDB (local or Atlas)
- ✅ npm/yarn

---

## Quick Setup

### 1. Start Backend
```bash
cd server
npm install
copy .env.example .env
npm start
```
✅ Opens on http://localhost:5000

### 2. Start Frontend (New Terminal)
```bash
cd client
npm install
copy .env.example .env
npm start
```
✅ Opens on http://localhost:3000

---

## Test the App

**Register:**
- Phone: `9876543210`
- Passcode: `123456`

**Login & Manage Contacts:**
- Add up to 5 emergency contacts
- Use Call & Message buttons
- Switch between 5 languages
- Test on mobile

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5000 in use | `netstat -ano \| findstr :5000` then kill process |
| MongoDB not running | Run `mongod` in new terminal |
| npm install fails | Delete `node_modules` & `package-lock.json`, retry |
| Can't connect to API | Check `client/.env` has correct API URL |
| Strange errors | Clear browser cache & localStorage |

---

## Next Steps

1. Review [INSTALLATION.md](./INSTALLATION.md) for detailed setup
2. Check [README.md](./README.md) for complete documentation
3. Read [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for DB structure
4. Use [postman_collection.json](./postman_collection.json) for API testing

---

## File Structure Overview

```
Rebook/
├── server/          ← Backend (Node.js)
├── client/          ← Frontend (React)
├── README.md        ← Full documentation
├── INSTALLATION.md  ← Step-by-step setup
└── DATABASE_SCHEMA.md ← DB structure details
```

---

## Key Features

✅ Secure login with 6-digit passcode  
✅ Store up to 5 emergency contacts  
✅ One-tap calling & messaging  
✅ 5 languages support (i18n)  
✅ Responsive mobile design  
✅ Professional UI  

---

**Questions? Check README.md or INSTALLATION.md**

**© 2026 Rebook. All Rights Reserved. Developed by Sooryaraj**
