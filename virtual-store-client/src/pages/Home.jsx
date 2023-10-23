import { React, useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { get } from "../services/apiService";
import { addProduct } from "../slices/shoppingCart";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const productsSC = useSelector((state) => state.products);

  useEffect(() => {
    get(`/products/list`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users data:", error);
      });
  }, []);

  const handleAddToCart = (productData) => {
    dispatch(addProduct(productData));
    toast.info("Item added to your cart");
  };

  return (
    <div className='products-view'>
      <p className='pageTitles'>Virtual Market</p>

      <p className='pageTitles'>{productsSC}</p>
      <div className='products-list'>
        {products?.map((item) => (
          <ProductCard
            idProduct={item.sku}
            brand={item.brands[0]}
            productInfo={item.name}
            image={item.imagePath}
            addToCart={handleAddToCart}
            productData={item}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
