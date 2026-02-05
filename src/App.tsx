import './App.css'
import { BrowserRouter, Routes, Route, NavLink  } from 'react-router';
import { Suspense, lazy, type JSX } from 'react';
import plugin_manifest from './plugins/plugin-manifest.json';

interface Menu {interface: string, path: string, element: JSX.Element} 

let menu: Menu[] = [
  { interface: "Dashboard", path:"/", element:<Dashboard /> },
  { interface: "Settings", path:"/settings", element:<Settings /> },
];

plugin_manifest.plugins.map(plugin => {
  const modulePath = './plugins/'+plugin.name+'/'+plugin.name;
  const Element = lazy(() => import(/* @vite-ignore */ modulePath));
  const PropValue = "Hello " + plugin.name
  menu.push({interface: plugin.name, path: '/plugins/'+plugin.name, element: <Element message={PropValue}/>})
})

function App() {
  return (
    <BrowserRouter>
      {menu.map(item => (
        <NavLink
          key={item.path}
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
