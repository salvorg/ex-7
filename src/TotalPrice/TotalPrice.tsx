import React from 'react';
import {MenuItem} from "../types";

interface ItemWithPrice {
  name: string;
  count: number;
  price: number;
  id: number;
}

interface Props {
  priceArr: MenuItem[];
  countArr: ItemWithPrice[];
}

const TotalPrice: React.FC<Props> = ({priceArr, countArr}) => {
  const getTotalPrice = () => {
    let total = 0;

    for (let i = 0; i < priceArr.length; i++) {
      total = total + priceArr[i].price * countArr[i].count;
    }

    return total;
  }

  return (
    <div>
      Total: {getTotalPrice()}
    </div>
  );
};

export default TotalPrice;