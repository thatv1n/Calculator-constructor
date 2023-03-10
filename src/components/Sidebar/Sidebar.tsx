import { FC } from 'react';

import { SidebarItemDisplay } from '../SidebarItemDisplay';
import { SidebarItemNumbers } from '../SidebarItemNumbers';
import { SidebarItemOperators } from '../SidebarItemOperators';
import { SidebarItemSmooth } from '../SidebarItemSmooth';

import './Sidebar.css';

export const Sidebar: FC = () => {
	const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
		const target = e.target as HTMLElement;
		const clone = target.cloneNode(true) as HTMLElement;
		e.dataTransfer.setData('text/plain', '');
		e.dataTransfer.setData('text/html', clone.outerHTML);
	};

	return (
		<div className='wrapper-items'>
			<SidebarItemDisplay dragStartHandler={dragStartHandler} />
			<SidebarItemOperators dragStartHandler={dragStartHandler} />
			<SidebarItemNumbers dragStartHandler={dragStartHandler} />
			<SidebarItemSmooth dragStartHandler={dragStartHandler} />
		</div>
	);
};
