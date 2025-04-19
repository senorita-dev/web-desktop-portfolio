import { combineReducers } from '@reduxjs/toolkit'
import desktopIconsReducer from 'src/redux/slices/desktopIconsSlice'
import windowsReducer from 'src/redux/slices/windowsSlice'

const rootReducer = combineReducers({
  desktopIcons: desktopIconsReducer,
  windows: windowsReducer,
})

export default rootReducer
