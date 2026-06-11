"""Architecture and system design documentation"""

# PCBMind AI - Architecture & System Design

## System Overview

PCBMind AI is a microservices-based AI SaaS platform with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│                    (Web Browser, Mobile)                     │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    Frontend (Next.js)                        │
│  - Landing Page                                             │
│  - Dashboard                                                │
│  - Inspection Module                                        │
│  - Reports & Analytics                                      │
└──────────────────────────┬──────────────────────────────────┘
                           │ (REST API)
┌──────────────────────────▼──────────────────────────────────┐
│                 API Gateway / Load Balancer                 │
│                    (Nginx / AWS ALB)                        │
└──────────────────────────┬──────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
┌───────▼───────┐  ┌──────▼──────┐  ┌────────▼────────┐
│  Auth Service │  │  API Routes │  │  File Service   │
│               │  │             │  │                 │
│  • Login      │  │ • Inspect   │  │ • Upload        │
│  • Register   │  │ • Dashboard │  │ • Storage       │
│  • JWT        │  │ • Reports   │  │ • Retrieval     │
└───────┬───────┘  └──────┬──────┘  └────────┬────────┘
        │                 │                  │
        └─────────────────┼──────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
┌───────▼────────┐ ┌─────▼──────┐ ┌────────▼──────────┐
│  ML Pipeline   │ │  Analytics │ │ Multi-Agent System│
│                │ │  Engine    │ │                   │
│ • Detection    │ │            │ │ • Inspector Agent │
│ • Analysis     │ │ • Metrics  │ │ • Diagnosis Agent │
│ • Prediction   │ │ • Trends   │ │ • Prediction Agent│
└───────┬────────┘ └─────┬──────┘ │ • Reporting Agent │
        │                │        └────────┬──────────┘
        └────────────────┼────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
┌───────▼──────┐ ┌──────▼──────┐ ┌──────▼────────┐
│ PostgreSQL   │ │ Cache/Redis │ │ File Storage  │
│ Database     │ │             │ │ (Supabase/S3) │
│              │ │ - Sessions  │ │               │
│ • Users      │ │ - Analytics │ │ • Images      │
│ • Inspections│ │ - Models    │ │ • Reports     │
│ • Defects    │ │             │ │               │
│ • Reports    │ │             │ │               │
└──────────────┘ └─────────────┘ └───────────────┘
```

## Core Components

### 1. Authentication & Authorization
- JWT-based token authentication
- Role-based access control (RBAC)
- Refresh token mechanism
- Session management

### 2. Inspection Engine
- Image upload handling
- Component detection (YOLOv8)
- Defect identification
- Annotation generation

### 3. AI/ML Pipeline
- **YOLOv8 Model**: Component detection
- **OpenCV**: Image processing
- **Scikit-learn**: Prediction models
- **LangChain**: LLM integration

### 4. Multi-Agent System

#### Inspector Agent
```
Input: PCB Image
Process: Component Detection
Output: {components: [...], total: 45}
```

#### Diagnosis Agent
```
Input: Detected Defects
Process: Root Cause Analysis
Output: {causes: [...], recommendations: [...]}
```

#### Prediction Agent
```
Input: Historical Data + Current Inspection
Process: ML Models
Output: {failure_prob: 0.35, risk_score: 4.2}
```

#### Reporting Agent
```
Input: Analysis Results
Process: Report Generation
Output: PDF/JSON Reports
```

### 5. Analytics Engine
- Real-time metrics calculation
- Trend analysis
- Quality forecasting
- Risk assessment

## Data Flow

### Inspection Workflow

```
1. User uploads PCB image
   ↓
2. Image validation & storage
   ↓
3. Inspector Agent runs detection
   ↓
4. Diagnosis Agent analyzes defects
   ↓
5. Prediction Agent forecasts failures
   ↓
6. Results stored in database
   ↓
7. Reporting Agent generates report
   ↓
8. Results sent to frontend
```

## Database Architecture

```
Normalized Schema:
- Users table → Factories → Production Lines
- Factories → PCB Templates
- Inspections → Defects
- Inspections → Predictions
- Inspections → Reports
- Inspections → Agents (activity log)

Query Patterns:
- Fast: User lookups, Recent inspections
- Medium: Defect analysis, Trends
- Complex: Quality forecasting, Risk assessment
```

## Caching Strategy

```
Layer 1: In-Memory (Application)
- User sessions
- Recent inspections
- Model artifacts

Layer 2: Redis
- Analytics metrics
- Prediction results
- Cached API responses

Layer 3: Database
- Persistent storage
- Audit logs
- Historical data
```

## Security Layers

```
1. Network Layer
   - HTTPS/TLS encryption
   - CORS policies
   - Rate limiting

2. Application Layer
   - JWT authentication
   - Input validation
   - SQL injection prevention

3. Data Layer
   - Encrypted sensitive fields
   - Database backups
   - Access logs

4. Infrastructure Layer
   - VPC isolation
   - Firewall rules
   - DDoS protection
```

## Scalability Considerations

### Horizontal Scaling
- Stateless API servers (auto-scaling group)
- Load balancer distribution
- Database read replicas

### Vertical Scaling
- Increased API resources
- GPU acceleration for ML
- Larger cache clusters

### Database Optimization
- Connection pooling
- Query optimization
- Partitioning large tables
- Archive old records

## Performance Targets

- API Response Time: < 500ms (p95)
- Image Processing: < 5s per PCB
- Dashboard Load: < 2s
- Report Generation: < 10s
- Uptime: 99.9%

## Monitoring & Observability

```
Metrics:
- API latency, throughput
- ML model accuracy
- Database queries
- Cache hit rates

Logging:
- Structured JSON logs
- ELK Stack integration
- Error tracking (Sentry)

Tracing:
- Request tracing (Jaeger)
- Distributed spans
- Performance analysis
```

## CI/CD Pipeline

```
1. Developer Push
   ↓
2. GitHub Actions
   - Run tests
   - Code quality check
   - Security scan
   ↓
3. Build & Push Docker Images
   ↓
4. Deploy to Staging
   - Integration tests
   - E2E tests
   ↓
5. Manual Approval
   ↓
6. Deploy to Production
   - Blue-green deployment
   - Health checks
   - Rollback capability
```

## Deployment Architecture

### Development
- Local Docker Compose
- SQLite for quick testing
- Mock ML models

### Staging
- AWS ECS/Fargate
- RDS PostgreSQL
- CloudFront CDN

### Production
- AWS ECS/Fargate (3 instances)
- RDS Multi-AZ
- CloudFront + WAF
- Route53 for DNS
- S3 for file storage

## Disaster Recovery

- RPO (Recovery Point Objective): 1 hour
- RTO (Recovery Time Objective): 2 hours
- Daily automated backups
- Multi-region failover capability
- Documented runbooks

## Future Architecture Enhancements

1. **GraphQL API** - For complex queries
2. **WebSocket Support** - Real-time updates
3. **Message Queue** - Asynchronous processing (RabbitMQ/Kafka)
4. **Microservices** - Split by domain (User, Inspection, Analytics)
5. **Edge Computing** - Local model inference
6. **Kubernetes** - Advanced orchestration
