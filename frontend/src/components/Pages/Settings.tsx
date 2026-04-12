const Settings = () => {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-8 text-slate-800">Настройки системы</h1>

            <div className="space-y-6">
                {/* Секция 1: Складские лимиты */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        📦 Складская логика
                    </h2>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div>
                            <p className="font-medium">Критический порог остатка</p>
                            <p className="text-sm text-slate-500">Система подсветит товар красным, если его меньше этого числа</p>
                        </div>
                        <input type="number" defaultValue={5} className="w-20 p-2 border rounded-md text-center font-bold" />
                    </div>
                </section>

                {/* Секция 2: Финансы */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        💰 Ценообразование
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm text-slate-500">Стандартная наценка (%)</label>
                            <input type="text" placeholder="20" className="w-full p-2 border rounded-md" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm text-slate-500">Валюта системы</label>
                            <select className="w-full p-2 border rounded-md">
                                <option>RUB (₽)</option>
                                <option>USD ($)</option>
                            </select>
                        </div>
                    </div>
                </section>

                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-lg shadow-blue-200">
                    Сохранить изменения
                </button>
            </div>
        </div>
    );
};
export default Settings;