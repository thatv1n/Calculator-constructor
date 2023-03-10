import { FC } from 'react';

import { useAppSelector } from '../../redux/hook';
import { CommonTypes } from '../../types/basic.types';

import { Button } from '../Button';

export const SidebarItemSmooth: FC<CommonTypes> = ({ dragStartHandler }) => {
	const switcher = useAppSelector((state) => state.calculator.switcherType);
	const usedElements = useAppSelector((state) => state.calculator.usedElements);

	const draggable = !usedElements.includes('smooth') && !!switcher;

	const style = usedElements.includes('smooth') ? { opacity: '50%' } : { opacity: '100%' };

	return (
		<div
			className='wrapper-item'
			onDragStart={(e) => dragStartHandler(e)}
			draggable={draggable}
			id='smooth'
			style={style}
		>
			<div className='wrapper-smooth__button'>
				<Button>{'='}</Button>
			</div>
		</div>
	);
};
