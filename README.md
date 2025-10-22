# FlowBoard - Work Management Platform

A modern work management platform built with Next.js, TypeScript, Tailwind CSS, and MongoDB Atlas. FlowBoard provides a beautiful and intuitive interface for managing boards, tasks, and team workflows.

![FlowBoard](https://img.shields.io/badge/Next.js-15.0-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

## ✨ Features

- 📋 **Multiple Boards** - Create and manage multiple project boards
- ✅ **Task Management** - Add, edit, delete tasks with rich metadata
- 🎨 **Beautiful UI** - Modern, gradient-based design with smooth transitions
- 📊 **Multiple Views** - Switch between Table and Kanban views
- 🔍 **Search** - Quickly find tasks across your boards
- 👥 **Assignees** - Assign team members to tasks
- 📅 **Due Dates** - Set and track task deadlines
- 📈 **Progress Tracking** - Visual progress bars for each task
- 🎯 **Priority Levels** - Mark tasks as Low, Medium, or High priority
- 🚦 **Status Management** - Track tasks through To Do, In Progress, and Done
- 💾 **MongoDB Integration** - All data persists to MongoDB Atlas
- ⚡ **Real-time Updates** - Instant UI updates with API integration

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier works great!)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd monday-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB Atlas**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free account if you don't have one
   - Create a new cluster (free tier M0 is perfect)
   - Click "Connect" and choose "Connect your application"
   - Copy your connection string

4. **Configure environment variables**
   - Copy `.env.example` to `.env.local`
   ```bash
   cp .env.example .env.local
   ```
   - Edit `.env.local` and add your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   MONGODB_DB=monday-app
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

The application will automatically create the necessary collections in your MongoDB database:
- `boards` - Stores all project boards
- `items` - Stores all tasks/items

No manual database setup is required! 🎉

## 📁 Project Structure

```
monday-app/
├── app/
│   ├── api/
│   │   ├── boards/          # Board CRUD operations
│   │   └── items/           # Item CRUD operations
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main application component
├── lib/
│   ├── mongodb.ts           # MongoDB connection utility
│   └── utils.ts             # Utility functions
├── types/
│   └── index.ts             # TypeScript type definitions
├── .env.example             # Environment variables template
├── .env.local               # Your local environment variables (create this)
├── package.json             # Dependencies and scripts
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Components**: Custom components with shadcn/ui utilities

## 📝 API Routes

### Boards

- `GET /api/boards` - Get all boards
- `POST /api/boards` - Create a new board
- `PUT /api/boards/[id]` - Update a board
- `DELETE /api/boards/[id]` - Delete a board (and all its items)

### Items

- `GET /api/items?boardId=[id]` - Get all items for a board
- `POST /api/items` - Create a new item
- `PUT /api/items/[id]` - Update an item
- `DELETE /api/items/[id]` - Delete an item

## 🎨 Features in Detail

### Board Management
- Create boards with custom names and emoji icons
- Switch between boards instantly
- Delete boards (with confirmation)
- Visual workspace overview

### Task Management
- Quick task creation with Enter key support
- Inline editing of task names
- Rich task properties:
  - Status (To Do, In Progress, Done)
  - Priority (Low, Medium, High)
  - Assignees with avatar display
  - Due dates with date picker
  - Progress percentage with visual indicator
  - Task descriptions

### Views
- **Table View**: Spreadsheet-like interface with all task details
- **Kanban View**: Card-based view organized by status columns

### Search & Filter
- Real-time search across all tasks
- Search by task name

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Environment Variables on Vercel
Add these in your Vercel project settings:
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `MONGODB_DB` - Your database name (e.g., "monday-app")

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by [Monday.com](https://monday.com)
- Built with modern web technologies
- UI design influenced by contemporary SaaS applications

## 📧 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

**Happy Task Managing! 🎉**

