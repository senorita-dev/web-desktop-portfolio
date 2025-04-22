import { HTMLAttributes, memo } from 'react'
import { useAppDispatch } from 'src/redux/hooks'
import {
  deleteWindow,
  minimizeWindow,
  toggleMaximize,
} from 'src/redux/slices/windowsSlice'
import { FileDesktopIconProps } from 'src/components/DesktopIcon'

export interface WindowProps {
  id: string
  x: number
  y: number
  width: number
  height: number
  file: FileDesktopIconProps
  isMinimized: boolean
}
const Window = memo((props: WindowProps) => {
  const { x, y, width, height, file, id } = props
  const title = `${file.title} - ${file.applicationType}`
  const style: HTMLAttributes<HTMLDivElement>['style'] = {
    position: 'absolute',
    zIndex: 1,
    minWidth: 'fit-content',
    minHeight: 'fit-content',
    left: `${x}%`,
    top: `${y}%`,
    width: `${width}%`,
    height: `${height}%`,
  }
  const dispatch = useAppDispatch()
  const onMinimize = () => dispatch(minimizeWindow(id))
  const onMaximize = () => dispatch(toggleMaximize(id))
  const onClose = () => dispatch(deleteWindow(id))
  return (
    <div className="window" style={style}>
      <div className="title-bar" style={{ minWidth: 'fit-content' }}>
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls" style={{ minWidth: 'fit-content' }}>
          <button aria-label="Minimize" onClick={onMinimize}></button>
          <button aria-label="Maximize" onClick={onMaximize}></button>
          <button aria-label="Close" onClick={onClose}></button>
        </div>
      </div>
    </div>
  )
})

export default Window
