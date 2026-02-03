import './App.css'
import { BrowserRouter, Routes, Route, NavLink  } from 'react-router';
import React, { Suspense, lazy } from 'react';

const Dynamic = lazy(() => import('./plugins/dynamic'));

const menu = [
  { interface: "Dashboard", path:"/", element:<Dashboard /> },
  { interface: "Settings", path:"/settings", element:<Settings /> },
  { interface: "Dynamic", path:"/dynamic", element:<Dynamic message="Hello" /> }
];

function App() {
  return (
    <BrowserRouter>
      {menu.map(item => (
        <NavLink
          to={item.path}
          style={({ isActive }) => ({
            padding: 5,
            ...(isActive ? { color: "green" } : {}),
          })}
        >
          {item.interface}
        </NavLink>
      ))}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {menu.map(item => (
            <Route path={item.path} element={item.element} />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

function Dashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <p>This is the dashboard.</p>
    </div>
  );
}

function Settings() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Settings</h2>
      <p>This is the settings page.</p>
    </div>
  );
}

export default App
