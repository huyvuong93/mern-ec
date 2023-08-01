import ProductList from "../components/ProductList";
import {useEffect, useState} from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:3080/products');
    if (res) {
      setProducts(res.data)
    }
  }

  useEffect(() => {
    fetchProducts().then();
  }, []);
  return (
    <div className="row w-100">
      <div className="col-3 vh-100 border-end">
        <Sidebar />
      </div>
      <div className="col overflow-scroll">
        <ProductList products={products}/>
      </div>
    </div>
  )
}