# 🚀 Quick Setup Guide

Follow these steps to get your Monday Clone app up and running in minutes!

## Step 1: MongoDB Atlas Setup

1. **Create a MongoDB Atlas Account**
   - Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
   - Sign up for free (no credit card required!)

2. **Create a New Cluster**
   - Click "Build a Database"
   - Choose the **FREE** tier (M0 Sandbox)
   - Select a cloud provider and region closest to you
   - Name your cluster (or keep the default)
   - Click "Create Cluster"

3. **Set Up Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create a username and password (save these!)
   - Set privileges to "Read and write to any database"
   - Click "Add User"

4. **Set Up Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development, click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, add only your server's IP
   - Click "Confirm"

5. **Get Your Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://...`)
   - **Important**: Replace `<password>` with your actual password!

## Step 2: Configure Environment Variables

1. **Open `.env.local`** in your project root

2. **Update with your MongoDB details**:
   ```env
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/monday-app?retryWrites=true&w=majority
   MONGODB_DB=monday-app
   ```

   Example:
   ```env
   MONGODB_URI=mongodb+srv://john:MySecurePass123@cluster0.abc123.mongodb.net/monday-app?retryWrites=true&w=majority
   MONGODB_DB=monday-app
   ```

3. **Save the file**

## Step 3: Run the Application

```bash
npm run dev
```

## Step 4: Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## 🎉 You're All Set!

### First Steps in the App:

1. **Create Your First Board**
   - Click "Create Your First Board" button
   - Choose a name and icon
   - Click "Create Board"

2. **Add Tasks**
   - Click the "New Item" button
   - Enter task names and press Enter
   - Click "Done" when finished

3. **Manage Tasks**
   - Click on task names to edit them
   - Change status, priority, and progress
   - Add due dates
   - Switch between Table and Kanban views

## 🔧 Troubleshooting

### Can't connect to MongoDB?
- ✅ Double-check your username and password in `.env.local`
- ✅ Make sure you've allowed network access (0.0.0.0/0 for development)
- ✅ Verify your connection string has no extra spaces
- ✅ Make sure you replaced `<password>` with your actual password

### Page not loading?
- ✅ Make sure `npm run dev` is running
- ✅ Check the terminal for any error messages
- ✅ Try restarting the dev server (Ctrl+C and then `npm run dev`)

### Dependencies issues?
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📱 Sample Data

Want to test with sample data? Here's a quick way:

1. Create a board called "Q1 Marketing Campaign" with 📊 icon
2. Add these tasks:
   - Design new landing page
   - Write blog posts
   - Social media strategy
   - Email campaign setup

## 🌐 Deploy to Production

When ready to deploy:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `MONGODB_URI`
     - `MONGODB_DB`
   - Click Deploy!

## 💡 Tips

- **Keyboard Shortcuts**: Press Enter when creating tasks to quickly add multiple
- **Quick Edit**: Click directly on task names to edit them inline
- **Hover Actions**: Hover over boards in the sidebar to see the delete button
- **Views**: Switch between Table (detailed) and Kanban (visual) views

## 🆘 Need Help?

- Check the main [README.md](README.md) for more details
- Review the MongoDB Atlas [documentation](https://docs.atlas.mongodb.com/)
- Open an issue on GitHub if you encounter problems

---

**Happy Building! 🚀**

