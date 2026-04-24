import { useState, useEffect } from "react";
import Orders from "./Orders";
import SupplyOrder from "./SupplyOrder";
import { StockService, type IProduct } from "../../API/stock.service"; 

const Delivery = () => {
    const [activeTab, setActiveTab] = useState<'clients' | 'suppliers'>('clients');
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const userRole = 'admin';

    const loadStock = async () => {
        try {
            setIsLoading(true);
            const data = await StockService.getAll();
            setProducts(data);
        } catch (e) {
            console.error("Ошибка загрузки склада:", e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadStock();
    }, []);

    return (
        <div className="p-6 bg-white min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Управление заказами</h1>
                <button 
                    onClick={loadStock}
                    className="text-sm text-blue-600 hover:underline"
                >
                    {isLoading ? "Обновление..." : "🔄 Обновить остатки"}
                </button>
            </div>

            {/* Контейнер для кнопок-переключателей */}
            <div className="flex gap-4 mb-8 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('clients')}
                    className={`pb-2 px-1 transition-all font-medium text-sm ${
                        activeTab === 'clients' 
                        ? "border-b-2 border-blue-500 text-blue-600" 
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    🛒 Заказы клиентов (Продажа)
                </button>

                {userRole === 'admin' && (
                    <button
                        onClick={() => setActiveTab('suppliers')}
                        className={`pb-2 px-1 transition-all font-medium text-sm ${
                            activeTab === 'suppliers' 
                            ? "border-b-2 border-blue-500 text-blue-600" 
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        📦 Закупки у поставщиков (Пополнение)
                    </button>
                )}
            </div>

            {/* Отрисовка контента */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                {activeTab === 'clients' && (
                    <Orders 
                        products={products} 
                        onOrderSuccess={loadStock} 
                    />
                )}
                
                {activeTab === 'suppliers' && userRole === 'admin' && (
                    <SupplyOrder 
                        products={products} 
                        onOrderSuccess={loadStock} 
                    />
                )}
            </div>
        </div>
    );
};

export default Delivery;
