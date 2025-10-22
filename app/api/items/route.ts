import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { Item } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const boardId = searchParams.get('boardId');
    
    const db = await getDatabase();
    const query = boardId ? { boardId } : {};
    const items = await db.collection<Item>('items').find(query).toArray();
    
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await getDatabase();
    
    const newItem: Item = {
      id: body.id || Date.now().toString(),
      boardId: body.boardId,
      name: body.name,
      status: body.status || 'todo',
      priority: body.priority || 'medium',
      assignee: body.assignee || [],
      projectManagers: body.projectManagers || [],
      dueDate: body.dueDate || '',
      progress: body.progress || 0,
      description: body.description || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await db.collection('items').insertOne(newItem);
    
    return NextResponse.json({ ...newItem, _id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    );
  }
}

