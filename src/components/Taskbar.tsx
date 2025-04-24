import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import WindowsIcon from 'src/assets/icons/windows.png'
import styles from 'src/components/Taskbar.module.css'
import { useAppSelector } from 'src/redux/hooks'
import {
  TaskbarWindowState,
  toggleMinimize,
} from 'src/redux/slices/windowsSlice'

const Taskbar = () => {
  return (
    <div className={styles.taskbar}>
      <TaskbarStartButton />
      <TaskbarWindowIcons />
      <TaskbarDateTime />
    </div>
  )
}

const TaskbarStartButton = () => {
  return (
    <div className={`${styles.taskbar_item} ${styles.taskbar_startButton}`}>
      <img src={WindowsIcon} className={styles.taskbar_startButton_icon} />
      <span>Start</span>
    </div>
  )
}

const TaskbarWindowIcons = () => {
  const state = useAppSelector((state) => state.windows)
  const { taskbarWindows } = state
  return (
    <div className={styles.taskbar_windowIcons}>
      {taskbarWindows.map((taskbarWindow) => (
        <TaskbarWindowIcon key={taskbarWindow.id} {...taskbarWindow} />
      ))}
    </div>
  )
}

type TaskbarWindowIconProps = TaskbarWindowState
const TaskbarWindowIcon = (props: TaskbarWindowIconProps) => {
  const { file, id } = props
  const title = `${file.title} - ${file.applicationType}`
  const dispatch = useDispatch()
  const onToggleMinimize = () => dispatch(toggleMinimize(id))
  return (
    <>
      <div
        className={`${styles.taskbar_item} ${styles.taskbar_windowIcon}`}
        onClick={onToggleMinimize}
      >
        <img src={file.icon} className={styles.taskbar_windowIcon_icon} />
        <span className={styles.taskbar_windowIcon_text}>{title}</span>
      </div>
    </>
  )
}

const timeFormatter = new Intl.DateTimeFormat('en-NZ', {
  timeZone: 'Pacific/Auckland',
  timeStyle: 'short',
})

const TaskbarDateTime = () => {
  const [datetime, setDatetime] = useState(new Date())
  const datetimeRef = useRef(new Date())

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      if (datetimeRef.current.getMinutes() !== now.getMinutes()) {
        datetimeRef.current = now
        setDatetime(now)
      }
    }
    const clock = setInterval(updateDateTime, 1000)
    return () => clearInterval(clock)
  }, [])

  const time = timeFormatter.format(datetime).toUpperCase()

  return (
    <div className={`${styles.taskbar_item} ${styles.taskbar_datetime}`}>
      <span>{time}</span>
    </div>
  )
}

export default Taskbar
