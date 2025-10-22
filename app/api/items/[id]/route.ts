import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const db = await getDatabase();
    const { id: itemId } = await params;
    
    await db.collection('items').deleteOne({ id: itemId });
    
    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json(
      { error: 'Failed to delete item' },
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
    const { id: itemId } = await params;
    
    const updateData = {
      ...body,
      updatedAt: new Date(),
    };
    
    // Remove fields that shouldn't be updated directly
    delete updateData.id;
    delete updateData._id;
    delete updateData.createdAt;
    
    await db.collection('items').updateOne(
      { id: itemId },
      { $set: updateData }
    );
    
    return NextResponse.json({ message: 'Item updated successfully' });
  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json(
      { error: 'Failed to update item' },
      { status: 500 }
    );
  }
}

