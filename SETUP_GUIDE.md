# 🚀 New Relic Setup Guide

This guide will walk you through setting up your New Relic account and configuring the learning app.

## Step 1: Create New Relic Account

1. Go to [https://newrelic.com/signup](https://newrelic.com/signup)
2. Sign up for a **free account** (no credit card required)
3. Fill in your information and verify your email

## Step 2: Get Your License Key

After signing up and logging in:

1. Click on your **profile/account name** in the bottom left corner
2. Select **API Keys**
3. Find the **License key** section
4. Click **Copy** to copy your license key
   - It will look something like: `1234567890abcdefABCDEF1234567890ABCDEF12`

## Step 3: Configure the Application

1. In the project root, copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` in your text editor and paste your license key:
   ```
   NEW_RELIC_LICENSE_KEY=paste_your_actual_key_here
   NEW_RELIC_APP_NAME=NewRelic Learning App
   PORT=5000
   NODE_ENV=development
   ```

3. Save the file

## Step 4: Install and Run

```bash
# Install all dependencies (backend + frontend)
npm run install-all

# Start both servers
npm run dev
```

Wait 2-3 minutes for data to start appearing in New Relic.

## Step 5: Verify New Relic Connection

1. **Check Server Logs**: You should see:
   ```
   📊 New Relic monitoring enabled
   ```

2. **Check New Relic Dashboard**:
   - Go to [https://one.newrelic.com](https://one.newrelic.com)
   - Click **APM & Services** in the left menu
   - Look for **"NewRelic Learning App"**
   - If you don't see it yet, wait 2-3 minutes and refresh

3. **Generate Some Traffic**:
   - Open [http://localhost:3000](http://localhost:3000)
   - Click various buttons to generate traffic
   - Go back to New Relic and you should see data flowing in

## Step 6: Explore New Relic

### APM Dashboard
- Click on your app name to see the overview
- You'll see charts for:
  - Web transactions time
  - Throughput (requests per minute)
  - Error rate
  - Apdex score (user satisfaction)

### Transactions
- Click **Transactions** in the left menu
- See a list of all your endpoints
- Click on any transaction to see detailed traces

### Errors
- Click **Errors** in the left menu
- Use the "Random Error" button in the app to generate errors
- Watch them appear in real-time

### Distributed Tracing
- Click **Distributed tracing** in the left menu
- See the full path of requests through your app
- Click on any trace to see the waterfall view

## Troubleshooting

### "No data appearing in New Relic"

**Check 1: License Key**
- Make sure the license key is correct in `.env`
- No extra spaces or quotes around it

**Check 2: Server Running**
- Make sure the server started without errors
- Check the console for New Relic connection messages

**Check 3: Wait**
- New Relic can take 2-3 minutes to start showing data
- Generate some traffic by clicking buttons in the UI
- Refresh the New Relic page

**Check 4: Correct Account**
- Make sure you're logged into the correct New Relic account
- The account name should match what you signed up with

### "newrelic is not defined" error

This means New Relic didn't load properly. Check:
- Is `require('newrelic')` at the TOP of `server/index.js`?
- Is your license key valid?
- Try restarting the server

### Port 5000 already in use

```bash
# Edit .env and change the port
PORT=5001

# Edit client/.env and update the API URL
REACT_APP_API_URL=http://localhost:5001
```

## Next Steps

Once everything is working:

1. ✅ Generate traffic using the UI buttons
2. ✅ Explore different sections in New Relic
3. ✅ Create your first custom dashboard
4. ✅ Set up an alert condition
5. ✅ Try writing NRQL queries

## Useful New Relic Links

- **Main Dashboard**: [https://one.newrelic.com](https://one.newrelic.com)
- **Documentation**: [https://docs.newrelic.com](https://docs.newrelic.com)
- **NRQL Tutorial**: [https://docs.newrelic.com/docs/query-your-data/nrql-new-relic-query-language/get-started/introduction-nrql-new-relics-query-language/](https://docs.newrelic.com/docs/query-your-data/nrql-new-relic-query-language/get-started/introduction-nrql-new-relics-query-language/)
- **Community**: [https://discuss.newrelic.com](https://discuss.newrelic.com)

## Getting Help

If you're stuck:

1. Check the server console for error messages
2. Check the browser console for frontend errors
3. Look at the troubleshooting section above
4. Review the New Relic documentation
5. Ask in the New Relic community forums

---

**You're all set! Start exploring and learning! 🎉**

