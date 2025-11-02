import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../features/cart/cartSlice';

function Cart() {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  if (items.length === 0) return <p>Your cart is empty</p>;

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))
              }
            />
            <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
