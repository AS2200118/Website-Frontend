import React, { useState, useEffect } from 'react';

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);

  const getAllMenuItems = () => {
    // Adding restaurantID=1 as a query parameter
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
      <h3>View Menu Items</h3>
      <button onClick={getAllMenuItems}>Get Menu</button>
      <ul>
        {menuItems.map((item) => (
          <li key={item.NAME}>
            {item.NAME} - {item.DESCRIPTION} (${item.PRICE}) - Category: {item.CATEGORY}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;