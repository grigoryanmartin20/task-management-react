import { Outlet } from "react-router"

const App = () => {
	return (
		<div className="min-h-screen bg-gray-900 p-2">
			<Outlet />
		</div>
	)
}

export default App;