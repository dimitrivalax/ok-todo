import { IonCard, IonFab, IonFabButton, IonIcon, IonLabel, IonList, IonListHeader } from "@ionic/react";
import { add } from 'ionicons/icons';
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import TaskModal from "../task/TaskModal";
import { getTasks, sortTaskByDueTime, updateTask } from "../../services/task.services";
import TaskItem from "../task/TaskItem";
import { format } from "date-fns";
import type { Task } from "../../global/types";

const HomeContainer: React.FC = () => {
	const { t } = useTranslation();
	const [openNewTaskModal, setOpenNewTaskModal] = useState(false)
	const [selectedTask, setSelectedTask] = useState<Task>()
	const [tasks, setTasks] = useState<Task[]>([])

	function getFilteredTasks(dueDate: string): Task[] {
		const nowTime = format(new Date(), "HH:mm")
		let orderedTasks: Task[] = []
		switch (dueDate) {
			case 'today':
				orderedTasks = tasks.filter((task: Task) => task.dueTime && task.dueTime > nowTime);
				break;
			case 'tomorrow':
				orderedTasks = tasks.filter((task: Task) => task.dueTime && task.dueTime <= nowTime);
				break;
			case 'one_day':
				orderedTasks = tasks.filter((task: Task) => !task.dueTime);
				break;
			default:
				break;
		}
		return sortTaskByDueTime(orderedTasks)
	}

	const todayTasks = useMemo(() => getFilteredTasks("today"), [tasks])
	const tomorrowTasks = useMemo(() => getFilteredTasks("tomorrow"), [tasks])
	const oneDayTasks = useMemo(() => getFilteredTasks("one_day"), [tasks])

	function closeTaskModal() {
		setSelectedTask(undefined)
		setTasks(getTasks())
		setOpenNewTaskModal(false)
	}

	function onSelectTask(task: Task) {
		setSelectedTask(task)
		setOpenNewTaskModal(true)
	}

	function taskDone(task: Task) {
		setSelectedTask(undefined);
		task.complete = true;
		updateTask(task);
		setTasks(getTasks())
	}
	function taskUnDone(task: Task) {
		setSelectedTask(undefined);
		task.complete = false;
		updateTask(task);
		setTasks(getTasks())
	}

	// EFFECTS
	useEffect(() => {
		setTasks(getTasks())
	}, []);

	return (
		<>
			<IonCard mode="ios">
				<IonList inset={true} lines="inset">
					<IonListHeader color="success">
						<IonLabel>{t('Home.today')}</IonLabel>
					</IonListHeader>
					{todayTasks.map((task: Task) =>
						<TaskItem key={task.id} task={task} onSelect={(task: Task) => onSelectTask(task)} onSwipeRight={(task: Task) => taskDone(task)} onSwipeLeft={(task: Task) => taskUnDone(task)}></TaskItem>
					)}
				</IonList>
			</IonCard>
			<IonCard mode="ios">
				<IonList inset={true} lines="inset">
					<IonListHeader color="warning">
						<IonLabel>{t('Home.tomorrow')}</IonLabel>
					</IonListHeader>
					{tomorrowTasks.map((task: Task) =>
						<TaskItem key={task.id} task={task} onSelect={(task: Task) => onSelectTask(task)} onSwipeRight={(task: Task) => taskDone(task)} onSwipeLeft={(task: Task) => taskUnDone(task)}></TaskItem>
					)}
				</IonList>
			</IonCard>
			<IonCard mode="ios">
				<IonList inset={true} lines="inset">
					<IonListHeader color="danger">
						<IonLabel>{t('Home.one_day')}</IonLabel>
					</IonListHeader>
					{oneDayTasks.map((task: Task) =>
						<TaskItem key={task.id} task={task} onSelect={(task: Task) => onSelectTask(task)} onSwipeRight={(task: Task) => taskDone(task)} onSwipeLeft={(task: Task) => taskUnDone(task)}></TaskItem>
					)}
				</IonList>
			</IonCard>
			<IonFab horizontal="end" vertical="bottom" slot="fixed">
				<IonFabButton onClick={() => setOpenNewTaskModal(true)}>
					<IonIcon icon={add}></IonIcon>
				</IonFabButton>
			</IonFab>
			{openNewTaskModal && <TaskModal onClose={() => closeTaskModal()} task={selectedTask || {
				id: "",
				label: "",
				dueTime: null,
				complete: false,
			}} ></TaskModal>}
		</>
	);
};

export default HomeContainer;
