// import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import SideMenu from './components/SideMenu'
import TaskSummary from './features/tasks/components/TaskSummary'
import TaskList from './features/tasks/components/TaskList/TaskList'
import TaskProgress from './features/tasks/components/TaskProgress/TaskProgress'

const routes = [
  {
    path: '/',
    label: 'Home',
    element : <TaskSummary />
  },
  {
    path: 'task-list',
    label: 'Task List',
    element : <TaskList />
  },
  {
    path: 'task-progress',
    label: 'Task Progress',
    element : <TaskProgress/>
  },
]

const routerElements = routes.map((route, index) => ({
  path: route.path,
  element: (
    <div style={{ display: 'flex' }}>
      <SideMenu />
      {route.element ? route.element : <h1 key={index}>{route.label}</h1>}
    </div>
  ),
}))

const router = createBrowserRouter(routerElements)
function App(): JSX.Element {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  )
}

export default App
