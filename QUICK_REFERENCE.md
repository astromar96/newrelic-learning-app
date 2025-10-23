# 📌 New Relic Quick Reference Card

Quick lookup guide for common tasks and queries.

---

## 🚀 Quick Start Commands

```bash
# Install everything
npm run install-all

# Run both frontend and backend
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client
```

---

## 🌐 URLs

- **App**: http://localhost:3000
- **API**: http://localhost:8080
- **New Relic**: https://one.newrelic.com
- **API Keys**: https://one.newrelic.com/admin-portal/api-keys/home

---

## 🔍 New Relic Navigation

| Feature | Path |
|---------|------|
| Overview | APM & Services → Your App |
| Transactions | APM → Transactions |
| Errors | APM → Errors |
| Distributed Tracing | APM → Distributed tracing |
| Databases | APM → Databases |
| Query Data | Top right → Query your data |
| Dashboards | Dashboards → Create a dashboard |
| Alerts | Alerts & AI → Alert conditions |

---

## 📊 Common NRQL Queries

### Response Time
```sql
SELECT average(duration) FROM Transaction 
WHERE appName = 'NewRelic Learning App' 
TIMESERIES
```

### Error Rate
```sql
SELECT percentage(count(*), WHERE error IS true) 
FROM Transaction 
WHERE appName = 'NewRelic Learning App'
```

### Throughput (RPM)
```sql
SELECT rate(count(*), 1 minute) FROM Transaction 
WHERE appName = 'NewRelic Learning App' 
TIMESERIES
```

### Slowest Endpoints
```sql
SELECT average(duration), count(*) FROM Transaction 
WHERE appName = 'NewRelic Learning App' 
FACET name 
SINCE 1 hour ago
```

### 95th Percentile
```sql
SELECT percentile(duration, 95) FROM Transaction 
WHERE appName = 'NewRelic Learning App' 
FACET name
```

### Custom Metrics
```sql
SELECT average(Custom/BusinessMetric) FROM Metric 
WHERE appName = 'NewRelic Learning App' 
TIMESERIES
```

### Errors by Type
```sql
SELECT count(*) FROM TransactionError 
WHERE appName = 'NewRelic Learning App' 
FACET error.class 
SINCE 1 hour ago
```

### Compare Time Periods
```sql
SELECT average(duration) FROM Transaction 
WHERE appName = 'NewRelic Learning App' 
SINCE 1 hour ago 
COMPARE WITH 1 hour ago 
TIMESERIES
```

---

## 🎯 API Endpoints Quick Reference

| Endpoint | Method | Purpose | Expected Behavior |
|----------|--------|---------|-------------------|
| `/api/health` | GET | Health check | Fast (<50ms) |
| `/api/users` | GET | Get all users | Fast (<100ms) |
| `/api/users/:id` | GET | Get user by ID | Fast (<50ms) |
| `/api/users` | POST | Create user | Fast (<100ms) |
| `/api/slow-query` | GET | Slow query test | Slow (3000ms default) |
| `/api/memory-intensive` | GET | Memory test | Variable |
| `/api/random-error` | GET | Error test | 30% error rate |
| `/api/external-call` | GET | External API sim | Slow (1500ms) |
| `/api/custom-metrics` | GET | Custom metrics | Fast |
| `/api/complex-operation` | GET | Multi-step | Moderate (1000ms+) |

---

## ⚙️ Configuration

### Environment Variables (.env)
```bash
NEW_RELIC_LICENSE_KEY=your_key_here
NEW_RELIC_APP_NAME=NewRelic Learning App
PORT=8080
NODE_ENV=development
```

### Client Environment (client/.env)
```bash
REACT_APP_API_URL=http://localhost:8080
```

---

## 🚨 Common Alert Conditions

### High Response Time
```
Condition: Transaction duration > 2 seconds
For: 5 minutes
```

### High Error Rate
```
Condition: Error percentage > 5%
For: 3 minutes
```

### Low Throughput
```
Condition: Request rate < 10 per minute
For: 5 minutes
```

### High Memory Usage
```
Condition: Memory usage > 80%
For: 5 minutes
```

---

## 🐛 Troubleshooting Checklist

### No data in New Relic?
- [ ] License key correct in `.env`?
- [ ] Server running without errors?
- [ ] Waited 2-3 minutes?
- [ ] Generated traffic?
- [ ] Correct New Relic account?

### Server won't start?
- [ ] Dependencies installed? (`npm install`)
- [ ] Port available? (change PORT in `.env`)
- [ ] Node.js version 14+?

### Frontend won't connect?
- [ ] Backend running on correct port?
- [ ] CORS enabled? (it is by default)
- [ ] Check browser console for errors
- [ ] API_URL correct in `client/.env`?

---

## 📈 Key Metrics to Monitor

| Metric | Good | Warning | Critical |
|--------|------|---------|----------|
| Response Time | <500ms | 500-1000ms | >1000ms |
| Error Rate | <1% | 1-5% | >5% |
| Apdex Score | >0.94 | 0.7-0.94 | <0.7 |
| Throughput | Stable | Variable | Dropping |
| Memory | <70% | 70-85% | >85% |

---

## 🎓 Learning Path

1. ✅ Set up New Relic account
2. ✅ Install and configure app
3. ✅ Generate traffic and observe metrics
4. ✅ Learn basic NRQL queries
5. ✅ Create custom dashboard
6. ✅ Set up alert conditions
7. ✅ Master distributed tracing
8. ✅ Add custom instrumentation

---

## 💡 Pro Tips

1. **Use TIMESERIES**: Add `TIMESERIES` to queries for time-based charts
2. **FACET for grouping**: Use `FACET` to group by fields
3. **COMPARE WITH**: Compare different time periods
4. **Percentiles matter**: Use `percentile(duration, 95)` for realistic performance
5. **Custom attributes**: Add business context with custom attributes
6. **Alert wisely**: Too many alerts = alert fatigue
7. **Dashboard organization**: Group related metrics together
8. **Sampling**: New Relic samples transactions at high volume

---

## 🔗 Quick Links

- [New Relic Docs](https://docs.newrelic.com/)
- [NRQL Syntax](https://docs.newrelic.com/docs/query-your-data/nrql-new-relic-query-language/get-started/introduction-nrql-new-relics-query-language/)
- [APM Best Practices](https://docs.newrelic.com/docs/new-relic-solutions/best-practices-guides/full-stack-observability/apm-best-practices-guide/)
- [Alert Best Practices](https://docs.newrelic.com/docs/alerts-applied-intelligence/new-relic-alerts/learn-alerts/alerts-best-practices/)

---

## 🎯 Daily Practice Routine

**5-Minute Warmup**:
1. Generate mixed traffic
2. Check APM dashboard
3. Write one NRQL query

**15-Minute Session**:
1. Complete one exercise from LEARNING_EXERCISES.md
2. Create or update a dashboard
3. Practice NRQL queries

**30-Minute Deep Dive**:
1. Analyze a specific performance issue
2. Create detailed dashboard for it
3. Set up appropriate alerts

---

**Print this out and keep it handy! 🎯**

