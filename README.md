# 🔍 New Relic Learning App

A full-stack application designed to help you learn and practice application monitoring with New Relic. This app includes various endpoints that simulate different monitoring scenarios like slow queries, errors, memory usage, and custom metrics.

## 🎯 What You'll Learn

- **Application Performance Monitoring (APM)**: Track response times, throughput, and error rates
- **Distributed Tracing**: Follow requests through your application
- **Custom Metrics**: Create and track business-specific metrics
- **Error Tracking**: Monitor and analyze application errors
- **Database Monitoring**: Track query performance
- **Infrastructure Monitoring**: Monitor server resources (CPU, memory, disk)

## 🏗️ Tech Stack

- **Backend**: Node.js + Express.js
- **Frontend**: React
- **Database**: SQLite
- **Monitoring**: New Relic APM
- **Logging**: Winston

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A New Relic account (free tier available at [newrelic.com](https://newrelic.com/signup))

## 🚀 Quick Start

### 1. Get Your New Relic License Key

1. Sign up for a free New Relic account at [https://newrelic.com/signup](https://newrelic.com/signup)
2. After logging in, go to: **Account Settings** → **API Keys**
3. Copy your **License Key** (starts with a long string of characters)

### 2. Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 3. Configure New Relic

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your New Relic license key:

```
NEW_RELIC_LICENSE_KEY=your_actual_license_key_here
NEW_RELIC_APP_NAME=NewRelic Learning App
PORT=5000
NODE_ENV=development
```

### 4. Start the Application

**Option 1: Run both frontend and backend together**
```bash
npm run dev
```

**Option 2: Run separately**
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

### 5. Access the Application

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **New Relic Dashboard**: [https://one.newrelic.com](https://one.newrelic.com)

## 🎮 Available Test Scenarios

The app includes these endpoints for learning different monitoring concepts:

### 1. ✅ Normal Request (`/api/users`)
- **Purpose**: Baseline performance monitoring
- **Learn**: Response times, throughput, successful transactions

### 2. 🐌 Slow Query (`/api/slow-query?delay=3000`)
- **Purpose**: Identify performance bottlenecks
- **Learn**: Transaction traces, slow query detection, Apdex score impact

### 3. 🧠 Memory Intensive (`/api/memory-intensive?size=1000000`)
- **Purpose**: Monitor memory consumption
- **Learn**: Memory usage patterns, garbage collection

### 4. ❌ Random Error (`/api/random-error`)
- **Purpose**: Error tracking and alerting
- **Learn**: Error rates, error analytics, alert conditions
- **Note**: 30% chance of throwing an error

### 5. 🌐 External API Call (`/api/external-call`)
- **Purpose**: Monitor external service dependencies
- **Learn**: External service tracking, distributed tracing

### 6. 📈 Custom Metrics (`/api/custom-metrics`)
- **Purpose**: Track business-specific metrics
- **Learn**: Custom metric creation, custom attributes

### 7. 🔄 Complex Operation (`/api/complex-operation`)
- **Purpose**: Multi-step transaction monitoring
- **Learn**: Transaction breakdown, waterfall charts

### 8. 👤 Create User (`POST /api/users`)
- **Purpose**: Monitor database write operations
- **Learn**: Database monitoring, transaction tracking

## 📊 New Relic Dashboard Guide

### Where to Find What

1. **APM Summary**
   - Go to: **APM & Services** → Select your app
   - View: Response time, throughput, error rate, Apdex score

2. **Transactions**
   - Go to: **APM** → **Transactions**
   - View: Individual endpoint performance
   - Sort by: Slowest, Most time consuming

3. **Errors**
   - Go to: **APM** → **Errors**
   - View: Error rate, error analytics, stack traces

4. **Distributed Tracing**
   - Go to: **APM** → **Distributed tracing**
   - View: Full request path, service dependencies

5. **Databases**
   - Go to: **APM** → **Databases**
   - View: SQL queries, query performance

6. **Custom Dashboards**
   - Go to: **Dashboards** → **Create dashboard**
   - Add widgets for custom metrics

## 🎓 Learning Exercises

### Exercise 1: Identify Slow Endpoints
1. Click "Slow Query" button 5-10 times
2. Go to New Relic → Transactions
3. Find the slowest transaction
4. Examine the transaction trace

### Exercise 2: Error Tracking
1. Click "Random Error" button 20 times
2. Go to New Relic → Errors
3. Analyze error rate and patterns
4. Create an alert condition for error rate > 10%

### Exercise 3: Custom Metrics
1. Click "Custom Metrics" button several times
2. Go to New Relic → Query your data
3. Run NRQL query:
   ```sql
   SELECT average(Custom/BusinessMetric) FROM Metric 
   WHERE appName = 'NewRelic Learning App' 
   SINCE 30 minutes ago TIMESERIES
   ```

### Exercise 4: Performance Optimization
1. Generate various types of traffic
2. Identify the slowest endpoints
3. Analyze the transaction traces
4. Understand where time is being spent

### Exercise 5: Alerting
1. Create alert conditions for:
   - Response time > 2 seconds
   - Error rate > 5%
   - Throughput drops below expected
2. Set up notification channels (email, Slack)
3. Trigger alerts by using the test endpoints

## 🔍 NRQL Queries to Try

New Relic Query Language (NRQL) examples:

```sql
-- Average response time by transaction
SELECT average(duration) FROM Transaction 
WHERE appName = 'NewRelic Learning App' 
FACET name SINCE 1 hour ago

-- Error rate
SELECT percentage(count(*), WHERE error IS true) 
FROM Transaction SINCE 1 hour ago

-- Throughput (requests per minute)
SELECT rate(count(*), 1 minute) FROM Transaction 
SINCE 30 minutes ago TIMESERIES

-- Custom metrics
SELECT average(Custom/BusinessMetric) FROM Metric 
SINCE 1 hour ago TIMESERIES

-- Slowest transactions
SELECT average(duration), max(duration) FROM Transaction 
FACET name SINCE 1 hour ago

-- Transactions by HTTP status code
SELECT count(*) FROM Transaction 
FACET httpResponseCode SINCE 1 hour ago
```

## 🛠️ Troubleshooting

### New Relic Not Receiving Data?

1. **Check License Key**: Ensure your license key is correct in `.env`
2. **Check Logs**: Look for New Relic connection messages in the server logs
3. **Wait a Few Minutes**: It can take 2-3 minutes for data to appear
4. **Verify Account**: Make sure you're logged into the correct New Relic account

### Port Already in Use?

If port 5000 or 3000 is already in use:

```bash
# Change backend port in .env
PORT=5001

# Change frontend proxy (if needed)
# Edit client/package.json and add:
"proxy": "http://localhost:5001"
```

### SQLite Database Issues?

```bash
# Remove and recreate database
rm -rf data/
npm run server
```

## 📁 Project Structure

```
newrelic-learning-app/
├── server/
│   ├── index.js          # Main server file
│   ├── database.js       # Database operations
│   └── logger.js         # Logging configuration
├── client/
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   ├── App.css       # Styles
│   │   └── index.js      # React entry point
│   └── package.json
├── newrelic.js           # New Relic configuration
├── package.json          # Backend dependencies
├── .env                  # Environment variables (create this)
└── README.md            # This file
```

## 🎯 Next Steps

1. **Explore More Features**:
   - Infrastructure monitoring
   - Log management
   - Browser monitoring (add New Relic Browser agent to frontend)
   - Synthetic monitoring

2. **Create Custom Dashboards**:
   - Build dashboards for specific use cases
   - Add widgets for key metrics
   - Share dashboards with team members

3. **Set Up Alerts**:
   - Create meaningful alert conditions
   - Test alert notifications
   - Configure multiple notification channels

4. **Try Other APM Tools**:
   - Datadog
   - Dynatrace
   - AppDynamics
   - Compare features and pricing

## 📚 Additional Resources

- [New Relic Documentation](https://docs.newrelic.com/)
- [NRQL Reference](https://docs.newrelic.com/docs/query-your-data/nrql-new-relic-query-language/get-started/introduction-nrql-new-relics-query-language/)
- [New Relic University](https://learn.newrelic.com/)
- [APM Best Practices](https://docs.newrelic.com/docs/new-relic-solutions/best-practices-guides/full-stack-observability/apm-best-practices-guide/)

## 🤝 Contributing

This is a learning project! Feel free to:
- Add more test scenarios
- Improve the UI
- Add more monitoring tools
- Create additional exercises

## 📝 License

MIT License - Feel free to use this for learning and teaching!

---

**Happy Monitoring! 🎉**

For questions or issues, refer to the [New Relic Community](https://discuss.newrelic.com/).

