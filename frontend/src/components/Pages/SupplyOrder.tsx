import React, { useState } from 'react';
import type { IProduct } from '../../API/stock.service';

// Интерфейс позиции в закупке
interface ISupplyItem {
    id: number;
    medicineName: string;
    quantity: number;
    purchasePrice: number; // Цена закупки (отличается от розничной)
}

// Интерфейс самого заказа поставщику
interface ISupplyOrder {
    id: string;
    supplier: string; // Название фарм-компании
    items: ISupplyItem[];
    totalAmount: number;
    status: 'Черновик' | 'Отправлен' | 'В пути' | 'Принят на склад';
    createdAt: string;
    expectedDate: string;
}

const testSupplies: ISupplyOrder[] = [
    {
        id: "SUP-001",
        supplier: "Брынцалов-А",
        status: "Черновик",
        totalAmount: 45000,
        createdAt: "10.04.2024",
        expectedDate: "15.04.2024",
        items: [
            { id: 101, medicineName: "Анальгин", quantity: 500, purchasePrice: 20 },
            { id: 102, medicineName: "Аспирин", quantity: 300, purchasePrice: 35 }
        ]
    },
    {
        id: "SUP-002",
        supplier: "Протек",
        status: "В пути",
        totalAmount: 128000,
        createdAt: "08.04.2024",
        expectedDate: "12.04.2024",
        items: [
            { id: 201, medicineName: "Инсулин", quantity: 50, purchasePrice: 1500 }
        ]
    }
];

const statusStyles = {
    'Черновик': 'bg-gray-100 text-gray-700',
    'Отправлен': 'bg-blue-100 text-blue-700',
    'В пути': 'bg-yellow-100 text-yellow-700',
    'Принят на склад': 'bg-green-100 text-green-700'
};
interface SupplyOrderProps {
    products: IProduct[];
    onOrderSuccess: () => Promise<void>;
}


const SupplyOrder = ({ products, onOrderSuccess }: SupplyOrderProps) => {
    
    console.log(products)
    const [orders, setOrders] = useState<ISupplyOrder[]>(testSupplies);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'summary' | 'detailed'>('detailed');

    // Состояние для формы нового заказа
    const [formData, setFormData] = useState({
        supplier: '',
        medicineName: '',
        quantity: 0,
        price: 0
    });

    // Функция сбора данных для отправки на бэк
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Формируем объект, который "улетит" на сервер
        const orderToBack = {
            id: `SUP-${Date.now()}`, // Временный ID
            supplier: formData.supplier,
            items: [
                {
                    medicineName: formData.medicineName,
                    quantity: Number(formData.quantity),
                    purchasePrice: Number(formData.price)
                }
            ],
            status: 'Черновик',
            totalAmount: formData.quantity * formData.price,
            createdAt: new Date().toLocaleDateString()
        };

        console.log("Отправка на бэк-энд:", orderToBack);

        // Обновляем локальный стейт (имитация ответа от бэка)
        // setOrders([...orders, orderToBack as any]); 

        setIsModalOpen(false); // Закрываем модалку
        alert("Заказ успешно сформирован и отправлен в лог консоли!");
    };
    // В будущем тут будет fetch('/api/supply-orders')
    const handleCreateOrder = () => {
        alert("Открытие модального окна создания закупки...");
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="p-6 relative">
            <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-slate-800">Закупки у поставщиков</h2>
                    
                    {/* ПЕРЕКЛЮЧАТЕЛЬ ТАБЛИЦ */}
                    <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
                        <button 
                            onClick={() => setViewMode('summary')}
                            className={`px-3 py-1 text-xs rounded-md transition-all ${viewMode === 'summary' ? 'bg-white shadow-sm font-bold' : 'text-gray-500'}`}
                        >
                            Кратко
                        </button>
                        <button 
                            onClick={() => setViewMode('detailed')}
                            className={`px-3 py-1 text-xs rounded-md transition-all ${viewMode === 'detailed' ? 'bg-white shadow-sm font-bold' : 'text-gray-500'}`}
                        >
                            Детально
                        </button>
                    </div>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200"
                >
                    + Создать заказ
                </button>
            </div>

            {/* ТАБЛИЦА 1: КРАТКИЙ ВИД */}
            {viewMode === 'summary' && (
                <div className="overflow-hidden rounded-xl border border-gray-100">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-50">
                            <tr className="text-slate-500 text-sm">
                                <th className="p-3 text-left font-medium">Поставщик</th>
                                <th className="p-3 text-left font-medium">Сумма</th>
                                <th className="p-3 text-left font-medium">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} className="border-b last:border-0 hover:bg-slate-50">
                                    <td className="p-3 font-medium">{order.supplier}</td>
                                    <td className="p-3 font-semibold">{order.totalAmount.toLocaleString()} ₽</td>
                                    <td className="p-3">
                                        <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                                            Редактировать
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ТАБЛИЦА 2: ДЕТАЛЬНЫЙ ВИД */}
            {viewMode === 'detailed' && (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-slate-500 text-sm">
                                <th className="pb-3 font-medium">ID</th>
                                <th className="pb-3 font-medium">Поставщик</th>
                                <th className="pb-3 font-medium">Товары</th>
                                <th className="pb-3 font-medium">Сумма</th>
                                <th className="pb-3 font-medium">Ожидаем</th>
                                <th className="pb-3 font-medium">Статус</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {orders.map((order) => (
                                <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 font-mono text-xs text-blue-600">{order.id}</td>
                                    <td className="py-4 font-medium">{order.supplier}</td>
                                    <td className="py-4 text-slate-500">
                                        {order.items.map(i => i.medicineName).join(', ')}
                                    </td>
                                    <td className="py-4 font-semibold">{order.totalAmount.toLocaleString()} ₽</td>
                                    <td className="py-4 text-slate-500">{order.expectedDate || '—'}</td>
                                    <td className="py-4">
                                        <span className={`px-2 py-1 rounded text-[11px] font-bold ${statusStyles[order.status]}`}>
                                            {order.status.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

                {/* МОДАЛЬНОЕ ОКНО */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
                            <h3 className="text-xl font-bold mb-4">Новый заказ поставщику</h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Поставщик</label>
                                    <input
                                        required
                                        className="w-full border p-2 rounded-md"
                                        type="text"
                                        onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Препарат</label>
                                        <input
                                            required
                                            className="w-full border p-2 rounded-md"
                                            type="text"
                                            onChange={(e) => setFormData({ ...formData, medicineName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Количество</label>
                                        <input
                                            required
                                            className="w-full border p-2 rounded-md"
                                            type="number"
                                            onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Цена закупки (ед.)</label>
                                    <input
                                        required
                                        className="w-full border p-2 rounded-md"
                                        type="number"
                                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                    />
                                </div>

                                <div className="flex justify-end gap-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                    >
                                        Сформировать
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SupplyOrder;
