# Loki + Grafana Setup Guide

## LogQL Queries

### 1. **Top Client IPs (Real IPs from Cloudflare)**
```logql
topk(10, sum by (cf_connecting_ip) (
  count_over_time({job="cv-website"} | json | cf_connecting_ip != "" [5m])
))
```

### 2. **Requests Per Minute**
```logql
sum(rate({job="cv-website"} | json [1m]))
```

### 3. **Filter by Host**
```logql
count_over_time({job="cv-website"} | json | host="cv.cosmin-lab.com" [5m])
```

### 4. **Top User Agents**
```logql
topk(5, sum by (http_user_agent) (
  count_over_time({job="cv-website"} | json | http_user_agent != "" [1h])
))
```

### 5. **HTTP Status Codes Distribution**
```logql
sum by (status) (count_over_time({job="cv-website"} | json [5m]))
```

### 6. **Requests by Host (all hosts)**
```logql
sum by (host) (count_over_time({job="cv-website"} | json [5m]))
```

### 7. **Top Referers**
```logql
topk(5, sum by (http_referer) (
  count_over_time({job="cv-website"} | json | http_referer != "-" [1h])
))
```

### 8. **Requests with 4xx/5xx Errors**
```logql
count_over_time({job="cv-website"} | json | status >= "400" [5m])
```

### 9. **Average Request Time**
```logql
avg(
  {job="cv-website"} | json | request_time > 0 | unwrap request_time(s) [5m]
)
```

### 10. **Request Volume by CF IP (Table)**
```logql
topk(20, sum by (cf_connecting_ip) (
  increase({job="cv-website"} | json [1h])
))
```

---

## Grafana Dashboard Panel Examples

### **Panel 1: Requests Per Minute (Graph)**
- **Query**: `sum(rate({job="cv-website"} | json [1m]))`
- **Visualization**: Time Series
- **Title**: "Requests Per Minute"

### **Panel 2: Top IPs (Table)**
- **Query**:
  ```
  topk(10, sum by (cf_connecting_ip) (
    increase({job="cv-website"} | json [1h])
  ))
  ```
- **Visualization**: Table
- **Title**: "Top 10 Client IPs (Last Hour)"
- **Column: cf_connecting_ip, Value**

### **Panel 3: Status Code Distribution (Pie)**
- **Query**: `sum by (status) (count_over_time({job="cv-website"} | json [5m]))`
- **Visualization**: Pie Chart
- **Title**: "HTTP Status Codes"

### **Panel 4: Top User Agents (Stat)**
- **Query**:
  ```
  topk(5, sum by (http_user_agent) (
    count_over_time({job="cv-website"} | json [1h])
  ))
  ```
- **Visualization**: Table
- **Title**: "Top User Agents"

---

## JSON Field Extraction

When querying in Loki, pipe to `| json` to extract fields:

```logql
{job="cv-website"} | json | cf_connecting_ip="203.0.113.0"
```

This allows filtering/grouping by:
- `cf_connecting_ip` - Real client IP from Cloudflare
- `host` - Host header
- `status` - HTTP status code
- `http_user_agent` - User agent string
- `request` - Full HTTP request line
- `request_time` - Request duration (seconds)

---

## Kubernetes Scrape Config Example (Promtail)

Add to your `values.yaml` for Loki stack helm chart:

```yaml
promtail:
  config:
    clients:
      - url: http://loki:3100/loki/api/v1/push
    scrape_configs:
      - job_name: cv-website
        kubernetes_sd_configs:
          - role: pod
        relabel_configs:
          - source_labels: [__meta_kubernetes_pod_label_app]
            action: keep
            regex: cv-website
          - source_labels: [__meta_kubernetes_pod_name]
            target_label: pod
          - source_labels: [__meta_kubernetes_namespace]
            target_label: namespace
```

---

## Testing Logs Locally

Build and run locally to verify JSON output:

```bash
docker build -t cv-website:latest .
docker run -p 8080:80 cv-website:latest

# In another terminal, generate traffic
curl -H "CF-Connecting-IP: 203.0.113.1" \
     -H "User-Agent: Mozilla/5.0" \
     http://localhost:8080/

# View logs
docker logs <container_id>
```

Expected output:
```json
{"time":"2026-04-01T17:36:00+00:00","remote_addr":"172.17.0.1","cf_connecting_ip":"203.0.113.1","x_forwarded_for":"-","host":"localhost","request":"GET / HTTP/1.1","status":200,"body_bytes_sent":1234,"request_time":0.005,"http_referer":"-","http_user_agent":"Mozilla/5.0"}
```
