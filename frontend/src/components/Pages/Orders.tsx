interface IOrder {
    id: number,
    date: string,
    client: string,
    status: 'Новый' | 'Собран' | 'Отправлен' | 'Оплачен',
    payment: number,
    order: IOrderItem[],

}
interface IOrderItem {
    medicineId: number,
    name: string,
    quantity: number,
    priceAtOrder: number
}

const testDate: IOrder[] = [
    {
        id: 0,
        date: '15 08 2026',
        client: 'FarmaMed',
        status: 'Новый',
        payment: 8500,
        order: [{
            medicineId: 0,
            name: 'Парацетамол',
            quantity: 10,
            priceAtOrder: 100
        },
        {
            medicineId: 1,
            name: 'Но-шпа',
            quantity: 5,
            priceAtOrder: 1500
        }
        ]

    },
    {
        id: 1,
        date: '15 08 2026',
        client: 'FarmaMed',
        status: 'Оплачен',
        payment: 33800,
        order: [{
            medicineId: 0,
            name: 'Кетарол',
            quantity: 10,
            priceAtOrder: 2500
        },
        {
            medicineId: 1,
            name: 'Нимисулид',
            quantity: 4,
            priceAtOrder: 1200
        }
        ]

    }
]

const statusStyles = {
    'Новый': 'bg-blue-100 text-blue-800 border-blue-200',
    'Оплачен': 'bg-green-100 text-green-800 border-green-200',
    'Собран': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Отправлен': 'bg-purple-100 text-purple-800 border-purple-200',
};
const columns: { key: keyof IOrder; lable: string }[] = [
    { key: 'id', lable: '№' },
    { key: 'date', lable: 'Дата' },
    { key: 'client', lable: 'Клиент' },
    { key: 'order', lable: 'заказ' },
    { key: 'payment', lable: 'Оплата' },
    { key: 'status', lable: 'Статус' }
]

const Orders = () => {
    return (<>
        <table>
            <thead>
                <tr>
                    { columns.map((col)=>
                        <th>
                            {col.lable}
                        </th>
                    )}
                </tr>
            </thead>
            <tbody>
                 {testDate.map((row)=>
                <tr key={row.id}>
                   
                       {columns.map((col)=>
                    <td key={col.key}>
                    </td>
                    )}
                    
    
                </tr>
                 )}
            </tbody>
        </table>
    </>)
}
export default Orders