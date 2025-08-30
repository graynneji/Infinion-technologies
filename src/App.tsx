import { ErrorBoundary } from "./components/ErrorBoundary";
import UserDirectory from "./components/UserDirectory";
function App() {

  return (
    <ErrorBoundary>
      <UserDirectory />
    </ErrorBoundary>
  )
}

export default App
