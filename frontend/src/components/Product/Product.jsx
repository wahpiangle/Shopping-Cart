import './Product.css'
import { BsFillCartPlusFill, BsCartCheckFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { addItems } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function Product({product}){
    const dispatch = useDispatch();
    const [purchased, setPurchased] = useState(false);

    function handleAddToCart(product){
        dispatch(addItems({product, quantity:1}));
        setPurchased(true);
        setTimeout(() =>{
            setPurchased(false);
        },2000)
    }

    return (
        <div className="product-card">
            <Link to={`/shop/${product.id}`} state={product.id}>
                <div className='product-card-container'>
                    <img src={product.image[0].url}/>
                    <div className='product-name' >{product.name}</div>
                    <div className='product-price'>$ {product.price}</div>
                </div>
            </Link>
            <div className='product-addcart-container'>
                {!purchased && <BsFillCartPlusFill className='product-addcart' onClick={()=>{handleAddToCart(product)}}/>}
                {purchased &&<BsCartCheckFill className='product-addcart_purchased' />}
            </div>
        </div>
    )
}