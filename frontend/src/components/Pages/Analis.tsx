// Данные для карточек (KPI)
const kpiData = {
    revenue: 1250000,
    expenses: 850000,
    profit: 400000,
    ordersCount: 154
};

// Данные для линейного графика (Выручка по дням)
const revenueHistory = [
    { date: '01.04', amount: 45000 },
    { date: '02.04', amount: 52000 },
    { date: '03.04', amount: 48000 },
    { date: '04.04', amount: 61000 },
    { date: '05.04', amount: 55000 },
    { date: '06.04', amount: 67000 },
    { date: '07.04', amount: 72000 },
];

// Топ товаров
const topProducts = [
    { name: 'Парацетамол', sales: 1200, status: 'ok' },
    { name: 'Арбидол', sales: 850, status: 'ok' },
    { name: 'Ибупрофен', sales: 600, status: 'low' }, // Дефицит
];
// Импортируем компоненты графиков (нужно установить: npm install recharts)
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Analis = () => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Аналитика системы</h1>

            {/* 1. ФИНАНСОВЫЕ КАРТОЧКИ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                    <p className="text-sm text-gray-500 uppercase font-bold">Оборот (Revenue)</p>
                    <p className="text-2xl font-black text-slate-800">{kpiData.revenue.toLocaleString()} ₽</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
                    <p className="text-sm text-gray-500 uppercase font-bold">Затраты (Expenses)</p>
                    <p className="text-2xl font-black text-slate-800">{kpiData.expenses.toLocaleString()} ₽</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                    <p className="text-sm text-gray-500 uppercase font-bold">Чистая прибыль</p>
                    <p className="text-2xl font-black text-green-600">{kpiData.profit.toLocaleString()} ₽</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 2. ГРАФИК ВЫРУЧКИ */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold mb-4">Динамика выручки (7 дней)</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueHistory}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="date" />
                                <YAxis hide />
                                <Tooltip />
                                <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 3. СКЛАДСКАЯ АНАЛИТИКА (ТОП ТОВАРОВ) */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold mb-4">Топ-5 продаваемых товаров</h3>
                    <div className="space-y-4">
                        {topProducts.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center border-b pb-2">
                                <div>
                                    <p className="font-medium text-slate-700">{item.name}</p>
                                    <p className="text-xs text-gray-400">Продано: {item.sales} шт.</p>
                                </div>
                                {item.status === 'low' ? (
                                    <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded font-bold">ДЕФИЦИТ</span>
                                ) : (
                                    <span className="text-[10px] bg-green-100 text-green-600 px-2 py-1 rounded font-bold">В НОРМЕ</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. БЛОК "МЕРТВЫЙ ГРУЗ" */}
            <div className="mt-6 bg-amber-50 p-6 rounded-xl border border-amber-100">
                <h3 className="text-amber-800 font-bold mb-2 italic">⚠️ Внимание: Мертвый груз</h3>
                <p className="text-sm text-amber-700">
                    Найдено 12 позиций (на сумму 42,000 ₽), которые не продавались более 90 дней. 
                    Рекомендуется провести уценку или возврат поставщику.
                </p>
            </div>
        </div>
    );
};

export default Analis;
