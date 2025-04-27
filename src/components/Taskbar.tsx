import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import {
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import WindowsIcon from 'src/assets/icons/windows.png'
import styles from 'src/components/Taskbar.module.css'
import { useAppSelector } from 'src/redux/hooks'
import {
  reorderTaskbarWindows,
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
    <div
      className={`${styles.taskbar_item} ${styles.taskbar_item__outset} ${styles.taskbar_startButton}`}
    >
      <img src={WindowsIcon} className={styles.taskbar_startButton_icon} />
      <span>Start</span>
    </div>
  )
}

const TaskbarWindowIcons = () => {
  const state = useAppSelector((state) => state.windows)
  const { taskbarWindows } = state
  const dispatch = useDispatch()
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  )
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = taskbarWindows.findIndex(
        (window) => window.id === active.id,
      )
      const newIndex = taskbarWindows.findIndex(
        (window) => window.id === over.id,
      )
      dispatch(reorderTaskbarWindows({ oldIndex, newIndex }))
    }
  }
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
    >
      <SortableContext
        items={taskbarWindows.map((window) => window.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className={styles.taskbar_windowIcons}>
          {taskbarWindows.map((taskbarWindow) => (
            <TaskbarWindowIcon key={taskbarWindow.id} {...taskbarWindow} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

type TaskbarWindowIconProps = TaskbarWindowState
const TaskbarWindowIcon = (props: TaskbarWindowIconProps) => {
  const { id, file, isMinimized } = props
  const title = `${file.title} - ${file.applicationType}`
  const dispatch = useDispatch()
  const onToggleMinimize = () => dispatch(toggleMinimize(id))
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  }
  return (
    <div
      className={`${styles.taskbar_item} ${
        isMinimized ? styles.taskbar_item__outset : styles.taskbar_item__inset
      } ${styles.taskbar_windowIcon}`}
      onClick={onToggleMinimize}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <img src={file.icon} className={styles.taskbar_windowIcon_icon} />
      <span className={styles.taskbar_windowIcon_text}>{title}</span>
    </div>
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
    <div
      className={`${styles.taskbar_item} ${styles.taskbar_item__inset} ${styles.taskbar_datetime}`}
    >
      <span>{time}</span>
    </div>
  )
}

export default Taskbar
