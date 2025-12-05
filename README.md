# Production Calculator

A production-ready full-stack calculator web application built with React, TypeScript, Node.js, and Express. Features a modern UI with keyboard support, comprehensive error handling, and an architecture designed for future AI integration.

![Calculator Demo](https://img.shields.io/badge/Status-Production%20Ready-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933)

## 🚀 Features

### Frontend
- ✨ **Modern React UI** with functional components and TypeScript
- 🎨 **Responsive Design** optimized for desktop and mobile
- ⌨️ **Keyboard Support** for all calculator operations
- ✅ **Input Validation** prevents invalid operations
- 🛡️ **Error Handling** with clear user feedback
- 📱 **Mobile-First** design with touch-friendly buttons
- 🎯 **Modular Architecture** ready for AI feature extensions

### Backend
- 🔒 **Safe Expression Evaluation** using mathjs (no `eval()`)
- 📡 **RESTful API** with Express and TypeScript
- 🧪 **Comprehensive Testing** with Jest (80%+ coverage)
- 📝 **Error Logging** for debugging and monitoring
- 🏗️ **Modular Structure** separating concerns (controllers, routes, utils)
- 🔌 **AI-Ready Architecture** with placeholder for future AI endpoints

### Operations Supported
- Basic arithmetic: `+`, `-`, `*`, `/`
- Advanced operations: `%` (modulo), `^` (power)
- Decimal numbers and complex expressions
- Parentheses for operation precedence

## 📋 Prerequisites

- **Node.js** 18 or higher
- **npm** 9 or higher
- **Docker** (optional, for containerization)
- **Git** for version control

## 🛠️ Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/Ojukwu12/my-calculator.git
cd my-calculator
```

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` file if needed:
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend Setup

```bash
cd ../frontend
npm install
cp .env.example .env
```

Edit `.env` file if needed:
```env
VITE_API_URL=http://localhost:5000
```

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:3000

### Production Mode

**Build Backend:**
```bash
cd backend
npm run build
npm start
```

**Build Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```bash
docker-compose up --build
```

This starts both frontend and backend services:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Using Docker (Backend Only)

```bash
docker build -t calculator-app .
docker run -p 5000:5000 calculator-app
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test                 # Run tests once
npm run test:watch      # Run tests in watch mode
```

The test suite includes:
- ✅ Unit tests for calculator logic
- ✅ API endpoint tests
- ✅ Edge case handling (divide by zero, invalid input)
- ✅ Complex expression validation
- ✅ Error handling verification

### Test Coverage

```bash
cd backend
npm test -- --coverage
```

Target coverage: 80%+ across all metrics (branches, functions, lines, statements)

## 📁 Project Structure

```
my-calculator/
├── backend/
│   ├── src/
│   │   ├── __tests__/          # Test files
│   │   │   ├── calculator.test.ts
│   │   │   └── api.test.ts
│   │   ├── controllers/        # Request handlers
│   │   │   └── calculator.controller.ts
│   │   ├── routes/             # API routes
│   │   │   └── index.ts
│   │   ├── types/              # TypeScript interfaces
│   │   │   └── index.ts
│   │   ├── utils/              # Utilities
│   │   │   ├── calculator.ts
│   │   │   └── errorHandler.ts
│   │   └── server.ts           # Express app
│   ├── package.json
│   ├── tsconfig.json
│   └── jest.config.js
│
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── Calculator.tsx
│   │   │   ├── Display.tsx
│   │   │   ├── Button.tsx
│   │   │   └── ButtonGrid.tsx
│   │   ├── hooks/              # Custom hooks
│   │   │   └── useCalculator.ts
│   │   ├── services/           # API calls
│   │   │   └── api.ts
│   │   ├── styles/             # CSS modules
│   │   │   ├── index.css
│   │   │   ├── App.css
│   │   │   ├── Calculator.css
│   │   │   ├── Display.css
│   │   │   ├── Button.css
│   │   │   └── ButtonGrid.css
│   │   ├── types/              # TypeScript types
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── Dockerfile
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 🎯 API Endpoints

### POST /api/calculate
Calculate a mathematical expression.

**Request:**
```json
{
  "expression": "2 + 3 * 4"
}
```

**Success Response:**
```json
{
  "result": 14,
  "expression": "2 + 3 * 4"
}
```

**Error Response:**
```json
{
  "error": "Cannot divide by zero"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-05T10:30:00.000Z",
  "service": "calculator-api"
}
```

## 🔮 Future AI Integration

The application is architected to support future AI features without breaking existing functionality:

### Backend AI Extension Points
```typescript
// Placeholder in routes/index.ts
router.post('/ai-explain', AIController.explain);
router.post('/ai-suggest-resources', AIController.suggestResources);
```

### Frontend AI Support
- State management ready for AI explanations
- Display component can show learning resources
- Service layer prepared for AI API calls

### Potential AI Features
- 📚 **Explain Calculations**: Natural language explanation of results
- 🎓 **Learning Resources**: Suggest relevant math tutorials
- 🤖 **Smart Suggestions**: Recommend related calculations
- 📊 **Step-by-Step Solutions**: Break down complex expressions

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0-9` | Number input |
| `+` `-` `*` `/` | Operators |
| `%` | Modulo |
| `^` | Power |
| `.` | Decimal point |
| `Enter` or `=` | Calculate |
| `Escape` or `C` | Clear |

## 🛡️ Error Handling

The application handles various error scenarios:

- ❌ Division by zero
- ❌ Invalid expressions
- ❌ Forbidden characters (security)
- ❌ Empty input
- ❌ Network errors
- ❌ Malformed requests

## 🏗️ Architecture Decisions

### Backend
- **mathjs** for safe expression evaluation (prevents code injection)
- **Express** for robust API framework
- **TypeScript** for type safety and better developer experience
- **Jest + Supertest** for comprehensive testing
- **Modular design** separating routes, controllers, and business logic

### Frontend
- **React 18** with functional components and hooks
- **Vite** for fast development and optimized builds
- **Custom hooks** for calculator logic separation
- **CSS Modules** for component-scoped styling
- **Axios** for API communication

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `CORS_ORIGIN`: Allowed CORS origin

**Frontend (.env):**
- `VITE_API_URL`: Backend API URL

## 📦 Build & Deployment

### Production Build

**Backend:**
```bash
cd backend
npm run build
# Output in dist/
```

**Frontend:**
```bash
cd frontend
npm run build
# Output in dist/
```

### Deployment Options

1. **Docker**: Use provided Dockerfile and docker-compose.yml
2. **Cloud Platforms**: Deploy to AWS, Azure, Google Cloud, Heroku, etc.
3. **Static Hosting**: Frontend can be hosted on Netlify, Vercel, etc.
4. **Node Hosting**: Backend on any Node.js hosting service

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Ojukwu12**
- GitHub: [@Ojukwu12](https://github.com/Ojukwu12)

## 🙏 Acknowledgments

- Built with ❤️ using React, TypeScript, and Express
- Powered by mathjs for safe mathematical operations
- UI inspired by modern calculator designs

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact via GitHub profile

---

**Happy Calculating! 🧮✨**