# MongoDB Atlas Setup Guide - Rebook

## ✅ MongoDB Atlas Connection Ready!

Your Rebook backend is now configured to use MongoDB Atlas (cloud database instead of local).

---

## 🔑 CONFIGURE YOUR DATABASE PASSWORD

### Step 1: Update `.env` File

Your `.env` file is located at: `c:\Users\tutys\Desktop\Rebook\server\.env`

**Currently it shows:**
```
MONGODB_URI=mongodb+srv://Sooryaraj_bright:PASSWORD_HERE@rebookusers.8xpvxko.mongodb.net/rebook?appName=Rebookusers
```

### Step 2: Replace Password

You need to replace `PASSWORD_HERE` with your actual MongoDB Atlas password.

**In the .env file, change:**
```
MONGODB_URI=mongodb+srv://Sooryaraj_bright:PASSWORD_HERE@rebookusers.8xpvxko.mongodb.net/rebook?appName=Rebookusers
```

**To:**
```
MONGODB_URI=mongodb+srv://Sooryaraj_bright:YOUR_ACTUAL_PASSWORD@rebookusers.8xpvxko.mongodb.net/rebook?appName=Rebookusers
```

**Example (replace with your real password):**
```
MONGODB_URI=mongodb+srv://Sooryaraj_bright:MySecurePassword123@rebookusers.8xpvxko.mongodb.net/rebook?appName=Rebookusers
```

---

## 🚀 Test Connection

After updating the password, start your backend:

```bash
cd server
npm start
```

**Success Indicators:**
```
✅ MongoDB connected successfully
🚀 Rebook Server running on port 5000
```

**If Connection Fails:**
```
❌ MongoDB connection failed: Authentication failed
```

Check:
1. Password is correct (no typos)
2. Spaces in password are URL-encoded (replace with `%20`)
3. Your IP is whitelisted in MongoDB Atlas
4. Database name is correct (`rebook`)

---

## 📋 Connection Details

### Your MongoDB Atlas Cluster:
- **Cluster**: rebookusers
- **Username**: Sooryaraj_bright
- **Database**: rebook
- **App Name**: Rebookusers
- **Region**: Check your Atlas dashboard for exact region

### Connection String Format:
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE?appName=APPNAME
```

---

## ⚠️ Important Security Notes

### Never Share Your Password!
- ✅ Keep `.env` file in `.gitignore`
- ✅ Don't commit `.env` to Git
- ✅ Never push password to GitHub
- ✅ Use different password for production

### Generate Secure JWT Secret
```bash
# Run this in terminal to generate random key:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then update `JWT_SECRET` in `.env` with the generated value.

---

## ✅ Next Steps

1. **Edit `.env` file** - Replace `PASSWORD_HERE` with actual password
2. **Start backend** - `cd server && npm start`
3. **Start frontend** - `cd client && npm start` (new terminal)
4. **Test** - Register & login at http://localhost:3000

---

## 🔍 MongoDB Atlas Management

### Access Your Atlas Dashboard:
1. Go to https://cloud.mongodb.com
2. Login with your account
3. Select `rebookusers` cluster
4. View database `rebook`
5. See collections: `users`, `contacts`

### Monitor Data:
- Click "Browse Collections" to see your data
- View users and contacts
- Check indexes
- Monitor performance

---

## 🆘 Troubleshooting

### Issue: "Authentication failed"
- Check password spelling
- Verify password doesn't have special characters (if it does, URL-encode them)
- Copy-paste password carefully (no extra spaces)

### Issue: "Connection timeout"
- Check internet connection
- Verify IP is whitelisted in Atlas (Network Access)
- Check database exists (should be `rebook`)

### Issue: "Cannot find database"
- Ensure database name is correct: `rebook`
- MongoDB Atlas creates database automatically on first write
- Try adding a test contact to create the database

### Issue: "User not found"
- Username must be: `Sooryaraj_bright`
- Check exact spelling
- Verify user exists in MongoDB Atlas Project Access

---

## 📚 MongoDB Atlas Resources

- **Atlas Dashboard**: https://cloud.mongodb.com
- **Connection Strings**: https://docs.mongodb.com/manual/reference/connection-string/
- **IP Whitelist**: https://docs.mongodb.com/atlas/security/ip-access-list/
- **Database Backup**: https://docs.mongodb.com/atlas/backup/

---

## ✨ You're All Set!

Your Rebook application is now connected to MongoDB Atlas (cloud database).

1. Edit the `.env` file with your password
2. Start the backend
3. Enjoy your app!

---

**Need Help?**
- Check server terminal for error messages
- Review MongoDB Atlas documentation
- Check your network connectivity

**© 2026 Rebook. All Rights Reserved.**
