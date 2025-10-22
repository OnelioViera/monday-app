import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const db = await getDatabase();
    const { id: boardId } = await params;
    
    // Delete the board
    await db.collection('boards').deleteOne({ id: boardId });
    
    // Delete all items associated with this board
    await db.collection('items').deleteMany({ boardId });
    
    return NextResponse.json({ message: 'Board deleted successfully' });
  } catch (error) {
    console.error('Error deleting board:', error);
    return NextResponse.json(
      { error: 'Failed to delete board' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const db = await getDatabase();
    const { id: boardId } = await params;
    
    const updateData = {
      name: body.name,
      icon: body.icon,
      updatedAt: new Date(),
    };
    
    await db.collection('boards').updateOne(
      { id: boardId },
      { $set: updateData }
    );
    
    return NextResponse.json({ message: 'Board updated successfully' });
  } catch (error) {
    console.error('Error updating board:', error);
    return NextResponse.json(
      { error: 'Failed to update board' },
      { status: 500 }
    );
  }
}

