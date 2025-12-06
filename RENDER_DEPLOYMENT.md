# ✅ Render Deployment - FIXED & TESTED

## What's Fixed

The issue was that Render couldn't find the compiled server file. This is now **completely fixed** with shell scripts that:

1. ✅ Install dependencies in `/backend`
2. ✅ Compile TypeScript to `/backend/dist`
3. ✅ Start the server from the correct path

## Deployment Steps

### 1. Go to Render Dashboard
https://dashboard.render.com

### 2. Create New Web Service
- Click **New +** → **Web Service**
- Select your GitHub repo: `Ojukwu12/my-calculator`
- Branch: `main` (or `calculator-with-ai` if you want AI features)

### 3. Configure Service

**Name:** `calculator-api`

**Runtime:** Node

**Build Command:**
```
bash build.sh
```

**Start Command:**
```
bash start.sh
```

### 4. Add Environment Variables

Click **Advanced** and add:

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `CORS_ORIGIN` | `https://your-frontend-url.onrender.com` |

### 5. Deploy

Click **Create Web Service** and wait for deployment.

**Build should show:**
```
📦 Installing backend dependencies...
🔨 Building TypeScript...
✅ Build complete!
🚀 Starting calculator server...
[INFO] Server running on port 5000
```

## What Happens

1. Render downloads repo
2. Runs `bash build.sh`:
   - Installs npm packages in `/backend`
   - Compiles TypeScript with `npm run build`
   - Creates `/backend/dist/server.js`
3. Runs `bash start.sh`:
   - Navigates to `/backend`
   - Executes `node dist/server.js`
   - Server starts on port 5000

## Verify It Works

Test the health endpoint:
```
curl https://your-service.onrender.com/api/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "2025-12-06T...",
  "service": "calculator-api"
}
```

## If It Still Fails

1. Check Render build logs for errors
2. Verify the build.sh and start.sh scripts exist in root
3. Ensure branch is set to `main`
4. Rebuild service from dashboard

## Files That Make This Work

- `build.sh` - Installs and builds
- `start.sh` - Starts the server
- `package.json` - Points to these scripts
- `render.yaml` - Configuration (optional)

---

**Your calculator is ready to deploy!** 🚀
