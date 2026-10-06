import { IonToggleCustomEvent } from "@ionic/core";
import { createGesture, GestureDetail, IonItem, IonLabel, IonToggle, ToggleChangeEventDetail } from "@ionic/react";
import { FunctionComponent, useEffect, useRef } from "react";
import type { Task } from "../../global/types";

interface TaskItemProps {
	task: Task,
	onSelect: (task: Task) => void,
	onSwipeRight: (task: Task) => void,
	onSwipeLeft: (task: Task) => void,
}

const X_SLIDE_OFFSET = 200;

const TaskItem: FunctionComponent<TaskItemProps> = (props) => {

	const item = useRef<HTMLIonItemElement | null>(null);
	// Keep the latest props in a ref so the gesture (created once) always
	// calls the current handlers without re-creating the gesture on every render.
	const propsRef = useRef(props);
	propsRef.current = props;

	const onEnd = (detail: GestureDetail) => {
		const { deltaX } = detail;
		const current = propsRef.current;
		if (deltaX > X_SLIDE_OFFSET) {
			current.onSwipeRight(current.task);
		} else if (deltaX < -X_SLIDE_OFFSET) {
			current.onSwipeLeft(current.task);
		}
	};

	function onToggle(ev: IonToggleCustomEvent<ToggleChangeEventDetail>) {
		if (ev.target.checked) {
			props.onSwipeLeft(props.task)
		} else {
			props.onSwipeRight(props.task)
		}
	}

	useEffect(() => {
		if (!item.current) {
			return;
		}
		const gesture = createGesture({
			el: item.current,
			onEnd: (detail) => onEnd(detail),
			gestureName: 'slide-right',
		});
		gesture.enable();
		return () => gesture.destroy();
	}, []);


	return (
		<IonItem ref={item}>
			<IonLabel className={props.task.complete ? 'text-strikethrough ion-text-capitalize' : 'ion-text-capitalize'} onClick={() => props.onSelect(props.task)}>{props.task.label} {props.task.dueTime ? `(${props.task.dueTime})` : ""}</IonLabel>
			<IonToggle
				aria-label={props.task.label}
				enableOnOffLabels={true}
				checked={!props.task.complete}
				slot="end"
				onIonChange={(ev) => onToggle(ev)}
			/>
		</IonItem>
	);
}

export default TaskItem;
