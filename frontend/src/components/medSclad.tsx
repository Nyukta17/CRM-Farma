
interface Table{
    id:string;
    name:string;
    price:string;
    stock:string;
    farmaGroup:string
}

function MedSclad(){
    const testData:Table[]=[
        {
        id:"0",
        name:"Paracetamol",
        price:"200",
        stock:"12",
        farmaGroup:"anilide"
        },
        {
        id:"1",
        name:"Но-шпа",
        price:"150",
        stock:"7",
        farmaGroup:"Миорелаксанты"
        },
        {
        id:"2",
        name:"Анальгин",
        price:"123",
        stock:"9",
        farmaGroup:"Анальгизирующие"
        },
        {
        id:"3",
        name:"Кеторолак",
        price:"100",
        stock:"30",
        farmaGroup:"НПВС"
        },
        {
        id:"4",
        name:"Глиатилин",
        price:"1500",
        stock:"2",
        farmaGroup:"Ноотропы"
        },
];
    const columns=[
        {key:'id',lable:'№'},
        {key:'name',lable:'Название'},
        {key:'price',lable:'Цена (руб.)'},
        {key:'stock',lable:'Остаток'},
        {key:'farmaGroup',lable:'Группа'},
    ]
     const handleSort = (key: string) => {
        console.log("Ты нажал на колонку:", key);
        // Здесь в будущем будет логика сортировки массива
    };
    return(<>
    
        <table className="w-full text-left">
            <thead>
                <tr>
                    {columns.map((col)=>(
                    <th onClick={()=>handleSort(col.key)} 
                    className={"cursor-pointer hover:bg-gray-100"} key={col.key} >
                        {col.lable}
                    </th>
                ))}
                </tr>
            </thead>
            <tbody>
               {testData.map((row)=>(
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

export default MedSclad;
