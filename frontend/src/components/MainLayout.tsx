import { Outlet,Link } from "react-router-dom"

const MainLayout=()=>{
    return(<>
        <div className="flex h-screen">
            <aside className="w-16 bg-slate-800 text-white flex flex-col items-center py-4">
                <nav className="flex flex-col space-y-4">
                    <Link to="/medicine" title="Склад">📦</Link>
                    <Link to="/settings" title="настройки">⚙️</Link>
                    <Link to="/delivery" title="Заказы">🚛</Link>
                    <Link to="/analis" title="аналитика">📊</Link>
                </nav>
            </aside>
            <main className="flex-1 overflow-y-auto p-4">
                <Outlet/>
            </main>
        </div>
    </>)
}
export default MainLayout