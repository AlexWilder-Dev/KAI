import { price, type Dish } from '../data';
import './DishList.css';

export function DishList({
  dishes,
  className = '',
  showPrice = true,
}: {
  dishes: Dish[];
  className?: string;
  showPrice?: boolean;
}) {
  return (
    <ul className={`dishes ${className}`}>
      {dishes.map((d) => (
        <li key={d.id} id={d.vegan ? d.id : undefined} className="dish">
          <div className="dish__row">
            <h3 className="dish__name">
              {d.name}
              {d.vegan && <span className="tag dish__tag">Vegan</span>}
            </h3>
            {showPrice && <span className="price dish__price">{price(d.price)}</span>}
          </div>
          {d.desc && <p className="dish__desc">{d.desc}</p>}
        </li>
      ))}
    </ul>
  );
}
