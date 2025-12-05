# AI Integration Setup Guide

## Getting Started with Gemini 2.5 Flash AI

The calculator now includes full AI integration with Google's Gemini 2.5 Flash model. Follow these steps to enable AI features.

### Step 1: Get Your Gemini API Key

1. **Visit Google AI Studio**
   - Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account

2. **Create an API Key**
   - Click "Create API key"
   - Select "Create API key in new Google Cloud project"
   - Copy your API key

### Step 2: Configure Backend Environment

1. **Open backend .env file**
   ```bash
   cd backend
   nano .env  # or vim, code, etc.
   ```

2. **Add your API key**
   ```env
   PORT=5000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Save the file**

### Step 3: Install Dependencies

```bash
cd backend
npm install
```

The package.json already includes `@google/generative-ai`. If needed, install manually:

```bash
npm install @google/generative-ai
```

### Step 4: Run the Application

**Backend (with AI enabled):**
```bash
cd backend
npm run dev
```

You should see:
```
[timestamp] INFO: Server running on port 5000
[timestamp] INFO: Gemini AI service initialized
```

**Frontend (in another terminal):**
```bash
cd frontend
npm run dev
```

### Step 5: Test AI Features

1. **Open calculator** at http://localhost:3000
2. **Perform a calculation** (e.g., `2 + 3 * 4`)
3. **Press "="** to calculate
4. **Click "Explain"** button to get AI explanation
5. **Click "Learn"** button to get learning resources

### AI Features Available

#### 💡 Explain Feature
- Breaks down how the calculation was performed
- Explains mathematical rules used (e.g., order of operations)
- Provides educational context

**Backend Endpoint:**
```bash
POST /api/ai/explain
Content-Type: application/json

{
  "expression": "2 + 3 * 4",
  "result": 14
}
```

#### 📚 Learn Feature
- Identifies the main math concept in the expression
- Suggests relevant learning topics
- Recommends study areas

**Backend Endpoint:**
```bash
POST /api/ai/suggest-resources
Content-Type: application/json

{
  "expression": "2 + 3 * 4"
}
```

### Troubleshooting

#### "AI service is not configured" Error
**Problem:** GEMINI_API_KEY not found
**Solution:**
1. Verify `.env` file in backend directory
2. Ensure `GEMINI_API_KEY=` line exists
3. Add your actual API key
4. Restart backend server

#### "Failed to generate explanation"
**Problem:** API quota exceeded or network issue
**Solution:**
1. Check your API key is valid
2. Verify internet connection
3. Check Google Cloud API quotas
4. Restart the application

#### Slow AI Responses
**Problem:** Gemini API taking time to respond
**Solution:**
- Gemini 2.5 Flash is very fast (usually <2 seconds)
- If slower, check network connection
- Ensure backend is running properly

#### AI Buttons Not Appearing
**Problem:** Buttons don't show after calculation
**Solution:**
1. Make sure you have a valid result (no errors)
2. Check browser console for errors (F12)
3. Verify backend is running
4. Try refreshing the page

### Advanced Configuration

#### Custom AI Prompts
Edit prompts in `/backend/src/utils/ai.service.ts`:

```typescript
// Example: Modify explanation prompt
static async explainCalculation(expression: string, result: number | string): Promise<string> {
  const prompt = `Your custom prompt here...`;
  // ...
}
```

#### Rate Limiting
Add rate limiting to AI endpoints in `/backend/src/server.ts` if needed for production.

#### Caching
Consider caching AI responses for identical expressions to improve performance:

```typescript
const responseCache = new Map<string, string>();

static async explainCalculation(expression: string, result: number | string): Promise<string> {
  const cacheKey = `${expression}:${result}`;
  
  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey)!;
  }
  
  // ... generate response ...
  
  responseCache.set(cacheKey, explanation);
  return explanation;
}
```

### API Pricing

**Google Gemini 2.5 Flash:**
- Free tier available with rate limits
- Check [Google AI Pricing](https://ai.google.dev/pricing) for details
- Excellent for development and learning

### Branch Information

**AI Implementation Location:**
- Branch: `calculator-with-ai`
- Full working implementation with Gemini 2.5 Flash
- Ready for production deployment

### Next Steps

1. ✅ Get API key
2. ✅ Configure environment
3. ✅ Test locally
4. ✅ Deploy to production (Docker ready!)

### Support

- **Google AI Documentation:** https://ai.google.dev/docs
- **Gemini API Reference:** https://ai.google.dev/api/rest
- **GitHub Issues:** Report issues in repository

---

**Happy Explaining! 🤖✨**
