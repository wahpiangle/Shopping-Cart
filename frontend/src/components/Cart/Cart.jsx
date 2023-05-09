import './Cart.css';
import { useSelector, useDispatch } from 'react-redux';
import { RxCross1 } from 'react-icons/rx';
import { incrementItem, decrementItem, clearItem } from '../../redux/cartSlice';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Cart() {
    const cart = useSelector(state => state.cart.value);
    const { state } = useAuthContext()
    const { user } = state
    const dispatch = useDispatch();

    async function handleIncrementItem(id) {
        dispatch(incrementItem(id));
        const response = await fetch(`http://localhost:4000/api/users/cart/increment/${id}`,
            {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({email: user.email, product_id: id})
            }
        )
        const json = await response.json();
        console.log(json);

    }

    async function handleDecrementItem(id) {
        dispatch(decrementItem(id));
        const response = await fetch(`http://localhost:4000/api/users/cart/decrement/${id}`,
            {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({email: user.email, product_id: id})
            }
        )
        const json = await response.json();
        console.log(json);
    }

    async function handleClearItem(id) {
        dispatch(clearItem(id));
        const response = await fetch(`http://localhost:4000/api/users/cart/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: user.email, product_id: id})
        })
        const json = await response.json();
        console.log(json);
    }

    console.log(cart)
    if (cart.itemsInCart.length !== 0) {
        return (
            <div className="cart">
                <div className="cart-title">Cart</div>
                <div className='cart-container'>
                    <div className='cart-items'>
                        {cart.itemsInCart.map(item => (
                            <div className='cart-item' key={item.id}>
                                <div className='cart-item-image'>
                                    <img src={item.image[0].url} />
                                </div>
                                <div className='cart-item-details'>
                                    <div className='cart-item-details-name'>{item.name}</div>
                                    <div className='cart-item-details-price'>${item.price}</div>
                                </div>
                                <div className='cart-item-quantity'>
                                    <div className='cart-item-quantity-minus' onClick={() => handleDecrementItem(item.id)}>-</div>
                                    {item.quantity}
                                    <div className='cart-item-quantity-plus' onClick={() => handleIncrementItem(item.id)}>+</div>
                                </div>
                                <RxCross1 className='cart-clear-item' onClick={() => handleClearItem(item.id)}></RxCross1>
                            </div>
                        ))}
                    </div>
                    <div className='cart-total'>
                        <div className='cart-total-title'>Cart total</div>
                        <div className='cart-total-items-container'>
                            <div className='cart-total-subtitle'>Subtotal</div>
                            <div className='cart-total-subtotal'>${cart.totalPrice}</div>
                            <div className='cart-total-subtitle'>Shipping</div>
                            <div className='cart-total-shipping'>No Shipping Options are available</div>
                        </div>
                        <input type="hidden" name="cartTotalPrice" value={cart.totalPrice} />
                        <div className='button-wrapper'>
                            <a href="https://buy.stripe.com/test_9AQ3ehcER27o5689AA"><button className='cart-total-checkout'>Proceed to Checkout</button></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div className="cart-empty">
                <div className="cart-title">Cart</div>
                <p className='cart-empty-text'>Your Cart is empty. Add some items into your cart now!</p>
                <Link to="/shop" className='redirect-shop'>Explore the catalog</Link>
            </div>
        )
    }

}