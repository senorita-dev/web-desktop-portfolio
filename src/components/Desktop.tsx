import { MouseEventHandler } from 'react'
import { useDispatch } from 'react-redux'
import styles from 'src/components/Desktop.module.css'
import desktopIconStyles from 'src/components/DesktopIcon.module.css'
import DesktopIcon from 'src/components/DesktopIcon'
import DesktopWindow from 'src/components/DesktopWindow'
import { useAppSelector } from 'src/redux/hooks'
import { unFocusWindows } from 'src/redux/slices/windowsSlice'

const Desktop = () => {
  const dispatch = useDispatch()
  const onUnFocusWindows: MouseEventHandler<HTMLDivElement> = (event) => {
    const targetElement = event.target as HTMLElement
    const isDesktopWindow = targetElement.closest('.window') !== null
    if (isDesktopWindow) {
      return
    }
    const selector = `.${desktopIconStyles.desktopIcon}[data-window-opener=true]`
    const isDesktopIconAndWindowOpener =
      targetElement.closest(selector) !== null
    if (isDesktopIconAndWindowOpener) {
      return
    }
    dispatch(unFocusWindows())
  }
  return (
    <div className={styles.desktop} onClick={onUnFocusWindows}>
      <DesktopWindows />
      <DesktopIcons />
    </div>
  )
}

const DesktopIcons = () => {
  const state = useAppSelector((state) => state.desktopIcons)
  const desktopIcons = state.value
  return (
    <div className={styles.desktopIcons}>
      {desktopIcons.map((desktopIcon, index) => (
        <DesktopIcon key={index} {...desktopIcon} />
      ))}
    </div>
  )
}

const DesktopWindows = () => {
  const state = useAppSelector((state) => state.windows)
  const { windows, isWindowFocused } = state
  const topDesktopWindow = [...windows]
    .sort((a, b) => a.desktopIndex - b.desktopIndex)
    .pop()
  const focusedWindow = isWindowFocused ? topDesktopWindow : undefined
  return (
    <div className={styles.desktopWindows}>
      {windows
        .filter(({ desktopIndex }) => desktopIndex >= 0)
        .map((windowItem) => (
          <DesktopWindow
            key={windowItem.id}
            isWindowFocused={windowItem.id === focusedWindow?.id}
            {...windowItem}
          />
        ))}
    </div>
  )
}

export default Desktop
