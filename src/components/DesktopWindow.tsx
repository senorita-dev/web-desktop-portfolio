import { HTMLAttributes, memo, MouseEventHandler } from 'react'
import { useAppDispatch } from 'src/redux/hooks'
import {
    deleteWindow,
    focusWindow,
    minimizeWindow,
    toggleMaximize,
    WindowState
} from 'src/redux/slices/windowsSlice'

interface DesktopWindowProps extends WindowState {
  isWindowFocused: boolean
}
const DesktopWindow = memo((props: DesktopWindowProps) => {
  const {
    id,
    file,
    x,
    y,
    width,
    height,
    isMaximized,
    desktopIndex,
    isWindowFocused,
  } = props
  const title = `${file.title} - ${file.applicationType}`
  const style: HTMLAttributes<HTMLDivElement>['style'] = {
    position: 'absolute',
    zIndex: desktopIndex + 1,
    minWidth: 'fit-content',
    minHeight: 'fit-content',
    left: `${isMaximized ? 0 : x}%`,
    top: `${isMaximized ? 0 : y}%`,
    width: `${isMaximized ? 100 : width}%`,
    height: `${isMaximized ? 100 : height}%`,
  }
  const dispatch = useAppDispatch()
  const onFocus: MouseEventHandler<HTMLDivElement> = (event) => {
    if (isWindowFocused) {
      return
    }
    const targetElement = event.target as HTMLElement
    const isControlsDiv = targetElement.closest('.title-bar-controls') !== null
    if (isControlsDiv) {
      return
    }
    dispatch(focusWindow(id))
  }
  const onMinimize = () => dispatch(minimizeWindow(id))
  const onMaximize = () => dispatch(toggleMaximize(id))
  const onClose = () => dispatch(deleteWindow(id))
  return (
    <div className="window" style={style} onClick={onFocus}>
      <div
        className={`title-bar ${isWindowFocused ? '' : 'inactive'}`}
        style={{ minWidth: 'fit-content' }}
      >
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls" style={{ minWidth: 'fit-content' }}>
          <button aria-label="Minimize" onClick={onMinimize}></button>
          <button
            aria-label={isMaximized ? 'Restore' : 'Maximize'}
            onClick={onMaximize}
          ></button>
          <button aria-label="Close" onClick={onClose}></button>
        </div>
      </div>
    </div>
  )
})

export default DesktopWindow
