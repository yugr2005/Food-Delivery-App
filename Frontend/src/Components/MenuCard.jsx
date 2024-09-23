export function MenuCard({data, Addtocart}){
    return(
        <div>
            <h1>{data.nameitem}</h1>
            <h3>{data.price}</h3>
            <p>{data.description}</p>
            <button onClick={() => {
                Addtocart(data)
            }} >Add to cart</button>
        </div>
    )
}