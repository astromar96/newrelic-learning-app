# 👋 Welcome to Your New Relic Learning App!

## 🎯 What is this?

This is a complete full-stack application built specifically for learning application monitoring with New Relic. It includes:

- ✅ **Node.js/Express backend** with various monitoring scenarios
- ✅ **React frontend** with a beautiful UI
- ✅ **SQLite database** for realistic database monitoring
- ✅ **New Relic APM** integration pre-configured
- ✅ **Learning exercises** to master monitoring concepts
- ✅ **Ready-to-use dashboards** and alert examples

## 🚀 Get Started in 3 Steps

### Step 1: Get New Relic Account (5 minutes)
1. Go to [https://newrelic.com/signup](https://newrelic.com/signup)
2. Sign up for FREE (no credit card needed)
3. Copy your license key from **Account Settings** → **API Keys**

### Step 2: Configure the App (2 minutes)
```bash
cd ~/newrelic-learning-app

# Edit .env file and add your license key
# Change this line:
NEW_RELIC_LICENSE_KEY=your_license_key_here
```

### Step 3: Run the App (2 minutes)
```bash
# Install all dependencies (backend + frontend)
npm run install-all

# Start both servers
npm run dev
```

**That's it!** Open http://localhost:3000 and start clicking buttons!

## 📚 What Should I Read?

Here's the recommended reading order:

1. **START_HERE.md** ← You are here!
2. **SETUP_GUIDE.md** - Detailed setup instructions
3. **README.md** - Complete project documentation
4. **LEARNING_EXERCISES.md** - Hands-on exercises (★ Start here after setup)
5. **QUICK_REFERENCE.md** - Quick lookup guide

## 🎮 First Actions After Setup

1. **Open the app**: http://localhost:3000
2. **Click some buttons**: Generate traffic
3. **Open New Relic**: https://one.newrelic.com
4. **Find your app**: APM & Services → "NewRelic Learning App"
5. **Wait 2-3 minutes**: For data to appear
6. **Explore!**: Click around and see what happens

## 🎓 Learning Path

```
Day 1: Setup & Basics
├── Set up New Relic account
├── Configure and run the app
├── Generate traffic and observe metrics
└── Explore APM dashboard

Day 2: Transactions & Performance
├── Exercise 1: Baseline Performance
├── Exercise 2: Slow Transactions
└── Learn transaction traces

Day 3: Errors & Alerting
├── Exercise 3: Error Tracking
├── Exercise 8: Alert Conditions
└── Set up your first alert

Day 4: Custom Instrumentation
├── Exercise 4: Custom Metrics
├── Exercise 9: NRQL Queries
└── Create custom dashboard

Day 5: Advanced Topics
├── Exercise 5: Distributed Tracing
├── Exercise 7: Custom Dashboards
└── Exercise 10: Load Testing

Week 2: Real-World Practice
└── Final Project: Diagnose real issues
```

## 🎯 What Can You Monitor?

This app lets you practice monitoring:

| Scenario | What It Teaches |
|----------|-----------------|
| ✅ Normal Requests | Baseline performance, happy path |
| 🐌 Slow Queries | Performance bottlenecks, slow SQL |
| 🧠 Memory Intensive | Resource monitoring, memory leaks |
| ❌ Random Errors | Error tracking, error rates |
| 🌐 External Calls | External service monitoring |
| 📈 Custom Metrics | Business metrics, custom instrumentation |
| 🔄 Complex Operations | Distributed tracing, multi-step transactions |
| 👤 Database Operations | Database monitoring, query performance |

## 🏆 Goals by the End

You will be able to:

- ✅ Navigate New Relic confidently
- ✅ Write NRQL queries
- ✅ Create custom dashboards
- ✅ Set up meaningful alerts
- ✅ Diagnose performance issues
- ✅ Track custom business metrics
- ✅ Understand distributed tracing
- ✅ Use APM in production

## 💡 Pro Tips

1. **Generate diverse traffic**: Click different buttons to see different patterns
2. **Wait before checking**: New Relic takes 2-3 minutes to show data
3. **Do the exercises**: Reading isn't enough - practice!
4. **Break things**: Use the "Random Error" button - errors are learning opportunities
5. **Ask "why?"**: Don't just observe metrics - understand what they mean
6. **Experiment**: Modify the code and see how it affects monitoring

## 🆘 Need Help?

**Common Issues:**

1. **"No data in New Relic"**
   - Wait 2-3 minutes after starting
   - Check license key in `.env`
   - Generate traffic by clicking buttons
   - See SETUP_GUIDE.md troubleshooting section

2. **"Port already in use"**
   - Change `PORT=5000` to `PORT=5001` in `.env`
   - Update `REACT_APP_API_URL` in `client/.env`

3. **"Dependencies not installing"**
   - Make sure you have Node.js 14+
   - Try `npm cache clean --force` then `npm install`

**Resources:**
- 📖 See SETUP_GUIDE.md for detailed troubleshooting
- 🔍 Check New Relic docs: https://docs.newrelic.com
- 💬 Ask in New Relic community: https://discuss.newrelic.com

## 🎊 Ready to Start?

1. Make sure the app is running: `npm run dev`
2. Open http://localhost:3000
3. Click some buttons
4. Open https://one.newrelic.com
5. Find your app under "APM & Services"
6. Start with Exercise 1 in LEARNING_EXERCISES.md

## 📁 Project Structure

```
newrelic-learning-app/
├── 📄 START_HERE.md          ← You are here
├── 📄 SETUP_GUIDE.md          ← Setup instructions
├── 📄 README.md               ← Full documentation
├── 📄 LEARNING_EXERCISES.md   ← Hands-on exercises ★
├── 📄 QUICK_REFERENCE.md      ← Quick lookup guide
├── 📄 package.json            ← Backend dependencies
├── 📄 newrelic.js             ← New Relic config
├── 📄 .env                    ← Environment variables (configure this!)
├── 📁 server/                 ← Backend code
│   ├── index.js               ← Main server
│   ├── database.js            ← Database operations
│   └── logger.js              ← Logging
└── 📁 client/                 ← React frontend
    ├── src/
    │   ├── App.js             ← Main component
    │   └── App.css            ← Styles
    └── package.json           ← Frontend dependencies
```

## 🎯 Next Steps

**Right Now:**
1. ✅ Complete setup (if not done)
2. ✅ Open the app and generate traffic
3. ✅ Verify New Relic is receiving data

**Next 30 Minutes:**
1. 📖 Read LEARNING_EXERCISES.md
2. 🎮 Complete Exercise 1 (Baseline Performance)
3. 🎮 Complete Exercise 2 (Slow Transactions)

**This Week:**
1. 📚 Complete exercises 1-5
2. 🎨 Create your first custom dashboard
3. 🚨 Set up your first alert

**Next Week:**
1. 🏆 Complete the final project
2. 🚀 Try adding your own custom metrics
3. 🌟 Build on this to monitor your own projects

---

## 🎉 You're All Set!

**The app is ready to go. Your New Relic journey starts now!**

### ⚡ Quick Start:
```bash
npm run dev
```

### 🌐 Open:
- App: http://localhost:3000
- New Relic: https://one.newrelic.com

### 📚 Learn:
Start with **LEARNING_EXERCISES.md** Exercise 1

---

**Happy Monitoring! 🚀📊**

*Remember: The best way to learn is by doing. Start clicking those buttons and watch what happens in New Relic!*

