'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Calendar, Users, BarChart, Trash2, X, FolderPlus, AlertCircle } from 'lucide-react';
import { Board, Item, StatusOption, PriorityOption } from '@/types';

export default function FlowBoard() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [currentBoard, setCurrentBoard] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'table' | 'kanban'>('table');
  const [showNewBoardModal, setShowNewBoardModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardIcon, setNewBoardIcon] = useState('📁');
  const [boardToDelete, setBoardToDelete] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [showNewItemForm, setShowNewItemForm] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingAssignee, setEditingAssignee] = useState<string | null>(null);
  const [newAssigneeName, setNewAssigneeName] = useState('');
  const [editingTags, setEditingTags] = useState<string | null>(null);
  const [newTagName, setNewTagName] = useState('');
  const [showTagManagerModal, setShowTagManagerModal] = useState(false);
  const [newCustomTagName, setNewCustomTagName] = useState('');
  const [newCustomTagColor, setNewCustomTagColor] = useState('bg-blue-500');
  
  const iconOptions = ['📁', '📊', '🚀', '💬', '🎯', '💡', '🔥', '⭐', '🎨', '📈', '🛠️', '📝'];
  
  const defaultTags = [
    { name: 'Blocked', color: 'bg-red-500' },
    { name: 'Review', color: 'bg-yellow-500' },
    { name: 'Testing', color: 'bg-purple-500' },
    { name: 'Bug', color: 'bg-orange-500' },
    { name: 'Feature', color: 'bg-green-500' },
    { name: 'Design', color: 'bg-pink-500' },
    { name: 'Backend', color: 'bg-indigo-500' },
    { name: 'Frontend', color: 'bg-cyan-500' },
    { name: 'Urgent', color: 'bg-red-600' },
    { name: 'Documentation', color: 'bg-blue-500' },
  ];
  
  const [predefinedTags, setPredefinedTags] = useState<Array<{ name: string; color: string }>>(defaultTags);
  
  const availableColors = [
    { name: 'Red', value: 'bg-red-500' },
    { name: 'Orange', value: 'bg-orange-500' },
    { name: 'Yellow', value: 'bg-yellow-500' },
    { name: 'Green', value: 'bg-green-500' },
    { name: 'Blue', value: 'bg-blue-500' },
    { name: 'Indigo', value: 'bg-indigo-500' },
    { name: 'Purple', value: 'bg-purple-500' },
    { name: 'Pink', value: 'bg-pink-500' },
    { name: 'Cyan', value: 'bg-cyan-500' },
    { name: 'Gray', value: 'bg-gray-500' },
  ];
  
  const statusOptions: StatusOption[] = [
    { value: 'todo', label: 'To Do', color: 'bg-gray-500' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-blue-500' },
    { value: 'done', label: 'Done', color: 'bg-green-500' }
  ];
  
  const priorityOptions: PriorityOption[] = [
    { value: 'low', label: 'Low', color: 'bg-green-400' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-400' },
    { value: 'high', label: 'High', color: 'bg-red-400' }
  ];
  
  // Fetch boards on mount
  useEffect(() => {
    fetchBoards();
    loadCustomTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Load custom tags from localStorage
  const loadCustomTags = () => {
    try {
      const saved = localStorage.getItem('flowboard_custom_tags');
      if (saved) {
        setPredefinedTags(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading custom tags:', error);
    }
  };
  
  // Save custom tags to localStorage
  const saveCustomTags = (tags: Array<{ name: string; color: string }>) => {
    try {
      localStorage.setItem('flowboard_custom_tags', JSON.stringify(tags));
      setPredefinedTags(tags);
    } catch (error) {
      console.error('Error saving custom tags:', error);
    }
  };
  
  // Fetch items when current board changes
  useEffect(() => {
    if (currentBoard) {
      fetchItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBoard]);
  
  const fetchBoards = async () => {
    try {
      const response = await fetch('/api/boards');
      const data = await response.json();
      setBoards(data);
      if (data.length > 0 && !currentBoard) {
        setCurrentBoard(data[0].id);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching boards:', error);
      setLoading(false);
    }
  };
  
  const fetchItems = async () => {
    if (!currentBoard) return;
    
    try {
      const response = await fetch(`/api/items?boardId=${currentBoard}`);
      const data = await response.json();
      console.log(`Fetched ${data.length} items for board ${currentBoard}`);
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
      setItems([]);
    }
  };
  
  const handleStatusChange = async (itemId: string, newStatus: 'todo' | 'in-progress' | 'done') => {
    try {
      await fetch(`/api/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      setItems(items.map(item => 
        item.id === itemId ? { ...item, status: newStatus } : item
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  
  const handlePriorityChange = async (itemId: string, newPriority: 'low' | 'medium' | 'high') => {
    try {
      await fetch(`/api/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priority: newPriority }),
      });
      setItems(items.map(item => 
        item.id === itemId ? { ...item, priority: newPriority } : item
      ));
    } catch (error) {
      console.error('Error updating priority:', error);
    }
  };
  
  const handleProgressChange = async (itemId: string, newProgress: string) => {
    try {
      const progress = parseInt(newProgress);
      await fetch(`/api/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress }),
      });
      setItems(items.map(item => 
        item.id === itemId ? { ...item, progress } : item
      ));
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };
  
  const addNewItem = async () => {
    if (newItemName.trim() && currentBoard) {
      try {
        const response = await fetch('/api/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            boardId: currentBoard,
            name: newItemName,
          }),
        });
        
        if (!response.ok) {
          throw new Error(`Failed to create item: ${response.status}`);
        }
        
        const newItem = await response.json();
        console.log('New item created:', newItem);
        
        // Add the new item to the current items list
        setItems(prevItems => [...prevItems, newItem]);
        setNewItemName('');
      } catch (error) {
        console.error('Error creating item:', error);
        alert('Failed to create item. Please try again.');
      }
    }
  };
  
  const deleteItem = async (itemId: string) => {
    try {
      await fetch(`/api/items/${itemId}`, { method: 'DELETE' });
      setItems(items.filter(item => item.id !== itemId));
      // Clear search to show all remaining items
      setSearchTerm('');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  
  const updateItemName = async (itemId: string, newName: string) => {
    try {
      await fetch(`/api/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      });
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating item name:', error);
    }
  };
  
  const updateItemDueDate = async (itemId: string, dueDate: string) => {
    try {
      await fetch(`/api/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dueDate }),
      });
      setItems(items.map(item => 
        item.id === itemId ? { ...item, dueDate } : item
      ));
    } catch (error) {
      console.error('Error updating due date:', error);
    }
  };
  
  const addAssignee = async (itemId: string) => {
    if (!newAssigneeName.trim()) return;
    
    try {
      const item = items.find(i => i.id === itemId);
      if (!item) return;
      
      const updatedAssignees = [...item.assignee, newAssigneeName.trim()];
      
      await fetch(`/api/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignee: updatedAssignees }),
      });
      
      setItems(items.map(i => 
        i.id === itemId ? { ...i, assignee: updatedAssignees } : i
      ));
      
      setNewAssigneeName('');
    } catch (error) {
      console.error('Error adding assignee:', error);
    }
  };
  
  const removeAssignee = async (itemId: string, assigneeName: string) => {
    try {
      const item = items.find(i => i.id === itemId);
      if (!item) return;
      
      const updatedAssignees = item.assignee.filter(a => a !== assigneeName);
      
      await fetch(`/api/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignee: updatedAssignees }),
      });
      
      setItems(items.map(i => 
        i.id === itemId ? { ...i, assignee: updatedAssignees } : i
      ));
    } catch (error) {
      console.error('Error removing assignee:', error);
    }
  };
  
  const addTag = async (itemId: string, tagName: string) => {
    try {
      const item = items.find(i => i.id === itemId);
      if (!item) return;
      
      // Only one tag at a time - replace existing tag
      const updatedTags = [tagName];
      
      await fetch(`/api/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags: updatedTags }),
      });
      
      setItems(items.map(i => 
        i.id === itemId ? { ...i, tags: updatedTags } : i
      ));
      
      setNewTagName('');
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };
  
  const removeTag = async (itemId: string, tagName: string) => {
    try {
      const item = items.find(i => i.id === itemId);
      if (!item) return;
      
      const updatedTags = (item.tags || []).filter(t => t !== tagName);
      
      await fetch(`/api/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags: updatedTags }),
      });
      
      setItems(items.map(i => 
        i.id === itemId ? { ...i, tags: updatedTags } : i
      ));
    } catch (error) {
      console.error('Error removing tag:', error);
    }
  };
  
  const getTagColor = (tagName: string): string => {
    const predefined = predefinedTags.find(t => t.name === tagName);
    return predefined ? predefined.color : 'bg-gray-500';
  };
  
  const addCustomTag = () => {
    if (!newCustomTagName.trim()) return;
    
    const exists = predefinedTags.find(t => t.name.toLowerCase() === newCustomTagName.trim().toLowerCase());
    if (exists) {
      alert('A tag with this name already exists!');
      return;
    }
    
    const updatedTags = [...predefinedTags, { name: newCustomTagName.trim(), color: newCustomTagColor }];
    saveCustomTags(updatedTags);
    setNewCustomTagName('');
    setNewCustomTagColor('bg-blue-500');
  };
  
  const removeCustomTag = (tagName: string) => {
    const updatedTags = predefinedTags.filter(t => t.name !== tagName);
    saveCustomTags(updatedTags);
  };
  
  const resetToDefaultTags = () => {
    if (confirm('Reset to default tags? This will remove all your custom tags.')) {
      saveCustomTags(defaultTags);
    }
  };
  
  const createNewBoard = async () => {
    if (newBoardName.trim()) {
      try {
        const response = await fetch('/api/boards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: newBoardName,
            icon: newBoardIcon,
          }),
        });
        const newBoard = await response.json();
        setBoards([...boards, newBoard]);
        setCurrentBoard(newBoard.id);
        setItems([]); // Clear items for the new board
        setNewBoardName('');
        setNewBoardIcon('📁');
        setShowNewBoardModal(false);
      } catch (error) {
        console.error('Error creating board:', error);
      }
    }
  };
  
  const deleteBoard = async (boardId: string) => {
    try {
      await fetch(`/api/boards/${boardId}`, { method: 'DELETE' });
      const newBoards = boards.filter(b => b.id !== boardId);
      setBoards(newBoards);
      setItems(items.filter(item => item.boardId !== boardId));
      
      if (currentBoard === boardId) {
        setCurrentBoard(newBoards.length > 0 ? newBoards[0].id : null);
      }
      
      setBoardToDelete(null);
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };
  
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const currentBoardData = boards.find(b => b.id === currentBoard);
  
  const getStatusColor = (status: string) => {
    const option = statusOptions.find(s => s.value === status);
    return option ? option.color : 'bg-gray-500';
  };
  
  const getPriorityColor = (priority: string) => {
    const option = priorityOptions.find(p => p.value === priority);
    return option ? option.color : 'bg-gray-400';
  };
  
  const getInitials = (name: string): string => {
    if (!name) return '?';
    
    const trimmed = name.trim();
    
    // If it's already short (2-3 chars) and no spaces, assume it's initials
    if (trimmed.length <= 3 && !trimmed.includes(' ')) {
      return trimmed.toUpperCase();
    }
    
    // If it has spaces, extract first letter of each word
    if (trimmed.includes(' ')) {
      return trimmed
        .split(' ')
        .filter(word => word.length > 0)
        .map(word => word[0].toUpperCase())
        .join('')
        .substring(0, 3); // Max 3 initials
    }
    
    // Single word: take first 2 characters
    return trimmed.substring(0, 2).toUpperCase();
  };
  
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">⚡ FlowBoard</h1>
            <p className="text-sm text-gray-500 mt-1">Work management platform</p>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Workspace</h3>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {boards.length} boards
              </span>
            </div>
            <div className="space-y-1">
              {boards.map(board => (
                <div
                  key={board.id}
                  className={`group flex items-center w-full text-left px-3 py-2 rounded-lg transition-all ${
                    currentBoard === board.id
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <button
                    onClick={() => setCurrentBoard(board.id)}
                    className="flex-1 text-left flex items-center"
                  >
                    <span className="mr-2">{board.icon}</span>
                    {board.name}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setBoardToDelete(board.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:bg-red-50 rounded transition-all"
                    title="Delete board"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {boards.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <div className="text-3xl mb-2">📂</div>
                  <p className="text-sm mb-3">No boards yet</p>
                  <button
                    onClick={() => setShowNewBoardModal(true)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Create your first board
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={() => setShowNewBoardModal(true)}
            className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center"
          >
            <FolderPlus className="w-4 h-4 mr-2" />
            Add Board
          </button>
        </div>
        
        <div className="mt-auto p-4 border-t border-gray-200">
          <button
            onClick={() => setShowTagManagerModal(true)}
            className="w-full mb-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 rounded-lg hover:from-blue-100 hover:to-purple-100 transition-all flex items-center justify-center border border-gray-200"
          >
            <span className="mr-2">🏷️</span>
            Manage Tags
          </button>
          <div className="text-xs text-gray-400">
            <div>💡 Hover over boards to delete</div>
            <div className="mt-1">📝 Click on tasks to edit</div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {currentBoard && currentBoardData ? (
          <>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold flex items-center">
                    <span className="mr-3 text-4xl">{currentBoardData?.icon}</span>
                    {currentBoardData?.name}
                  </h2>
                  <p className="text-blue-100 mt-1">
                    {searchTerm ? (
                      <>
                        Showing {filteredItems.length} of {items.length} items • {filteredItems.filter(i => i.status === 'done').length} completed
                      </>
                    ) : (
                      <>
                        {filteredItems.length} items • {filteredItems.filter(i => i.status === 'done').length} completed
                      </>
                    )}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setView('table')}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      view === 'table' ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <BarChart className="inline-block w-4 h-4 mr-1" />
                    Table
                  </button>
                  <button
                    onClick={() => setView('kanban')}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      view === 'kanban' ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <Users className="inline-block w-4 h-4 mr-1" />
                    Kanban
                  </button>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search tasks by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 bg-white/20 backdrop-blur border border-white/30 rounded-lg text-white placeholder-white/70 focus:bg-white/30 focus:outline-none transition-all"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                      title="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => {
                    setShowNewItemForm(true);
                    setNewItemName('');
                  }}
                  className="px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-white/90 transition-all flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  New Item
                </button>
              </div>
            </div>
            
            <div className="flex-1 p-6 overflow-auto">
              {view === 'table' ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {(filteredItems.length > 0 || showNewItemForm) ? (
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="text-left p-4 font-medium text-gray-700">Task</th>
                          <th className="text-left p-4 font-medium text-gray-700">Status</th>
                          <th className="text-left p-4 font-medium text-gray-700">Priority</th>
                          <th className="text-left p-4 font-medium text-gray-700">Assignee</th>
                          <th className="text-left p-4 font-medium text-gray-700">Due Date</th>
                          <th className="text-left p-4 font-medium text-gray-700">Tags</th>
                          <th className="text-left p-4 font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {showNewItemForm && (
                          <tr className="border-b-2 border-blue-400 bg-blue-50">
                            <td className="p-4" colSpan={7}>
                              <div className="flex flex-col gap-2">
                                <div className="text-sm font-semibold text-blue-700 flex items-center gap-2">
                                  <Plus className="w-4 h-4" />
                                  Add New Task
                                </div>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    placeholder="Enter task name and press Enter..."
                                    value={newItemName}
                                    onChange={(e) => setNewItemName(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && addNewItem()}
                                    className="flex-1 px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    autoFocus
                                  />
                                  <button
                                    onClick={addNewItem}
                                    disabled={!newItemName.trim()}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center font-medium shadow-sm"
                                  >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add Task
                                  </button>
                                  <button
                                    onClick={() => {
                                      setShowNewItemForm(false);
                                      setNewItemName('');
                                    }}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 flex items-center font-medium"
                                  >
                                    <X className="w-4 h-4 mr-1" />
                                    Close
                                  </button>
                                </div>
                                <div className="text-xs text-blue-600">
                                  💡 Tip: Press Enter to add the task and continue adding more, or click &quot;Close&quot; when done
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                        {filteredItems.map(item => (
                          <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="p-4">
                              {editingItem === item.id ? (
                                <input
                                  type="text"
                                  value={item.name}
                                  onChange={(e) => setItems(items.map(i => 
                                    i.id === item.id ? { ...i, name: e.target.value } : i
                                  ))}
                                  onKeyPress={(e) => e.key === 'Enter' && updateItemName(item.id, item.name)}
                                  onBlur={() => updateItemName(item.id, item.name)}
                                  className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  autoFocus
                                />
                              ) : (
                                <div 
                                  onClick={() => setEditingItem(item.id)}
                                  className="cursor-pointer hover:text-blue-600"
                                >
                                  <div className="font-medium text-gray-900">{item.name}</div>
                                  {item.description && (
                                    <div className="text-sm text-gray-500 mt-1">{item.description}</div>
                                  )}
                                </div>
                              )}
                            </td>
                            <td className="p-4">
                              <select
                                value={item.status}
                                onChange={(e) => handleStatusChange(item.id, e.target.value as any)}
                                className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(item.status)}`}
                              >
                                {statusOptions.map(option => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="p-4">
                              <select
                                value={item.priority}
                                onChange={(e) => handlePriorityChange(item.id, e.target.value as any)}
                                className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getPriorityColor(item.priority)}`}
                              >
                                {priorityOptions.map(option => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="p-4">
                              {editingAssignee === item.id ? (
                                <div className="space-y-2">
                                  <div className="flex flex-wrap gap-2 mb-2">
                                    {item.assignee.map((person, i) => (
                                      <div
                                        key={i}
                                        className="flex items-center gap-1 px-2 py-1 bg-gradient-to-br from-blue-400 to-purple-400 text-white text-xs font-medium rounded-full"
                                      >
                                        <span>{person}</span>
                                        <button
                                          onClick={() => removeAssignee(item.id, person)}
                                          className="hover:bg-white/20 rounded-full p-0.5"
                                          title="Remove assignee"
                                        >
                                          <X className="w-3 h-3" />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="flex gap-1">
                                    <input
                                      type="text"
                                      placeholder="Add person..."
                                      value={newAssigneeName}
                                      onChange={(e) => setNewAssigneeName(e.target.value)}
                                      onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                          addAssignee(item.id);
                                        }
                                      }}
                                      className="flex-1 px-2 py-1 text-xs border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                      autoFocus
                                    />
                                    <button
                                      onClick={() => addAssignee(item.id)}
                                      disabled={!newAssigneeName.trim()}
                                      className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:bg-gray-400"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditingAssignee(null);
                                        setNewAssigneeName('');
                                      }}
                                      className="px-2 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400"
                                    >
                                      Done
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  onClick={() => setEditingAssignee(item.id)}
                                  className="cursor-pointer hover:bg-gray-50 rounded p-1 -m-1"
                                >
                                  <div className="flex -space-x-2">
                                    {item.assignee.length > 0 ? (
                                      item.assignee.map((person, i) => (
                                        <div
                                          key={i}
                                          className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-xs font-medium border-2 border-white"
                                          title={person}
                                        >
                                          {getInitials(person)}
                                        </div>
                                      ))
                                    ) : (
                                      <span className="text-gray-400 text-sm hover:text-blue-600">Click to assign</span>
                                    )}
                                  </div>
                                </div>
                              )}
                            </td>
                            <td className="p-4">
                              <input
                                type="date"
                                value={item.dueDate}
                                onChange={(e) => updateItemDueDate(item.id, e.target.value)}
                                className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </td>
                            <td className="p-4">
                              {editingTags === item.id ? (
                                <div className="space-y-2">
                                  {item.tags && item.tags.length > 0 && (
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-xs text-gray-500">Current:</span>
                                      <div className="flex items-center gap-1">
                                        <span className={`px-2 py-0.5 ${getTagColor(item.tags[0])} text-white text-xs font-medium rounded`}>
                                          {item.tags[0]}
                                        </span>
                                        <button
                                          onClick={() => item.tags && removeTag(item.id, item.tags[0])}
                                          className="p-1 text-red-600 hover:bg-red-50 rounded-full"
                                          title="Remove tag"
                                        >
                                          <X className="w-3 h-3" />
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                  <div className="flex gap-1 mb-2">
                                    <input
                                      type="text"
                                      placeholder="Custom tag..."
                                      value={newTagName}
                                      onChange={(e) => setNewTagName(e.target.value)}
                                      onKeyPress={(e) => {
                                        if (e.key === 'Enter' && newTagName.trim()) {
                                          addTag(item.id, newTagName.trim());
                                        }
                                      }}
                                      className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                      autoFocus
                                    />
                                    <button
                                      onClick={() => newTagName.trim() && addTag(item.id, newTagName.trim())}
                                      disabled={!newTagName.trim()}
                                      className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:bg-gray-400"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>
                                  <div className="flex flex-wrap gap-1 mb-1">
                                    <div className="text-xs text-gray-500 w-full mb-1 flex items-center justify-between">
                                      <span>Select tag (replaces current):</span>
                                      <button
                                        onClick={() => setShowTagManagerModal(true)}
                                        className="text-blue-600 hover:text-blue-700 text-xs"
                                        title="Manage tags"
                                      >
                                        Edit presets
                                      </button>
                                    </div>
                                    {predefinedTags.map((tag) => (
                                      <button
                                        key={tag.name}
                                        onClick={async () => {
                                          await addTag(item.id, tag.name);
                                          setEditingTags(null);
                                          setNewTagName('');
                                        }}
                                        className={`px-2 py-0.5 ${tag.color} text-white text-xs rounded hover:opacity-80`}
                                      >
                                        {tag.name}
                                      </button>
                                    ))}
                                  </div>
                                  <button
                                    onClick={() => {
                                      setEditingTags(null);
                                      setNewTagName('');
                                    }}
                                    className="px-2 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400 w-full"
                                  >
                                    Done
                                  </button>
                                </div>
                              ) : (
                                <div
                                  onClick={() => setEditingTags(item.id)}
                                  className="cursor-pointer hover:bg-gray-50 rounded p-1 -m-1 min-h-[24px]"
                                >
                                  {item.tags && item.tags.length > 0 ? (
                                    <span
                                      className={`px-2 py-0.5 ${getTagColor(item.tags[0])} text-white text-xs font-medium rounded inline-block`}
                                    >
                                      {item.tags[0]}
                                    </span>
                                  ) : (
                                    <span className="text-gray-400 text-xs hover:text-blue-600">Click to add tag</span>
                                  )}
                                </div>
                              )}
                            </td>
                            <td className="p-4">
                              <button
                                onClick={() => deleteItem(item.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-12 text-center text-gray-500">
                      <div className="text-6xl mb-4">📋</div>
                      <p className="text-lg font-medium">No items in this board</p>
                      <p className="text-sm mt-2">Click &quot;New Item&quot; to add your first task</p>
                      <button
                        onClick={() => {
                          setShowNewItemForm(true);
                          setNewItemName('');
                        }}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add First Item
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-4 h-full">
                  {statusOptions.map(status => {
                    const statusItems = filteredItems.filter(item => item.status === status.value);
                    return (
                      <div key={status.value} className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <div className="mb-4 flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                          <h3 className="font-semibold text-gray-700">{status.label}</h3>
                          <span className="text-sm text-gray-400">({statusItems.length})</span>
                        </div>
                        <div className="space-y-3">
                          {statusItems.map(item => (
                            <div key={item.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all cursor-pointer">
                              <div className="font-medium text-gray-900 mb-2">{item.name}</div>
                              {item.description && (
                                <div className="text-sm text-gray-500 mb-2">{item.description}</div>
                              )}
                              <div className="flex items-center justify-between mb-2">
                                <span className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getPriorityColor(item.priority)}`}>
                                  {priorityOptions.find(p => p.value === item.priority)?.label}
                                </span>
                                <div className="flex -space-x-1">
                                  {item.assignee.slice(0, 2).map((person, i) => (
                                    <div
                                      key={i}
                                      className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-xs font-medium border border-white"
                                      title={person}
                                    >
                                      {getInitials(person)}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              {item.tags && item.tags.length > 0 && (
                                <div className="mt-2">
                                  <span
                                    className={`px-2 py-0.5 ${getTagColor(item.tags[0])} text-white text-xs font-medium rounded inline-block`}
                                  >
                                    {item.tags[0]}
                                  </span>
                                </div>
                              )}
                              {item.dueDate && (
                                <div className="mt-2 text-xs text-gray-500 flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {new Date(item.dueDate).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          ))}
                          {statusItems.length === 0 && (
                            <div className="p-8 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                              No items
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="text-8xl mb-4">📋</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome to FlowBoard</h2>
              <p className="text-gray-600 mb-8">Create your first board to start managing your tasks</p>
              <button
                onClick={() => setShowNewBoardModal(true)}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all inline-flex items-center shadow-lg"
              >
                <FolderPlus className="w-5 h-5 mr-2" />
                Create Your First Board
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* New Board Modal */}
      {showNewBoardModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-96 max-w-[90%]">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Create New Board</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Board Name
              </label>
              <input
                type="text"
                placeholder="Enter board name..."
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && createNewBoard()}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose Icon
              </label>
              <div className="grid grid-cols-6 gap-2">
                {iconOptions.map(icon => (
                  <button
                    key={icon}
                    onClick={() => setNewBoardIcon(icon)}
                    className={`p-3 text-2xl rounded-lg border-2 transition-all ${
                      newBoardIcon === icon
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={createNewBoard}
                disabled={!newBoardName.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Create Board
              </button>
              <button
                onClick={() => {
                  setShowNewBoardModal(false);
                  setNewBoardName('');
                  setNewBoardIcon('📁');
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Board Confirmation */}
      {boardToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-96 max-w-[90%]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Delete Board?</h2>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete &quot;{boards.find(b => b.id === boardToDelete)?.name}&quot;? 
              All items in this board will also be deleted.
            </p>
            
            <div className="flex gap-2">
              <button
                onClick={() => deleteBoard(boardToDelete)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete Board
              </button>
              <button
                onClick={() => setBoardToDelete(null)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Tag Manager Modal */}
      {showTagManagerModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[600px] max-w-[90%] max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">🏷️ Manage Tags</h2>
              <button
                onClick={() => setShowTagManagerModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-6">
              Customize your tag presets. These will appear as quick-add options when tagging tasks.
            </p>
            
            {/* Add New Tag Form */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Add New Tag</h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Tag name..."
                  value={newCustomTagName}
                  onChange={(e) => setNewCustomTagName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCustomTag()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={newCustomTagColor}
                  onChange={(e) => setNewCustomTagColor(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {availableColors.map((color) => (
                    <option key={color.value} value={color.value}>
                      {color.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={addCustomTag}
                  disabled={!newCustomTagName.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center font-medium"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 ${newCustomTagColor} text-white text-sm font-medium rounded`}>
                  {newCustomTagName || 'Preview'}
                </span>
              </div>
            </div>
            
            {/* Current Tags List */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700">Your Tags ({predefinedTags.length})</h3>
                <button
                  onClick={resetToDefaultTags}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Reset to Defaults
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {predefinedTags.map((tag) => (
                  <div
                    key={tag.name}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100"
                  >
                    <span className={`px-2 py-1 ${tag.color} text-white text-xs font-medium rounded`}>
                      {tag.name}
                    </span>
                    <button
                      onClick={() => removeCustomTag(tag.name)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete tag"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              {predefinedTags.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-sm">No tags yet. Add your first tag above!</p>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 pt-4 border-t">
              <button
                onClick={() => setShowTagManagerModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

