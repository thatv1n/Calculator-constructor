import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { removeUsedElement } from '../../redux/slices/slices';
import { BoardItemsTypes } from './BoardItems.types';

export const BoardItems: React.FC<BoardItemsTypes> = ({ stateItems, setStateItems }) => {
	const dispatch = useAppDispatch();

	const switcher = useAppSelector((state) => state.calculator.switcherType);
	const usedElements = useAppSelector((state) => state.calculator.usedElements);

	const [currentItem, setCurrentItem] = useState<string>();

	const clickItemListener = (element: EventTarget) => {
		const target = element as HTMLElement;
		if (
			!['display__content', 'wrapper-numbers__content', 'wrapper-operators__content'].includes(
				target.className,
			)
		) {
			console.log(target.innerText);
		}
	};

	const removeItemListener = (id: string) => {
		const filter = usedElements.filter((item) => item !== id);
		const filterState = stateItems.filter((item: HTMLElement) => item.id !== id);
		setStateItems(filterState);
		dispatch(removeUsedElement(filter));
	};

	const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
		const target = e.target as HTMLElement;
		let item;

		if (target.className) {
			if (target.className === 'button') item = target.parentElement as HTMLElement;
			else {
				item = target;
			}
		}
		if (item) {
			item.style.position = 'relative';
			item.classList.add('line');
		}
	};

	const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
		const target = e.target as HTMLElement;
		removeBottomLine(target);
	};

	const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
		const target = e.target as HTMLElement;
		removeBottomLine(target);
	};

	const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
		const target = e.target as HTMLElement;
		setCurrentItem(target.id);
	};

	const dragDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
		const target = e.target as HTMLElement;
		if (currentItem) {
			const currentTarget = target.parentElement?.parentElement as HTMLElement;
			const dropIndex = stateItems.findIndex((item) => item.id === currentTarget.id);
			const filtered = stateItems.filter((item) => item.id !== currentItem);
			const findElem = stateItems.filter((item) => item.id === currentItem)[0];
			filtered.splice(dropIndex + 1, 0, findElem);

			setStateItems(filtered);
			removeBottomLine(target);
		}
	};

	const removeBottomLine = (target: HTMLElement) => {
		let item;
		if (target.className) {
			if (target.className === 'button') item = target.parentElement as HTMLElement;
			else {
				item = target;
			}
		}
		if (item) {
			if (item.className === 'wrapper-item') item = item.firstChild as HTMLElement;
			item.style.position = 'none';
			item.classList.remove('line');
		}
	};

	return (
		<>
			{stateItems.map((item: HTMLElement, i: number) => {
				return (
					<div
						key={i}
						dangerouslySetInnerHTML={{ __html: item.outerHTML }}
						onClick={(e) => !switcher && clickItemListener(e.target)}
						onDoubleClick={() => !!switcher && removeItemListener(item.id)}
						draggable={item.id !== 'display'}
						onDragStart={dragStartHandler}
						onDragOver={dragOverHandler}
						onDragLeave={dragLeaveHandler}
						onDragEnd={dragEndHandler}
						onDrop={dragDropHandler}
						id={item.id}
					></div>
				);
			})}
		</>
	);
};
