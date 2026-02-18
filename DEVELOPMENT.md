# Development Guide - Rebook

## 🛠️ Development Setup

### Prerequisites
- Node.js v14+ and npm v6+
- MongoDB (local or Atlas)
- Git
- Code editor (VS Code recommended)
- Postman for API testing

### Initial Setup

```bash
# Clone repository
cd Rebook

# Setup backend
cd server
npm install
cp .env.example .env
# Edit .env with your settings

# Return and setup frontend
cd ../client
npm install
cp .env.example .env
# Edit .env (usually no changes needed for dev)

cd ..
```

### Start Development Servers

**Terminal 1 - Backend**
```bash
cd server
npm run dev  # Uses nodemon for auto-reload
```

**Terminal 2 - Frontend**
```bash
cd client
npm start
```

**Terminal 3 - MongoDB (Optional)**
```bash
mongod
```

---

## 📁 Code Organization

### Backend Structure

```
server/
├── config/
│   └── database.js           # MongoDB connection
├── controllers/              # Business logic
│   ├── authController.js
│   └── contactController.js
├── middleware/               # Request processing
│   ├── auth.js              # JWT verification
│   ├── rateLimiter.js       # Rate limiting
│   └── validation.js        # Input validation
├── models/                   # Database schemas
│   ├── User.js
│   └── Contact.js
├── routes/                   # API routes
│   ├── authRoutes.js
│   └── contactRoutes.js
├── server.js                 # App entry point
└── package.json
```

### Frontend Structure

```
client/src/
├── pages/
│   ├── Login.js             # Authentication page
│   └── Dashboard.js         # Main dashboard
├── components/
│   ├── ContactTable.js      # Display contacts
│   ├── ContactForm.js       # Add/Edit modal
│   ├── LanguageSwitcher.js  # Language select
│   └── Footer.js            # Footer
├── locales/                 # i18n files
│   ├── en.json
│   ├── ta.json
│   ├── hi.json
│   ├── ml.json
│   └── te.json
├── styles/
│   ├── pages.css
│   ├── components.css
│   └── index.css
├── services/
│   └── api.js               # API client (optional)
├── App.js                   # Root component
├── i18n.js                  # i18n setup
└── index.js                 # React entry
```

---

## 💻 Coding Standards

### JavaScript/Node.js

**File Naming**
```javascript
// camelCase for .js files
authController.js
userModel.js
authRoutes.js
```

**Function Naming**
```javascript
// Use descriptive names, camelCase
function validatePhoneNumber(phone) { }
const isValidEmail = (email) => { };
```

**Comments**
```javascript
/**
 * Brief description of what function does
 * @param {type} paramName - Description
 * @returns {type} Return description
 */
function myFunction(paramName) {
  // Implementation
}
```

**Const vs Let**
```javascript
// Use const by default
const user = { name: 'John' };

// Use let only when value will change
let counter = 0;
counter++;

// Avoid var (ES5)
```

### React Components

**Functional Components**
```javascript
// Use functional components with hooks
function MyComponent() {
  const [state, setState] = React.useState(null);
  
  return <div>{state}</div>;
}

export default MyComponent;
```

**File Structure**
```javascript
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/component.css';

/**
 * Component Description
 */
function ComponentName() {
  const { t } = useTranslation();
  
  return (
    <div>
      {t('key.value')}
    </div>
  );
}

export default ComponentName;
```

**Props Validation** (Optional, for larger apps)
```javascript
function Contact({ name, phone, onCall }) {
  return <div>{name}: {phone}</div>;
}
```

### Error Handling

**Backend**
```javascript
// Wrap in try-catch
try {
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
} catch (error) {
  console.error('Error:', error);
  res.status(500).json({ error: 'Internal server error' });
}
```

**Frontend**
```javascript
// Handle async operations
try {
  const response = await fetch(url);
  const data = await response.json();
  setData(data);
} catch (error) {
  setError(error.message);
}
```

---

## 🧪 Testing Guidelines

### Manual Testing Checklist

**Before Commit**
- [ ] Feature works as expected
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] All translations present
- [ ] Form inputs validated

**Before Merge**
- [ ] All features tested
- [ ] Error cases handled
- [ ] API responses tested
- [ ] Mobile/tablet tested
- [ ] Security reviewed
- [ ] Documentation updated

### Testing Commands

```bash
# Backend validation
npm audit          # Check for security vulnerabilities
npm ls             # List dependencies
npm test           # Run tests (if configured)

# Frontend validation
npm test           # Run tests
npm run build      # Test build process
```

---

## 🔄 Git Workflow

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

**Types**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style (no logic change)
- `refactor:` Code refactoring
- `perf:` Performance improvement
- `test:` Adding tests

**Examples**
```
feat: Add language switcher component

fix: Fix contact deletion bug
docs: Update API documentation
refactor: Simplify authentication flow
```

### Branch Naming

```
feature/user-authentication
bugfix/contact-deletion
docs/api-documentation
```

### Typical Workflow

```bash
# Create branch
git checkout -b feature/my-feature

# Make changes
# Commit regularly
git commit -m "feat: Add my feature"

# Push to GitHub
git push origin feature/my-feature

# Create Pull Request
# Request review
# Merge to main
```

---

## 🚀 Adding Features

### Add New API Endpoint

**1. Create Route** (`server/routes/resourceRoutes.js`)
```javascript
router.get('/items/:id', authenticateToken, validateInput, controller.getItem);
```

**2. Create Controller** (`server/controllers/resourceController.js`)
```javascript
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Error message' });
  }
};
```

**3. Create Model** (if needed) (`server/models/Item.js`)
```javascript
const itemSchema = new mongoose.Schema({
  name: String,
  userId: ObjectId,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Item', itemSchema);
```

### Add New Frontend Feature

**1. Create Page/Component**
```javascript
// src/pages/NewPage.js
function NewPage() {
  const { t } = useTranslation();
  return <div>{t('page.title')}</div>;
}
```

**2. Add Translations**
```json
// Add to all locale files
{
  "page": {
    "title": "Page Title"
  }
}
```

**3. Add Route** (if new page)
```javascript
// In App.js
<Route path="/newpage" element={<NewPage />} />
```

**4. Add Styling**
```css
/* src/styles/pages.css */
.new-page-container {
  /* styles */
}
```

---

## 🔍 Debugging

### Backend Debugging

**Using Console Logs**
```javascript
console.log('Debug value:', value);  // Use descriptive labels
console.error('Error:', error);      // Use console.error for errors
console.time('label');               // Measure performance
console.timeEnd('label');
```

**Using Debugger**
```bash
# Run with debugger
node --inspect server.js

# Open chrome://inspect
```

**Check Logs**
```bash
# In terminal where npm start is running
# Or view PM2 logs
pm2 logs rebook-backend
```

### Frontend Debugging

**Browser DevTools**
```javascript
// F12 to open
// Console tab for errors
// Network tab for API calls
// Sources tab for breakpoints
```

**Useful Browser Methods**
```javascript
localStorage.clear()  // Clear all storage
localStorage.getItem('rbk_token')  // View token
```

**React DevTools**
- Install React Developer Tools extension
- Inspect components in React tab
- View props and state

---

## 🔒 Security Best Practices

### Never Do This ❌
```javascript
// Don't store secrets in code
const JWT_SECRET = "my-secret-123";

// Don't log sensitive data
console.log('Password:', password);

// Don't commit .env files
git add .env

// Don't use eval or innerHTML
eval(userInput);
element.innerHTML = userInput;

// Don't skip input validation
app.post('/api/route', (req, res) => { })
```

### Always Do This ✅
```javascript
// Store secrets in .env
const secret = process.env.JWT_SECRET;

// Validate all inputs
const { isValidPhone } = require('./validation');
if (!isValidPhone(input)) return error;

// Use parameterized queries
Contact.find({ userId: userId })

// Sanitize user input
const cleanInput = userInput.trim();
```

---

## 📊 Performance Tips

### Backend Optimization

```javascript
// ✅ Use indexes
db.users.createIndex({ phoneNumber: 1 })

// ✅ Select specific fields
Contact.find({}).select('name phoneNumber')

// ✅ Limit returned documents
Contact.find({}).limit(100)

// ✅ Use aggregation for complex queries
db.contacts.aggregate([...])

// ❌ Avoid
Contact.find({})  // Returns all fields
```

### Frontend Optimization

```javascript
// ✅ Lazy load components
const Dashboard = React.lazy(() => import('./Dashboard'));

// ✅ Memoize expensive computations
const memoLength = React.useMemo(() => array.length, [array])

// ✅ Use useCallback for event handlers
const handleClick = React.useCallback(() => {}, [])

// ❌ Avoid
// Creating new objects/functions in render
function Component() {
  const obj = {};  // New object every render
}
```

---

## 📚 Code Review Checklist

Before requesting review, verify:

**Functionality**
- [ ] Feature works as designed
- [ ] All edge cases handled
- [ ] Error messages are helpful

**Code Quality**
- [ ] Code is readable and well-commented
- [ ] No dead code
- [ ] DRY principle followed
- [ ] Consistent style

**Security**
- [ ] Input validation present
- [ ] No secrets in code
- [ ] Authentication required where needed
- [ ] Authorization checked

**Testing**
- [ ] Tested manually
- [ ] Works on mobile
- [ ] No console errors
- [ ] API responses correct

**Documentation**
- [ ] Functions documented
- [ ] Complex logic explained
- [ ] API endpoints documented
- [ ] README updated if needed

---

## 🐛 Common Issues & Solutions

### Issue: npm install fails

```bash
# Solution
rm -rf node_modules
rm package-lock.json
npm cache clean --force
npm install
```

### Issue: Port already in use

```bash
# Find process on port 5000
lsof -i :5000

# Kill process
kill -9 <PID>

# Or use different port
PORT=5001 npm start
```

### Issue: MongoDB connection error

```bash
# Verify MongoDB is running
mongod

# Check connection string in .env
MONGODB_URI=mongodb://localhost:27017/rebook
```

### Issue: React component not updating

```javascript
// Solution: Check if state is immutable
// ✅ Correct
const [items, setItems] = useState([]);
setItems([...items, newItem]);

// ❌ Wrong
items.push(newItem);  // Mutating state
```

---

## 📖 Documentation Standards

### API Documentation

```javascript
/**
 * Get user contacts
 * 
 * Retrieves all emergency contacts for authenticated user
 * 
 * @route GET /api/contacts
 * @param {string} token - JWT authentication token (header)
 * @returns {Object} { contacts: Array, count: Number, limit: Number }
 * @throws {Error} 401 if not authenticated
 */
```

### Function Documentation

```javascript
/**
 * Validate phone number format (E.164)
 * 
 * @param {string} phoneNumber - Phone number to validate
 * @returns {boolean} true if valid E.164 format
 * 
 * @example
 * validatePhoneNumber('+919876543210') // true
 * validatePhoneNumber('abc') // false
 */
```

### README Sections

- Overview and features
- Prerequisites and setup
- Project structure
- API documentation
- Configuration
- Troubleshooting
- License and author

---

## 🎓 Learning Resources

### JavaScript/Node.js
- https://javascript.info/
- https://nodejs.org/docs/
- https://expressjs.com/

### React
- https://react.dev/
- https://react.dev/reference/react/hooks

### MongoDB
- https://docs.mongodb.com/
- https://mongoosejs.com/

### Security
- https://owasp.org/
- https://cheatsheetseries.owasp.org/

---

## 🔗 Useful Tools

### Development
- **VS Code** - Code editor
- **Postman** - API testing
- **MongoDB Compass** - MongoDB GUI
- **Nodemon** - Auto-reload server
- **Prettier** - Code formatting

### Debugging
- **React Developer Tools** - Browser extension
- **Redux DevTools** - State debugging
- **Chrome DevTools** - Built-in debugger
- **Node Inspector** - Node debugger

### Productivity
- **Git** - Version control
- **npm scripts** - Task automation
- **Makefile** - Command shortcuts

---

## ✅ Pre-Deployment Checklist

Before deploying to production:

```bash
[ ] npm audit (no vulnerabilities)
[ ] npm test (all tests pass)
[ ] npm run build (successful build)
[ ] Environment variables set
[ ] Database backed up
[ ] Security review completed
[ ] Performance tested
[ ] All features working
[ ] Documentation updated
```

---

## 🎯 Development Goals

### Short Term
- [ ] Core features working
- [ ] Security implemented
- [ ] Mobile responsive
- [ ] Multi-language support

### Medium Term
- [ ] Unit tests
- [ ] Integration tests
- [ ] Performance optimization
- [ ] CI/CD pipeline

### Long Term
- [ ] Admin dashboard
- [ ] Advanced analytics
- [ ] API v2
- [ ] Mobile app

---

## 📞 Getting Help

1. **Check documentation** - README, DATABASE_SCHEMA, API_REFERENCE
2. **Review errors** - Console, server logs, DevTools
3. **Search online** - Stack Overflow, GitHub issues
4. **Ask community** - Forum, Discord, Stack Exchange

---

**© 2026 Rebook. All Rights Reserved.**  
**Developed by Sooryaraj**
