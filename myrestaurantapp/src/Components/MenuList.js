import React, { useState, useEffect } from 'react';
import '../CSSstyle/Menu.css';
import LemonJuice from '../Images/LemonJuice.jpg';
import IcedTea from '../Images/IcedTea.jpg';
import Shawarma from '../Images/Shawarma.jpg';

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);

  const getItemImage = (itemName, index) => {
    console.log('Item name:', itemName, 'Index:', index);
    if (itemName.toLowerCase().includes('lemon')) return LemonJuice;
    if (itemName.toLowerCase().includes('tea')) return IcedTea;
    if (itemName.toLowerCase().includes('shawarma')) return Shawarma;
    return LemonJuice;
  };

  const getAllMenuItems = () => {
    console.log('Fetching menu items...');
    fetch('http://localhost:2000/restaurant/menu?restaurantID=1')
      .then((response) => {
        console.log('Response status:', response.status);
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch menu items, status:', response.status);
          return [];
        }
      })
      .then((data) => {
        console.log('Received menu items:', data);
        if (Array.isArray(data)) {
          setMenuItems(data);
        } else {
          console.error('Received data is not an array:', data);
          setMenuItems([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching menu items:', error);
        setMenuItems([]);
      });
  };

  useEffect(() => {
    getAllMenuItems();
  }, []);

  console.log('Current menuItems state:', menuItems);

  return (
    <div className="menu">
      <h1 className="menuTitle">Our Menu</h1>
      <div className="menuList">
        {menuItems && menuItems.length > 0 ? (
          menuItems.map((item, index) => (
            <div key={item.NAME || index} className="menuItem">
              <div className="menuImage" style={{ backgroundImage: `url(${getItemImage(item.NAME, index)})` }}></div>
              <div className="content">
                <h4>{item.NAME}</h4>
                <p className="description">{item.DESCRIPTION}</p>
                <p className="price">${item.PRICE}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No menu items available</p>
        )}
      </div>
    </div>
  );
};

export default MenuList;