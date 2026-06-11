"""Contributing guidelines"""

# Contributing to PCBMind AI

Thank you for your interest in contributing to PCBMind AI! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Focus on the code, not the person
- Help others and ask for help when needed
- Report unethical behavior to team@pcbmind.ai

## Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/pcbmind-ai.git
   cd pcbmind-ai
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Set up development environment**
   - See [QUICKSTART.md](QUICKSTART.md) for setup instructions

## Development Workflow

### Backend Development

#### Code Style
- Follow PEP 8
- Use type hints
- Document functions with docstrings
- Maximum line length: 100 characters

```python
def analyze_defect(defect: dict) -> dict:
    """
    Analyze a detected defect and return root cause analysis.
    
    Args:
        defect: Dictionary containing defect information
        
    Returns:
        Dictionary with analysis results
    """
    ...
```

#### Testing
```bash
# Run all tests
pytest

# Run specific test
pytest tests/test_defect_detection.py

# Run with coverage
pytest --cov=app
```

#### Creating a New API Endpoint
1. Create schema in `app/schemas/`
2. Create route in `app/api/`
3. Add tests in `tests/`
4. Update documentation

#### Example:
```python
# app/api/new_feature.py
from fastapi import APIRouter, Depends
from app.schemas import NewFeatureSchema

router = APIRouter()

@router.post("/new-endpoint")
async def create_item(item: NewFeatureSchema, db = Depends(get_db)):
    """Create a new item"""
    ...
    return {"id": 1, "status": "created"}
```

### Frontend Development

#### Code Style
- Use TypeScript for type safety
- Use functional components with hooks
- Follow React best practices
- Use meaningful component names

#### Component Structure
```typescript
// components/NewComponent.tsx
'use client';

import { useState } from 'react';

interface Props {
  title: string;
  onClose?: () => void;
}

export default function NewComponent({ title, onClose }: Props) {
  const [state, setState] = useState('');
  
  return (
    <div className="glass p-6 rounded-xl">
      <h1>{title}</h1>
      {/* Component JSX */}
    </div>
  );
}
```

#### Testing
```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

#### Creating a New Page
1. Create folder in `app/`
2. Add `page.tsx`
3. Add `layout.tsx` if needed
4. Update navigation

## Git Workflow

### Commit Messages
```
Format: <type>: <subject>

<body>

<footer>

Types: feat, fix, docs, style, refactor, test, chore, perf
```

Examples:
```
feat: add defect severity filtering

Implement severity filtering in defect analysis page
to allow users to focus on critical issues.

Fixes #123
```

### Branch Naming
```
feature/description
bugfix/issue-number
docs/description
refactor/description
```

### Pull Request Process

1. **Before creating PR:**
   - Run tests: `pytest` (backend) or `npm test` (frontend)
   - Format code: `black app/` (backend) or `prettier` (frontend)
   - Update documentation
   - Self-review your code

2. **Create PR with:**
   - Clear title: "feat: add defect filtering"
   - Description: What changed and why
   - Link related issues: "Fixes #123"
   - Screenshots for UI changes

3. **PR Template:**
   ```markdown
   ## Description
   Briefly describe what this PR does
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## How to Test
   1. Step 1
   2. Step 2
   
   ## Checklist
   - [ ] Tests pass
   - [ ] Documentation updated
   - [ ] No breaking changes
   ```

## Documentation

### Adding Documentation
- Update relevant `.md` files in `/docs`
- Include examples and code snippets
- Keep documentation in sync with code

### Code Documentation
```python
# Good
def calculate_quality_score(defects: List[Defect]) -> float:
    """
    Calculate overall quality score from defects list.
    
    Penalizes based on severity:
    - Critical: -25 points
    - High: -15 points
    - Medium: -8 points
    - Low: -3 points
    
    Args:
        defects: List of detected defects
        
    Returns:
        Quality score between 0-100
    """
```

### README Updates
- Update if adding new features
- Include setup instructions
- Add examples

## Bug Reporting

Create an issue with:
1. **Title**: Clear summary
2. **Description**: Detailed explanation
3. **Steps to reproduce**: How to trigger bug
4. **Expected behavior**: What should happen
5. **Actual behavior**: What actually happened
6. **Environment**: OS, browser, versions

Template:
```markdown
## Bug Description
Short summary of the bug

## Steps to Reproduce
1. Go to page X
2. Click on element Y
3. See error Z

## Expected Behavior
Description of expected behavior

## Screenshots
If applicable

## Environment
- OS: 
- Browser/Node:
- Python:
```

## Feature Requests

Propose new features with:
1. **Title**: Feature summary
2. **Motivation**: Why is this needed?
3. **Solution**: How should it work?
4. **Alternative approaches**: Other solutions considered
5. **Acceptance criteria**: How to know it's done

## Code Review Expectations

### What We Look For
- ✅ Follows code style guidelines
- ✅ Well-tested (>80% coverage target)
- ✅ Documentation updated
- ✅ No breaking changes
- ✅ Performance implications considered
- ✅ Security best practices followed

### Reviewer Guidelines
- Be constructive and respectful
- Ask clarifying questions
- Suggest improvements
- Approve when satisfied

## Performance Guidelines

### Backend
- API responses < 500ms (p95)
- Database queries < 100ms
- Use async/await for I/O
- Implement caching where appropriate

### Frontend
- First Contentful Paint < 2s
- Lighthouse score > 90
- Use code splitting for large pages
- Optimize images and assets

## Security Guidelines

### Backend
- Validate all inputs
- Use parameterized queries
- Hash passwords with bcrypt
- Implement rate limiting
- Use HTTPS only

### Frontend
- Sanitize user input
- Avoid storing sensitive data in localStorage
- Use Content Security Policy
- Regular dependency updates

## Performance Checklist

```
- [ ] Ran full test suite
- [ ] No console errors/warnings
- [ ] Lighthouse score acceptable
- [ ] Database queries optimized
- [ ] No memory leaks
- [ ] API performance acceptable
```

## Deployment Checklist

```
- [ ] Code reviewed and approved
- [ ] Tests passing on CI/CD
- [ ] Documentation updated
- [ ] Migrations applied successfully
- [ ] No breaking changes
- [ ] Rollback plan documented
```

## Resources

- [Python Style Guide](https://pep8.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Git Workflow](https://git-scm.com/book/en/v2)

## Questions?

- Check [QUICKSTART.md](QUICKSTART.md)
- Review existing code
- Ask in GitHub Discussions
- Email: dev@pcbmind.ai

Thank you for contributing to PCBMind AI! 🚀
