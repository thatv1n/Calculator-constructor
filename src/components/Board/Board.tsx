import { FC, useRef, useState } from 'react';

import { Switcher } from '../Switcher';

import { ReactComponent as ImgSvg } from '../../assets/icons/img.svg';

import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { setUsedElements } from '../../redux/slices/slices';

import { BoardItems } from '../BoardItems';
import './Board.css';

export const Board: FC = () => {
	const dispatch = useAppDispatch();

	const [stateItems, setStateItems] = useState<HTMLElement[]>([]);

	const boardRef = useRef<HTMLDivElement>(null);

	const usedElements = useAppSelector((state) => state.calculator.usedElements);

	const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
		const data = e.dataTransfer.getData('text/html');
		const parser = new DOMParser();
		const doc = parser.parseFromString(data, 'text/html');
		let element = doc.body.firstChild as HTMLElement;
		if (element) {
			element.setAttribute('id', element.id);
			element.removeAttribute('draggable');
			element.removeAttribute('onDragStart');
			setStateItems((items: HTMLElement[]) => [...items, element]);
			dispatch(setUsedElements(element.id));
		}

		const board = boardRef.current!;
		board.style.background = 'none';
	};

	const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const target = boardRef.current!;
		if (target.id === 'target-drop') target.style.background = '#F0F9FF';
	};

	const dragLeaveHandler = () => {
		const target = boardRef.current!;
		if (target.id === 'target-drop') target.style.background = 'none';
	};

	const styles = !stateItems.length ? 'target-drop-empty' : 'target-drop-items';

	return (
		<div className='wrapper-target'>
			<Switcher />
			<div
				ref={boardRef}
				className={styles}
				id='target-drop'
				onDrop={(e) => dropHandler(e)}
				onDragOver={(e) => dragOverHandler(e)}
				onDragLeave={dragLeaveHandler}
			>
				{usedElements.length ? (
					<BoardItems stateItems={stateItems} setStateItems={setStateItems} />
				) : (
					<div className='target-drop__block'>
						<ImgSvg />
						<div className='block-title'>Перетащите сюда</div>
						<span>любой элемент из левой панели</span>
					</div>
				)}
			</div>
		</div>
	);
};
