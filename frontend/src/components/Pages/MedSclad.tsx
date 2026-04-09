import { useState } from "react";

interface Table{
    id:number;
    name:string;
    price:number;
    stock:number;
    farmaGroup:string
}

function MedSclad(){
    const testData:Table[]=[
        {
        id:0,
        name:"Парацетамол",
        price:200,
        stock:12,
        farmaGroup:"Анилины"
        },
        {
        id:1,
        name:"Но-шпа",
        price:150,
        stock:7,
        farmaGroup:"Миорелаксанты"
        },
        {
        id:2,
        name:"Анальгин",
        price:123,
        stock:9,
        farmaGroup:"Анальгизирующие"
        },
        {
        id:3,
        name:"Кеторолак",
        price:100,
        stock:30,
        farmaGroup:"НПВС"
        },
        {
        id:4,
        name:"Глиатилин",
        price:1500,
        stock:2,
        farmaGroup:"Ноотропы"
        },
];
    const[keySort,setKey]=useState('id');
    const[sortOrder,setSortOrder]=useState('asc');
    const[date,setDate] = useState(testData);
    const columns:{key: keyof Table; lable:string}[]=[
        {key:'id',lable:'№'},
        {key:'name',lable:'Название'},
        {key:'price',lable:'Цена (руб.)'},
        {key:'stock',lable:'Остаток'},
        {key:'farmaGroup',lable:'Группа'},
    ]
     const handleSort = (key: keyof Table) => {
        const newSortOrder = sortOrder === 'asc'?'desc' : 'asc';
        setSortOrder(newSortOrder);
        setKey(key);
        
        const sortDate = [...testData].sort((a,b)=>{
            const valA= a[key as keyof Table];
            const valB= b[key as keyof Table];
            if(typeof valA === 'number' && typeof valB==='number'){
                return newSortOrder === 'asc'? valA-valB: valB-valA;
            }

            if(typeof valA ==='string'&&typeof valB ==='string'){
                const comparison = valA.localeCompare(valB)
                return newSortOrder === 'asc'?comparison: -comparison
            }
            return 0;
        })
        
        setDate(sortDate)
        
    };
    
    return(<>
        <Search/>
        <table className="w-full text-left">
            <thead>
                <tr>
                    {columns.map((col)=>(
                    <th onClick={()=>{handleSort(col.key)}}  
                    className={"cursor-pointer hover:bg-gray-100"} key={col.key} >
                        {col.lable}
                    </th>
                ))}
                </tr>
            </thead>
            <tbody>
               {date.map((row)=>(
                <tr key={row.id}>
                    {columns.map((col)=>(
                        <td key={col.key}>
                            {row[col.key as keyof Table]}
                        </td>
                    ))}
                </tr>
               )
               )}
            </tbody>
        </table>
    </>
    )
}

const Search =()=>{
    const[searchQuery,setSearchQuery]=useState('');

    return(<>
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
      onChange={(e)=>{setSearchQuery(e.target.value)}}
      className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg 
                 leading-5 bg-white placeholder-gray-500 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                 sm:text-sm transition-all shadow-sm"
      placeholder="Найти препарат (название, артикул...)"
    />
  </div>
</div>
    </>)
}

export default MedSclad;
