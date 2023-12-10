import { useEffect, useRef, useState } from "react";
import styles from "./DialogBox.module.css";
import Draggable from "react-draggable";
import Vector2 from "../../../features/math/vector2.js";
import { ReactSVG } from "react-svg";
import utilStyles from "../../../styles/utils.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const DIALOG_CONTENT_TYPES = {
	CloseButton: 0
};

export function DialogBox({ modal, params }) {
	const { app, title, children } = params;

	const nodeRef = useRef(null);

	const [initialised, setInitialised] = useState(false);
	const [startPosition, setStartPosition] = useState(modal.position);

	const [screenWidth, setScreenWidth] = useState(100);
	const [screenHeight, setScreenHeight] = useState(100);

	useEffect(() => {
		const resizeObserver = new ResizeObserver((event) => {
			setScreenWidth(event[0].contentBoxSize[0].inlineSize);
			setScreenHeight(event[0].contentBoxSize[0].blockSize);
			setInitialised(true);
		});

		resizeObserver.observe(document.getElementById("root"));
	}, []);

	useEffect(() => {
		if (!initialised)
			return;

		if (modal.size.x > screenWidth || modal.size.y > screenHeight) {
			setStartPosition(new Vector2(0, 0));
		} else {
			if (modal.position.x > screenWidth) {
				modal.position.x = 0;
				setStartPosition(modal.position);
			}
			if (modal.position.y > screenHeight) {
				modal.position.y = 0;
				setStartPosition(modal.position);
			}
		}
	}, [initialised, modal, screenHeight, screenWidth]);

	const onClick = (event) => {
		event.preventDefault();
		const type = parseInt(event.target.getAttribute("data-type"));

		switch (type) {
			case DIALOG_CONTENT_TYPES.CloseButton:
				modal.close();
				break;
		}
	};

	return (<Draggable
		axis="both"
		handle={".Dialog-handle"}
		defaultPosition={startPosition}
		position={null}
		scale={1}
		bounds={{
			top: 0,
			bottom: screenHeight - 55,
			left: -modal.size.x + 85,
			right: screenWidth - 5
		}}
		cancel="button"
		nodeRef={nodeRef}
	>
		<div
			className={styles.Container}
			ref={nodeRef}
			style={{
				width: modal.size.x,
				height: modal.size.y,
			}}
		>
			<div className={`${styles.Header} Dialog-handle`}>
				<ReactSVG
					className={styles["Dialog-icon"]}
					src={process.env.PUBLIC_URL + `/media/applications/icons/${app.id}.svg`}
				/>
				<p className={utilStyles["Text-semibold"]}>{title}</p>
				<button aria-label="Close" className={`${styles["Header-button"]} ${styles["Exit-button"]}`} tabIndex={0} id="close-dialog"
					onClick={() => { modal.close(); }}>
					<FontAwesomeIcon icon={faXmark}/>
				</button>
			</div>
			<div className={styles["Dialog-content"]} onClick={onClick}>
				{children}
			</div>
		</div>
	</Draggable>);
}