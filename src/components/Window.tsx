import { HTMLAttributes } from 'react'

export interface WindowProps {
  id: string
  x: number
  y: number
  width: number
  height: number
  title: string
}
const Window = (props: WindowProps) => {
  const { x, y, width, height, title } = props
  const style: HTMLAttributes<HTMLDivElement>['style'] = {
    position: 'absolute',
    minWidth: 'fit-content',
    minHeight: 'fit-content',
    left: `${x}%`,
    top: `${y}%`,
    width: `${width}%`,
    height: `${height}%`,
  }
  return (
    <div className="window" style={style}>
      <div className="title-bar" style={{ minWidth: 'fit-content' }}>
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls" style={{ minWidth: 'fit-content' }}>
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
    </div>
  )
}

export default Window
