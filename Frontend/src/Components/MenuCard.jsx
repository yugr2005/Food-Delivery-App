export function MenuCard({data, Addtocart, setShow}){
    return(
        <div>
            <h1>{data.nameitem}</h1>
            <h3>{data.price}</h3>
            <p>{data.description}</p>
            <button onClick={() => {
                
                Addtocart(data)

                setShow(true)

                setTimeout(() => {
                    setShow(false) 
                }, 2000)

            }} >Add to cart</button>
        </div>
    )
}