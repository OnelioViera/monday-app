import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { Board } from '@/types';

export async function GET() {
  try {
    const db = await getDatabase();
    const boards = await db.collection<Board>('boards').find({}).toArray();
    
    return NextResponse.json(boards);
  } catch (error) {
    console.error('Error fetching boards:', error);
    return NextResponse.json(
      { error: 'Failed to fetch boards' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await getDatabase();
    
    const newBoard: Board = {
      id: body.id || Date.now().toString(),
      name: body.name,
      icon: body.icon,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await db.collection('boards').insertOne(newBoard);
    
    return NextResponse.json({ ...newBoard, _id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error creating board:', error);
    return NextResponse.json(
      { error: 'Failed to create board' },
      { status: 500 }
    );
  }
}

