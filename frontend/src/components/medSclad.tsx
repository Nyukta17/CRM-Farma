interface Table{
    id:string;
    name:string;
    price:string;
    stock:string;
    farmaGroup:string
}

function medSclad(){
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

    return(<>
        <table>
            <thead>
                <tr>
                    <th>1</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </>
    )
}

export default medSclad();
