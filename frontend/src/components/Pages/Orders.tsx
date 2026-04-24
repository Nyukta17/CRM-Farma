
import { useState, useMemo } from "react";
import type { IProduct } from "../../API/stock.service";
import { OrderService } from "../../API/order.service";
// Импортируй сервис заказов, который мы обсуждали (POST запрос)
// import { OrdersService } from "../../API/orders.service";

interface ICartItem {
    productId: number;
    name: string;
    quantity: number;
    price: number;
}

interface OrdersProps {
    products: IProduct[];
    onOrderSuccess: () => Promise<void>;
}

const Orders = ({ products, onOrderSuccess }: OrdersProps) => {
    const [cart, setCart] = useState<ICartItem[]>([]);
    const [clientName, setClientName] = useState('');
    const [selectedProductId, setSelectedProductId] = useState<number | string>('');
    const [quantity, setQuantity] = useState(1);

    // Считаем общую сумму корзины автоматически
    const totalPrice = useMemo(() => 
        cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), 
    [cart]);

    const addItemToCart = () => {
        const product = products.find(p => p.id === Number(selectedProductId));
        if (product) {
            // Проверка: не заказываем ли больше, чем есть на складе
            if (quantity > product.count) {
                alert(`Недостаточно товара на складе (в наличии: ${product.count})`);
                return;
            }

            const newItem: ICartItem = {
                productId: product.id,
                name: product.name,
                quantity: quantity,
                price: product.price
            };
            setCart([...cart, newItem]);
            setSelectedProductId('');
            setQuantity(1);
        }
    };

    const handleCreateOrder = async () => {
        if (!clientName || cart.length === 0) {
            alert("Заполните имя клиента и добавьте товары");
            return;
        }

        try {
            const dto = {
                clientName,
                totalPrice,
                items: cart.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price
                }))
            };

            // Вызываем API (раскомментируй, когда создашь сервис)
            // await OrdersService.create(dto);
            OrderService.creatOrder(dto)
            console.log("Отправка на бэк:");
            
            alert("Заказ успешно оформлен!");
            setCart([]);
            setClientName('');
            await onOrderSuccess(); // Обновляем склад в родителе
        } catch (e) {
            alert("Ошибка при создании заказа");
        }
    };

    return (
        <div className="flex flex-col">
            {/* Форма подбора */}
            <div className="p-6 bg-slate-50 border-b space-y-4">
                <h3 className="font-bold text-slate-700">Новый чек</h3>
                <div className="flex gap-4">
                    <input
                        placeholder="Имя клиента"
                        className="border p-2 rounded flex-1 bg-white"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                    />
                </div>

                <div className="flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Препарат</label>
                        <select
                            className="w-full border p-2 rounded bg-white mt-1"
                            value={selectedProductId}
                            onChange={(e) => setSelectedProductId(e.target.value)}
                        >
                            <option value="">-- Выберите препарат --</option>
                            {products.map(p => (
                                <option key={p.id} value={p.id} disabled={p.count === 0}>
                                    {p.name} {p.count === 0 ? '(Нет в наличии)' : `(${p.count} шт.)`} — {p.price} ₽
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-24">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Кол-во</label>
                        <input
                            type="number"
                            min="1"
                            className="w-full border p-2 rounded bg-white mt-1"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                    </div>

                    <button
                        onClick={addItemToCart}
                        disabled={!selectedProductId}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-slate-300 transition-colors"
                    >
                        В корзину
                    </button>
                </div>
            </div>

            {/* Таблица текущей корзины */}
            <div className="p-6">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b text-slate-400 text-sm">
                            <th className="py-3 font-medium text-center w-12">№</th>
                            <th className="py-3 font-medium">Наименование</th>
                            <th className="py-3 font-medium">Кол-во</th>
                            <th className="py-3 font-medium">Цена</th>
                            <th className="py-3 font-medium text-right">Сумма</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={index} className="border-b hover:bg-slate-50 transition-colors">
                                <td className="py-4 text-center text-slate-400">{index + 1}</td>
                                <td className="py-4 font-medium text-slate-700">{item.name}</td>
                                <td className="py-4">{item.quantity} шт.</td>
                                <td className="py-4">{item.price.toLocaleString()} ₽</td>
                                <td className="py-4 text-right font-bold">{(item.price * item.quantity).toLocaleString()} ₽</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {cart.length > 0 && (
                    <div className="mt-6 flex flex-col items-end gap-4">
                        <div className="text-xl">
                            <span className="text-slate-500">Итого к оплате: </span>
                            <span className="font-black text-blue-600">{totalPrice.toLocaleString()} ₽</span>
                        </div>
                        <button 
                            onClick={handleCreateOrder}
                            className="bg-emerald-500 text-white px-10 py-3 rounded-xl font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-200 transition-all active:scale-95"
                        >
                            Оформить и списать со склада
                        </button>
                    </div>
                )}

                {cart.length === 0 && (
                    <div className="text-center py-10 text-slate-400 italic">
                        Корзина пуста. Добавьте товары выше.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
