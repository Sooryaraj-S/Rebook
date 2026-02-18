# Database Schema - Rebook

## Overview

Rebook uses **MongoDB** as its database. MongoDB is a NoSQL document-based database that stores data as JSON-like documents.

---

## Database Name

```
rebook
```

---

## Collections

### 1. Users Collection

Stores user authentication credentials.

#### Schema

```javascript
{
  _id: ObjectId,                          // Unique identifier (auto-generated)
  phoneNumber: String,                    // User's phone number (unique, indexed)
  passcodeHash: String,                   // Bcrypted 6-digit passcode
  lastLogin: Date,                        // Last login timestamp
  isActive: Boolean,                      // Active user status
  createdAt: Date,                        // Account creation time (auto)
  updatedAt: Date                         // Last update time (auto)
}
```

#### Field Details

| Field | Type | Notes |
|-------|------|-------|
| `_id` | ObjectId | MongoDB auto-generated unique ID |
| `phoneNumber` | String | Phone in E.164 format (e.g., "+1234567890"), unique |
| `passcodeHash` | String | Bcrypted hash of 6-digit passcode, cannot be reversed |
| `lastLogin` | Date | ISO timestamp of last successful login |
| `isActive` | Boolean | User account status (default: true) |
| `createdAt` | Date | Account registration date |
| `updatedAt` | Date | Last modified date |

#### Example Document

```javascript
{
  "_id": ObjectId("65a1b2c3d4e5f6g7h8i9j0k1"),
  "phoneNumber": "+919876543210",
  "passcodeHash": "$2a$10$KK3K5K...[56-character bcrypt hash]...aB",
  "lastLogin": ISODate("2024-01-15T10:30:45.000Z"),
  "isActive": true,
  "createdAt": ISODate("2024-01-10T08:15:30.000Z"),
  "updatedAt": ISODate("2024-01-15T10:30:45.000Z")
}
```

#### Indexes

```javascript
// Primary index on phone number for fast lookups
db.users.createIndex({ phoneNumber: 1 }, { unique: true })

// Optional: For finding recently active users
db.users.createIndex({ lastLogin: -1 })
```

#### Data Constraints

- **phoneNumber**: 
  - E.164 format: +[country code][number]
  - Length: 10-15 digits
  - Unique (no duplicates)
  - Required

- **passcodeHash**:
  - Bcrypted (cannot be reversed)
  - Minimum 60 characters (bcrypt output)
  - Salt rounds: 10
  - Never store plain text

- **isActive**:
  - Default: true
  - Can be set to false for soft delete

---

### 2. Contacts Collection

Stores emergency contacts for each user.

#### Schema

```javascript
{
  _id: ObjectId,                          // Unique identifier (auto-generated)
  userId: ObjectId,                       // Reference to User._id (indexed)
  name: String,                           // Contact name (e.g., "Mom")
  phoneNumber: String,                    // Contact's phone number
  createdAt: Date,                        // Contact creation time (auto)
  updatedAt: Date                         // Last update time (auto)
}
```

#### Field Details

| Field | Type | Notes |
|-------|------|-------|
| `_id` | ObjectId | MongoDB auto-generated unique ID |
| `userId` | ObjectId | Foreign key reference to Users collection |
| `name` | String | Contact person's name (max 50 characters) |
| `phoneNumber` | String | Phone in E.164 format |
| `createdAt` | Date | When contact was created |
| `updatedAt` | Date | Last modified date |

#### Example Document

```javascript
{
  "_id": ObjectId("65a2b3c4d5e6f7g8h9i0j1k2"),
  "userId": ObjectId("65a1b2c3d4e5f6g7h8i9j0k1"),
  "name": "Mom",
  "phoneNumber": "+919876543210",
  "createdAt": ISODate("2024-01-11T14:20:10.000Z"),
  "updatedAt": ISODate("2024-01-11T14:20:10.000Z")
}
```

#### Indexes

```javascript
// Index for user-specific contact lookups
db.contacts.createIndex({ userId: 1, createdAt: -1 })

// Optional: For searching by name
db.contacts.createIndex({ userId: 1, name: 1 })
```

#### Data Constraints

- **userId**:
  - Must reference valid user in Users collection
  - Required (foreign key)
  - Enables 5 contacts per user

- **name**:
  - Maximum 50 characters
  - Required
  - Cannot be empty

- **phoneNumber**:
  - E.164 format required
  - Length: 10-15 digits
  - Required
  - Indexed for quick lookup

- **Contact Limit**:
  - Maximum 5 contacts per user (enforced in application logic)
  - Query before insert: `db.contacts.countDocuments({ userId: userIdString }) >= 5`

---

## Relationships

### One-to-Many Relationship

```
User (1) ─── (Many) Contacts
```

- One user can have multiple emergency contacts
- Each contact belongs to exactly one user
- When user is deleted, all their contacts should be deleted

---

## Data Validation Rules

### Validation on Collection Level

```javascript
// Users collection validation schema
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["phoneNumber", "passcodeHash"],
      properties: {
        _id: { bsonType: "objectId" },
        phoneNumber: {
          bsonType: "string",
          pattern: "^\\+?[1-9]\\d{1,14}$"
        },
        passcodeHash: {
          bsonType: "string",
          minLength: 60
        },
        lastLogin: { bsonType: "date" },
        isActive: { bsonType: "bool" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
})

// Contacts collection validation schema
db.createCollection("contacts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "name", "phoneNumber"],
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "objectId" },
        name: {
          bsonType: "string",
          maxLength: 50
        },
        phoneNumber: {
          bsonType: "string",
          pattern: "^\\+?[1-9]\\d{1,14}$"
        },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
})
```

---

## Common Queries

### User Operations

```javascript
// Find user by phone number
db.users.findOne({ phoneNumber: "+919876543210" })

// Update last login
db.users.updateOne(
  { _id: ObjectId("...") },
  { $set: { lastLogin: new Date() } }
)

// Soft delete user
db.users.updateOne(
  { _id: ObjectId("...") },
  { $set: { isActive: false } }
)
```

### Contact Operations

```javascript
// Get all contacts for user (sorted by newest first)
db.contacts.find({ userId: ObjectId("...") })
           .sort({ createdAt: -1 })

// Count user's contacts
db.contacts.countDocuments({ userId: ObjectId("...") })

// Add new contact
db.contacts.insertOne({
  userId: ObjectId("..."),
  name: "Emergency",
  phoneNumber: "+919876543210",
  createdAt: new Date(),
  updatedAt: new Date()
})

// Update contact
db.contacts.updateOne(
  { _id: ObjectId("..."), userId: ObjectId("...") },
  { $set: { name: "Mom", phoneNumber: "+919876543210", updatedAt: new Date() } }
)

// Delete contact
db.contacts.deleteOne({ _id: ObjectId("...") })

// Delete all contacts for user
db.contacts.deleteMany({ userId: ObjectId("...") })
```

---

## Backup & Recovery

### MongoDB Backup

```bash
# Backup entire database
mongodump --db rebook --out ./backup

# Backup specific collection
mongodump --db rebook --collection users --out ./backup

# Restore from backup
mongorestore --db rebook ./backup/rebook
```

### MongoDB Atlas Backup

1. Go to MongoDB Atlas Dashboard
2. Select Cluster > Backup
3. Take on-demand snapshot
4. Restore from snapshot as needed

---

## Performance Optimization

### Collection Statistics

```javascript
// Get collection stats
db.users.stats()
db.contacts.stats()

// Get index info
db.users.getIndexes()
db.contacts.getIndexes()

// Find slow queries
db.setProfilingLevel(1, { slowms: 100 })
db.system.profile.find().pretty()
```

### Optimizations Applied

1. **Unique Index on phoneNumber** - Fast user lookup by phone
2. **Compound Index on userId + createdAt** - Fast contact retrieval sorted by date
3. **Connection pooling** - Mongoose default

---

## Scaling Considerations

### Data Growth

For scaling to millions of users:

1. **Sharding Strategy**:
   - Shard key: `userId`
   - Ensures user data locality

2. **Archive Old Data**:
   - Move old contacts to archive collection
   - Keep recent 12 months active

3. **Database Replica Sets**:
   - Improves high availability
   - MongoDB Atlas handles this

---

## Security Best Practices

### Implemented Security

✅ Passcode hashing with bcrypt (salt rounds: 10)  
✅ Phone number validation (E.164 format)  
✅ Unique constraint on phone number  
✅ User isolation (contacts only visible to owner)  
✅ MongoDB Atlas IP Whitelisting (if using cloud)  

### Additional Security Measures

```javascript
// Set up MongoDB connection with SSL/TLS
mongodb+srv://user:password@cluster.mongodb.net/rebook?retryWrites=true&w=majority

// Enable authentication (MongoDB Atlas default)
// Use strong database user passwords

// Use environment variables for credentials
// Never commit .env to version control
```

---

## Troubleshooting

### Issue: Duplicate Phone Numbers

```javascript
// Fix duplicate key error
db.users.deleteOne({ phoneNumber: "+919876543210" })

// Or rebuild index
db.users.dropIndex({ phoneNumber: 1 })
db.users.createIndex({ phoneNumber: 1 }, { unique: true })
```

### Issue: Orphaned Contacts

```javascript
// Find contacts with non-existent user
db.contacts.find({
  userId: { $nin: db.users.find({}, { _id: 1 }).map(d => d._id) }
})

// Delete orphaned contacts
db.contacts.deleteMany({
  userId: { $nin: db.users.find({}, { _id: 1 }).map(d => d._id) }
})
```

### Issue: Collection Full

```javascript
// For MongoDB Atlas, upgrade cluster tier
// For local MongoDB, increase disk space
```

---

## Monitoring

### Useful Queries for Monitoring

```javascript
// Total users
db.users.countDocuments()

// Active users (last login in last 30 days)
db.users.countDocuments({
  lastLogin: { $gte: new Date(new Date() - 30*24*60*60*1000) }
})

// Total contacts in system
db.contacts.countDocuments()

// Average contacts per user
db.contacts.aggregate([
  { $group: { _id: "$userId", count: { $sum: 1 } } },
  { $group: { _id: null, average: { $avg: "$count" } } }
])

// Users with max contacts
db.contacts.aggregate([
  { $group: { _id: "$userId", count: { $sum: 1 } } },
  { $match: { count: 5 } }
])
```

---

## Migration Guide

### Migrating from Other Databases

```javascript
// Sample migration from SQL database
// For each user from old system:
db.users.insertOne({
  phoneNumber: oldUser.phone,
  passcodeHash: await bcrypt.hash(oldUser.passcode, 10),
  lastLogin: new Date(oldUser.last_login),
  isActive: oldUser.is_active,
  createdAt: new Date(oldUser.created_at),
  updatedAt: new Date(oldUser.updated_at)
})

// For each contact:
db.contacts.insertOne({
  userId: newUserId,
  name: oldContact.name,
  phoneNumber: oldContact.phone,
  createdAt: new Date(oldContact.created_at),
  updatedAt: new Date(oldContact.updated_at)
})
```

---

**© 2026 Rebook. All Rights Reserved.**  
**Developed by Sooryaraj**
