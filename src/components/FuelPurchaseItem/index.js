import React from 'react';

import './style.css';

const FuelPurchaseItem = ({ data }) => {
  return (
    <div className="fuel-purchase-item">
      <p><strong>Quantidade de Litros:</strong> {data.quantityLiters}L</p>
      <p><strong>Tipo de Combustível:</strong> {data.fuelType}</p>
      <p><strong>Preço Total:</strong> R$ {data.totalPrice.toFixed(2)}</p>
      <p><strong>ID do Motorista:</strong> {data.driverId}</p>
      <p><strong>Data de Criação:</strong> {new Date(data.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default FuelPurchaseItem;
