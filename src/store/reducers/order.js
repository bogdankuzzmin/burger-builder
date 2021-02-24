import {actionType} from '../actions';
import {updateObject} from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state) => {
  return updateObject(state, {purchased: false});
};

const purchaseBurgerStart = (state) => {
  return updateObject(state, {loading: true});
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, {id: action.orderId});
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  });
};

const purchaseBurgerFail = (state) => {
  return updateObject(state, {loading: false});
};

const fetchOrdersStart = (state) => {
  return updateObject(state, {loading: true});
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false,
  });
};

const fetchOrdersFail = (state) => {
  return updateObject(state, {loading: false});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PURCHASE_INIT: return purchaseInit(state);
    case actionType.PURCHASE_BURGER_START: return purchaseBurgerStart(state);
    case actionType.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
    case actionType.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state);
    case actionType.FETCH_ORDERS_START: return fetchOrdersStart(state);
    case actionType.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
    case actionType.FETCH_ORDERS_FAIL: return fetchOrdersFail(state);
    default: return state;
  }
};

export default reducer;
