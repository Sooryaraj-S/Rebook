# API Reference - Rebook

## Base URL

**Development**: `http://localhost:5000/api`  
**Production**: `https://your-domain.com/api`

---

## Authentication

### Register User

Create a new user account.

**Endpoint**: `POST /auth/register`

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "phoneNumber": "+919876543210",
  "passcode": "123456"
}
```

**Response** (201 Created):
```json
{
  "message": "User registered successfully",
  "userId": "507f1f77bcf86cd799439011"
}
```

**Possible Errors**:
| Status | Error |
|--------|-------|
| 400 | Invalid phone number format |
| 400 | Passcode must be exactly 6 digits |
| 409 | Phone number already registered |
| 500 | Registration failed |

**Example cURL**:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"+919876543210","passcode":"123456"}'
```

---

### Login User

Authenticate with phone number and passcode.

**Endpoint**: `POST /auth/login`

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "phoneNumber": "+919876543210",
  "passcode": "123456"
}
```

**Response** (200 OK):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "phoneNumber": "+919876543210",
    "lastLogin": "2024-01-15T10:30:45.000Z",
    "isActive": true
  }
}
```

**Possible Errors**:
| Status | Error |
|--------|-------|
| 400 | Invalid phone number format |
| 400 | Passcode must be exactly 6 digits |
| 401 | Invalid phone number or passcode |
| 429 | Too many login attempts (Rate Limited) |
| 500 | Login failed |

**Rate Limiting**: 5 attempts per 15 minutes

**Example cURL**:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"+919876543210","passcode":"123456"}'
```

---

### Verify Token

Validate JWT token and get user information.

**Endpoint**: `GET /auth/verify`

**Request Headers**:
```
Authorization: Bearer your_jwt_token
```

**Response** (200 OK):
```json
{
  "valid": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "phoneNumber": "+919876543210",
    "lastLogin": "2024-01-15T10:30:45.000Z",
    "isActive": true
  }
}
```

**Possible Errors**:
| Status | Error |
|--------|-------|
| 401 | No token provided |
| 403 | Invalid or expired token |
| 404 | User not found |
| 500 | Token verification failed |

**Example cURL**:
```bash
curl -X GET http://localhost:5000/api/auth/verify \
  -H "Authorization: Bearer your_jwt_token"
```

---

## Contacts

All contact endpoints require JWT authentication.

### Get All Contacts

Retrieve all emergency contacts for authenticated user.

**Endpoint**: `GET /contacts`

**Request Headers**:
```
Authorization: Bearer your_jwt_token
```

**Response** (200 OK):
```json
{
  "contacts": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Mom",
      "phoneNumber": "+919876543211",
      "createdAt": "2024-01-11T14:20:10.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Dad",
      "phoneNumber": "+919876543212",
      "createdAt": "2024-01-11T15:30:20.000Z"
    }
  ],
  "count": 2,
  "limit": 5
}
```

**Possible Errors**:
| Status | Error |
|--------|-------|
| 401 | No token provided |
| 403 | Invalid or expired token |
| 500 | Failed to fetch contacts |

**Example cURL**:
```bash
curl -X GET http://localhost:5000/api/contacts \
  -H "Authorization: Bearer your_jwt_token"
```

---

### Add Contact

Create a new emergency contact. Maximum 5 contacts per user.

**Endpoint**: `POST /contacts`

**Request Headers**:
```
Authorization: Bearer your_jwt_token
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "Emergency",
  "phoneNumber": "+919876543220"
}
```

**Response** (201 Created):
```json
{
  "message": "Contact added successfully",
  "contact": {
    "_id": "507f1f77bcf86cd799439014",
    "name": "Emergency",
    "phoneNumber": "+919876543220"
  }
}
```

**Possible Errors**:
| Status | Error |
|--------|-------|
| 400 | Name is required |
| 400 | Valid phone number is required |
| 400 | Maximum 5 contacts allowed per user |
| 401 | No token provided |
| 403 | Invalid or expired token |
| 500 | Failed to add contact |

**Example cURL**:
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Authorization: Bearer your_jwt_token" \
  -H "Content-Type: application/json" \
  -d '{"name":"Mom","phoneNumber":"+919876543210"}'
```

---

### Update Contact

Modify an existing emergency contact.

**Endpoint**: `PUT /contacts/:contactId`

**Request Headers**:
```
Authorization: Bearer your_jwt_token
Content-Type: application/json
```

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| contactId | string | Contact ID (ObjectId) |

**Request Body**:
```json
{
  "name": "Mom (Updated)",
  "phoneNumber": "+919876543210"
}
```

**Response** (200 OK):
```json
{
  "message": "Contact updated successfully",
  "contact": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Mom (Updated)",
    "phoneNumber": "+919876543210"
  }
}
```

**Possible Errors**:
| Status | Error |
|--------|-------|
| 400 | Name is required |
| 400 | Valid phone number is required |
| 401 | No token provided |
| 403 | Invalid or expired token or Unauthorized |
| 404 | Contact not found |
| 500 | Failed to update contact |

**Example cURL**:
```bash
curl -X PUT http://localhost:5000/api/contacts/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer your_jwt_token" \
  -H "Content-Type: application/json" \
  -d '{"name":"Mom (Updated)","phoneNumber":"+919876543210"}'
```

---

### Delete Contact

Remove an emergency contact.

**Endpoint**: `DELETE /contacts/:contactId`

**Request Headers**:
```
Authorization: Bearer your_jwt_token
```

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| contactId | string | Contact ID (ObjectId) |

**Response** (200 OK):
```json
{
  "message": "Contact deleted successfully"
}
```

**Possible Errors**:
| Status | Error |
|--------|-------|
| 401 | No token provided |
| 403 | Invalid or expired token or Unauthorized |
| 404 | Contact not found |
| 500 | Failed to delete contact |

**Example cURL**:
```bash
curl -X DELETE http://localhost:5000/api/contacts/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer your_jwt_token"
```

---

## System

### Health Check

Check if server is running.

**Endpoint**: `GET /health`

**Response** (200 OK):
```json
{
  "status": "Server is running",
  "timestamp": "2024-01-15T10:30:45.000Z"
}
```

**Example cURL**:
```bash
curl http://localhost:5000/api/health
```

---

## Error Responses

### Standard Error Format

```json
{
  "error": "Error message describing what went wrong"
}
```

### Validation Errors

```json
{
  "errors": [
    {
      "value": "invalid",
      "msg": "Invalid phone number format",
      "param": "phoneNumber",
      "location": "body"
    }
  ]
}
```

### Common Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - No/invalid token |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 429 | Too Many Requests - Rate limited |
| 500 | Server Error - Internal error |

---

## Authentication Token

### JWT Token Structure

```javascript
{
  "userId": "507f1f77bcf86cd799439011",    // User ID
  "phoneNumber": "+919876543210",          // User phone
  "iat": 1642420799,                       // Issued at
  "exp": 1642507199                        // Expires at (24 hours)
}
```

### Using Token

Include in Authorization header:
```
Authorization: Bearer <token_here>
```

### Token Expiration

- **Duration**: 24 hours
- **Action**: Re-login to get new token
- **Storage**: Browser localStorage
- **Key**: `rbk_token`

---

## Rate Limiting

### Login Endpoint

- **Limit**: 5 attempts per 15 minutes
- **Header Response**:
  ```
  X-RateLimit-Limit: 5
  X-RateLimit-Remaining: 4
  X-RateLimit-Reset: 1642421445
  ```

### Over Limit Response

```json
{
  "error": "Too many login attempts, please try again after 15 minutes"
}
```

---

## Data Types & Format

### Phone Number Format (E.164)

```
+[country code][subscriber number]
Examples:
- +919876543210 (India)
- +12125552368 (USA)
- +44123456789 (UK)
```

Requirements:
- Must start with +
- 1-3 digit country code
- 1-14 digit subscriber number
- Total: 10-15 digits

### Passcode Format

```
6 digits: 000000 to 999999
Examples: 123456, 000000, 999999
```

### Timestamps (ISO 8601)

```
"2024-01-15T10:30:45.000Z"
```

---

## Implementation Examples

### JavaScript/Fetch

```javascript
// Register
const registerResponse = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phoneNumber: '+919876543210',
    passcode: '123456'
  })
});

// Get Contacts
const contactsResponse = await fetch('http://localhost:5000/api/contacts', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

### Axios

```javascript
// Add Contact
const response = await axios.post('/api/contacts', {
  name: 'Mom',
  phoneNumber: '+919876543210'
}, {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

### cURL

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"+919876543210","passcode":"123456"}'

# Get Contacts (use token from login response)
curl -X GET http://localhost:5000/api/contacts \
  -H "Authorization: Bearer eyJhbGc..."
```

---

## API Versioning

Current API Version: **v1.0.0**

Future changes will be announced with migration guides.

---

## Rate Limits Summary

| Endpoint | Rate Limit |
|----------|-----------|
| POST /auth/login | 5 per 15 minutes |
| POST /auth/register | No limit* |
| GET /auth/verify | No limit |
| GET /contacts | No limit |
| POST /contacts | No limit |
| PUT /contacts/:id | No limit |
| DELETE /contacts/:id | No limit |

*Subject to change based on system load

---

**© 2026 Rebook. All Rights Reserved.**  
**Developed by Sooryaraj**
