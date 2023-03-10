import { FC } from 'react';

import { useAppSelector } from '../../redux/hook';
import { CommonTypes } from '../../types/basic.types';

import { Button } from '../Button';

import './SidebarItemNumbers.css';

export const SidebarItemNumbers: FC<CommonTypes> = ({ dragStartHandler }) => {
	const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, ','];

	const switcher = useAppSelector((state) => state.calculator.switcherType);
	const usedElements = useAppSelector((state) => state.calculator.usedElements);

	const draggable = !usedElements.includes('numbers') && !!switcher;

	const style = usedElements.includes('numbers') ? { opacity: '50%' } : { opacity: '100%' };

	return (
		<div
			className='wrapper-item'
			draggable={draggable}
			onDragStart={(e) => dragStartHandler(e)}
			id='numbers'
			style={style}
		>
			<div className='wrapper-numbers__content'>
				{numbers.map((item, key) => (
					<Button key={key}>{item}</Button>
				))}
			</div>
		</div>
	);
};
