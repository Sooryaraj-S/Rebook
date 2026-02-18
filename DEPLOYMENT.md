# Deployment Guide - Rebook

## 🚀 Deployment Options

### Quick Comparison

| Platform | Backend | Frontend | Difficulty | Cost |
|----------|---------|----------|-----------|------|
| **Heroku** | ✅ Easy | ✅ Easy | ⭐ Easy | $ Free tier available |
| **AWS** | ✅ Moderate | ✅ Moderate | ⭐⭐⭐ Moderate | $$ Pay as you go |
| **DigitalOcean** | ✅ Easy | ✅ Easy | ⭐⭐ Easy | $ $5/month cheapest |
| **Vercel** | ❌ Not ideal | ✅ Best | ⭐ Very Easy | $ Free tier |
| **Netlify** | ❌ Not ideal | ✅ Good | ⭐ Easy | $ Free tier |
| **Railway** | ✅ Easy | ✅ Easy | ⭐ Easy | $ $5/month |

---

## 🌐 Recommended: DigitalOcean (Full Stack)

### Why DigitalOcean?
- ✅ One platform for everything (backend, frontend, database)
- ✅ Affordable ($5/month for app)
- ✅ Great documentation
- ✅ Direct SSH access
- ✅ Automatic backups

### Setup Steps

#### Step 1: Create Droplet

1. Go to [DigitalOcean.com](https://www.digitalocean.com)
2. Create account
3. Create new Droplet:
   - Image: Ubuntu 20.04 LTS
   - Size: Basic ($5/month)
   - Region: Closest to users
4. Add SSH key
5. Click Create

#### Step 2: Connect & Install

```bash
# SSH into droplet
ssh root@your_droplet_ip

# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
apt install -y nodejs

# Install MongoDB
apt install -y mongodb

# Install Git
apt install -y git

# Install Nginx (reverse proxy)
apt install -y nginx

# Start MongoDB
systemctl start mongodb
systemctl enable mongodb
```

#### Step 3: Deploy Backend

```bash
# Clone or upload repository
cd /var/www
git clone <your-repo-url>
cd Rebook/server

# Install dependencies
npm install

# Create .env
nano .env
# Add content:
# MONGODB_URI=mongodb://localhost:27017/rebook
# JWT_SECRET=<generate-secure-key>
# PORT=5000
# NODE_ENV=production

# Install PM2 for process management
npm install -g pm2

# Start with PM2
pm2 start server.js --name "rebook-backend"
pm2 startup
pm2 save
```

#### Step 4: Deploy Frontend

```bash
# Build React
cd /var/www/Rebook/client
npm install
npm run build

# Configure Nginx
nano /etc/nginx/sites-available/default
```

**Add Nginx configuration:**
```nginx
upstream backend {
    server 127.0.0.1:5000;
}

server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name your_domain_or_ip;
    
    # Frontend
    location / {
        root /var/www/Rebook/client/build;
        try_files $uri $uri/ /index.html;
    }

    # API proxy to backend
    location /api {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css text/javascript application/json application/javascript;
}
```

```bash
# Test and enable Nginx config
nginx -t
systemctl reload nginx
```

#### Step 5: Setup SSL (Free with Let's Encrypt)

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get free certificate
certbot --nginx -d your_domain.com

# Test auto-renewal
certbot renew --dry-run
```

---

## 🚀 Alternative: Heroku Deployment

### Backend Deployment

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create rebook-app-name

# Create MongoDB Atlas cluster
# https://www.mongodb.com/cloud/atlas

# Set environment variables
heroku config:set MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/rebook
heroku config:set JWT_SECRET=your-secure-secret-key
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

**Add Procfile in server directory:**
```
web: node server.js
```

### Frontend Deployment to Vercel

```bash
# Assuming frontend is in separate GitHub repo

# Go to https://vercel.com
# Connect GitHub account
# Select repo
# Configure:
#   Build command: npm run build
#   Output directory: build

# Set environment variable
REACT_APP_API_URL=https://rebook-app-name.herokuapp.com/api

# Deploy (automatic on push to main)
```

---

## 🔐 Production Checklist

### Security
- [ ] Change JWT_SECRET to long random string
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS/SSL certificate
- [ ] Configure strong database password
- [ ] Setup automated backups
- [ ] Review CORS origins
- [ ] Enable rate limiting for production
- [ ] Monitor application logs

### Performance
- [ ] Enable Gzip compression
- [ ] Setup CDN for static assets
- [ ] Optimize images
- [ ] Enable database indexing
- [ ] Setup caching headers
- [ ] Monitor database performance
- [ ] Load test the application

### Maintenance
- [ ] Setup monitoring/alerting
- [ ] Configure error tracking (e.g., Sentry)
- [ ] Setup automated backups
- [ ] Plan update/patching strategy
- [ ] Document deployment process
- [ ] Setup CI/CD pipeline

### Scaling
- [ ] Setup load balancer
- [ ] Database replication/sharding
- [ ] CDN for static content
- [ ] Redis for caching (optional)
- [ ] Monitoring and metrics

---

## 📊 Database Backup Strategy

### Manual Backup (MongoDB Atlas)

1. Go to MongoDB Atlas Dashboard
2. Select Cluster > Backup
3. Click "Take a Snapshot"
4. Wait for backup to complete
5. Store backup securely

### Automated Backup (Recommended)

```bash
# DigitalOcean managed databases include automatic backups

# Or use cron job for manual backups:
0 3 * * * /usr/local/bin/mongodump --uri="mongodb://localhost:27017" --gzip --out=/var/backups/mongodb
```

### Restore from Backup

```bash
mongorestore --gzip --archive=/path/to/backup.archive
```

---

## 🔍 Monitoring

### Server Monitoring

```bash
# Install Netdata (free monitoring)
wget -O /tmp/netdata-kickstart.sh https://get.netdata.cloud/kickstart.sh
sh /tmp/netdata-kickstart.sh --stable-channel --disable-telemetry

# Access on http://your_server:19999
```

### Application Monitoring (Optional)

**Setup Sentry for error tracking:**

1. Go to https://sentry.io
2. Create account
3. Add both frontend and backend

**Backend:**
```bash
npm install @sentry/node

# Add to server.js
const Sentry = require("@sentry/node");
Sentry.init({
  dsn: "your-sentry-dsn",
  tracesSampleRate: 1.0
});
```

**Frontend:**
```bash
npm install @sentry/react

# Add to index.js
import * as Sentry from "@sentry/react";
Sentry.init({
  dsn: "your-sentry-dsn",
  tracesSampleRate: 1.0
});
```

---

## 🚦 CI/CD with GitHub Actions

**Create `.github/workflows/deploy.yml`:**

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to server
        env:
          SSH_KEY: ${{ secrets.SSH_KEY }}
          SERVER_IP: ${{ secrets.SERVER_IP }}
        run: |
          mkdir -p ~/.ssh
          echo "$SSH_KEY" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan -H $SERVER_IP >> ~/.ssh/known_hosts
          ssh root@$SERVER_IP 'cd /var/www/Rebook && git pull && npm install && npm run build && pm2 restart all'
```

---

## 📈 Scaling for Growth

### Stage 1: Initial Launch (Current)
- Single server (VPS)
- Single MongoDB instance
- Direct connection

### Stage 2: 1K-10K Users
```
Diagram:
[Frontend] → [CDN]
[Backend] ← [Nginx Proxy]
[Database] ← [MongoDB with Replication]
```

- Add CDN for static files
- Implement database replication
- Add caching layer (Redis)

### Stage 3: 10K+ Users
```
[CDN] ← [Multiple Frontend Servers]
[Nginx Load Balancer] ← [Multiple Backend Servers]
[MongoDB Sharded Cluster] ← [Geo-distributed]
[Redis Cluster] ← [Caching]
```

- Load balancing
- Database sharding
- Cache clusters
- Geo-distribution

---

## 💾 Disaster Recovery

### Backup Schedule
- Daily automated backups
- Weekly full database backup
- Monthly archived backup (3 months retention)

### Recovery Time Objectives (RTO)
- Target: 1 hour downtime
- Backup test: Monthly
- Documentation: Current

### Tested Recovery Procedures
- Database restore: Monthly
- Full system restore: Quarterly
- Document all procedures

---

## 🔧 Troubleshooting Deployments

### Issue: Deployment fails

```bash
# Check logs
heroku logs -t  # Heroku
journalctl -u rebook -n 50  # SystemD

# Restart service
pm2 restart rebook-backend  # PM2
systemctl restart rebook  # SystemD

# Rebuild
npm run build
```

### Issue: Database connection error

```bash
# Verify connection string
echo $MONGODB_URI

# Test connection
mongo $MONGODB_URI

# Check network access
curl -I $MONGODB_URI
```

### Issue: CORS errors in production

```javascript
// Update cors configuration
const allowedOrigins = [
  'https://yourdomain.com',
  'https://www.yourdomain.com'
];

app.use(cors({
  origin: allowedOrigins
}));
```

---

## 📋 Post-Deployment

### Testing
- [ ] Test all features
- [ ] Test on mobile
- [ ] Test all languages
- [ ] Load test with 100 concurrent users
- [ ] Security scan

### Monitoring
- [ ] Setup error alerts
- [ ] Setup performance alerts
- [ ] Monitor database usage
- [ ] Check application logs daily

### Updates
- [ ] Plan regular security updates
- [ ] Monitor npm vulnerabilities
- [ ] Schedule maintenance windows
- [ ] Document changes

---

## 📞 Support Resources

### DigitalOcean
- Docs: https://docs.digitalocean.com/
- Community: https://www.digitalocean.com/community

### Heroku
- Docs: https://devcenter.heroku.com/
- Support: https://help.heroku.com/

### MongoDB Atlas
- Docs: https://docs.atlas.mongodb.com/
- Support: https://www.mongodb.com/support

---

**© 2026 Rebook. All Rights Reserved.**  
**Developed by Sooryaraj**
