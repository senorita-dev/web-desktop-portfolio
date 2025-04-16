import DesktopShell from 'src/components/DesktopShell'
import AppContext, { appContext } from 'src/contexts/AppContext'

function App() {
  return (
    <AppContext.Provider value={appContext}>
      <DesktopShell />
    </AppContext.Provider>
  )
}

export default App
