const initialState = {
  orders: [],
};

const calculateTimeDifference = (startTime) => {
  const currentTime = new Date();
  const timeDifference = currentTime - new Date(startTime);
  const minutes = Math.floor(timeDifference / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  return { minutes, seconds };
};

const getNextStage = (currentStage) => {
  switch (currentStage) {
    case 'Order Placed':
      return 'Order in Making';
    case 'Order in Making':
      return 'Order Ready';
    case 'Order Ready':
      return 'Order Picked';
    default:
      return currentStage;
  }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PLACE_ORDER':
      return {
        ...state,
        orders: [...state.orders,{...action.payload,time: new Date()}],
      };
    case 'UPDATE_STAGE':
      const { orderId, currentStage } = action.payload;
      const updatedOrders = state.orders.map((order) => {
        if (order.id === orderId && order.stage !== 'Order Picked') {
          return {
            ...order,
            stage: getNextStage(order.stage),
            timeDiff: calculateTimeDifference(order.time).minutes + ' min ' + calculateTimeDifference(order.time).seconds + ' sec' 
          };
        }
        return order;
      });
      return {
        ...state,
        orders: updatedOrders,
      };
    case 'CANCEL_ORDER':
      const filteredOrders = state.orders.filter((order) => order.id !== action.payload);
      return {
        ...state,
        orders: filteredOrders,
      };
    default:
      return state;
  }
};

export default rootReducer;

