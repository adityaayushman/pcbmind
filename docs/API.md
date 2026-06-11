"""API documentation and usage guide"""

# PCBMind AI - API Documentation

## Base URL

```
Production: https://api.pcbmind.ai
Development: http://localhost:8000
```

## Authentication

All endpoints except `/` and `/health` require JWT token in header:

```
Authorization: Bearer <access_token>
```

## Response Format

### Success Response

```json
{
  "status": "success",
  "data": { ... },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Error Response

```json
{
  "status": "error",
  "error": "error_code",
  "message": "Human readable message",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Authentication API

### Register

**Endpoint:** `POST /api/auth/register`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "full_name": "John Doe"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "email": "user@example.com",
  "full_name": "John Doe",
  "role": "operator",
  "is_active": true,
  "is_verified": false,
  "created_at": "2024-01-15T10:30:00Z"
}
```

### Login

**Endpoint:** `POST /api/auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

**Response:** `200 OK`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer",
  "user": { ... }
}
```

## Inspection API

### Upload Image

**Endpoint:** `POST /api/inspections/upload`

**Request:** Form Data
```
file: <binary image file>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "filename": "pcb-001.jpg",
  "path": "uploads/pcb-001.jpg",
  "message": "File uploaded successfully"
}
```

### Run Inspection

**Endpoint:** `POST /api/inspections/inspect`

**Request:**
```json
{
  "image_path": "uploads/pcb-001.jpg",
  "user_id": 1,
  "factory_id": 1,
  "production_line_id": 1,
  "pcb_template_id": 1
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "image_url": "uploads/pcb-001.jpg",
  "annotated_image_url": null,
  "total_components": 45,
  "defects_found": 3,
  "quality_score": 92.5,
  "status": "completed",
  "created_at": "2024-01-15T10:30:00Z",
  "defects": [
    {
      "defect_type": "missing_component",
      "component_name": "C12",
      "component_type": "capacitor",
      "x": 150.0,
      "y": 200.0,
      "width": 20.0,
      "height": 15.0,
      "confidence": 0.92,
      "severity": "high",
      "possible_cause": "Pick-and-place feeder issue",
      "cause_probability": 0.87,
      "recommended_action": "Inspect feeder slot #3"
    }
  ]
}
```

### Get Inspection

**Endpoint:** `GET /api/inspections/{inspection_id}`

**Response:** `200 OK`
```json
{
  "id": 1,
  "image_url": "...",
  "defects_found": 3,
  "quality_score": 92.5,
  ...
}
```

## Dashboard API

### Get Metrics

**Endpoint:** `GET /api/dashboard/metrics`

**Response:** `200 OK`
```json
{
  "total_inspections": 1247,
  "total_defects": 89,
  "average_quality_score": 94.2,
  "predicted_failures": 12,
  "production_yield": 96.8,
  "critical_alerts": 3
}
```

### Get Trends

**Endpoint:** `GET /api/dashboard/trends?days=7`

**Response:** `200 OK`
```json
{
  "trends": {
    "2024-01-15": {
      "missing_component": 2,
      "solder_defect": 1,
      "polarity_issue": 0
    },
    ...
  }
}
```

## Predictions API

### Generate Predictions

**Endpoint:** `POST /api/predictions/{inspection_id}/generate`

**Response:** `200 OK`
```json
{
  "status": "success",
  "prediction_id": 1,
  "message": "Predictions generated successfully"
}
```

### Get Predictions

**Endpoint:** `GET /api/predictions/{inspection_id}`

**Response:** `200 OK`
```json
{
  "id": 1,
  "inspection_id": 1,
  "defect_probability": 0.35,
  "failure_risk_score": 4.2,
  "production_line_health": 87.5,
  "quality_forecast": "Expected yield: 96.8%",
  "predicted_defects": { ... },
  "created_at": "2024-01-15T10:30:00Z"
}
```

## Reports API

### Generate Report

**Endpoint:** `POST /api/reports/generate`

**Request:**
```json
{
  "inspection_id": 1,
  "report_type": "inspection"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "report_type": "inspection",
  "file_url": "reports/report_1_inspection.pdf",
  "created_at": "2024-01-15T10:30:00Z"
}
```

## Agents API

### Run Agents

**Endpoint:** `POST /api/agents/{inspection_id}/run`

**Response:** `200 OK`
```json
{
  "status": "agents_triggered",
  "inspection_id": 1,
  "message": "AI agents are processing the inspection"
}
```

### Get Agents

**Endpoint:** `GET /api/agents/{inspection_id}`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "inspection_id": 1,
    "agent_name": "inspector",
    "status": "completed",
    "execution_time": 2.34,
    "created_at": "2024-01-15T10:30:00Z"
  },
  ...
]
```

## Rate Limiting

- 1000 requests per hour per user
- Batch endpoints: 100 requests per hour

## Error Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Success |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Internal error |

## SDK/Client Libraries

### Python
```bash
pip install pcbmind-sdk
```

### JavaScript/TypeScript
```bash
npm install pcbmind-sdk
```

### Usage
```python
from pcbmind import PCBMindClient

client = PCBMindClient(api_key="your_key")
result = client.inspections.run(image_path="pcb.jpg")
```
