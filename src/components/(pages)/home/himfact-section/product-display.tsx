import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export default function ProductDisplay() {
  const [productActiveIndex, setProductIndex] = useState(2);
  const [product, setProduct] = useState([
    {
      id: 0,
      productName: "himfact13_baju1",
      url: "/img/himfact13_baju1.webp",
      status: false,
    },
    {
      id: 1,
      productName: "lanyard_1",
      url: "/img/lanyard_1.webp",
      status: false,
    },
    {
      id: 2,
      productName: "jahim",
      url: "/img/jahim_front.png",
      status: true,
    },
    {
      id: 3,
      productName: "lanyard_2",
      url: "/img/lanyard_2.webp",
      status: false,
    },
    {
      id: 4,
      productName: "himfact13_baju2",
      url: "/img/himfact13_baju2.webp",
      status: false,
    },
  ]);

  function handleClick(index: number) {
    const updatedProducts = product.map((item, i) => ({
      ...item,
      status: i === index,
    }));
    setProductIndex(index);
    setProduct(updatedProducts);
  }
  const autoDisplay = useCallback(() => {
    const nextIndex = (productActiveIndex + 1) % product.length;
    const updatedProducts = product.map((item, i) => ({
      ...item,
      status: i === nextIndex,
    }));
    setProduct(updatedProducts);
    setProductIndex(nextIndex);
  }, [product, productActiveIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      autoDisplay();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [autoDisplay]);
  return (
    <div className="product-wrapper">
      {product.map((product, i) => (
        <Image
          className="product-highlight"
          priority={true}
          key={i}
          id={`${i}`}
          src={product.url}
          alt=""
          width={1000}
          height={1000}
          style={product.status ? { left: "50%" } : {}}
        />
      ))}
      {product.map((product, i) => (
        <div
          onClick={() => handleClick(i)}
          key={i}
          id={`${i}`}
          className={`img-wrapper product-${i + 1} ${
            productActiveIndex === i ? "active" : ""
          }`}
          style={{ backgroundImage: `url(${product.url})` }}
        ></div>
      ))}
    </div>
  );
}
