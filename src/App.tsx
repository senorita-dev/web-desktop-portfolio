import '98.css'
import AppContext, { appContext } from 'src/contexts/AppContext'
import Desktop from 'src/components/Desktop'
import Taskbar from 'src/components/Taskbar'

function App() {
  return (
    <AppContext.Provider value={appContext}>
      <Desktop />
      <Taskbar />
    </AppContext.Provider>
  )
}

export default App
