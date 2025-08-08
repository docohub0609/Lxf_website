
import { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input, done: false }]);
      setInput('');
    }
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };
    // ✅ 加载时从 localStorage 读取
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);
  
    // ✅ 每次 tasks 变动时存入 localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    //<div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial' }}>
    <div
        style={{
          minHeight: '100vh',
          backgroundImage: 'url("/public/bg_diogo_jota.avif")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '20px',
          fontFamily: 'Arial',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: '30px',
          borderRadius: '10px',
          color: 'white',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >

      {/* 👤 个人简介部分 */}
      <section style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem' }}>👋 Hi，我是李旭峰</h1>
        <p style={{ fontSize: '1.1rem', marginTop: '10px' }}>
          欢迎来到我搭建的个人网站！我希望通过这个简单的 To-Do List 工具来更好地规划自己的时间与任务，也欢迎你一起来试试！
        </p>
      </section>

      {/* ✅ To-Do List 部分 */}
      <section>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>📝 我的待办事项</h2>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入新任务..."
          style={{ padding: '10px', width: '70%', marginRight: '10px' }}
        />
        <button onClick={addTask} style={{ padding: '10px' }}>添加</button>

        <ul style={{ marginTop: '20px', listStyle: 'none', padding: 0 }}>
          {tasks.map((task, index) => (
            <li
              key={index}
              onClick={() => toggleTask(index)}
              style={{
                padding: '10px',
                marginBottom: '8px',
                background: '#eee',
                textDecoration: task.done ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {task.text}
            </li>
          ))}
        </ul>
      </section>
    </div>
    </div> 
  );
}

export default App;
