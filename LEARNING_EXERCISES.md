# 📚 New Relic Learning Exercises

Hands-on exercises to master New Relic monitoring.

---

## 🎯 Exercise 1: Baseline Performance Monitoring

**Goal**: Understand normal application behavior

**Steps**:
1. Start the application
2. Click "Get Users" button 10 times
3. In New Relic, go to **APM** → **Transactions**
4. Find the `/api/users` transaction
5. Note the average response time

**What to observe**:
- Average response time (should be <100ms)
- Throughput (requests per minute)
- Apdex score

**Questions to answer**:
- What is the 95th percentile response time?
- How many database queries does this endpoint make?

---

## 🐌 Exercise 2: Identifying Slow Transactions

**Goal**: Learn to identify and diagnose performance issues

**Steps**:
1. Click "Slow Query" button 5 times
2. Go to **APM** → **Transactions**
3. Sort by "Most time consuming"
4. Click on the slow transaction
5. Examine the transaction trace

**What to observe**:
- How does it appear in the transaction list?
- What's causing the slowness? (check the trace breakdown)
- How does it affect your Apdex score?

**Challenge**:
- Can you tell from the trace what's causing the 3-second delay?
- How would you optimize this in a real application?

---

## ❌ Exercise 3: Error Tracking and Analysis

**Goal**: Master error monitoring and alerting

**Steps**:
1. Click "Random Error" button 30 times
2. Go to **APM** → **Errors**
3. Analyze the error rate chart
4. Click on an error to see the stack trace
5. Create an alert condition for error rate

**What to observe**:
- Error rate percentage
- Error types (500 errors, 404 errors, exceptions)
- Error traces and stack traces
- Which errors happen most frequently

**Challenge**:
- Set up an alert that triggers when error rate > 10%
- Configure it to send you an email notification

---

## 📈 Exercise 4: Custom Metrics

**Goal**: Learn to create and query custom business metrics

**Steps**:
1. Click "Custom Metrics" button 10 times
2. Go to **Query your data** (top right)
3. Run this NRQL query:
   ```sql
   SELECT average(Custom/BusinessMetric) 
   FROM Metric 
   WHERE appName = 'NewRelic Learning App' 
   SINCE 30 minutes ago 
   TIMESERIES
   ```
4. Create a dashboard widget with this query

**What to observe**:
- How custom metrics appear in New Relic
- The difference between metrics and events
- How to visualize custom data

**Challenge**:
- Modify the server code to add your own custom metric
- Track something meaningful (e.g., number of users created)

---

## 🔍 Exercise 5: Distributed Tracing

**Goal**: Understand request flow through your application

**Steps**:
1. Click "Complex Operation" button 5 times
2. Go to **APM** → **Distributed tracing**
3. Click on a trace to see the waterfall view
4. Examine the spans and their durations

**What to observe**:
- How the request flows through different parts of the app
- Which operations take the most time
- Database query timing
- Sequential vs parallel operations

**Challenge**:
- Can you identify which operations are sequential?
- How would you optimize this to be faster?

---

## 🧠 Exercise 6: Memory Monitoring

**Goal**: Track memory usage patterns

**Steps**:
1. Go to **APM** → **Summary** and note current memory usage
2. Click "Memory Intensive" button 5 times
3. Wait a minute and refresh
4. Observe memory changes

**What to observe**:
- Memory usage spikes
- Garbage collection patterns
- Memory trends over time

**Challenge**:
- Set up an alert for high memory usage
- What happens if you click it 20 times rapidly?

---

## 📊 Exercise 7: Creating a Custom Dashboard

**Goal**: Build a useful monitoring dashboard

**Steps**:
1. Go to **Dashboards** → **Create a dashboard**
2. Add these widgets:
   - Response time chart (line chart)
   - Error rate (billboard)
   - Throughput (area chart)
   - Slowest transactions (table)
3. Arrange them in a useful layout
4. Save your dashboard

**NRQL queries to use**:

```sql
-- Response Time
SELECT average(duration) 
FROM Transaction 
WHERE appName = 'NewRelic Learning App' 
TIMESERIES

-- Error Rate
SELECT percentage(count(*), WHERE error IS true) 
FROM Transaction 
WHERE appName = 'NewRelic Learning App'

-- Throughput
SELECT rate(count(*), 1 minute) 
FROM Transaction 
WHERE appName = 'NewRelic Learning App' 
TIMESERIES

-- Slowest Transactions
SELECT average(duration) as 'Avg Time', 
       count(*) as 'Count' 
FROM Transaction 
WHERE appName = 'NewRelic Learning App' 
FACET name
```

---

## 🚨 Exercise 8: Alert Conditions

**Goal**: Set up effective alerting

**Create these alert conditions**:

1. **High Response Time Alert**
   - Condition: Transaction duration > 2 seconds
   - For at least: 5 minutes
   - Action: Send email

2. **Error Rate Alert**
   - Condition: Error rate > 5%
   - For at least: 3 minutes
   - Action: Send email

3. **Throughput Drop Alert**
   - Condition: Request rate drops > 50%
   - For at least: 5 minutes
   - Action: Send email

**Test your alerts**:
- Use the app buttons to trigger conditions
- Verify you receive notifications
- Practice acknowledging alerts

---

## 🔬 Exercise 9: NRQL Mastery

**Goal**: Become proficient with NRQL queries

**Try these queries**:

```sql
-- 1. All transactions grouped by name with percentiles
SELECT average(duration), percentile(duration, 50, 95, 99) 
FROM Transaction 
FACET name 
SINCE 1 hour ago

-- 2. Error rate by transaction
SELECT percentage(count(*), WHERE error IS true) 
FROM Transaction 
FACET name 
SINCE 1 hour ago

-- 3. Compare this hour to last hour
SELECT average(duration) 
FROM Transaction 
FACET name 
SINCE 1 hour ago 
COMPARE WITH 1 hour ago

-- 4. Requests by HTTP method
SELECT count(*) 
FROM Transaction 
FACET request.method 
SINCE 1 hour ago

-- 5. Slowest individual transactions
SELECT max(duration), timestamp 
FROM Transaction 
FACET name 
SINCE 1 hour ago

-- 6. Custom attributes
SELECT count(*) 
FROM Transaction 
WHERE customerId IS NOT NULL 
FACET planType 
SINCE 1 hour ago
```

**Challenge**:
- Write a query to find all transactions slower than 1 second
- Create a query to compare weekday vs weekend traffic (when you have more data)

---

## 🎮 Exercise 10: Load Testing

**Goal**: See how your app performs under load

**Steps**:
1. Open the app in multiple browser tabs (3-5 tabs)
2. In each tab, rapidly click different buttons
3. Generate diverse traffic patterns
4. Monitor in New Relic real-time

**What to observe**:
- How does throughput increase?
- Do response times degrade?
- Any memory issues?
- Error rate changes?

**Advanced challenge**:
- Use a tool like `Apache Bench` or `wrk` to generate real load:
  ```bash
  # Install Apache Bench (if not installed)
  # On Mac: brew install httpd
  
  # Generate 1000 requests with 10 concurrent connections
  ab -n 1000 -c 10 http://localhost:5000/api/users
  ```

---

## 🏆 Final Project: Real-World Scenario

**Scenario**: You're a DevOps engineer. Users are complaining the app is slow.

**Your mission**:
1. Generate mixed traffic (some slow, some fast, some errors)
2. Use New Relic to diagnose the issues
3. Identify the top 3 performance problems
4. Write a report with:
   - What's wrong
   - Which endpoints are affected
   - Evidence from New Relic (screenshots of charts)
   - Recommended fixes
5. Set up alerts to prevent future issues

**Success criteria**:
- You can identify all slow endpoints
- You can explain why they're slow
- You've set up appropriate alerts
- You understand the user experience impact

---

## 📝 Learning Checklist

Track your progress:

- [ ] Understand APM basics (response time, throughput, errors)
- [ ] Can read transaction traces
- [ ] Can identify slow queries
- [ ] Understand error tracking
- [ ] Can create custom metrics
- [ ] Can write basic NRQL queries
- [ ] Can create dashboards
- [ ] Can set up alert conditions
- [ ] Understand distributed tracing
- [ ] Can analyze application performance

---

## 🎓 Graduation Test

You're ready for production monitoring when you can:

1. ✅ Diagnose a performance issue within 5 minutes
2. ✅ Create a meaningful dashboard in 10 minutes
3. ✅ Write 5 different NRQL queries without looking them up
4. ✅ Set up appropriate alerts for a new service
5. ✅ Explain the difference between APM, Infrastructure, and Logs
6. ✅ Know when to use custom metrics vs events
7. ✅ Can interpret distributed traces
8. ✅ Understand Apdex scores and why they matter

---

## 🚀 Next Level

After mastering these exercises:

1. **Add Browser Monitoring**: Install New Relic Browser agent in the React app
2. **Log Management**: Integrate Winston logs with New Relic
3. **Infrastructure**: Monitor the host machine
4. **Synthetic Monitoring**: Create synthetic checks for your endpoints
5. **Compare Tools**: Try Datadog or Prometheus/Grafana
6. **Microservices**: Build a multi-service app and track distributed traces

---

**Happy Learning! 🎉**

Remember: The best way to learn is by doing. Don't just read these exercises—actually do them!

