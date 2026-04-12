import React from 'react';

const HomeClient = () => {
    // Имитация данных для домашней страницы
    const activeOrders = [
        { id: 'ORD-772', status: 'В пути', date: '12.04', total: 15400 },
        { id: 'ORD-781', status: 'Собран', date: '13.04', total: 8200 },
    ];

    const recommended = [
        { id: 1, name: 'Нимисулид', price: 1200, category: 'НПВС' },
        { id: 2, name: 'Кетарол', price: 2500, category: 'Обезболивающее' },
    ];

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            {/* 1. ПРИВЕТСТВИЕ */}
            <header className="mb-10">
                <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                    Добро пожаловать, <span className="text-blue-600">FarmaMed</span>! 👋
                </h1>
                <p className="text-slate-500 mt-2">Ваш склад работает в штатном режиме. Сегодня ожидается 2 поставки.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* 2. БЛОК АКТИВНЫХ ЗАКАЗОВ */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-800">Активные заказы</h2>
                        <button className="text-sm text-blue-600 font-semibold hover:underline">Все заказы →</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeOrders.map(order => (
                            <div key={order.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-xs font-mono text-slate-400">#{order.id}</span>
                                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 uppercase">
                                        {order.status}
                                    </span>
                                </div>
                                <p className="text-lg font-bold text-slate-800">{order.total.toLocaleString()} ₽</p>
                                <p className="text-xs text-slate-400 mt-1">Ожидаемая дата: {order.date}</p>
                                <button className="w-full mt-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-100 transition-colors">
                                    Отследить
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* 3. КАТАЛОГ / РЕКОМЕНДАЦИИ */}
                    <h2 className="text-xl font-bold text-slate-800 pt-4">Часто заказываете</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {recommended.map(item => (
                            <div key={item.id} className="bg-white flex items-center p-4 rounded-2xl border border-slate-100 gap-4">
                                <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-xl">💊</div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-800">{item.name}</h4>
                                    <p className="text-xs text-slate-400">{item.category}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-blue-600">{item.price} ₽</p>
                                    <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-500">В корзину</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. БОКОВАЯ ПАНЕЛЬ (ПОДДЕРЖКА И СТАТИСТИКА) */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-3xl text-white shadow-xl shadow-blue-200">
                        <h3 className="font-bold text-lg mb-2">Ваш менеджер</h3>
                        <div className="flex items-center gap-3 mt-4">
                            <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">👩‍💼</div>
                            <div>
                                <p className="text-sm font-bold">Анна Кузнецова</p>
                                <p className="text-xs text-blue-100">+7 (999) 000-11-22</p>
                            </div>
                        </div>
                        <button className="w-full mt-6 py-3 bg-white text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors">
                            Написать в чат
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-100">
                        <h3 className="font-bold text-slate-800 mb-4">Статистика за месяц</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-500">Закупок сделано</span>
                                <span className="font-bold">12</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-500">Общая сумма</span>
                                <span className="font-bold text-blue-600">240к ₽</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeClient;
