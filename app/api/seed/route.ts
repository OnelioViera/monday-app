import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

/**
 * Seed endpoint to populate the database with sample data
 * Access this at: http://localhost:3000/api/seed
 * 
 * WARNING: This will delete all existing data!
 */
export async function GET() {
  try {
    const db = await getDatabase();
    
    // Clear existing data
    await db.collection('boards').deleteMany({});
    await db.collection('items').deleteMany({});
    
    // Sample boards
    const boards = [
      { id: '1', name: 'Q1 Marketing Campaign', icon: '📊', createdAt: new Date(), updatedAt: new Date() },
      { id: '2', name: 'Product Development', icon: '🚀', createdAt: new Date(), updatedAt: new Date() },
      { id: '3', name: 'Customer Success', icon: '💬', createdAt: new Date(), updatedAt: new Date() }
    ];
    
    await db.collection('boards').insertMany(boards);
    
    // Sample items
    const items = [
      {
        id: '1',
        boardId: '1',
        name: 'Design new landing page',
        status: 'in-progress',
        priority: 'high',
        assignee: ['John Doe', 'Jane Smith'],
        dueDate: '2024-12-15',
        progress: 65,
        tags: ['Design', 'Frontend', 'Urgent'],
        description: 'Create responsive design for Q1 campaign',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        boardId: '1',
        name: 'Write blog posts',
        status: 'todo',
        priority: 'medium',
        assignee: ['Jane Smith'],
        dueDate: '2024-12-20',
        progress: 0,
        tags: ['Documentation'],
        description: 'Prepare 5 blog posts for content marketing',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        boardId: '1',
        name: 'Social media strategy',
        status: 'done',
        priority: 'high',
        assignee: ['Mike Johnson'],
        dueDate: '2024-11-10',
        progress: 100,
        tags: [],
        description: 'Develop comprehensive social media plan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4',
        boardId: '1',
        name: 'Email campaign setup',
        status: 'in-progress',
        priority: 'low',
        assignee: ['Sarah Wilson'],
        dueDate: '2024-12-25',
        progress: 30,
        tags: ['Review'],
        description: 'Configure email automation workflows',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '5',
        boardId: '2',
        name: 'API Development',
        status: 'in-progress',
        priority: 'high',
        assignee: ['Dev Team'],
        dueDate: '2025-01-01',
        progress: 45,
        tags: ['Backend', 'Feature'],
        description: 'Build REST API endpoints',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '6',
        boardId: '2',
        name: 'Database Schema Design',
        status: 'done',
        priority: 'high',
        assignee: ['Tech Lead'],
        dueDate: '2024-11-05',
        progress: 100,
        tags: ['Backend'],
        description: 'Design MongoDB schema',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '7',
        boardId: '2',
        name: 'UI/UX Improvements',
        status: 'todo',
        priority: 'medium',
        assignee: ['Design Team'],
        dueDate: '2025-01-15',
        progress: 0,
        tags: ['Design', 'Frontend'],
        description: 'Enhance user interface and experience',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '8',
        boardId: '3',
        name: 'Customer Onboarding Flow',
        status: 'in-progress',
        priority: 'high',
        assignee: ['Support Team'],
        dueDate: '2024-12-30',
        progress: 55,
        tags: ['Feature', 'Review'],
        description: 'Improve new customer onboarding process',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '9',
        boardId: '3',
        name: 'Support Documentation',
        status: 'in-progress',
        priority: 'medium',
        assignee: ['Tech Writer'],
        dueDate: '2025-01-10',
        progress: 40,
        tags: ['Documentation'],
        description: 'Create comprehensive help documentation',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '10',
        boardId: '3',
        name: 'Customer Feedback Survey',
        status: 'todo',
        priority: 'low',
        assignee: ['Marketing Team'],
        dueDate: '2025-01-20',
        progress: 0,
        tags: ['Testing'],
        description: 'Gather customer satisfaction feedback',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    await db.collection('items').insertMany(items);
    
    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully!',
      data: {
        boards: boards.length,
        items: items.length
      }
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to seed database',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

