import { IonToggleCustomEvent } from "@ionic/core";
import { createGesture, GestureDetail, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonToggle, ToggleChangeEventDetail } from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { FunctionComponent, useEffect, useRef } from "react";

interface TaskItemProps {
	task: Task,
	onSelect: (task: Task) => void,
	onSwipeRight: (task: Task) => void,
	onSwipeLeft: (task: Task) => void,
}

const TaskItem: FunctionComponent<TaskItemProps> = (props) => {

	const item = useRef<HTMLIonItemElement | null>(null);
	const label = useRef<HTMLIonLabelElement | null>(null);
	const X_SLIDE_OFFSET = 200;


	const onMove = (detail: GestureDetail) => {
		const { deltaX } = detail;

		if (deltaX > X_SLIDE_OFFSET) {
			label.current?.classList.add('text-strikethrough');
			props.onSwipeRight(props.task)
		}
		if (deltaX < -X_SLIDE_OFFSET) {
			label.current?.classList.remove('text-strikethrough');
			props.onSwipeLeft(props.task)
		}
	};

	function onToggle(ev: IonToggleCustomEvent<ToggleChangeEventDetail<any>>) {
		if (ev.target.checked) {
			label.current?.classList.add('text-strikethrough');
			props.onSwipeRight(props.task)
		} else {
			label.current?.classList.remove('text-strikethrough');
			props.onSwipeLeft(props.task)
		}
	}



	useEffect(() => {
		if (item.current) {
			const gesture = createGesture({
				el: item.current,
				onMove: (detail) => onMove(detail),
				gestureName: 'slide-right',
			});

			gesture.enable();
		}
	});


	return (
		<IonItem key={props.task.id} ref={item}>
			<IonLabel className={props.task.complete ? 'text-strikethrough ion-text-capitalize' : 'ion-text-capitalize'} onClick={() => props.onSelect(props.task)} ref={label}>{props.task.label} {props.task.dueTime ? `(${props.task.dueTime})` : ""}</IonLabel>
			<IonToggle enableOnOffLabels={true} checked={props.task.complete} slot="end" onIonChange={(ev) => onToggle(ev)}></IonToggle>
		</IonItem>
	);
}

export default TaskItem;

function getNewTransform(): any {
	throw new Error("Function not implemented.");
}
