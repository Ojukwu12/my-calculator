import { Router } from 'express';
import { CalculatorController } from '../controllers/calculator.controller';
import { AIController } from '../controllers/ai.controller';

const router = Router();

// Main calculation endpoint
router.post('/calculate', CalculatorController.calculate);

// Health check endpoint
router.get('/health', CalculatorController.health);

// AI endpoints
router.post('/ai/explain', AIController.explain);
router.post('/ai/suggest-resources', AIController.suggestResources);

export default router;
