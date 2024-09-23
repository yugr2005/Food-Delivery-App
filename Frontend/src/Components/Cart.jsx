export function CartCard({data}) {
    return(
        <div>
            <h1>{data.nameitem}</h1>
            <h3>{data.price}</h3>
            <p>{data.quantity}</p>
            <p>{data.price * data.quantity}</p>
        </div>
    )
}