import axios from 'axios';
import { FoodTruck } from '../../src/types/foodTruck';
import { ValidationError } from '../../src/types/validationError';

const BASE_URL = 'http://localhost:5000/api/MobileFoodTrucks';

describe('GET /searchByStreet', () => {
  it('should return status code 200 if food trucks street matching the applicant', async () => {
    const response = await axios.get<FoodTruck[]>(`${BASE_URL}/searchByStreet`, {
      params: { street: '3750 18TH ST' },
    });

    expect(response.status).toBe(200);
    expect(response.data.length).toBe(1);
    response.data.forEach(truck => {
      expect(truck.address).toMatch(/3750 18TH ST/i);
      expect(truck).toHaveProperty('id');
    });
  });

  it('should return response body with all expected properties', async () => {
    const response = await axios.get<FoodTruck[]>(`${BASE_URL}/searchByStreet`, {
      params: { street: '3750 18TH ST' },
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

  it('should return status code 200 empty array when no match found', async () => {
    const response = await axios.get<FoodTruck[]>(`${BASE_URL}/searchByStreet`, {
      params: { street: 'Xablau' },
    });

    expect(response.status).toBe(200);
    expect(response.data).toEqual([]);
  });

  it('should return status code 405 when use method not allowed', async () => {
    const response = await axios.post(`${BASE_URL}/searchByStreet`, { street: '3750 18TH ST' }, {
      validateStatus: () => true
    });
  
    expect(response.status).toBe(405);
  });

  it('should return status code 400 when is not using the required parameter', async () => {
    const response = await axios.get(`${BASE_URL}/searchByStreet`, {
      validateStatus: () => true
    });
  
    expect(response.status).toEqual(400);
    expect(response.data).toHaveProperty('traceId')
    
    const errorData = response.data as ValidationError;

    expect(errorData.errors['street']).toContain('The street field is required.');
  });
});
