import '98.css'
import { Provider } from 'react-redux'
import Desktop from 'src/components/Desktop'
import Taskbar from 'src/components/Taskbar'
import store from 'src/redux/store'

function App() {
  return (
    <Provider store={store}>
      <Desktop />
      <Taskbar />
    </Provider>
  )
}

export default App
