import math
import time
import random

def linear_regression_anomaly_detector(current_traffic_bps, historical_slope, intercept):
    """
    MATHEMATICAL MODEL 1: LINEAR REGRESSION (y = mx + c)
    Monitors data packet traffic across the drone mesh network.
    Flags zero-day cyber-physical anomalies when traffic spikes violently off the linear baseline.
    """
    expected_traffic = (historical_slope * time.time()) + intercept
    threshold = expected_traffic * 1.5 # Allow 50% variance for natural fluctuations
    
    if current_traffic_bps > threshold:
        return {"status": "CRITICAL_ANOMALY", "confidence": "HIGH", "model": "Linear Regression (y=mx+c)"}
    return {"status": "NOMINAL", "confidence": "NORMAL"}

def logistic_regression_threat_classifier(wifi_anomalies, sensor_trips, rf_interference):
    """
    MATHEMATICAL MODEL 2: LOGISTIC REGRESSION (Sigmoid Function)
    Calculates probability scoring vectors to classify an event as a benign alert or a hostile breach.
    """
    # Weighted linear combination of inputs
    z = (2.5 * wifi_anomalies) + (3.0 * sensor_trips) + (1.8 * rf_interference) - 4.0
    
    # Sigmoid function formula: 1 / (1 + e^-z)
    probability = 1 / (1 + math.exp(-z))
    
    classification = "HOSTILE_BREACH" if probability >= 0.50 else "BENIGN_ENVIRONMENTAL"
    return {"classification": classification, "threat_probability": round(probability, 4)}

if __name__ == "__main__":
    print("=== AEGIS SWARM V2.0 EDGE AI CORRELATION ENGINE ===")
    print("[INFO] Initializing math engines on simulated edge hardware...")
    
    # Simulate a standard network spike (Cyber Attack)
    traffic_alert = linear_regression_anomaly_detector(current_traffic_bps=950000, historical_slope=0.01, intercept=500000)
    print(f"\n[1] Linear Regression Traffic Check:\n -> Result: {traffic_alert}")
    
    # Simulate an intrusion classification
    threat_alert = logistic_regression_threat_classifier(wifi_anomalies=1, sensor_trips=1, rf_interference=0)
    print(f"\n[2] Logistic Regression Threat Matrix Classification:\n -> Result: {threat_alert}")
