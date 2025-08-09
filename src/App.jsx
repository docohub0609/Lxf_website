import React, { useState, useEffect } from "react";
import { FaClipboardList } from "react-icons/fa";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebase"; // 你需要提前创建好 firebase.js

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteCompletedTasks = () => {
    const remainingTasks = tasks.filter((task) => !task.completed);
    setTasks(remainingTasks);
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Google 登录失败：", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* 背景图层 */}
      <div
        style={{
          backgroundImage: 'url("/Ronaldo.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          zIndex: 0,
        }}
      />

      {/* 内容层 */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            padding: "30px",
            borderRadius: "10px",
            color: "white",
            width: "100%",
            maxWidth: "700px",
            textAlign: "center",
          }}
        >
          {!user ? (
            <>
              <h1 style={{ marginBottom: "1rem" }}>请先登录</h1>
              <button
                onClick={loginWithGoogle}
                style={{
                  padding: "10px 20px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#4285F4",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                使用 Google 登录
              </button>
            </>
          ) : (
            <>
              {/* 用户信息 */}
              <div style={{ marginBottom: "1rem" }}>
                <img
                  src={user.photoURL}
                  alt="用户头像"
                  style={{ width: "50px", borderRadius: "50%" }}
                />
                <p>{user.displayName}</p>
                <button
                  onClick={logout}
                  style={{
                    padding: "5px 10px",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "gray",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  登出
                </button>
              </div>

              {/* 原有内容 */}
              <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                👋 Hi，我是李旭峰
              </h1>
              <p style={{ marginBottom: "1.5rem" }}>
                欢迎来到我搭建的个人网站！我希望通过这个简单的 To-Do List 工具来更好地规划自己的时间与任务，也欢迎你一起来试试！
              </p>

              <h2
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1.5rem",
                  marginBottom: "1rem",
                }}
              >
                <FaClipboardList style={{ marginRight: "10px" }} />
                我的待办事项
              </h2>

              <div style={{ display: "flex", marginBottom: "1rem" }}>
                <input
                  type="text"
                  placeholder="输入新任务..."
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "5px 0 0 5px",
                    border: "none",
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addTask();
                  }}
                />
                <button
                  onClick={addTask}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "0 5px 5px 0",
                    border: "none",
                    backgroundColor: "#333",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  添加
                </button>
              </div>

              <ul style={{ listStyleType: "none", padding: 0 }}>
                {tasks.map((task, index) => (
                  <li
                    key={index}
                    onClick={() => toggleTaskCompletion(index)}
                    style={{
                      marginBottom: "10px",
                      padding: "10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      backgroundColor: task.completed ? "#999" : "#444",
                      color: task.completed ? "#ddd" : "#fff",
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.text}
                  </li>
                ))}
              </ul>

              <button
                onClick={deleteCompletedTasks}
                style={{
                  marginTop: "1rem",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                🧹 清除已完成任务
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
