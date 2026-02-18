# Rebook - Secure Emergency Contact Access Application

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-14%2B-brightgreen.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)

## 📱 Overview

**Rebook** is a secure web application that allows users to access up to 5 saved emergency contact numbers when their phone is switched off or unavailable. Users can log in from anywhere using their phone number and a unique 6-digit passcode.

### Key Features

✅ **Secure Authentication** - Phone number + 6-digit passcode with bcrypt hashing  
✅ **Contact Management** - Add, edit, and delete up to 5 emergency contacts  
✅ **Quick Actions** - One-tap calling and messaging using tel: and sms: protocols  
✅ **Multilingual Support** - English, Tamil, Hindi, Malayalam, and Telugu  
✅ **Responsive Design** - Works on desktop, tablet, and mobile devices  
✅ **Secure Storage** - All data encrypted and stored securely  
✅ **Global Access** - Access contacts from anywhere, anytime  

---

## 🛠️ Tech Stack

### Frontend
- **React.js** 18 - UI library
- **i18next** - Multilingual support
- **Axios** - HTTP client
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **Helmet** - Security middleware
- **Rate Limiter** - Brute force protection

---

## 📋 Prerequisites

Before getting started, ensure you have:

- **Node.js** (v14.0.0 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local or Atlas cloud)
- Modern web browser
- Git (optional)

---

## 🚀 Quick Start

### 1️⃣ Clone or Download the Project

```bash
cd c:\Users\tutys\Desktop\Rebook
```

### 2️⃣ Backend Setup

```bash
cd server
cp .env.example .env
```

**Configure `.env` file:**
```env
MONGODB_URI=mongodb://localhost:27017/rebook
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

**Install dependencies:**
```bash
npm install
```

**Start backend server:**
```bash
npm start        # Production mode
# OR
npm run dev      # Development mode with hot reload
```

✅ Backend running on `http://localhost:5000`

---

### 3️⃣ Frontend Setup

```bash
cd client
cp .env.example .env
```

**Configure `.env` file:**
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

✅ Frontend running on `http://localhost:3000`

---

## 📖 Project Structure

```
Rebook/
├── server/                          # Backend (Node.js + Express)
│   ├── config/
│   │   └── database.js             # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js       # Auth logic (login/register)
│   │   └── contactController.js    # Contact CRUD operations
│   ├── middleware/
│   │   ├── auth.js                 # JWT verification
│   │   ├── rateLimiter.js          # Brute force protection
│   │   └── validation.js           # Input validation
│   ├── models/
│   │   ├── User.js                 # User schema
│   │   └── Contact.js              # Contact schema
│   ├── routes/
│   │   ├── authRoutes.js           # Auth endpoints
│   │   └── contactRoutes.js        # Contact endpoints
│   ├── server.js                   # Main entry point
│   ├── package.json
│   └── .env.example
│
└── client/                          # Frontend (React)
    ├── public/
    │   └── index.html              # HTML template
    ├── src/
    │   ├── components/
    │   │   ├── ContactTable.js     # Contact display table
    │   │   ├── ContactForm.js      # Add/Edit form modal
    │   │   ├── LanguageSwitcher.js # Language selector
    │   │   └── Footer.js           # Footer component
    │   ├── pages/
    │   │   ├── Login.js            # Login page
    │   │   └── Dashboard.js        # Contact management
    │   ├── locales/                # i18n translations
    │   │   ├── en.json             # English
    │   │   ├── ta.json             # Tamil
    │   │   ├── hi.json             # Hindi
    │   │   ├── ml.json             # Malayalam
    │   │   └── te.json             # Telugu
    │   ├── styles/
    │   │   ├── pages.css           # Page styles
    │   │   └── components.css      # Component styles
    │   ├── App.js                  # Root component
    │   ├── i18n.js                 # i18n config
    │   ├── index.js                # React entry
    │   └── index.css               # Global styles
    ├── package.json
    └── .env.example
```

---

## 🔐 Security Features

### Authentication & Authorization
- **Secure Passcode Storage** - bcryptjs with salt rounds (10)
- **JWT Tokens** - 24-hour expiration
- **Rate Limiting** - 5 login attempts per 15 minutes
- **Input Validation** - Email format and phone number validation
- **XSS Protection** - Helmet.js middleware

### Database Security
- **MongoDB Indexes** - Optimized queries with indexes
- **User Data Isolation** - Each user can only access their own contacts
- **Password Hashing** - Never stored in plain text

---

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "phoneNumber": "+1234567890",
  "passcode": "123456"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "phoneNumber": "+1234567890",
  "passcode": "123456"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": { "userId": "...", "phoneNumber": "+1234567890" }
}
```

#### Verify Token
```http
GET /api/auth/verify
Authorization: Bearer <token>
```

---

### Contact Endpoints (Requires Authentication)

#### Get All Contacts
```http
GET /api/contacts
Authorization: Bearer <token>
```

#### Add Contact
```http
POST /api/contacts
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Mom",
  "phoneNumber": "+1987654321"
}
```

#### Update Contact
```http
PUT /api/contacts/:contactId
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Mom (Updated)",
  "phoneNumber": "+1987654321"
}
```

#### Delete Contact
```http
DELETE /api/contacts/:contactId
Authorization: Bearer <token>
```

---

## 🌍 Multilingual Support

The application supports 5 languages:

| Code | Language | Native |
|------|----------|--------|
| en | English | English |
| ta | Tamil | தமிழ் |
| hi | Hindi | हिंदी |
| ml | Malayalam | മലയാളം |
| te | Telugu | తెలుగు |

Language preference is saved in browser's localStorage.

---

## 📱 Features Walkthrough

### 1. Login/Registration
- Enter phone number (10-15 digits)
- Enter 6-digit passcode
- Toggle between login and register
- Secure authentication with JWT tokens

### 2. Dashboard
- View all emergency contacts
- Shows contact count (out of 5)
- Quick access to call and message buttons

### 3. Contact Management
- **Add**: Create new contact (max 5)
- **Edit**: Modify existing contact details
- **Delete**: Remove contact with confirmation
- **Call**: Instant calling via tel: protocol
- **Message**: Quick SMS via sms: protocol

### 4. Language Switching
- Dropdown selector in header
- Preference saved automatically
- Real-time page translation

### 5. Security
- Logout button in header
- JWT-based session management
- Token expiration: 24 hours

---

## 📊 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  phoneNumber: String (unique),
  passcodeHash: String (bcrypt hash),
  lastLogin: Date,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  name: String,
  phoneNumber: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check if MongoDB is running
mongosh  # or mongo for older versions

# Check if port 5000 is in use
netstat -ano | findstr :5000

# Try different port (update .env)
```

### Frontend API Errors
```bash
# Ensure backend is running on port 5000
# Check REACT_APP_API_URL in .env

# Clear browser cache and local storage
# Frontend Console: localStorage.clear()
```

### MongoDB Connection Failed
```bash
# For local MongoDB:
mongod

# For MongoDB Atlas:
# Update MONGODB_URI with your connection string
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/rebook
```

### Rate Limiting Issues
- Wait 15 minutes before retry
- Check browser console for error message

---

## 📦 Deployment

### Deploy Backend (Heroku)

1. **Create Heroku Account** - heroku.com
2. **Install Heroku CLI**
3. **Login**: `heroku login`
4. **Create App**: `heroku create your-app-name`
5. **Set Environment Variables**:
   ```bash
   heroku config:set MONGODB_URI=<your-mongodb-uri>
   heroku config:set JWT_SECRET=<your-secret-key>
   ```
6. **Deploy**: `git push heroku main`

### Deploy Frontend (Vercel)

1. **Push code to GitHub**
2. **Connect Vercel** - vercel.com
3. **Set Environment Variables** in Vercel dashboard
4. **Deploy** - automatically on push

### Deploy Backend (AWS/DigitalOcean)

1. Follow your provider's Node.js deployment guide
2. Set up MongoDB Atlas for database
3. Configure environment variables
4. Set up SSL/HTTPS

---

## ✅ Testing

### Manual Testing Checklist

- [ ] Register new user with phone and passcode
- [ ] Login with credentials
- [ ] Add 5 contacts successfully
- [ ] Verify cannot add 6th contact
- [ ] Edit existing contact
- [ ] Delete contact
- [ ] Test call button
- [ ] Test message button
- [ ] Switch between 5 languages
- [ ] Test on mobile device
- [ ] Test logout functionality
- [ ] Test session timeout

---

## 👨‍💼 Author

**Sooryaraj**

---

## 📜 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review the API Documentation
3. Check browser console for errors
4. Verify MongoDB and Node.js are running

---

## 🚀 Future Enhancements

- [ ] Two-factor authentication
- [ ] Cloud backup of contacts
- [ ] Emergency contact alerts
- [ ] Voice calling integration
- [ ] Contact sharing
- [ ] Email notifications
- [ ] Dark mode theme
- [ ] Progressive Web App (PWA)

---

## 📄 Changelog

### Version 1.0.0
- Initial release
- Basic authentication and contact management
- Multilingual support (5 languages)
- Responsive design
- Security features implemented

---

**© 2026 Rebook. All Rights Reserved.**  
**Developed by Sooryaraj**
