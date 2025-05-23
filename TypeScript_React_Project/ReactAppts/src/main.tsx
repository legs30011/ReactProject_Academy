import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'


import 'todomvc-app-css/index.css'
import './index.css'
import ControlledUncontrolled from './Controlled&Uncontrolled.tsx'
import UserCard from './UserCard.tsx'
import UserListFunctional from './UserLisFunctional.tsx'
import Counter from './Counter.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <ControlledUncontrolled/>
    <UserCard name="John Doe" age={30} onClick={() => console.log('User clicked')} />
    <UserListFunctional />
    <Counter />
  </StrictMode>,
)
