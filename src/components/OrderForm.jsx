import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../actions';

const OrderForm = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  const [pizzaType, setPizzaType] = useState('');
  const [pizzaSize, setPizzaSize] = useState('');
  const [pizzaBase, setPizzaBase] = useState('');

  const handlePlaceOrder = () => {
    const order = {
      id: orders.length + 1,
      type: pizzaType,
      size: pizzaSize,
      base: pizzaBase,
      stage: 'Order Placed',
      time: new Date(),
    };

    dispatch(placeOrder(order));
  };

  const isButtonDisabled = !pizzaType || !pizzaSize || !pizzaBase;

  return (
    <div className="order-form">
      <h2>Place an Order</h2>
      <label>
        Pizza Type:
        <select value={pizzaType} onChange={(e) => setPizzaType(e.target.value)} required>
          <option value="">Select Type</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>
      </label>
      <label>
        Pizza Size:
        <select value={pizzaSize} onChange={(e) => setPizzaSize(e.target.value)} required>
          <option value="">Select Size</option>
          <option value="Large">Large</option>
          <option value="Medium">Medium</option>
          <option value="Small">Small</option>
        </select>
      </label>
      <label>
        Pizza Base:
        <select value={pizzaBase} onChange={(e) => setPizzaBase(e.target.value)} required>
          <option value="">Select Base</option>
          <option value="Thin">Thin</option>
          <option value="Thick">Thick</option>
        </select>
      </label>
      <button onClick={handlePlaceOrder} disabled={isButtonDisabled}>
        Place Order
      </button>
    </div>
  );
};

export default OrderForm;

