import React, {useState} from 'react';
import './App.css';
import {MenuItem} from "./types";
import foodImg from './assets/food.png';
import drinkImg from './assets/drink.png';
import TotalPrice from "./components/TotalPrice/TotalPrice";

const MENU: MenuItem[] = [
  {name: 'Hamburger', price: 100, image: foodImg},
  {name: 'Cheeseburger', price: 120, image: foodImg},
  {name: 'Fries', price: 50, image: foodImg},
  {name: 'Coffee', price: 50, image: drinkImg},
  {name: 'Tea', price: 20, image: drinkImg},
  {name: 'Cola', price: 40, image: drinkImg},
]

function App() {
  const [items, setItems] = useState([
    {name: 'Hamburger', count: 0, price: 100, id: 1},
    {name: 'Cheeseburger', count: 0, price: 120, id: 2},
    {name: 'Fries', count: 0, price: 50, id: 3},
    {name: 'Coffee', count: 0, price: 50, id: 4},
    {name: 'Tea', count: 0, price: 20, id: 5},
    {name: 'Cola', count: 0, price: 40, id: 6},
  ]);

  const addToOrderList = (id: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        if (item.count === 0) return {
          ...item,
          count: 1
        }

        if (item.count > 0) {
          return {
            ...item,
            count: item.count++,
          }
        }
      }

      return item;
    }))
  };

  const onDelete = (id: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id)
        if (item.count > 0) {
          return {
            ...item,
            count: item.count--,
          }
        }

      return item;
    }))
  };

  const orderList: React.ReactNode = (
    items.map((item, index) => {
      if (item.count === 0) {
        return null;
      } else {
        return (
          <div key={index} className="list">
            <span>{item.name}</span>
            <span>x{item.count}</span>
            <span>{item.count * item.price} KGS</span>
            <button onClick={() => onDelete(item.id)} className="btn">X</button>
          </div>
        );
      }
    })
  );

  const orderListAdditional = () => {
    const emptyOrder = items.every(item => item.count === 0);

    if (emptyOrder) {
      return <div>Order is empty</div>
    } else {
      return (
        <div className="column">
          {orderList}
          <TotalPrice priceArr={MENU} countArr={items}/>
        </div>
      )
    }
  };

  const menuList: React.ReactNode = (
    MENU.map((item, index) => (
      <button key={index} onClick={() => addToOrderList(items[index].id)} className="menu-btn">
        <img src={item.image} width="30px" height="30px" alt="pic"/>
        <p>{item.name}</p>
        <p>Price: {item.price} KGS</p>
      </button>
    ))
  );

  return (
    <div className="App">
      <div className="left-block">
        <fieldset>
          <legend>Order list:</legend>
          {orderListAdditional()}
        </fieldset>
      </div>
      <div className="right-block">
        <fieldset>
          <legend>Add items:</legend>
          {menuList}
        </fieldset>
      </div>
    </div>
  );
}

export default App;
