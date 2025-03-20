import React, { useState, useEffect } from 'react';

// 暂时用基础HTML元素替代
const TransientThoughtsPlatform = () => {
  const [thoughts, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
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
    const updatedThoughts = [thoughtEntry, ...thoughts].slice(0, 100);
    
    setThoughts(updatedThoughts);
    localStorage.setItem('transientThoughts', JSON.stringify(updatedThoughts));
    
    setNewThought('');
    setAuthor('');
  };

  const deleteThought = (id) => {
    const updatedThoughts = thoughts.filter(thought => thought.id !== id);
    setThoughts(updatedThoughts);
    localStorage.setItem('transientThoughts', JSON.stringify(updatedThoughts));
  };

  return (
    <div style={{maxWidth: '42rem', margin: 'auto', padding: '1.5rem', backgroundColor: '#f9fafb', minHeight: '100vh'}}>
      <div style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1 style={{fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937'}}>
          游客的痕迹 | Transient Thoughts
        </h1>
        <p style={{color: '#6b7280', marginTop: '0.5rem'}}>
          在这里，每个想法都是一次存在的见证
        </p>
      </div>
      <div style={{backgroundColor: 'white', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem', padding: '1.5rem', marginBottom: '1.5rem'}}>
        <div style={{marginBottom: '1rem'}}>
          <input 
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="你的名字（可选）"
            style={{width: '100%', padding: '0.5rem', marginBottom: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem'}}
          />
          <textarea 
            value={newThought}
            onChange={(e) => setNewThought(e.target.value)}
            placeholder="记录下你此刻的想法..."
            style={{width: '100%', minHeight: '100px', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem'}}
          />
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <button 
            onClick={saveThought}
            style={{backgroundColor: '#3b82f6', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer'}}
          >
            保存想法
          </button>
        </div>
      </div>
      <div>
        {thoughts.map((thought) => (
          <div 
            key={thought.id} 
            style={{backgroundColor: 'white', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem', position: 'relative'}}
          >
            <p style={{color: '#1f2937'}}>{thought.content}</p>
            <div style={{marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span>
                - {thought.author} | {new Date(thought.timestamp).toLocaleString()}
              </span>
              <button 
                onClick={() => deleteThought(thought.id)}
                style={{
                  background: 'none', 
                  border: 'none', 
                  color: '#ef4444', 
                  cursor: 'pointer',
                  opacity: 0,
                  transition: 'opacity 0.2s'
                }}
              >
                删除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransientThoughtsPlatform;

import ReactDOM from 'react-dom/client';

// 现有的 TransientThoughtsPlatform 组件...

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TransientThoughtsPlatform />
  </React.StrictMode>
);