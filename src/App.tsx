import TodoList from './components/TodoList'
import './App.css'
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"

function App() {

  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <TodoList />
    </Container>
  )
}

export default App
