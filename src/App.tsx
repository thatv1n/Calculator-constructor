import './App.css';
import { Board, Sidebar } from './components';

function App() {
	return (
		<div className='App'>
			<div className='content'>
				<Sidebar />
				<Board />
			</div>
		</div>
	);
}

export default App;
