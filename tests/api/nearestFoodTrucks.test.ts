import axios from 'axios';
import { FoodTruck } from '../../src/types/foodTruck';
import { ValidationError } from '../../src/types/validationError';

const BASE_URL = 'http://localhost:5000/api/MobileFoodTrucks';

describe('GET /nearestFoodTrucks', () => {
  it('should return status code 200 and food trucks list with status REQUESTED', async () => {
    const response = await axios.get<FoodTruck[]>(`${BASE_URL}/nearestFoodTrucks`, {
      params: { status: 'REQUESTED' },
    });

    expect(response.status).toBe(200);
    response.data.forEach(truck => {
      expect(truck.status).toMatch(/REQUESTED/i);
      expect(truck).toHaveProperty('id');
    });
  });

  it('should return response body with all expected properties', async () => {
    const response = await axios.get<FoodTruck[]>(`${BASE_URL}/nearestFoodTrucks`, {
      params: { status: 'APPROVED' },
    });

    expect(response.status).toBe(200);
    response.data.forEach(truck => {
      expect(typeof truck.id).toBe('number');
      expect(typeof truck.applicant).toBe('string');
      expect(typeof truck.facilityType).toBe('string');
      expect(typeof truck.status).toBe('string');
      expect(typeof truck.foodItems).toBe('string');
      expect(typeof truck.address).toBe('string');
      expect(typeof truck.latitude).toBe('number');
      expect(typeof truck.longitude).toBe('number');
    });
  });

  it('should return status code 200 empty array when invalid status filled', async () => {
    const response = await axios.get<FoodTruck[]>(`${BASE_URL}/nearestFoodTrucks`, {
      params: { status: 'OFFLINE' },
    });

    expect(response.status).toBe(200);
    expect(response.data).toEqual([]);
  });

  it('should return status code 405 when use method not allowed', async () => {
    const response = await axios.post(`${BASE_URL}/nearestFoodTrucks`, { status: 'APPROVED' }, {
      validateStatus: () => true
    });
  
    expect(response.status).toBe(405);
  });

  it('should return status code 400 when is not using the required parameter', async () => {
    const response = await axios.get(`${BASE_URL}/nearestFoodTrucks`, { params: {
      latitude: 37.7749,
      longitude: 'string',
      status: 'APPROVED'
    },
    validateStatus: () => true
  });
  
    expect(response.status).toEqual(400);
    expect(response.data).toHaveProperty('traceId')
    
    const errorData = response.data as ValidationError;

    expect(errorData.errors['longitude']).toContain("The value 'string' is not valid.");
  });
});
