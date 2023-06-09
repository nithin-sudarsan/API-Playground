import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import voidimg from "./images/void.svg";

interface BookStoreAPI {
   id:string;
  apiInfo: {
    title: string;
    description: string;
    license: any | null;
    version: string;
  };
}

type ProductResponse = BookStoreAPI[];

export default function ProductPage(): JSX.Element {
  const [products, setProducts] = useState<ProductResponse>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/product/info");
        const data = await response.json();
        setProducts(data);
       // console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen font-manrope bg-dash-color">
      <div>
        <h1 className="text-4xl text-center pt-12">Our Featured Products</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-20 mt-20 ml-20 mr-20">
        {products.length === 0 ? (<div>
          <div className="text-center text-xl pb-8">NO PRODUCT</div>
          <img
                src={voidimg}
                className="max-w-sm max-h-96 rounded-lg"
              />
          </div>
        ) : (
          products.map((product: BookStoreAPI, indexl: number) => (
            <div key={indexl} className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h1 className="card-title">{product?.apiInfo?.title}</h1>
                <h5 className="card-title text-sm">{product?.apiInfo?.version}</h5>
                <p className="overflow-hidden line-clamp-3">{product?.apiInfo?.description}</p>
                <div className="card-actions justify-end">
                  <Link to={`/documentation/${indexl + 1}`} state={{ indexl: indexl, productId: product?.id }}>
                    <button className="btn btn-primary text-dash-color">Select</button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
