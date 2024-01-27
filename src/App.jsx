import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import OrderForm from './components/OrderForm';
import PizzaList from './components/PizzaList';
import './components/style.css';


const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <div className="order-form">
          <h1 className="heading">Pizza Company</h1>
          <OrderForm />
        </div>
        <div className="pizza-list">
          <PizzaList />
        </div>
      </div>
    </Provider>
  );
};
export default App;
