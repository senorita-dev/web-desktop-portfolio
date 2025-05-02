import { HTMLAttributes, memo, MouseEventHandler } from 'react'
import styles from 'src/components/DesktopWindow.module.css'
import { useAppDispatch } from 'src/redux/hooks'
import {
  deleteWindow,
  focusWindow,
  minimizeWindow,
  toggleMaximize,
  WindowState,
} from 'src/redux/slices/windowsSlice'

interface DesktopWindowProps extends WindowState {
  isFocused: boolean
}
const DesktopWindow = memo((props: DesktopWindowProps) => {
  const {
    id,
    file,
    x,
    y,
    width,
    height,
    isFocused,
    isMaximized,
    desktopIndex,
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
    if (isFocused) {
      return
    }
    const targetElement = event.target as HTMLElement
    const isControlsDiv = targetElement.closest('.title-bar-controls') !== null
    if (isControlsDiv) {
      return
    }
    dispatch(focusWindow(id))
  }

  return (
    <div className="window" style={style} onClick={onFocus}>
      <TitleBar
        id={id}
        title={title}
        icon={file.icon}
        isFocused={isFocused}
        isMaximized={isMaximized}
      />
    </div>
  )
})

interface TitleBarProps {
  id: string
  title: string
  icon: string
  isFocused: boolean
  isMaximized: boolean
}
const TitleBar = (props: TitleBarProps) => {
  const { id, title, icon, isFocused, isMaximized } = props
  const dispatch = useAppDispatch()
  const onMinimize = () => dispatch(minimizeWindow(id))
  const onMaximize = () => dispatch(toggleMaximize(id))
  const onClose = () => dispatch(deleteWindow(id))
  return (
    <div
      className={`title-bar ${isFocused ? '' : 'inactive'} ${
        styles.desktopWindow_titlebar
      }`}
      style={{ minWidth: 'fit-content' }}
    >
      <div className={`title-bar-text ${styles.destkopWindow_titlebar_text}`}>
        <img src={icon} className={styles.desktopWindow_titlebar_icon} />
        {title}
      </div>
      <div className="title-bar-controls" style={{ minWidth: 'fit-content' }}>
        <button aria-label="Minimize" onClick={onMinimize}></button>
        <button
          aria-label={isMaximized ? 'Restore' : 'Maximize'}
          onClick={onMaximize}
        ></button>
        <button aria-label="Close" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default DesktopWindow
