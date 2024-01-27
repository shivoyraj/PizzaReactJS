import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStage, cancelOrder } from '../actions';

const PizzaList = () => {

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  const handleUpdateStage = (orderId, stage) => {
    dispatch(updateStage(orderId, stage));
  };

  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrder(orderId));
  };

  const calculateTimeDifference = (startTime) => {
    const currentTime = new Date();
    const timeDifference = currentTime - startTime;
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    return { minutes, seconds };
  };

  return (
    <div className="pizza-list">
      <h2>Main Section</h2>
      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Stage</th>
            <th>Total Time Spent</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.stage}</td>
              <td>
                {calculateTimeDifference(order.time).minutes + ' min ' + calculateTimeDifference(order.time).seconds + ' sec'}
              </td>
              <td>
                {order.stage !== 'Order Picked' && (
                  <>
                    <button onClick={() => handleUpdateStage(order.id, 'Next')}>Next</button>
                  </>
                )}
                <button onClick={() => handleCancelOrder(order.id)} disabled={order.stage === 'Order Picked'}>
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>Total orders delivered: {orders.filter((order) => order.stage === 'Order Ready').length}</p>
      </div>
    </div>
  );
};

export default PizzaList;