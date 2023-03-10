import { FC } from 'react';

import { ReactComponent as ArrowSvg } from '../../assets/icons/arrow.svg';
import { ReactComponent as EyeSvg } from '../../assets/icons/eye.svg';

import { useAppDispatch, useAppSelector } from '../../redux/hook';

import { setSwitcherType } from '../../redux/slices/slices';

import './Switcher.css';

export const Switcher: FC = () => {
	const dispatch = useAppDispatch();
	const switcher = useAppSelector((state) => state.calculator.switcherType);

	const items = [
		{ icon: EyeSvg, value: 'Runtime' },
		{ icon: ArrowSvg, value: 'Constructor' },
	];

	const setSwitcher = (value: number) => {
		dispatch(setSwitcherType(value));
	};

	return (
		<div className='wrapper-switcher'>
			{items.map((obj, i) => (
				<div
					className={`${i === switcher ? 'active' : null}`}
					onClick={() => setSwitcher(i)}
					key={i}
				>
					<obj.icon />
					{obj.value}
				</div>
			))}
		</div>
	);
};
