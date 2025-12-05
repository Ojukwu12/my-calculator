import axios from 'axios';
import { CalculateResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const calculatorApi = {
  /**
   * Sends a calculation request to the backend
   */
  async calculate(expression: string): Promise<CalculateResponse> {
    try {
      const response = await axios.post<CalculateResponse>(
        `${API_URL}/api/calculate`,
        { expression },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      }
      throw new Error('Network error: Unable to connect to the calculator service');
    }
  },

  /**
   * Health check endpoint
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${API_URL}/api/health`);
      return response.status === 200;
    } catch {
      return false;
    }
  },
};
