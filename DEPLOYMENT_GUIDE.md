# Deployment Guide - Rebook

Deploy Rebook to production using Heroku or other platforms.

---

## Quick Deployment to Heroku

### Prerequisites

1. **Install Heroku CLI**: https://devcenter.heroku.com/articles/heroku-cli
2. **GitHub Account**: Code must be pushed to GitHub
3. **MongoDB Atlas**: Already set up with connection string

### Step 1: Login to Heroku

```bash
heroku login
```

### Step 2: Create Heroku App

```bash
cd "C:\Users\tutys\Desktop\Rebook"
heroku create YOUR_APP_NAME
```

Replace `YOUR_APP_NAME` with something unique like `rebook-app-123`

### Step 3: Set Environment Variables

```bash
heroku config:set MONGODB_URI="mongodb+srv://Sooryaraj_bright:PASSWORD@rebookusers.8xpvxko.mongodb.net/rebook?appName=Rebookusers"
heroku config:set JWT_SECRET="your_super_secret_jwt_key_minimum_32_chars_12345678"
heroku config:set NODE_ENV="production"
```

Replace `PASSWORD` with your actual MongoDB password (URL-encoded if contains special chars)

### Step 4: Build Frontend

```bash
cd client
npm run build
cd ..
```

This creates optimized production build in `client/build/`

### Step 5: Commit Changes

```bash
git add .
git commit -m "Ready for production deployment"
```

### Step 6: Deploy to Heroku

```bash
git push heroku main
```

### Step 7: Monitor Deployment

```bash
heroku logs --tail
```

Watch for success message:
```
✅ MongoDB connected successfully
🚀 Rebook Server running on port 5000
```

### Step 8: Access Your App

Your app is now live at:
```
https://YOUR_APP_NAME.herokuapp.com
```

---

## Environment Variables Checklist

| Variable | Value | Example |
|----------|-------|----------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Strong random string (32+ chars) | Your JWT secret |
| `NODE_ENV` | Set to `production` | `production` |
| `PORT` | Auto-assigned by Heroku | (leave empty) |

---

## Troubleshooting

### Error: "Cannot find module 'react-scripts'"

**Solution**: Run build first
```bash
cd client && npm install && npm run build && cd ..
```

### Error: "MongoDB connection failed"

**Solution**: Check MONGODB_URI is correct
```bash
heroku config:get MONGODB_URI
```

### Error: "Port already in use"

**Solution**: Heroku assigns PORT automatically. Don't hardcode it.

### App crashes after deployment

**Solution**: Check logs
```bash
heroku logs --tail
```

---

## Production Checklist

✅ `.env` file created with all secrets
✅ `client/build/` directory created (`npm run build`)
✅ All environment variables set in Heroku
✅ MongoDB Atlas connection tested
✅ JWT_SECRET is strong (32+ characters)
✅ Frontend and backend running on same port
✅ CORS configured for production domain
✅ Committed changes to git

---

## Alternative Hosting Platforms

### Railway.app (Recommended for beginners)

1. Go to railway.app
2. Click "Deploy Now"
3. Connect GitHub
4. Select `rebook` repository
5. Add environment variables
6. Deploy

### DigitalOcean

1. Create Droplet (Ubuntu 20.04)
2. SSH into server
3. Install Node.js: `curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -`
4. Install PM2: `npm install -g pm2`
5. Clone repo: `git clone https://github.com/YOUR_USERNAME/rebook.git`
6. Install & build:
   ```bash
   cd rebook
   npm install
   cd client && npm run build && cd ..
   cd server && pm2 start server.js --name "rebook"
   ```
7. Setup domain with PM2 and Nginx

### AWS Elastic Beanstalk

1. Create EB application
2. Deploy: `eb deploy`
3. Set environment variables in EB console

---

## Performance Tips

1. **Enable Gzip compression**: Already in Helmet
2. **Use CDN**: Cloudflare free tier
3. **Monitor with uptime**: Use uptimerobot.com (free)
4. **Set up error tracking**: Sentry (free tier available)

---

## Support

For issues:
- Check `heroku logs --tail`
- Review MongoDB Atlas activity log
- Verify all environment variables are set
- Test locally first: `npm run dev`

**Your app is ready for production! 🚀**
