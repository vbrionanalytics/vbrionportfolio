# 🚀 vbrion Portfolio — Complete Production Hosting Guide

This guide provides instructions to host the **vbrion** portfolio on any server or cloud platform.

---

## 📋 Pre-Flight Checklist

- [x] **Frontend Production Build**: Tested & verified (`client/dist`).
- [x] **Backend Server**: Tested & verified with static client delivery (`server/src/server.js`).
- [x] **SMTP Email Dispatch**: Tested with `info@vbrion.com` via Gmail SMTP (verified live).
- [x] **Database Resiliency**: MongoDB connected + disk-based backup fallback active.
- [x] **Security**: Helmet, CORS dynamic origin matching, rate limiting enabled.

---

## 🛠️ Environment Variables for Server

Set these in your server's environment or in `server/.env`:

```env
PORT=5000
NODE_ENV=production

# Client Application URL (or domain where users access the site)
CLIENT_URL=https://vbrion.com,https://www.vbrion.com

# Database Connection (MongoDB Atlas URI or local MongoDB)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/vbrion_portfolio?retryWrites=true&w=majority

# Email Notification Settings
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@vbrion.com
SMTP_PASS=kdus wayw utsn kgzm

# Recipient Emails
COMPANY_EMAIL=info@vbrion.com
CONTACT_EMAIL=info@vbrion.com
SMTP_FROM="vbrion" <info@vbrion.com>

# Optional Gemini API Key (starts with AIzaSy... from Google AI Studio)
GEMINI_API_KEY=
```

---

## 🌐 Option 1: VPS / Ubuntu / AWS EC2 / DigitalOcean Droplet (Recommended)

### 1. Clone repository on the server
```bash
git clone <your-repo-url> /var/www/vbrion-portfolio
cd /var/www/vbrion-portfolio
```

### 2. Install dependencies & build client
```bash
# Install server & client packages
npm install --prefix server
npm install --prefix client

# Build production frontend
npm --prefix client run build
```

### 3. Setup Environment Variables
```bash
nano server/.env
# Paste the environment variables above and save (Ctrl+O, Enter, Ctrl+X)
```

### 4. Run with PM2 (Process Manager)
```bash
# Install PM2 globally if not already installed
npm install -g pm2

# Start application using pre-configured ecosystem file
pm2 start ecosystem.config.cjs

# Make PM2 restart automatically on server reboot
pm2 startup
pm2 save
```

### 5. Nginx Reverse Proxy Config (with SSL)
Create `/etc/nginx/sites-available/vbrion`:
```nginx
server {
    listen 80;
    server_name vbrion.com www.vbrion.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
Enable and get free SSL with Certbot:
```bash
sudo ln -s /etc/nginx/sites-available/vbrion /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d vbrion.com -d www.vbrion.com
```

---

## ☁️ Option 2: 1-Click Cloud Hosting (Render / Railway)

### On **Render.com**:
1. Connect your GitHub repository.
2. Select **Web Service**.
3. Settings:
   - **Environment**: Node
   - **Build Command**: `npm install --prefix server && npm install --prefix client && npm --prefix client run build`
   - **Start Command**: `node server/src/server.js`
4. Add the Environment Variables under **Environment** tab.
5. Deploy!

### On **Railway.app**:
1. Deploy from GitHub repo.
2. Set Build Command: `npm run install:all && npm run build`
3. Set Start Command: `npm start`
4. Set Environment Variables in dashboard.

---

## 🐳 Option 3: Docker Deployment

Use the included multi-stage `Dockerfile`:

```bash
# 1. Build Docker image
docker build -t vbrion-portfolio:latest .

# 2. Run container
docker run -d \
  -p 5000:5000 \
  --name vbrion-app \
  --env-file server/.env \
  --restart unless-stopped \
  vbrion-portfolio:latest
```

---

## 🔍 Verification Endpoints After Hosting

Once hosted at your domain (e.g. `https://vbrion.com`):

- **Homepage**: `https://vbrion.com/` (delivers React SPA)
- **Health Check**: `https://vbrion.com/api/health`
- **Contact API**: `POST https://vbrion.com/api/contact`
- **CTA Tracker**: `POST https://vbrion.com/api/cta`
- **AI Chatbot**: `POST https://vbrion.com/api/ai/chat`
