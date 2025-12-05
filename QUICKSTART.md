# Quick Start Guide

## Prerequisites Check
```bash
node --version  # Should be 18+
npm --version   # Should be 9+
```

## Installation (5 minutes)

### Step 1: Clone the Repository
```bash
git clone https://github.com/Ojukwu12/my-calculator.git
cd my-calculator
```

### Step 2: Setup Backend
```bash
cd backend
npm install
cp .env.example .env
```

### Step 3: Setup Frontend
```bash
cd ../frontend
npm install
cp .env.example .env
cd ..
```

## Running the Application

### Option 1: Development Mode (Recommended for testing)

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend running at: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Frontend running at: http://localhost:3000

### Option 2: Docker (Easiest for production)

```bash
docker-compose up --build
```
✅ Both services running!
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Testing

### Run Backend Tests
```bash
cd backend
npm test
```

Expected output: All tests passing with 80%+ coverage

## Using the Calculator

1. Open http://localhost:3000 in your browser
2. Click buttons or use your keyboard:
   - Numbers: 0-9
   - Operators: +, -, *, /, %, ^
   - Calculate: Enter or =
   - Clear: Escape or C
   - Decimal: .

## Troubleshooting

### Port Already in Use
```bash
# Backend (port 5000)
lsof -ti:5000 | xargs kill -9

# Frontend (port 3000)
lsof -ti:3000 | xargs kill -9
```

### Dependencies Issues
```bash
# Clean and reinstall
cd backend && rm -rf node_modules package-lock.json && npm install
cd ../frontend && rm -rf node_modules package-lock.json && npm install
```

### TypeScript Errors
```bash
# Rebuild TypeScript
cd backend && npm run build
cd ../frontend && npm run build
```

## API Testing with curl

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Calculate Expression
```bash
curl -X POST http://localhost:5000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"expression":"2+3*4"}'
```

## Next Steps

- Read the full README.md for comprehensive documentation
- Check the test files for usage examples
- Explore the modular architecture for customization
- Plan AI integration features (architecture is ready!)

## Support

Having issues? Check:
1. Node.js version (must be 18+)
2. Port availability (5000 and 3000)
3. Environment variables (.env files)
4. GitHub Issues: https://github.com/Ojukwu12/my-calculator/issues

---

**Happy Coding! 🚀**
