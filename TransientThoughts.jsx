import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const TransientThoughtsPlatform = () => {
  const [thoughts, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    // 从localStorage加载已存储的想法
    const storedThoughts = JSON.parse(localStorage.getItem('transientThoughts') || '[]');
    setThoughts(storedThoughts);
  }, []);

  const saveThought = () => {
    if (newThought.trim() === '') return;

    const thoughtEntry = {
      id: Date.now(),
      content: newThought,
      author: author || '匿名游客',
      timestamp: new Date().toISOString()
    };

    const updatedThoughts = [thoughtEntry, ...thoughts].slice(0, 100); // 限制最大数量
    
    setThoughts(updatedThoughts);
    localStorage.setItem('transientThoughts', JSON.stringify(updatedThoughts));
    
    // 清空输入
    setNewThought('');
    setAuthor('');
  };

  const deleteThought = (id) => {
    const updatedThoughts = thoughts.filter(thought => thought.id !== id);
    setThoughts(updatedThoughts);
    localStorage.setItem('transientThoughts', JSON.stringify(updatedThoughts));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          游客的痕迹 | Transient Thoughts
        </h1>
        <p className="text-gray-600 mt-2">
          在这里，每个想法都是一次存在的见证
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="mb-4">
          <Input 
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="你的名字（可选）"
            className="mb-2"
          />
          <Textarea 
            value={newThought}
            onChange={(e) => setNewThought(e.target.value)}
            placeholder="记录下你此刻的想法..."
            className="min-h-[100px]"
          />
        </div>
        <div className="flex justify-end">
          <Button 
            onClick={saveThought}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            保存想法
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {thoughts.map((thought) => (
          <div 
            key={thought.id} 
            className="bg-white shadow-sm rounded-lg p-4 relative group"
          >
            <p className="text-gray-800">{thought.content}</p>
            <div className="mt-2 text-sm text-gray-500 flex justify-between items-center">
              <span>
                - {thought.author} | {new Date(thought.timestamp).toLocaleString()}
              </span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => deleteThought(thought.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500"
              >
                删除
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransientThoughtsPlatform;