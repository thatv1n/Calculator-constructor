import { FC } from 'react';

import { useAppSelector } from '../../redux/hook';
import { CommonTypes } from '../../types/basic.types';

import './SidebarItemDisplay.css';

export const SidebarItemDisplay: FC<CommonTypes> = ({ dragStartHandler }) => {
	const switcher = useAppSelector((state) => state.calculator.switcherType);
	const usedElements = useAppSelector((state) => state.calculator.usedElements);

	const draggable = !usedElements.includes('display') && !!switcher;

	const style = usedElements.includes('display') ? { opacity: '50%' } : { opacity: '100%' };

	return (
		<div
			className='wrapper-item'
			onDragStart={(e) => dragStartHandler(e)}
			draggable={draggable}
			id='display'
			style={style}
		>
			<div className='display__content'>0</div>
		</div>
	);
};
