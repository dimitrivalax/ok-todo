import { IonCard, IonFab, IonFabButton, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader } from "@ionic/react";
import { add } from 'ionicons/icons';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TaskModal from "../task/TaskModal";
import { getTasks, updateTask } from "../../services/task.services";
import TaskItem from "../task/TaskItem";
import { format } from "date-fns";

const HomeContainer: React.FC = () => {
	const { t } = useTranslation();
	const [openNewTaskModal, setOpenNewTaskModal] = useState(false)
	const [selectedTask, setSelectedTask] = useState<Task>()
	const [tasks, setTasks] = useState<Task[]>([])

	function getFilteredTasks(dueDate: string): Task[] {
		const nowTime = format(new Date(), "hh:mm")
		switch (dueDate) {
			case 'today':
				return tasks.filter((task: Task) => task.dueTime && task.dueTime > nowTime);
			case 'tomorrow':
				return tasks.filter((task: Task) => task.dueTime && task.dueTime <= nowTime);
			case 'one_day':
				return tasks.filter((task: Task) => !task.dueTime );
			default:
				tasks


		}
		return dueDate === 'today' ? tasks.filter((task: Task) => task.dueTime && task.dueTime > nowTime) : tasks.filter((task: Task) => task.dueTime && task.dueTime <= nowTime);
	}

	function closeTaskModal() {
		setSelectedTask(undefined)
		setTasks(getTasks())
		setOpenNewTaskModal(false)
	}

	function onSelectTack(task: Task) {
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
					{getFilteredTasks("today").map((task: Task) =>
						<TaskItem key={task.id} task={task} onSelect={(task: Task) => onSelectTack(task)} onSwipeRight={(task: Task) => taskDone(task)} onSwipeLeft={(task: Task) => taskUnDone(task)}></TaskItem>
					)}
				</IonList>
			</IonCard>
			<IonCard mode="ios">
				<IonList inset={true} lines="inset">
					<IonListHeader color="warning">
						<IonLabel>{t('Home.tomorrow')}</IonLabel>
					</IonListHeader>
					{getFilteredTasks("tomorrow").map((task: Task) =>
						<TaskItem key={task.id} task={task} onSelect={(task: Task) => onSelectTack(task)} onSwipeRight={(task: Task) => taskDone(task)} onSwipeLeft={(task: Task) => taskUnDone(task)}></TaskItem>
					)}
				</IonList>
			</IonCard>
			<IonCard mode="ios">
				<IonList inset={true} lines="inset">
					<IonListHeader color="danger">
						<IonLabel>{t('Home.one_day')}</IonLabel>
					</IonListHeader>
					{getFilteredTasks("one_day").map((task: Task) =>
						<TaskItem key={task.id} task={task} onSelect={(task: Task) => onSelectTack(task)} onSwipeRight={(task: Task) => taskDone(task)} onSwipeLeft={(task: Task) => taskUnDone(task)}></TaskItem>
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