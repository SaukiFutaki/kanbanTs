import React, { useState } from 'react' // useState ditambahkan
import TaskMenu from '../shared/TaskMenu'
import type { Task, CSSProperties } from '../../../../types'
import { TASK_PROGRESS_ID } from '../../../../constants/app'
// import { useRecoilState } from 'recoil'  // Ditambahkan
// import { tasksState } from '../../TaskAtoms'  // Ditambahkan
import { useTasksAction } from '../../hooks/Tasks'


interface TaskCardProps {
  task: Task
}
  // Ditambahkan
  
  
  const getIconStyle = (progressOrder: number): React.CSSProperties => {
    const color: '#55C89F' | '#C5C5C5' =
    progressOrder === TASK_PROGRESS_ID.COMPLETED ? '#55C89F' : '#C5C5C5'
    
    const cursor: 'default' | 'pointer' =
    progressOrder === TASK_PROGRESS_ID.COMPLETED ? 'default' : 'pointer'
    
    return {
      color,
      cursor,
      fontSize: '28px',
    }
  }
 
  
const getArrowPositionStyle = (progressOrder: number): React.CSSProperties => {
  const justifyContentValue: 'flex-end' | 'space-between' =
    progressOrder === 1 ? 'flex-end' : 'space-between'
  return {
    display: 'flex',
    justifyContent: justifyContentValue,
  }
}

const TaskCard = ({ task }: TaskCardProps): JSX.Element => {
  // const [tasks, setTasks] = useRecoilState<Task[]>(tasksState)
  // const completeTask = (taskId: number): void => {
  //   const updatedTasks: Task[] = tasks.map((task) =>
  //     task.id === taskId
  //       ? { ...task, progressOrder: TASK_PROGRESS_ID.COMPLETED }
  //       : task,
  //   )
  //   setTasks(updatedTasks)
  // }
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  
  
  const { completeTask, moveTaskCard } = useTasksAction()
  return (
    <div style={styles.taskCard}>
      <div style={styles.taskIcons}>
        <div className="material-icons" style={getIconStyle(task.progressOrder)} onClick={() :void => completeTask(task.id)}>check_circle</div>
        <div className="material-icons" style={styles.menuIcon}
        onClick={() :void => setIsMenuOpen(true)}>
          more_vert
        </div>
          {isMenuOpen && <TaskMenu setIsMenuOpen={setIsMenuOpen}  task={task}/>}
      </div>
      <p style={styles.taskTitle}>{task.title}</p>
      <div>
        <p>{task.detail}</p>
      </div>
      <div>
        <p>Due on {task.dueDate}</p>
      </div>
      <div style={getArrowPositionStyle(task.progressOrder)}>
      {task.progressOrder !== TASK_PROGRESS_ID.NOT_STARTED && (
        <button onClick={() :void => moveTaskCard(task.id, -1)} className="material-icons">chevron_left</button>
        )}
        {task.progressOrder !== TASK_PROGRESS_ID.COMPLETED && (
          <button onClick={() :void => moveTaskCard(task.id, 1)} className="material-icons">chevron_right</button>
          )}
      </div>
    </div>
  )
}

const styles: CSSProperties = {
  taskCard: {
    backgroundColor: '#C7EFD0',
    borderRadius: '12px',
    padding: '24px',
    margin: '12px 0',
    fontSize: '20px',
    overflowWrap: 'anywhere',
    position: 'relative',
  },
  taskIcons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuIcon: {
    cursor: 'pointer',
  },
  taskTitle: {
    fontSize: '30px',
  },
  arrowsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}

export default TaskCard
