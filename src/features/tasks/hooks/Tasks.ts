import { useRecoilState } from 'recoil'
import { tasksState } from '../TaskAtoms'
import type { Task } from '../../../types'
import { TASK_PROGRESS_ID } from '../../../constants/app'

interface useTaskActionType {
  completeTask: (taskId: number) => void
  moveTaskCard: (taskId: number, directionNumber: 1 | -1) => void
  addTask : (
    title: string,
    detail: string,
    dueDate: string,
    progressOrder: number,
  ) => void
  deleteTask: (taskId: number) => void;
  editTask: (
    taskId: number,
    title: string,
    detail: string,
    dueDate: string,
    progressOrder: number,
  ) => void;
  updateTask: (body: Task) => void
} 

export const useTasksAction = (): useTaskActionType => {
  const [tasks, setTasks] = useRecoilState<Task[]>(tasksState)

  //complete task
  const completeTask = (taskId: number): void => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId
        ? { ...task, progressOrder: TASK_PROGRESS_ID.COMPLETED }
        : task,
    )
    setTasks(updatedTasks)
  }

  //movetask
  const moveTaskCard = (taskId : number, directionNumber: 1 | -1): void => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId
        ? { ...task, progressOrder: task.progressOrder + directionNumber }
        : task,
    )
    setTasks(updatedTasks)
  }

  //addTask
  const addTask = (
    title: string,
    detail: string,
    dueDate: string,
    progressOrder: number,
  ): void => {
    const newTask: Task = {
      id: tasks.length + 1,
      title,
      detail,
      dueDate,
      progressOrder,
    }
    setTasks([...tasks, newTask])
  }

  const deleteTask = (taskId: number): void => {
    const updatedTasks: Task[] = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    alert("Task Deleted");
  };

  const editTask = (
    taskId: number,
    newTitle: string,
    newDetail: string,
    newDueDate: string,
    newProgressOrder: number
  ): void => {
    const updatedTasks: Task[] = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, title: newTitle, detail: newDetail, dueDate: newDueDate, progressOrder: newProgressOrder };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
    alert("Task Edited");
  };

  const updateTask = (body: Task): void => {
    const updatedTasks: Task[] = tasks.map((task) => (task.id === body.id ? { ...body } : task))
    setTasks(updatedTasks)
    alert("Task edited");
  }

  return {
    completeTask,
    moveTaskCard,
    addTask,
    deleteTask,
    editTask,
    updateTask
  }
}