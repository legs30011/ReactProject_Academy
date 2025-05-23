import { useState } from "react"
import { Todos } from "./components/Todos"

const MockTodo =[
{
  id:0,
  title:'hola',
  completed:false,
},
{
  id:1,
  title:'hola',
  completed:false
}
]

const App: React.FC = () => {
  const [todos] = useState(MockTodo)
  //inferencia tiparias muchos y acoplarias mucho
  return (
      <Todos todos={todos} />
  )
}

export default App