import { IonCard, IonFab, IonFabButton, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader } from "@ionic/react";
import { add, trashSharp } from 'ionicons/icons';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TaskModal from "../task/TaskModal";
import { getTasks, removeTask, updateTask } from "../../services/task.services";
import TaskItem from "../task/TaskItem";

const HomeContainer: React.FC = () => {
	const { t } = useTranslation("global");
	const [openNewTaskModal, setOpenNewTaskModal] = useState(false)
	const [selectedTask, setSelectedTask] = useState<Task>()
	const [tasks, setTasks] = useState<Task[]>([])

	function getFilteredTasks(dueDate: string): Task[] {
		return tasks.filter((task: Task) => task.dueDate === dueDate);
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
				dueDate: "today",
				dueTime: null,
				complete: false,
			}} ></TaskModal>}
		</>
	);
};

export default HomeContainer;