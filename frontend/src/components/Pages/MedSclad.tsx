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
        { id: 0, name: "Парацетамол", price: 200, stock: 12, farmaGroup: "Анилины" },
        { id: 1, name: "Но-шпа", price: 150, stock: 7, farmaGroup: "Миорелаксанты" },
        { id: 2, name: "Анальгин", price: 123, stock: 9, farmaGroup: "Анальгизирующие" },
        { id: 3, name: "Кеторолак", price: 100, stock: 30, farmaGroup: "НПВС" },
        { id: 4, name: "Глиатилин", price: 1500, stock: 2, farmaGroup: "Ноотропы" },
    ];

    const [keySort, setKey] = useState<keyof Table>('id');
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchQuery, setSearchQuery] = useState('');

    const columns: { key: keyof Table; lable: string }[] = [
        { key: 'id', lable: '№' },
        { key: 'name', lable: 'Название' },
        { key: 'price', lable: 'Цена' },
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
        .filter(item => 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.farmaGroup.toLowerCase().includes(searchQuery.toLowerCase())
        )
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

    return (
        <div className="p-8 bg-slate-50 min-h-screen font-sans">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
                
                {/* Header & Search */}
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Складской учет</h1>
                    <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </div>

                {displayData.length === 0 ? (
                    <div className="p-20 text-center">
                        <span className="text-4xl">💊</span>
                        <h2 className="mt-4 text-slate-500 font-medium">Ничего не найдено по вашему запросу</h2>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    {columns.map((col) => (
                                        <th 
                                            key={col.key}
                                            onClick={() => handleSort(col.key)}
                                            className="group cursor-pointer px-6 py-4 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors relative"
                                        >
                                            <div className="flex items-center gap-2">
                                                {col.lable}
                                                <span className={`text-blue-500 transition-opacity ${keySort === col.key ? 'opacity-100' : 'opacity-0 group-hover:opacity-30'}`}>
                                                    {sortOrder === 'asc' ? '↑' : '↓'}
                                                </span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {displayData.map((row) => (
                                    <tr key={row.id} className="hover:bg-blue-50/30 transition-colors group">
                                        {columns.map((col) => {
                                            const value = Number(row[col.key as keyof Table]);
                                            
                                            // Стили для ячейки остатка (stock)
                                            let stockStyle = "";
                                            if (col.key === 'stock') {
                                                if (value < 5) stockStyle = "bg-red-100 text-red-700 font-bold px-3 py-1 rounded-full text-xs";
                                                else if (value < 10) stockStyle = "bg-amber-100 text-amber-700 font-bold px-3 py-1 rounded-full text-xs";
                                                else stockStyle = "bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full text-xs";
                                            }

                                            return (
                                                <td key={col.key} className="px-6 py-4 text-sm text-slate-600">
                                                    {col.key === 'stock' ? (
                                                        <span className={stockStyle}>{value} шт.</span>
                                                    ) : col.key === 'price' ? (
                                                        <span className="font-semibold text-slate-900">{value.toLocaleString()} ₽</span>
                                                    ) : col.key === 'id' ? (
                                                        <span className="text-slate-400 font-mono">#{value}</span>
                                                    ) : (
                                                        value
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                
                {/* Footer info */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-400 flex justify-between italic">
                    <span>Показано препаратов: {displayData.length}</span>
                    <span>CRM Farma System v1.0</span>
                </div>
            </div>
        </div>
    );
}

const Search = ({ searchQuery, setSearchQuery }: SearchProps) => {
    return (
        <div className="max-w-md w-full relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-slate-400">🔍</span>
            </div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl
                           bg-slate-50 placeholder-slate-400 text-slate-700
                           focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 
                           focus:bg-white sm:text-sm transition-all shadow-inner"
                placeholder="Поиск по названию или группе..."
            />
            {searchQuery && (
                <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <span className="text-lg">✕</span>
                </button>
            )}
        </div>
    )
}

export default MedSclad;
