import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";

const ProductDetail = () => {
  const [info, setInfo] = useState({});
  const navigate = useNavigate();
  const {productId} = useParams();
  const fetchProduct = async () => {
    const res = await axios.get(`http://localhost:3080/products/${productId}`)
    console.log(res);
    if (res) {
      setInfo({...info, ...res.data})
    } else {
      navigate('/')
    }
  }
  useEffect(() => {
    fetchProduct().then();
  }, [])
  return (
    <div>
      <p>{info.name}</p>
    </div>
  );
}

export default ProductDetail;