import { FC } from 'react';

import { useAppSelector } from '../../redux/hook';
import { CommonTypes } from '../../types/basic.types';

import { Button } from '../Button';

import './SidebarItemOperators.css';

export const SidebarItemOperators: FC<CommonTypes> = ({ dragStartHandler }) => {
	const operators = ['/', '*', '-', '+'];

	const switcher = useAppSelector((state) => state.calculator.switcherType);
	const usedElements = useAppSelector((state) => state.calculator.usedElements);

	const style = usedElements.includes('operators') ? { opacity: '50%' } : { opacity: '100%' };

	const draggable = !usedElements.includes('operators') && !!switcher;

	return (
		<div
			className='wrapper-item'
			draggable={draggable}
			onDragStart={(e) => dragStartHandler(e)}
			id='operators'
			style={style}
		>
			<div className='wrapper-operators__content'>
				{operators.map((item, i) => (
					<Button key={i}>{item}</Button>
				))}
			</div>
		</div>
	);
};
