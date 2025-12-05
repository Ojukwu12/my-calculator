import { Router } from 'express';
import { CalculatorController } from '../controllers/calculator.controller';

const router = Router();

// Main calculation endpoint
router.post('/calculate', CalculatorController.calculate);

// Health check endpoint
router.get('/health', CalculatorController.health);

// Placeholder for future AI endpoints (not implemented yet)
// router.post('/ai-explain', AIController.explain);
// router.post('/ai-suggest-resources', AIController.suggestResources);

export default router;
