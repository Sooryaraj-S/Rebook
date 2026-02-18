# Project Documentation Index

## 📚 Quick Navigation

Welcome to **Rebook** - Secure Emergency Contact Access Application. This file helps you navigate all project documentation.

---

## 🚀 Start Here

### First Time Setup?
1. **[QUICK_START.md](./QUICK_START.md)** - Get running in 5 minutes
2. **[INSTALLATION.md](./INSTALLATION.md)** - Detailed setup instructions

### Want to Understand the Project?
1. **[README.md](./README.md)** - Complete project overview
2. **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** - Database structure

### Need to Deploy?
1. **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Comprehensive deployment guide

### API Development?
1. **[API_REFERENCE.md](./API_REFERENCE.md)** - Complete API documentation

---

## 📖 Complete Documentation Index

### Overview & Getting Started
| Document | Purpose | Read Time |
|----------|---------|-----------|
| **[README.md](./README.md)** | Project overview, features, tech stack | 15 min |
| **[QUICK_START.md](./QUICK_START.md)** | Quick 5-minute setup guide | 5 min |
| **[INSTALLATION.md](./INSTALLATION.md)** | Detailed step-by-step installation | 20 min |

### Architecture & Design
| Document | Purpose | Read Time |
|----------|---------|-----------|
| **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** | MongoDB collection structure, queries | 15 min |
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | System design, data flow, decisions* | 10 min |

### Development & APIs
| Document | Purpose | Read Time |
|----------|---------|-----------|
| **[API_REFERENCE.md](./API_REFERENCE.md)** | All API endpoints, examples | 20 min |
| **[DEVELOPMENT.md](./DEVELOPMENT.md)** | Development guide, coding standards* | 15 min |

### Security & Operations
| Document | Purpose | Read Time |
|----------|---------|-----------|
| **[SECURITY.md](./SECURITY.md)** | Security features, best practices | 15 min |
| **[DEPLOYMENT.md](./DEPLOYMENT.md)** | Production deployment options | 20 min |

*Files to be created below

---

## 📁 Project Structure

### Root Directory
```
Rebook/
├── README.md                    # Main documentation (START HERE)
├── QUICK_START.md              # Quick setup guide
├── INSTALLATION.md             # Detailed installation
├── DATABASE_SCHEMA.md          # Database documentation
├── API_REFERENCE.md            # API documentation
├── SECURITY.md                 # Security guide
├── DEPLOYMENT.md               # Deployment guide
├── DEVELOPMENT.md              # Development guide
├── ARCHITECTURE.md             # Architecture overview
├── postman_collection.json     # API testing (import to Postman)
├── .gitignore                  # Git ignore patterns
│
├── server/                     # BACKEND (Node.js + Express)
│   ├── package.json           # Backend dependencies
│   ├── .env.example           # Environment template
│   ├── server.js              # Main entry point
│   │
│   ├── config/
│   │   └── database.js        # MongoDB connection
│   │
│   ├── controllers/
│   │   ├── authController.js  # Auth logic
│   │   └── contactController.js # Contact CRUD
│   │
│   ├── middleware/
│   │   ├── auth.js            # JWT verification
│   │   ├── rateLimiter.js     # Rate limiting
│   │   └── validation.js      # Input validation
│   │
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Contact.js         # Contact schema
│   │
│   └── routes/
│       ├── authRoutes.js      # Auth endpoints
│       └── contactRoutes.js   # Contact endpoints
│
└── client/                     # FRONTEND (React.js)
    ├── package.json           # Frontend dependencies
    ├── .env.example           # Environment template
    ├── public/
    │   └── index.html         # HTML template
    │
    └── src/
        ├── App.js             # Root component
        ├── i18n.js            # i18n setup
        ├── index.js           # React entry point
        ├── index.css          # Global styles
        │
        ├── pages/
        │   ├── Login.js       # Login page
        │   └── Dashboard.js   # Contact management page
        │
        ├── components/
        │   ├── ContactTable.js    # Contact table
        │   ├── ContactForm.js     # Add/Edit form
        │   ├── LanguageSwitcher.js # Language selector
        │   └── Footer.js          # Footer
        │
        ├── locales/
        │   ├── en.json        # English translations
        │   ├── ta.json        # Tamil translations
        │   ├── hi.json        # Hindi translations
        │   ├── ml.json        # Malayalam translations
        │   └── te.json        # Telugu translations
        │
        ├── services/
        │   └── api.js         # API client (future)
        │
        └── styles/
            ├── pages.css      # Page styles
            └── components.css # Component styles
```

---

## 🎯 Common Tasks

### I need to...

**Setup the project locally**
- Read [QUICK_START.md](./QUICK_START.md) (5 min)
- Read [INSTALLATION.md](./INSTALLATION.md) (20 min)

**Understand how it works**
- Read [README.md](./README.md) (overview)
- Read [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) (database)
- Read [ARCHITECTURE.md](./ARCHITECTURE.md) (design)

**Add a new feature**
- Read [DEVELOPMENT.md](./DEVELOPMENT.md) (coding standards)
- Check [API_REFERENCE.md](./API_REFERENCE.md) (API design)
- Review [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) (data model)

**Call an API from the frontend**
- Check [API_REFERENCE.md](./API_REFERENCE.md) (all endpoints)
- See examples in [API_REFERENCE.md](./API_REFERENCE.md#implementation-examples)
- Use [postman_collection.json](./postman_collection.json) for testing

**Deploy to production**
- Read [DEPLOYMENT.md](./DEPLOYMENT.md) (deployment options)
- Review [SECURITY.md](./SECURITY.md) (security checklist)
- Check [README.md](./README.md#deployment) (quick reference)

**Secure the application**
- Read [SECURITY.md](./SECURITY.md) (security features)
- Check [DEPLOYMENT.md](./DEPLOYMENT.md#production-checklist) (prod checklist)

**Fix a bug / debug**
- Check browser console (frontend errors)
- Check server terminal (backend errors)
- Check MongoDB logs (database errors)
- See [INSTALLATION.md#troubleshooting](./INSTALLATION.md#troubleshooting)

**Add multi-language support**
- Check `client/src/locales/` (translation files)
- Add translations to all JSON files
- Test with language switcher

**Test the API**
- Import [postman_collection.json](./postman_collection.json) to Postman
- Set `{{BASE_URL}}` and `{{TOKEN}}` variables
- Run requests

---

## 🔧 Development Quick Reference

### Backend Development

**Start Backend**
```bash
cd server
npm install
npm start  # or npm run dev
```

**Check Port**: http://localhost:5000

**Key Files to Edit**
- Add feature: `server/routes/` → `server/controllers/`
- Add model: `server/models/`
- Add middleware: `server/middleware/`

### Frontend Development

**Start Frontend**
```bash
cd client
npm install
npm start
```

**Check Port**: http://localhost:3000

**Key Files to Edit**
- Add page: `client/src/pages/`
- Add component: `client/src/components/`
- Add styles: `client/src/styles/`
- Add translations: `client/src/locales/`

### Database

**Start MongoDB**
```bash
mongod
```

**Connect with MongoDB Shell**
```bash
mongosh
# or for older versions
mongo
```

---

## 🧪 Testing

### Manual Testing Checklist

[ ] **Authentication**
- [ ] Register new user
- [ ] Login with credentials
- [ ] Token verification
- [ ] Logout

[ ] **Contacts** (max 5)
- [ ] Add contact successfully
- [ ] Cannot add 6th contact
- [ ] Edit contact
- [ ] Delete contact
- [ ] Call functionality
- [ ] Message functionality

[ ] **UI/UX**
- [ ] Responsive on mobile
- [ ] All 5 languages work
- [ ] Error messages display
- [ ] Loading states show
- [ ] Professional appearance

### API Testing

Use Postman (import `postman_collection.json`):
1. Set `{{BASE_URL}}`
2. Login to get `{{TOKEN}}`
3. Test all endpoints
4. Verify response codes

---

## 📊 Architecture Overview

### High Level

```
┌─────────────────────────────────────────────────────┐
│              FRONTEND (React.js)                    │
│   - Login Page                                      │
│   - Dashboard (Contact Management)                  │
│   - Multilingual Support (i18n)                     │
│   - Responsive Design                              │
└──────────────────────────────────────────────────────┘
                        ↓
                    (HTTPS/TLS)
                        ↓
┌──────────────────────────────────────────────────────┐
│              API GATEWAY (Nginx)                     │
│   - Reverse Proxy                                   │
│   - Load Balancing (optional)                       │
│   - SSL/TLS Termination                             │
└──────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────┐
│          BACKEND API (Node.js + Express)             │
│   - Authentication (JWT)                            │
│   - Contact Management                              │
│   - Input Validation                                │
│   - Rate Limiting                                   │
│   - Error Handling                                  │
└──────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────┐
│            DATABASE (MongoDB)                        │
│   - Users Collection                                │
│   - Contacts Collection                             │
│   - Indexes & Queries                               │
└──────────────────────────────────────────────────────┘
```

### Request Flow

**Authentication**
```
User Input → Validation → Bcrypt Hash Compare → JWT Generated → Token Sent
```

**Contact Management**
```
API Request + Token → JWT Verified → User ID Extracted → Query Database → Response
```

---

## 🔐 Security Overview

### Implemented

✅ **Passcode Hashing** - Bcryptjs (salt rounds: 10)
✅ **JWT Authentication** - 24-hour expiration
✅ **Input Validation** - Phone format, passcode length
✅ **Rate Limiting** - 5 login attempts per 15 min
✅ **CORS Protection** - Configured origins
✅ **Security Headers** - Helmet.js middleware
✅ **Data Isolation** - User-specific access
✅ **HTTPS Support** - TLS encryption

See [SECURITY.md](./SECURITY.md) for details.

---

## 📦 Dependencies

### Backend
- **express** - Web framework
- **mongoose** - MongoDB client
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT tokens
- **express-rate-limit** - Rate limiting
- **express-validator** - Input validation
- **helmet** - Security headers

### Frontend
- **react** - UI library
- **react-dom** - React rendering
- **i18next** - Multilingual support
- **axios** - HTTP client
- **react-router-dom** - Routing

---

## 📞 Getting Help

### Documentation
1. Check relevant document from index
2. Search for specific term
3. Review examples

### Common Issues
- See [INSTALLATION.md#troubleshooting](./INSTALLATION.md#troubleshooting)
- Check browser DevTools console
- Check server terminal logs
- Check MongoDB output

### Additional Resources
- Node.js: https://nodejs.org/docs/
- React: https://react.dev/
- MongoDB: https://docs.mongodb.com/
- Express: https://expressjs.com/
- JWT: https://jwt.io/

---

## ✅ Checklist Before Publishing

### Code Quality
- [ ] No console.log debugging statements
- [ ] Consistent code style
- [ ] Comments on complex logic
- [ ] Error handling on all routes
- [ ] Input validation on all endpoints

### Security
- [ ] JWT_SECRET is strong and random
- [ ] No hardcoded credentials
- [ ] .env file in .gitignore
- [ ] CORS configured for production
- [ ] Rate limiting enabled

### Testing
- [ ] All features tested manually
- [ ] API endpoints tested with Postman
- [ ] Mobile responsiveness verified
- [ ] All languages working
- [ ] Error scenarios tested

### Documentation
- [ ] README updated
- [ ] API routes documented
- [ ] Database schema documented
- [ ] Installation instructions current
- [ ] Deployment guide reviewed

### Deployment
- [ ] Environment variables configured
- [ ] Database backed up
- [ ] SSL/HTTPS enabled
- [ ] Monitoring set up
- [ ] Error tracking configured

---

## 🎓 Learning Resources

### Frontend (React)
- React Docs: https://react.dev/
- i18next: https://www.i18next.com/
- Hooks Guide: https://react.dev/reference/react

### Backend (Node.js)
- Node.js Best Practices: https://nodejs.org/en/docs/guides/
- Express.js Guide: https://expressjs.com/en/guide/routing.html
- MongoDB Manual: https://docs.mongodb.com/manual/

### DevOps
- Docker: https://docs.docker.com/
- Kubernetes: https://kubernetes.io/docs/
- CI/CD with GitHub Actions: https://docs.github.com/en/actions

---

## 📝 Contributing

To contribute:
1. Follow coding standards in [DEVELOPMENT.md](./DEVELOPMENT.md)
2. Test thoroughly before submitting
3. Update documentation
4. Write clear commit messages

---

## 📄 License

MIT License - See LICENSE file

---

## 👨‍💻 Author

**Sooryaraj**

---

## 🎉 Quick Links

| Link | Purpose |
|------|---------|
| [📖 README](./README.md) | Start here |
| [⚡ QUICK_START](./QUICK_START.md) | 5-minute setup |
| [🔧 INSTALLATION](./INSTALLATION.md) | Detailed tutorial |
| [🗄️ DATABASE_SCHEMA](./DATABASE_SCHEMA.md) | Database docs |
| [🌐 API_REFERENCE](./API_REFERENCE.md) | API endpoints |
| [🔐 SECURITY](./SECURITY.md) | Security guide |
| [🚀 DEPLOYMENT](./DEPLOYMENT.md) | Deploy guide |
| [💻 DEVELOPMENT](./DEVELOPMENT.md) | Dev setup |

---

**Last Updated**: January 2026  
**Version**: 1.0.0  
**© 2026 Rebook. All Rights Reserved.**
