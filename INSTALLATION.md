# Installation Guide - Rebook

## Prerequisites

### Required Software
- **Node.js** v14.0.0 or higher ([Download](https://nodejs.org/))
- **npm** v6.0.0 or higher (comes with Node.js) or **Yarn**
- **MongoDB** (Local or Cloud - MongoDB Atlas)
- **Git** (Optional, for version control)

### Verify Installation

```bash
# Check Node.js
node --version

# Check npm
npm --version

# Check MongoDB (if installed locally)
mongod --version
```

---

## Step-by-Step Installation

### Part 1: MongoDB Setup

#### Option A: Local MongoDB Installation

**Windows:**
1. Download MongoDB from https://www.mongodb.com/try/download/community
2. Run the installer
3. Choose "Install MongoDB as a Windows Service"
4. Complete installation
5. Start MongoDB service:
   ```bash
   mongod
   ```

**Alternative - Using MongoDB Atlas (Cloud):**

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster (Free tier available)
3. Get connection string
4. Keep it for `.env` configuration

---

### Part 2: Backend Setup

```bash
# Navigate to server directory
cd c:\Users\tutys\Desktop\Rebook\server

# Create environment file from example
copy .env.example .env

# Edit .env with your settings
# (Open .env in text editor)
```

**Configure `.env`:**

```env
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/rebook

# OR MongoDB Atlas Cloud (replace with your credentials)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rebook

# Generate a secure JWT secret (use any random string)
JWT_SECRET=your_super_secret_key_change_this_in_production_12345!@#

# Server configuration
PORT=5000
NODE_ENV=development
```

**Generate secure JWT secret:**
```bash
# Generate random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Install dependencies:**
```bash
npm install
```

**Start backend server:**
```bash
npm start              # Production mode
# OR
npm run dev           # Development with auto-reload
```

✅ **Expected output:**
```
✅ MongoDB connected successfully
🚀 Rebook Server running on port 5000
Environment: development
```

---

### Part 3: Frontend Setup

```bash
# Navigate to client directory (in new terminal)
cd c:\Users\tutys\Desktop\Rebook\client

# Create environment file from example
copy .env.example .env

# Edit .env (already configured for local development)
```

**Configure `.env`:**

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

**Install dependencies:**
```bash
npm install
```

**Start frontend server:**
```bash
npm start
```

✅ **Expected output:**
- Browser opens automatically to `http://localhost:3000`
- React development server running

---

## 🎉 Application Ready!

### Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

### Test Registration & Login

1. **Register a test user:**
   - Phone: `9876543210`
   - Passcode: `123456`

2. **Login:**
   - Use same credentials

3. **Add emergency contacts:**
   - Try adding up to 5 contacts
   - Test calling and messaging
   - Switch languages

---

## 📝 Important Configuration Notes

### Change JWT Secret (Production)

In `server/.env`:
```env
JWT_SECRET=generate_a_very_secure_random_key_here
```

Use generated key from:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### MongoDB Atlas Connection String

Format: `mongodb+srv://username:password@cluster-url/database-name`

Get from Atlas Dashboard:
1. Go to Databases
2. Click "Connect"
3. Choose "Drivers" (Node.js)
4. Copy connection string
5. Replace `<password>` with actual password
6. Replace `<database-name>` with `rebook`

---

## 🔧 Common Issues & Solutions

### Issue 1: Port Already in Use

```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (Windows)
taskkill /PID <PID_NUMBER> /F

# Change port in server/.env
PORT=5001  # Use different port
```

### Issue 2: MongoDB Connection Failed

```bash
# Make sure MongoDB is running
mongod

# Check connection string in .env
# Verify database name is 'rebook'
# Check username/password if using Atlas
```

### Issue 3: CORS Errors

Ensure:
- Backend running on `http://localhost:5000`
- Frontend running on `http://localhost:3000`
- Check `client/.env` has correct API URL

### Issue 4: npm install Fails

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules folder
rmdir /s /q node_modules

# Delete package-lock.json
del package-lock.json

# Reinstall
npm install
```

### Issue 5: Chrome Security Warning

This is normal for localhost. Proceed with development. Production uses HTTPS.

---

## 🚀 Running the Application

### Terminal 1: Start Backend

```bash
cd c:\Users\tutys\Desktop\Rebook\server
npm start
# Watch for: "🚀 Rebook Server running on port 5000"
```

### Terminal 2: Start Frontend

```bash
cd c:\Users\tutys\Desktop\Rebook\client
npm start
# Watch for: Automatically opens http://localhost:3000
```

### Terminal 3 (Optional): MongoDB

```bash
mongod
# or if installed as service, it starts automatically
```

---

## 📊 Testing Checklist

### Functionality Testing

- [ ] Register with new phone number
- [ ] Login with credentials
- [ ] Add 5 contacts successfully
- [ ] Cannot add 6th contact (error shows)
- [ ] Edit contact details
- [ ] Delete contact with confirmation
- [ ] Call button works (tel: link opens)
- [ ] Message button works (sms: link prepared)
- [ ] Logout functionality works
- [ ] Session expires after 24 hours

### UI/UX Testing

- [ ] All 5 languages work correctly
- [ ] Responsive on mobile (use DevTools)
- [ ] All buttons and links work
- [ ] Error messages are clear
- [ ] Loading states show properly
- [ ] Layout looks professional

### Security Testing

- [ ] Passcode not visible in network requests (hashed)
- [ ] JWT token visible in localStorage
- [ ] Cannot access dashboard without login
- [ ] Cannot add/edit/delete without proper auth
- [ ] Rate limiting works (5 failed logins)

---

## 🌐 Environment URLs

| Component | URL | Port |
|-----------|-----|------|
| Frontend | http://localhost:3000 | 3000 |
| Backend API | http://localhost:5000 | 5000 |
| MongoDB | localhost | 27017 |

---

## 📦 Deployment Checklist

Before deploying to production:

- [ ] Change JWT_SECRET to something secure
- [ ] Set NODE_ENV=production
- [ ] Use MongoDB Atlas (not local)
- [ ] Enable HTTPS/SSL
- [ ] Set up proper CORS origins
- [ ] Configure environment variables
- [ ] Test all features in production URL
- [ ] Set up monitoring/logging
- [ ] Backup database regularly

---

## 🆘 Getting Help

### Check Logs

```bash
# Backend logs
# Watch terminal where `npm start` is running

# Frontend logs
# Open browser DevTools (F12)
# Check Console tab for errors

# MongoDB logs
# Check MongoDB terminal output
```

### Debug Mode

```bash
# Backend with verbose logging
DEBUG=* npm start

# Frontend with source maps
# DevTools > Sources tab in Chrome
```

### Test API Endpoints

Use Postman or similar tool:

```
POST http://localhost:5000/api/auth/login
Headers: Content-Type: application/json
Body: {
  "phoneNumber": "9876543210",
  "passcode": "123456"
}
```

---

## 📞 Quick Reference

### Useful Commands

```bash
# From either directory
npm install      # Install dependencies
npm start       # Start development server
npm run dev     # Dev mode with hot reload
npm run build   # Build for production

# MongoDB
mongosh         # Connect to local MongoDB shell
```

### Files to Edit

- `server/.env` - Backend configuration
- `client/.env` - Frontend configuration
- `server/middleware/rateLimiter.js` - Adjust rate limiting
- `server/server.js` - Add new features

---

## ✅ Success Indicators

You'll know everything is set up correctly when:

1. ✅ Backend terminal shows "🚀 Rebook Server running on port 5000"
2. ✅ Frontend automatically opens in browser
3. ✅ You can register a new user
4. ✅ You can login successfully
5. ✅ Dashboard loads with empty contacts
6. ✅ You can add a contact successfully

---

**Installation complete! Happy coding! 🎉**

---

**© 2026 Rebook. All Rights Reserved.**  
**Developed by Sooryaraj**
