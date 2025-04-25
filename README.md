# 🍔 Food Truck API Testing Project

This project contains automated **API tests** for a ASP.NET-based Food Truck API.  
The tests are written in **TypeScript**, using **Axios** for HTTP requests and **Jest** as the test runner.

---

## 📌 Tested Endpoints

### 1. `GET /searchByName`

| Status   |  Scenario   |
|----------|-------------|
| ✅ Status Code 200 | Should return status code 200 if food trucks matching the applicant |
| ✅ Status Code 200 | Should return response body with all expected properties |
| ⚠️ Status Code 200 | Should return status code 200 empty array when no match found |
| ❌ Status Code 405 | Should return status code 405 when use method not allowed |
| ❌ Status Code 400 | Should return status code 400 when is not using the required parameter |

---

### 2. `GET /searchByStreet`

| Status   |  Scenario   |
|----------|-------------|
| ✅ Status Code 200 | Should return status code 200 if food trucks matching the applicant |
| ✅ Status Code 200 | Should return response body with all expected properties |
| ⚠️ Status Code 200 | Should return status code 200 empty array when no match found |
| ❌ Status Code 405 | Should return status code 405 when use method not allowed |
| ❌ Status Code 400 | Should return status code 400 when is not using the required parameter |

---

### 3. `GET /nearestFoodTrucks`

| Status   |  Scenario   |
|----------|-------------|
| ✅ Status Code 200 | Should return status code 200 and food trucks list with status REQUESTED |
| ✅ Status Code 200 | Should return response body with all expected properties |
| ⚠️ Status Code 200 | Should return status code 200 empty array when invalid status was filled |
| ❌ Status Code 405 | Should return status code 405 when use method not allowed |
| ❌ Status Code 400 | Should return status code 400 when is not using the required parameter |

---

## 🛠 Project Setup

1. Clone this repo
2. Install dependencies:

```bash
npm install

npm test
