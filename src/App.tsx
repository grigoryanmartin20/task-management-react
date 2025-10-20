import { Outlet } from "react-router"
import { ToastContainer } from 'react-toastify';

const App = () => {
	return (
		<div className="min-h-screen bg-gray-900 p-2">
			<Outlet />
			<ToastContainer theme="colored" />
		</div>
	)
}

export default App;