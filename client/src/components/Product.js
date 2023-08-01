import defaultImg from '../assests/images/laptop.jpeg';
import {Link} from "react-router-dom";

export default function Product({product}) {
  return (
    <Link className="text-decoration-none" to={`/products/${product._id}`}>
      <img width={100}
           src={product.images.length > 0 ? `http://localhost:3080/static${product.images[0].path}` : defaultImg}
           alt={product.name}/>
      <p>{product.name}</p>
      <p>${product.price}</p>
    </Link>
  );
}