import { CSSProperties } from 'react'
import ShortcutOverlay from 'src/assets/icons/overlay_shortcut.png'
import styles from 'src/components/DesktopIcon.module.css'
import { useAppDispatch } from 'src/redux/hooks'
import {
    CustomDesktopIconState,
    DesktopIconState,
    FileDesktopIconState,
    ShortcutDesktopIconState
} from 'src/redux/slices/desktopIconsSlice'
import { createWindow } from 'src/redux/slices/windowsSlice'
import { assertNever } from 'src/utils'

type DesktopIconProps = DesktopIconState
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

type ShortcutIconProps = ShortcutDesktopIconState
const ShortcutDesktopIcon = (props: ShortcutIconProps) => {
  const { row, col, title, icon, url, hideShortcutIcon } = props
  const style: CSSProperties = { gridRow: row, gridColumn: col }
  const onOpen = () => window.open(url, '_blank', 'noopener,noreferrer')
  return (
    <div className={styles.desktopIcon} style={style} onClick={onOpen}>
      <div className={styles.desktopIcon_imageContainer}>
        <img
          src={icon.path}
          alt={icon.altText}
          className={styles.desktopIcon_image}
        />
        {!hideShortcutIcon && (
          <img
            src={ShortcutOverlay}
            alt="Shortcut overlay icon"
            className={styles.desktopIcon_shortcutOverlay}
          />
        )}
      </div>
      <span className={styles.desktopIcon_title}>{title}</span>
    </div>
  )
}

type FileDesktopIconProps = FileDesktopIconState
const FileDesktopIcon = (props: FileDesktopIconProps) => {
  const { row, col, title, icon } = props
  const style: CSSProperties = { gridRow: row, gridColumn: col }
  const dispatch = useAppDispatch()
  const onOpen = () => dispatch(createWindow(props))
  return (
    <div
      className={styles.desktopIcon}
      style={style}
      onClick={onOpen}
      data-window-opener={true}
    >
      <div className={styles.desktopIcon_imageContainer}>
        <img
          src={icon.path}
          alt={icon.altText}
          className={styles.desktopIcon_image}
        />
      </div>
      <span className={styles.desktopIcon_title}>{title}</span>
    </div>
  )
}

type CustomDesktopIconProps = CustomDesktopIconState
const CustomDesktopIcon = (props: CustomDesktopIconProps) => {
  const { row, col, title, icon } = props
  const style: CSSProperties = { gridRow: row, gridColumn: col }
  return (
    <div className={styles.desktopIcon} style={style}>
      <div className={styles.desktopIcon_imageContainer}>
        <img
          src={icon.path}
          alt={icon.altText}
          className={styles.desktopIcon_image}
        />
      </div>
      <span className={styles.desktopIcon_title}>{title}</span>
    </div>
  )
}

export default DesktopIcon
