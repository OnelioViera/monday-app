# ⚡ Quick Start

Get your FlowBoard app running in 3 minutes!

## 🎯 Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] MongoDB Atlas account (free tier)
- [ ] Text editor (VS Code recommended)

## 🚀 Three-Step Setup

### Step 1: MongoDB Atlas (2 minutes)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account
2. Create a free cluster (M0 tier)
3. Add a database user (remember the username and password!)
4. Allow network access from anywhere (0.0.0.0/0)
5. Get your connection string (Database → Connect → Connect your application)

Your connection string looks like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/
```

### Step 2: Configure (30 seconds)

Edit `.env.local` and paste your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/monday-app?retryWrites=true&w=majority
MONGODB_DB=monday-app
```

**Remember**: Replace `YOUR_USERNAME`, `YOUR_PASSWORD`, and `YOUR_CLUSTER` with your actual values!

### Step 3: Run (30 seconds)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 🎨 Optional: Add Sample Data

Want to see the app with example boards and tasks? Visit:

```
http://localhost:3000/api/seed
```

This will populate your database with:
- 3 sample boards (Marketing, Product, Customer Success)
- 10 sample tasks with various statuses and priorities

**Note**: This will delete any existing data!

## 📱 What You Can Do Now

### Create Your First Board
1. Click "Create Your First Board" or the "Add Board" button
2. Choose a name (e.g., "My Projects")
3. Select an emoji icon
4. Click "Create Board"

### Add Tasks
1. Click the "New Item" button
2. Type a task name and press Enter
3. Add more tasks (press Enter after each)
4. Click "Done" when finished

### Manage Tasks
- **Edit**: Click on any task name
- **Change Status**: Use the status dropdown (To Do, In Progress, Done)
- **Set Priority**: Choose Low, Medium, or High
- **Add Due Date**: Click the date field
- **Track Progress**: Update the progress percentage
- **Delete**: Click the trash icon

### Switch Views
- **Table View**: Detailed spreadsheet-like view
- **Kanban View**: Visual card-based columns

### Search
- Use the search bar to filter tasks by name

## 🎯 Pro Tips

- Press **Enter** when adding tasks to quickly create multiple items
- **Click directly** on task names to edit them inline
- **Hover** over boards in the sidebar to reveal the delete button
- Use **keyboard shortcuts** for faster navigation

## 🐛 Troubleshooting

### "Failed to fetch boards"
→ Check your MongoDB connection string in `.env.local`

### "Cannot connect to database"
→ Verify network access is enabled in MongoDB Atlas

### Port 3000 already in use
→ Run: `PORT=3001 npm run dev`

### Need to start fresh?
1. Stop the dev server (Ctrl+C)
2. Visit `http://localhost:3000/api/seed` after restarting
3. Or manually delete data in MongoDB Atlas

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed features
- Check [SETUP.md](SETUP.md) for comprehensive setup guide
- Customize the app to fit your workflow
- Deploy to Vercel for production use

## 🆘 Still Having Issues?

1. Check the terminal for error messages
2. Verify all environment variables are set correctly
3. Make sure MongoDB Atlas cluster is active
4. Try restarting the dev server

## 🌟 You're Ready!

Start managing your tasks like a pro! 🚀

---

**Built with Next.js, TypeScript, Tailwind CSS, and MongoDB**

