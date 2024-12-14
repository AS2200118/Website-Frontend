import React, { useState, useEffect } from 'react';
import '../CSSstyle/Menu.css';
import LemonJuice from '../Images/LemonJuice.jpg';
import IcedTea from '../Images/IcedTea.jpg';
import Shawarma from '../Images/Shawarma.jpg';

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);

  const getItemImage = (itemName, index) => {
    console.log('Item name:', itemName, 'Index:', index);
    if (index < 5) return LemonJuice;
    if (index === 5) return IcedTea;
    if (index === 6) return Shawarma;
    return LemonJuice;
  };

  const getAllMenuItems = () => {
    fetch('http://localhost:2000/restaurant/menu?restaurantID=1')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch menu items');
          return [];
        }
      })
      .then((data) => {
        console.log('Menu items:', data);
        setMenuItems(data);
      })
      .catch((error) => {
        console.error('Error fetching menu items:', error);
      });
  };

  useEffect(() => {
    getAllMenuItems();
  }, []);

  return (
    <div className="form-section">
      <h3>Our Menu</h3>
      <div className="menuList">
        {menuItems.map((item, index) => (
          <div key={item.NAME} className="menuItem">
            <div className="menuImage" style={{ backgroundImage: `url(${getItemImage(item.NAME, index)})` }}></div>
            <div className="content">
              <h4>{item.NAME}</h4>
              <p className="description">{item.DESCRIPTION}</p>
              <p className="price">{item.PRICE}</p>
              <p className="category">Category: {item.CATEGORY}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;