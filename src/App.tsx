import '98.css'
import { Provider } from 'react-redux'
import Desktop from 'src/components/Desktop'
import Taskbar from 'src/components/Taskbar'
import AppContext, { appContext } from 'src/contexts/AppContext'
import store from 'src/redux/store'

function App() {
  return (
    <Provider store={store}>
      <AppContext.Provider value={appContext}>
        <Desktop />
        <Taskbar />
      </AppContext.Provider>
    </Provider>
  )
}

export default App
