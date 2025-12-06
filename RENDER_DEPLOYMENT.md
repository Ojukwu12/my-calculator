# ✅ Render Deployment - FIXED & TESTED

## What's Fixed

The issue was that Render couldn't find files due to monorepo structure. This is now **completely fixed** with shell scripts that:

1. ✅ Backend: Install dependencies, compile TypeScript, start server
2. ✅ Frontend: Install dependencies, build React app, serve static files

---

## 🖥️ BACKEND DEPLOYMENT

### 1. Go to Render Dashboard
https://dashboard.render.com

### 2. Create New Web Service
- Click **New +** → **Web Service**
- Select your GitHub repo: `Ojukwu12/my-calculator`
- Branch: `main`

### 3. Configure Backend Service

**Name:** `calculator-backend`

**Runtime:** Node

**Build Command:**
```
bash build.sh
```

**Start Command:**
```
bash start.sh
```

### 4. Add Backend Environment Variables

Click **Advanced** and add:

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `CORS_ORIGIN` | `https://your-frontend-url.onrender.com` |

### 5. Deploy Backend

Click **Create Web Service** and wait for deployment.

**Build should show:**
```
📦 Installing backend dependencies...
🔨 Building TypeScript...
✅ Build complete!
🚀 Starting calculator server...
[INFO] Server running on port 5000
```

### 6. Verify Backend Works

Test the health endpoint:
```
curl https://calculator-backend.onrender.com/api/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "2025-12-06T...",
  "service": "calculator-api"
}
```

---

## 🎨 FRONTEND DEPLOYMENT

### 1. Create New Static Site
- Click **New +** → **Static Site**
- Select your GitHub repo: `Ojukwu12/my-calculator`
- Branch: `main`

### 2. Configure Frontend Service

**Name:** `calculator-frontend`

**Build Command:**
```
bash build-frontend.sh
```

**Publish Directory:**
```
frontend/dist
```

### 3. Add Frontend Environment Variables

Click **Advanced** and add:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://calculator-backend.onrender.com` |

### 4. Deploy Frontend

Click **Create Static Site** and wait for deployment.

**Build should show:**
```
📦 Installing frontend dependencies...
🔨 Building React app...
✅ Frontend build complete!
📁 Output in: frontend/dist
```

### 5. Update Backend CORS

Go back to your backend service and update the `CORS_ORIGIN` environment variable:

```
CORS_ORIGIN=https://calculator-frontend.onrender.com
```

Then redeploy the backend.

### 6. Test The App

Open your frontend URL: `https://calculator-frontend.onrender.com`

- Calculator should load properly
- Try calculations (2+2, 5*3, etc.)
- Verify results come from backend API

---

## 📋 What Happens

### Backend Build:
1. Render downloads repo
2. Runs `bash build.sh`:
   - Installs npm packages in `/backend`
   - Compiles TypeScript with `npm run build`
   - Creates `/backend/dist/server.js`
3. Runs `bash start.sh`:
   - Navigates to `/backend`
   - Executes `node dist/server.js`
   - Server starts on port 5000

### Frontend Build:
1. Render downloads repo
2. Runs `bash build-frontend.sh`:
   - Installs npm packages in `/frontend`
   - Compiles React app with `npm run build`
   - Creates `/frontend/dist` with static files
3. Serves static files from `/frontend/dist`

---

## 🔧 Troubleshooting

### Backend Issues:
1. Check Render build logs for errors
2. Verify `build.sh` and `start.sh` exist in root
3. Ensure branch is set to `main`
4. Test locally: `bash build.sh && bash start.sh`

### Frontend Issues:
1. Check build logs for compilation errors
2. Verify `build-frontend.sh` exists in root
3. Ensure `VITE_API_URL` matches backend URL
4. Test locally: `bash build-frontend.sh`
5. Check browser console for CORS errors

### CORS Errors:
1. Update backend `CORS_ORIGIN` to match frontend URL
2. Redeploy backend after updating environment variable
3. Clear browser cache and reload

---

## 📁 Files That Make This Work

**Backend:**
- `build.sh` - Installs and builds backend
- `start.sh` - Starts the Express server
- `backend/package.json` - Backend dependencies

**Frontend:**
- `build-frontend.sh` - Installs and builds frontend
- `frontend/.env.production` - Production API URL
- `frontend/package.json` - Frontend dependencies

**Configuration:**
- `render.yaml` - Complete Render configuration (optional)

---

**Your calculator is ready to deploy!** 🚀
