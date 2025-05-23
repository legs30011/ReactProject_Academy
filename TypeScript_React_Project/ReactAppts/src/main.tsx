import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
//import App from './App.tsx'
import 'todomvc-app-css/index.css'
import ControlledUncontrolled from './Controlled&Uncontrolled.tsx'
import UserCard from './UserCard.tsx'
import Counter from './Counter.tsx'
import UserListWithUse from './UserLisFunctional.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <ControlledUncontrolled/>
    <UserCard name="John Doe" age={30} onClick={() => console.log('User clicked')} />
    <Suspense fallback={<div>Loading users...</div>}>
        <UserListWithUse />
    </Suspense>
    <Counter />
  </StrictMode>,
)
