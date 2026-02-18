# Security Documentation - Rebook

## 🔐 Security Architecture

### Authentication Flow

```
User Input (Phone + Passcode)
        ↓
  Input Validation
        ↓
  Database Query
        ↓
  Passcode Comparison (bcrypt)
        ↓
  JWT Token Generation (24h expiry)
        ↓
  Client Storage (localStorage)
        ↓
  Include in API Requests
        ↓
  JWT Verification (Server)
```

---

## Security Measures Implemented

### 1. Password/Passcode Security

**Bcrypt Hashing (10 salt rounds)**
```javascript
// Server-side
const salt = await bcrypt.genSalt(10);
const hashedPasscode = await bcrypt.hash(userPasscode, salt);
// Store hashedPasscode in database

// Comparison on login
const isValid = await bcrypt.compare(userPasscode, storedHash);
```

**Why bcrypt?**
- ✅ Exponentially slow by design
- ✅ Computationally expensive to crack
- ✅ Automatically handles salt generation
- ✅ Progressive, future-proof

**Passcode Requirements**
- Exactly 6 digits (000000-999999)
- Never stored in plain text
- Never transmitted in plain text
- Hash cannot be reversed

---

### 2. Authentication (JWT)

**Token Structure**
```javascript
{
  userId: "507f1f77bcf86cd799439011",
  phoneNumber: "+919876543210",
  iat: 1642420799,
  exp: 1642507199    // 24 hours
}
```

**Implementation**
```javascript
// Generate
const token = jwt.sign(
  { userId, phoneNumber },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

// Verify
jwt.verify(token, process.env.JWT_SECRET);
```

**Security Features**
- 24-hour expiration
- Signed with secret key
- Must be included in Authorization header
- Verified on every protected request

---

### 3. Input Validation

**Implemented Validation Rules**

| Field | Rule | Example |
|-------|------|---------|
| Phone | E.164 format | +919876543210 |
| Phone | 10-15 digits | ✓ |
| Phone | Must start with 1-9 | ✓ |
| Passcode | Exactly 6 digits | 123456 |
| Name | Max 50 chars | ✓ |
| Name | Non-empty | ✓ |

**Validation Stack**
```javascript
// express-validator library
const { body, validationResult } = require('express-validator');

body('phoneNumber')
  .trim()
  .matches(/^\+?[1-9]\d{1,14}$/)
  .withMessage('Invalid phone number');

body('passcode')
  .trim()
  .matches(/^\d{6}$/)
  .withMessage('Passcode must be 6 digits');
```

---

### 4. Rate Limiting

**Login Endpoint Protection**

```javascript
// Max 5 attempts per 15-minute window
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 5,                     // 5 attempts
  message: 'Too many attempts, try again later'
});
```

**Prevents**
- ❌ Brute force attacks
- ❌ Password guessing
- ❌ DoS attacks on login

**Response**
```javascript
{
  "error": "Too many login attempts, please try again after 15 minutes"
}
```

---

### 5. CORS Protection

**Allowed Origins**

```javascript
cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL 
    : 'http://localhost:3000'
})
```

**Prevents**
- ❌ Cross-origin attacks
- ❌ Unauthorized API access
- ❌ Credential theft

---

### 6. Security Headers (Helmet.js)

**Implemented Headers**

```javascript
app.use(helmet());
```

**Headers Added**
- `Strict-Transport-Security` - HTTPS only
- `X-Content-Type-Options: nosniff` - Prevent MIME type sniffing
- `X-Frame-Options: DENY` - Prevent clickjacking
- `X-XSS-Protection` - XSS protection
- `Content-Security-Policy` - Script injection prevention

---

### 7. Data Isolation

**User-Specific Access Control**

```javascript
// Contacts belong to specific user
const contacts = await Contact.find({ 
  userId: req.user.userId  // Only user's own contacts
});

// Cannot access other users' data
if (contact.userId.toString() !== req.user.userId) {
  return res.status(403).json({ error: 'Unauthorized' });
}
```

**Ensures**
- ✅ Users only see their contacts
- ✅ Users cannot modify others' data
- ✅ Complete data isolation

---

### 8. Environment Variables

**Never Hardcode Secrets**

```env
# .env (never commit this file)
JWT_SECRET=super_secure_random_key_minimum_32_chars
MONGODB_URI=mongodb+srv://user:pass@cluster/database
NODE_ENV=production
```

**Gitignore**
```
.env           # Environment file (local)
.env.local     # Local overrides
node_modules/  # Dependencies
```

---

### 9. HTTPS/TLS (Production)

**Implement in Production**

```javascript
// Force HTTPS
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    }
  }
  next();
});
```

**Prevents**
- ❌ Man-in-the-middle attacks
- ❌ Data interception
- ❌ Credential theft

---

### 10. Database Security

**MongoDB Best Practices**

```javascript
// Index on unique fields
db.users.createIndex({ phoneNumber: 1 }, { unique: true })

// Connection string with auth
mongodb+srv://user:password@cluster.mongodb.net/rebook
```

**Atlas Security**
- ✅ IP Whitelisting
- ✅ Network Access Control
- ✅ Database User Authentication
- ✅ Encryption at rest

---

## Security Checklist

### Development
- [ ] `.env` file is in `.gitignore`
- [ ] No API keys in code
- [ ] Input validation enabled
- [ ] Rate limiting configured
- [ ] CORS properly set
- [ ] JWT secret is random (min 32 chars)

### Before Production
- [ ] HTTPS/SSL certificate installed
- [ ] JWT_SECRET changed to secure value
- [ ] NODE_ENV set to 'production'
- [ ] Database backups enabled
- [ ] Monitoring/logging configured
- [ ] Rate limits adjusted for expected traffic
- [ ] CORS origins restricted to production domain

### Keep Up
- [ ] Regular security updates (npm audit)
- [ ] Monitor logs for suspicious activity
- [ ] Review access patterns
- [ ] Update dependencies quarterly
- [ ] Test security regularly

---

## Common Security Mistakes to Avoid

### ❌ DON'T
```javascript
// Store plain text passcodes
await User.create({ 
  phoneNumber: phone,
  passcode: passcode  // WRONG!
});

// Send sensitive data in logs
console.log('User password:', password);

// Use weak JWT secret
JWT_SECRET=secret123

// Skip input validation
app.post('/register', (req, res) => {
  // WRONG: No validation
});

// Store credentials in code
const DB_PASSWORD = "myPassword123";
```

### ✅ DO
```javascript
// Hash passcodes with bcrypt
const hashed = await bcrypt.hash(passcode, 10);
await User.create({ 
  phoneNumber: phone,
  passcodeHash: hashed  // CORRECT
});

// Sanitize logs
console.log('User registered:', phone);  // Don't log passcode

// Use strong JWT secret (Generate with)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

// Validate all inputs
app.post('/register', validateLogin, handleValidationErrors, register);

// Use environment variables
const dbPass = process.env.DB_PASSWORD;
```

---

## Testing Security

### Manual Security Testing

```javascript
// 1. Test input validation
POST /api/auth/login
{
  "phoneNumber": "invalid",  // Should reject
  "passcode": "12345"         // Should reject
}

// 2. Test JWT expiration
// Wait 24+ hours, token should be invalid

// 3. Test rate limiting
// Try login 6 times rapidly, 6th should fail

// 4. Test CORS
// Request from different domain, should fail

// 5. Test data isolation
// Login as user A and fetch user B's contacts
// Should get 403 Unauthorized
```

---

## Incident Response

### If Passcode Leaked

1. **Immediate**: Notify affected users
2. **Short-term**: Force password reset
3. **Medium-term**: Audit system logs
4. **Long-term**: Implement additional protections

### If Database Breached

1. **Immediate**: Rotate JWT secret
2. **Short-term**: Issue new tokens to all users
3. **Medium-term**: Rebuild from backup if needed
4. **Long-term**: Review security measures

### If Secret Key Exposed

1. **Immediate**: Change in production
2. **Short-term**: Invalidate all current tokens
3. **Medium-term**: Review access logs
4. **Long-term**: Implement key rotation policy

---

## Security Resources

- **OWASP Top 10**: https://owasp.org/www-project-top-ten/
- **OWASP API Security**: https://owasp.org/www-project-api-security/
- **CWE Most Dangerous**: https://cwe.mitre.org/
- **Node.js Security**: https://nodejs.org/en/docs/guides/security/

---

## Compliance & Standards

### Implemented
- ✅ OWASP Top 10 protections
- ✅ NIST guidelines for password storage
- ✅ RESTful API security practices
- ✅ JWT best practices

### Consider for Future
- [ ] GDPR compliance
- [ ] Two-factor authentication (2FA)
- [ ] OAuth 2.0 integration
- [ ] Security audit (3rd party)

---

## Support

For security concerns:
1. Email security team
2. Do not disclose publicly
3. Provide detailed reproduction steps
4. Wait for response before publishing

---

**© 2026 Rebook. All Rights Reserved.**  
**Developed by Sooryaraj**
