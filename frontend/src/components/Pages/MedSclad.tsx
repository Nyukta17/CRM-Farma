import { useState } from "react";

interface Table {
    id: number;
    name: string;
    price: number;
    stock: number;
    farmaGroup: string
}
interface SearchProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
}

function MedSclad() {
    const testData: Table[] = [
        {
            id: 0,
            name: "Парацетамол",
            price: 200,
            stock: 12,
            farmaGroup: "Анилины"
        },
        {
            id: 1,
            name: "Но-шпа",
            price: 150,
            stock: 7,
            farmaGroup: "Миорелаксанты"
        },
        {
            id: 2,
            name: "Анальгин",
            price: 123,
            stock: 9,
            farmaGroup: "Анальгизирующие"
        },
        {
            id: 3,
            name: "Кеторолак",
            price: 100,
            stock: 30,
            farmaGroup: "НПВС"
        },
        {
            id: 4,
            name: "Глиатилин",
            price: 1500,
            stock: 2,
            farmaGroup: "Ноотропы"
        },
    ];
    const [keySort, setKey] = useState<keyof Table>('id');
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchQuery, setSearchQuery] = useState('');

    const columns: { key: keyof Table; lable: string }[] = [
        { key: 'id', lable: '№' },
        { key: 'name', lable: 'Название' },
        { key: 'price', lable: 'Цена (руб.)' },
        { key: 'stock', lable: 'Остаток' },
        { key: 'farmaGroup', lable: 'Группа' },
    ]
    const handleSort = (key: keyof Table) => {
        if (keySort === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setKey(key);
            setSortOrder('asc');
        }
    };
    const displayData = [...testData]
        .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.farmaGroup.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            const valA = a[keySort];
            const valB = b[keySort];

            if (typeof valA === 'number' && typeof valB === 'number') {
                return sortOrder === 'asc' ? valA - valB : valB - valA;
            }
            if (typeof valA === 'string' && typeof valB === 'string') {
                const comp = valA.localeCompare(valB);
                return sortOrder === 'asc' ? comp : -comp;
            }
            return 0;
        });



    return (<>
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {displayData.length === 0 ? (<h1>Данные не найдены</h1>) :
            <table className="w-full text-left">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th onClick={() => { handleSort(col.key) }}
                                className={"cursor-pointer hover:bg-gray-100"} key={col.key} >
                                {col.lable}
                                {keySort === col.key && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {displayData.map((row) => (
                        <tr key={row.id}>
                            {columns.map((col) => (
                                
                                <td key={col.key} className={` 
                                ${col.key === 'stock'?(row.stock<5?`bg-red-100`:row.stock<10?'bg-yellow-100':'bg-green-100'):''}
                                `}>
                                    {col.key==='price'?`${row[col.key]} ₽`: row[col.key as keyof Table]}
                                </td>
                            ))}
                        </tr>
                    )
                    )}
                </tbody>
            </table>
        }
    </>

    )
}

const Search = ({ searchQuery, setSearchQuery }: SearchProps) => {

    return (<>
        <div className="max-w-md w-full">
            <label htmlFor="search" className="sr-only">Поиск препаратов</label>
            <div className="relative">
                {/* Иконка лупы */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-lg">🔍</span>
                </div>

                <input
                    type="text"
                    id="search"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value) }}
                    className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg 
                 leading-5 bg-white placeholder-gray-500 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                 sm:text-sm transition-all shadow-sm"
                    placeholder="Найти препарат (название, артикул...)"
                />
                {searchQuery && (
                    <div className="absolute inset-y-0 right-5 pl-3 flex items-center">
                        <button type="button" className="flex items-center justify-center h-7 w-7 rounded-md
                               text-gray-400 hover:text-gray-600 hover:bg-gray-100
                               active:scale-90 transition-all duration-200" onClick={() => setSearchQuery('')}>
                            <span className="text-[25px] font-bold">✕</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    </>)
}

export default MedSclad;
