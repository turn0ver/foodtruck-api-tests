# 🍔 Food Truck API Testing Project

This project contains automated **API tests** for a ASP.NET-based Food Truck API.  
The tests are written in **TypeScript**, using **Axios** for HTTP requests and **Jest** as the test runner.

---

## ✅ Test Scenarios and Reasons

---

### 1. `GET /searchByName`

#### ✅ Positive Scenarios

| Scenario | Reason |
|---------|--------|
| Should return status code 200 if food trucks matching the applicant | Confirms that the endpoint successfully finds and returns results when a valid name is provided. |
| Should return response body with all expected properties | Ensures that the response includes expected fields like `applicant`, `status`, and `location`. This helps maintain API contract consistency. |

#### ⚠️ Edge Case

| Scenario | Reason |
|---------|--------|
| Should return status code 200 empty array when no match found | Validates that the API handles non-matching input gracefully without throwing errors, returning an empty list instead. |

#### ❌ Negative Scenarios

| Scenario | Reason |
|---------|--------|
| Should return status code 400 when is not using the required parameter | Validates that the API requires the `name` query param and returns an appropriate error when it's missing. |
| Should return status code 405 when use method not allowed | Confirms that the endpoint only accepts `GET` requests and rejects others (`POST`, `PUT`, etc.) according to REST principles. |

---

### 2. `GET /searchByStreet`

#### ✅ Positive Scenarios

| Scenario | Reason |
|---------|--------|
| Should return status code 200 if food trucks matching the applicant | Ensures that a valid `street` query returns matching food truck data. |
| Should return response body with all expected properties | Verifies that the response structure follows the expected schema. This is important for frontend rendering or further API chaining. |

#### ⚠️ Edge Case

| Scenario | Reason |
|---------|--------|
| Should return status code 200 empty array when no match found | Validates graceful handling of valid queries with no matching results. Returning 200 with an empty array is a standard RESTful behavior. |

#### ❌ Negative Scenarios

| Scenario | Reason |
|---------|--------|
| Should return status code 400 when is not using the required parameter | Checks if the `street` query param is properly validated and required by the API. |
| Should return status code 405 when use method not allowed | Confirms that unsupported HTTP methods (e.g. `POST`) are blocked on this `GET`-only endpoint. |

---

### 3. `GET /nearestFoodTrucks`

#### ✅ Positive Scenarios

| Scenario | Reason |
|---------|--------|
| Should return status code 200 and food trucks list with status `REQUESTED` | Verifies that the endpoint returns food trucks filtered by `status`, `latitude`, and `longitude` when all params are valid. |
| Should return response body with all expected properties | Ensures the returned data structure includes relevant fields for each food truck, such as coordinates and applicant info. |

#### ⚠️ Edge Case

| Scenario | Reason |
|---------|--------|
| Should return status code 200 empty array when invalid status was filled | Checks how the API behaves when the `status` parameter is not one of the allowed values. A 200 with empty data indicates the filter is applied strictly, which is a valid design choice. |

#### ❌ Negative Scenarios

| Scenario | Reason |
|---------|--------|
| Should return status code 400 when is not using the required parameter | Validates enforcement of required parameters: `latitude` and `longitude`. Missing them should trigger validation errors. |
| Should return status code 405 when use method not allowed | Ensures the API follows REST conventions by only allowing `GET` requests for this endpoint. |

---

## 🛠 Project Setup

1. Clone this repo
2. Install dependencies:

```bash
npm install

npm test
