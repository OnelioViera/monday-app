import { ObjectId } from 'mongodb';

export interface Board {
  _id?: ObjectId;
  id: string;
  name: string;
  icon: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Item {
  _id?: ObjectId;
  id: string;
  boardId: string;
  name: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string[];
  dueDate: string;
  progress: number;
  tags?: string[];
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface StatusOption {
  value: 'todo' | 'in-progress' | 'done';
  label: string;
  color: string;
}

export interface PriorityOption {
  value: 'low' | 'medium' | 'high';
  label: string;
  color: string;
}

