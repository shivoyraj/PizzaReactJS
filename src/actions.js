export const placeOrder = (order) => ({
    type: 'PLACE_ORDER',
    payload: order,
});

export const updateStage = (orderId, stage) => ({
    type: 'UPDATE_STAGE',
    payload: { orderId, stage },
});

export const cancelOrder = (orderId) => ({
    type: 'CANCEL_ORDER',
    payload: orderId,
});
