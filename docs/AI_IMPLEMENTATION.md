"""AI Implementation Guide"""

# PCBMind AI - AI/ML Implementation Guide

## Overview

This guide covers implementing AI/ML features in PCBMind AI.

## 1. Object Detection (YOLOv8)

### Setup

```bash
pip install ultralytics torch torchvision
```

### Basic Implementation

```python
from ultralytics import YOLO
import cv2

# Load model
model = YOLO("yolov8n.pt")  # nano, small, medium, large, xlarge

# Run detection
results = model("pcb_image.jpg", conf=0.5)

# Process results
for r in results:
    for box in r.boxes:
        x1, y1, x2, y2 = box.xyxy[0]
        confidence = box.conf[0]
        class_id = int(box.cls[0])
```

### Training Custom Model

```python
from ultralytics import YOLO

# Load base model
model = YOLO("yolov8n.yaml")

# Train
results = model.train(
    data="dataset.yaml",
    epochs=100,
    imgsz=640,
    device=0,  # GPU ID
    patience=20,  # Early stopping
    batch=16
)

# Export
model.export(format="onnx")  # For deployment
```

### Dataset Format

```
dataset/
├── images/
│   ├── train/
│   │   ├── img1.jpg
│   │   └── img2.jpg
│   ├── val/
│   └── test/
├── labels/
│   ├── train/
│   │   ├── img1.txt
│   │   └── img2.txt
│   └── val/
└── dataset.yaml
```

### dataset.yaml
```yaml
path: /path/to/dataset
train: images/train
val: images/val
test: images/test

nc: 8  # number of classes
names: ['resistor', 'capacitor', 'ic', 'led', 'diode', 'transistor', 'connector', 'inductor']
```

## 2. Image Processing (OpenCV)

### Preprocessing

```python
import cv2
import numpy as np

# Read image
img = cv2.imread("pcb.jpg")

# Resize
img_resized = cv2.resize(img, (640, 640))

# Normalize
img_norm = img_resized / 255.0

# Histogram equalization
img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
img_eq = cv2.equalizeHist(img_gray)

# Blur to reduce noise
img_blur = cv2.GaussianBlur(img, (5, 5), 0)

# Threshold
ret, img_thresh = cv2.threshold(img_gray, 127, 255, cv2.THRESH_BINARY)
```

### Drawing Annotations

```python
# Draw bounding box
cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)

# Draw circle
cv2.circle(img, (cx, cy), radius, (0, 255, 0), 2)

# Add text
cv2.putText(img, "Defect", (x1, y1-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

# Draw contours
contours, _ = cv2.findContours(img_thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
cv2.drawContours(img, contours, -1, (0, 255, 0), 2)

# Save annotated image
cv2.imwrite("annotated.jpg", img)
```

## 3. Defect Classification (scikit-learn)

### Feature Extraction

```python
from sklearn.preprocessing import StandardScaler
import numpy as np

def extract_features(bbox):
    """Extract features from bounding box"""
    x, y, w, h = bbox
    
    features = {
        'area': w * h,
        'aspect_ratio': w / h,
        'perimeter': 2 * (w + h),
        'eccentricity': (w - h) / (w + h),
        'position_x': x / 640,  # normalized
        'position_y': y / 640,
    }
    
    return features

# Prepare data
X = []
y = []

for img, labels in training_data:
    for bbox, defect_type in labels:
        features = extract_features(bbox)
        X.append(list(features.values()))
        y.append(defect_type)

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
```

### Classification Model

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline

# Create pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', RandomForestClassifier(n_estimators=100))
])

# Train
pipeline.fit(X, y)

# Predict
predictions = pipeline.predict(X_test)

# Probability
probabilities = pipeline.predict_proba(X_test)
```

## 4. Predictive Analytics

### Time Series Prediction

```python
from sklearn.linear_model import LinearRegression
import numpy as np

# Historical defect data
dates = [1, 2, 3, 4, 5, 6, 7]  # Days
defects = [5, 4, 6, 5, 7, 8, 9]  # Count

# Prepare data
X = np.array(dates).reshape(-1, 1)
y = np.array(defects)

# Train model
model = LinearRegression()
model.fit(X, y)

# Predict next 3 days
future_dates = np.array([8, 9, 10]).reshape(-1, 1)
predictions = model.predict(future_dates)
```

### Failure Risk Scoring

```python
def calculate_risk_score(inspection_data):
    """
    Calculate failure risk score (0-10 scale)
    """
    factors = {
        'defect_count': inspection_data['defects_found'],
        'critical_percentage': (inspection_data['critical_defects'] / 
                                inspection_data['total_defects']) if inspection_data['total_defects'] > 0 else 0,
        'quality_trend': inspection_data['quality_score_change'],
        'line_health': 100 - inspection_data['production_line_health'],
    }
    
    # Weighted scoring
    weights = {
        'defect_count': 0.3,
        'critical_percentage': 0.4,
        'quality_trend': 0.2,
        'line_health': 0.1,
    }
    
    score = 0
    for factor, value in factors.items():
        normalized_value = min(value / 100, 1.0)  # Normalize to 0-1
        score += normalized_value * weights[factor]
    
    return score * 10  # Scale to 0-10
```

## 5. LLM Integration (OpenAI)

### Setup

```bash
pip install openai
```

### Root Cause Analysis

```python
import openai

def generate_root_cause_analysis(defect_info):
    """Generate AI explanation for defect"""
    
    prompt = f"""
    A PCB inspection has detected the following defect:
    - Type: {defect_info['type']}
    - Component: {defect_info['component']}
    - Severity: {defect_info['severity']}
    - Confidence: {defect_info['confidence']}
    
    Based on manufacturing knowledge, what are the most likely causes and 
    recommended actions? Format as JSON with fields: possible_causes (array), 
    recommended_actions (array).
    """
    
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a PCB manufacturing expert."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=500
    )
    
    return response.choices[0].message.content
```

### Manufacturing Copilot

```python
class ManufacturingCopilot:
    def __init__(self):
        self.conversation_history = []
    
    async def ask(self, question: str, context: dict = None):
        """Answer manufacturing questions"""
        
        system_prompt = """You are a manufacturing quality expert for PCB production.
        Help with defect analysis, quality improvement, and process optimization.
        Be concise and actionable."""
        
        self.conversation_history.append({
            "role": "user",
            "content": question
        })
        
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_prompt},
                *self.conversation_history
            ],
            temperature=0.8,
            max_tokens=300
        )
        
        answer = response.choices[0].message.content
        
        self.conversation_history.append({
            "role": "assistant",
            "content": answer
        })
        
        return answer
```

## 6. Model Deployment

### Export Models

```python
# YOLO to ONNX (for faster inference)
model = YOLO("best.pt")
model.export(format="onnx", imgsz=640)

# Scikit-learn with joblib
import joblib
joblib.dump(classifier, "model.joblib")

# Load in production
import onnxruntime as ort
sess = ort.InferenceSession("model.onnx")
```

### Performance Optimization

```python
# Use FP16 for faster inference
from torch import cuda

model = YOLO("yolov8n.pt")
if cuda.is_available():
    model = model.half()  # FP16 precision

# Reduce model size
model.export(format="pt", dynamic=False, simplify=True)

# Batch processing
results = model(["img1.jpg", "img2.jpg", "img3.jpg"], batch=3)
```

## 7. Model Monitoring

### Accuracy Metrics

```python
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)
precision = precision_score(y_test, predictions, average='weighted')
recall = recall_score(y_test, predictions, average='weighted')
f1 = f1_score(y_test, predictions, average='weighted')

print(f"Accuracy: {accuracy:.4f}")
print(f"Precision: {precision:.4f}")
print(f"Recall: {recall:.4f}")
print(f"F1 Score: {f1:.4f}")
```

### Logging & Tracking

```python
import logging

logger = logging.getLogger(__name__)

# Log inference results
logger.info(f"Detected {len(detections)} objects in {inference_time}ms")
logger.warning(f"Low confidence detection: {confidence}")
logger.error(f"Model inference failed: {error}")

# Track performance metrics
metrics = {
    'inference_time_ms': inference_time,
    'detection_count': len(detections),
    'average_confidence': avg_confidence
}
```

## 8. ML Pipeline Architecture

```python
# backend/app/ml/pipeline.py
class PCBAnalysisPipeline:
    def __init__(self):
        self.detector = YOLO("best.pt")
        self.classifier = joblib.load("classifier.joblib")
        self.scaler = StandardScaler()
    
    async def process(self, image_path: str) -> dict:
        # Step 1: Load image
        image = cv2.imread(image_path)
        
        # Step 2: Detect components
        results = self.detector(image)
        
        # Step 3: Extract features and classify
        defects = []
        for detection in results[0].boxes:
            bbox = detection.xyxy[0]
            features = extract_features(bbox)
            
            # Classify defect
            defect_type = self.classifier.predict([features])[0]
            defects.append({
                'type': defect_type,
                'bbox': bbox.tolist(),
                'confidence': float(detection.conf[0])
            })
        
        # Step 4: Analyze
        risk_score = calculate_risk_score({'defects': defects})
        
        return {
            'detections': len(results[0].boxes),
            'defects': defects,
            'risk_score': risk_score
        }
```

## Best Practices

### Data Quality
- ✅ Clean, labeled training data
- ✅ Balanced class distribution
- ✅ Data augmentation
- ✅ Regular data validation

### Model Training
- ✅ Cross-validation
- ✅ Hyperparameter tuning
- ✅ Early stopping
- ✅ Model checkpointing

### Deployment
- ✅ Model versioning
- ✅ A/B testing
- ✅ Monitoring & alerts
- ✅ Rollback procedures

### Performance
- ✅ Batch processing
- ✅ Model quantization
- ✅ Caching results
- ✅ Async inference

## Resources

- [YOLOv8 Documentation](https://docs.ultralytics.com/)
- [OpenCV Tutorials](https://docs.opencv.org/master/d9/df8/tutorial_root.html)
- [Scikit-learn Guide](https://scikit-learn.org/stable/documentation.html)
- [OpenAI API](https://platform.openai.com/docs/)
- [PyTorch Documentation](https://pytorch.org/docs/)
