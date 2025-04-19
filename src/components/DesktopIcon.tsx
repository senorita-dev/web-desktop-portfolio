import styles from 'src/components/DesktopIcon.module.css'
import { CSSProperties } from 'react'
import ShortcutOverlay from 'src/assets/icons/overlay_shortcut.png'
import { assertNever } from 'src/utils'
import { useAppDispatch } from 'src/redux/hooks'
import { addWindow } from 'src/redux/slices/windowsSlice'

interface BaseDesktopIconProps {
  row: number
  col: number
  title: string
  icon: string
}
interface ShortcutDesktopIconProps extends BaseDesktopIconProps {
  type: 'shortcut'
  url: string
}
interface FileDesktopIconProps extends BaseDesktopIconProps {
  type: 'file'
}
interface CustomDesktopIconProps extends BaseDesktopIconProps {
  type: 'custom'
}
export type DesktopIconProps =
  | ShortcutDesktopIconProps
  | FileDesktopIconProps
  | CustomDesktopIconProps

const DesktopIcon = (props: DesktopIconProps) => {
  const { type } = props
  switch (type) {
    case 'shortcut': {
      return <ShortcutDesktopIcon {...props} />
    }
    case 'file': {
      return <FileDesktopIcon {...props} />
    }
    case 'custom': {
      return <CustomDesktopIcon {...props} />
    }
    default:
      assertNever(type)
  }
}

const ShortcutDesktopIcon = (props: ShortcutDesktopIconProps) => {
  const { row, col, title, icon, url } = props
  const style: CSSProperties = { gridRow: row, gridColumn: col }
  const onOpen = () => window.open(url, '_blank', 'noopener,noreferrer')
  return (
    <div className={styles.desktopIcon} style={style} onClick={onOpen}>
      <div className={styles.desktopIcon_imageContainer}>
        <img src={icon} className={styles.desktopIcon_image} />
        <img
          src={ShortcutOverlay}
          className={styles.desktopIcon_shortcutOverlay}
        />
      </div>
      <span className={styles.desktopIcon_title}>{title}</span>
    </div>
  )
}

const FileDesktopIcon = (props: FileDesktopIconProps) => {
  const { row, col, title, icon } = props
  const style: CSSProperties = { gridRow: row, gridColumn: col }
  const dispatch = useAppDispatch()
  const onOpen = () => dispatch(addWindow(props))
  return (
    <div className={styles.desktopIcon} style={style} onClick={onOpen}>
      <div className={styles.desktopIcon_imageContainer}>
        <img src={icon} className={styles.desktopIcon_image} />
      </div>
      <span className={styles.desktopIcon_title}>{title}</span>
    </div>
  )
}

const CustomDesktopIcon = (props: CustomDesktopIconProps) => {
  const { row, col, title, icon } = props
  const style: CSSProperties = { gridRow: row, gridColumn: col }
  return (
    <div className={styles.desktopIcon} style={style}>
      <div className={styles.desktopIcon_imageContainer}>
        <img src={icon} className={styles.desktopIcon_image} />
      </div>
      <span className={styles.desktopIcon_title}>{title}</span>
    </div>
  )
}

export default DesktopIcon
