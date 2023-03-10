import { FC } from 'react';
import { ButtonTypes } from './ButtonTypes';

import './Button.css';

export const Button: FC<ButtonTypes> = ({ children }) => {
	return <div className='button'>{children}</div>;
};
