"""Database schema documentation"""

# PCBMind AI - Database Schema

## Overview

PostgreSQL database with 11 core tables supporting user management, inspections, defect tracking, and AI operations.

## Table Schemas

### users
User accounts and profiles

```sql
- id: INT PRIMARY KEY
- email: VARCHAR UNIQUE
- hashed_password: VARCHAR
- full_name: VARCHAR
- role: VARCHAR (admin, manager, engineer, operator)
- is_active: BOOLEAN
- is_verified: BOOLEAN
- factory_id: INT FK
- created_at: TIMESTAMP
```

### factories
Manufacturing facility information

```sql
- id: INT PRIMARY KEY
- name: VARCHAR UNIQUE
- location: VARCHAR
- description: TEXT
- industry: VARCHAR
- created_at: TIMESTAMP
```

### production_lines
Production line configuration

```sql
- id: INT PRIMARY KEY
- name: VARCHAR
- factory_id: INT FK
- line_type: VARCHAR (SMT, THT, Wave, etc.)
- status: VARCHAR
- capacity: INT
- created_at: TIMESTAMP
```

### pcb_templates
Reference PCB layouts

```sql
- id: INT PRIMARY KEY
- name: VARCHAR UNIQUE
- description: TEXT
- factory_id: INT FK
- reference_image_url: VARCHAR
- components: JSON
- created_at: TIMESTAMP
```

### inspections
PCB inspection records

```sql
- id: INT PRIMARY KEY
- user_id: INT FK
- factory_id: INT FK
- production_line_id: INT FK
- pcb_template_id: INT FK
- image_url: VARCHAR
- annotated_image_url: VARCHAR
- total_components: INT
- defects_found: INT
- quality_score: FLOAT
- status: VARCHAR (pending, processing, completed, failed)
- created_at: TIMESTAMP
```

### defects
Detected defects with analysis

```sql
- id: INT PRIMARY KEY
- inspection_id: INT FK
- defect_type: VARCHAR
- component_type: VARCHAR
- component_name: VARCHAR
- x, y, width, height: FLOAT (bounding box)
- confidence: FLOAT
- severity: VARCHAR (low, medium, high, critical)
- possible_cause: TEXT
- cause_probability: FLOAT
- recommended_action: TEXT
- created_at: TIMESTAMP
```

### predictions
Failure predictions

```sql
- id: INT PRIMARY KEY
- inspection_id: INT FK
- factory_id: INT FK
- defect_probability: FLOAT
- failure_risk_score: FLOAT
- production_line_health: FLOAT
- quality_forecast: TEXT
- predicted_defects: JSON
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### reports
Generated reports

```sql
- id: INT PRIMARY KEY
- inspection_id: INT FK
- report_type: VARCHAR (inspection, quality, failure_analysis)
- file_url: VARCHAR
- content: JSON
- created_at: TIMESTAMP
```

### agents
AI agent activity tracking

```sql
- id: INT PRIMARY KEY
- inspection_id: INT FK
- agent_name: VARCHAR (inspector, diagnosis, prediction, reporting)
- status: VARCHAR (running, completed, failed)
- input_data: JSON
- output_data: JSON
- execution_time: FLOAT
- created_at: TIMESTAMP
```

### activity_logs
User action audit trail

```sql
- id: INT PRIMARY KEY
- user_id: INT FK
- action: VARCHAR
- resource: VARCHAR
- details: JSON
- created_at: TIMESTAMP
```

## Indexes

```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_inspections_user_id ON inspections(user_id);
CREATE INDEX idx_inspections_factory_id ON inspections(factory_id);
CREATE INDEX idx_inspections_created_at ON inspections(created_at);
CREATE INDEX idx_defects_inspection_id ON defects(inspection_id);
CREATE INDEX idx_defects_severity ON defects(severity);
CREATE INDEX idx_predictions_inspection_id ON predictions(inspection_id);
CREATE INDEX idx_agents_inspection_id ON agents(inspection_id);
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
```

## Relationships

```
users (1) -> (many) inspections
users (1) -> (many) activity_logs

factories (1) -> (many) users
factories (1) -> (many) production_lines
factories (1) -> (many) pcb_templates

production_lines (1) -> (many) inspections

pcb_templates (1) -> (many) inspections

inspections (1) -> (many) defects
inspections (1) -> (many) predictions
inspections (1) -> (many) reports
inspections (1) -> (many) agents

defects (many) -> (1) inspections

predictions (many) -> (1) inspections

reports (many) -> (1) inspections

agents (many) -> (1) inspections
```

## Queries

### Get Recent Inspections with Defects

```sql
SELECT i.id, i.created_at, COUNT(d.id) as defect_count
FROM inspections i
LEFT JOIN defects d ON i.id = d.inspection_id
WHERE i.created_at >= NOW() - INTERVAL '7 days'
GROUP BY i.id
ORDER BY i.created_at DESC;
```

### Quality Score Trend

```sql
SELECT 
  DATE(created_at) as date,
  AVG(quality_score) as avg_quality,
  COUNT(*) as inspection_count
FROM inspections
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date;
```

### Defect Analysis by Type

```sql
SELECT 
  defect_type,
  severity,
  COUNT(*) as count,
  AVG(cause_probability) as avg_probability
FROM defects
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY defect_type, severity
ORDER BY count DESC;
```

### User Activity Audit

```sql
SELECT 
  u.email,
  a.action,
  a.resource,
  a.created_at
FROM activity_logs a
JOIN users u ON a.user_id = u.id
WHERE a.created_at >= NOW() - INTERVAL '7 days'
ORDER BY a.created_at DESC;
```

## Backup Strategy

- Daily automated backups to S3
- Weekly full backups
- Point-in-time recovery capability
- Test restore procedures monthly

## Performance Considerations

- Partition inspections table by created_at for large datasets
- Archive old records after 1 year
- Use JSON columns efficiently
- Monitor query performance with pg_stat_statements
