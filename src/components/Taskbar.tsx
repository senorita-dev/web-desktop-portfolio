import styles from 'src/components/Taskbar.module.css'
import { useEffect, useRef, useState } from 'react'
import WindowsIcon from 'src/assets/icons/windows.png'
import { useAppSelector } from 'src/redux/hooks'
import { WindowProps } from './Window'

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
  const { windows } = state
  return (
    <div className={styles.taskbar_windowIcons}>
      {windows.map((window) => (
        <TaskbarWindowIcon key={window.id} {...window} />
      ))}
    </div>
  )
}

type TaskbarWindowIconProps = WindowProps
const TaskbarWindowIcon = (props: TaskbarWindowIconProps) => {
  const { file } = props
  const title = `${file.title} - ${file.applicationType}`
  return (
    <>
      <div className={`${styles.taskbar_item} ${styles.taskbar_windowIcon}`}>
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
