import { useState } from "react";
import Orders from "./Orders";
import SupplyOrder from "./SupplyOrder";

const Delivery = () => {
    // 1. Состояние для активной вкладки
    const [activeTab, setActiveTab] = useState<'clients' | 'suppliers'>('clients');

    // 2. Имитация роли пользователя (в будущем придет из контекста/сервера)
    const userRole = 'admin'; // попробуйте поменять на 'user', чтобы увидеть скрытие

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Управление заказами</h1>

            {/* Контейнер для кнопок-переключателей */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('clients')}
                    className={`px-4 py-2 transition-all ${
                        activeTab === 'clients' 
                        ? "border-b-2 border-blue-500 text-blue-600 font-medium" 
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    Заказы клиентов
                </button>

                {/* 3. Условие для отображения админской части */}
                {userRole === 'admin' && (
                    <button
                        onClick={() => setActiveTab('suppliers')}
                        className={`px-4 py-2 transition-all ${
                            activeTab === 'suppliers' 
                            ? "border-b-2 border-blue-500 text-blue-600 font-medium" 
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Закупки у поставщиков
                    </button>
                )}
            </div>

            {/* 4. Отрисовка контента в зависимости от вкладки */}
            <div className="mt-4">
                {activeTab === 'clients' && <Orders />}
                
                {/* Дополнительная проверка безопасности при рендере */}
                {activeTab === 'suppliers' && userRole === 'admin' && <SupplyOrder />}
            </div>
        </div>
    );
};

export default Delivery;
