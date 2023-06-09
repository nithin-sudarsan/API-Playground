import { useState, useEffect } from "react";
import {  useLocation } from "react-router-dom";
// import {
//   FaCube,
// } from "react-icons/fa";

import { Link } from "react-router-dom";


//Types for the api data comming and used in sidebar

type Product = {
  endpoint: string;
  httpMethod: string;
  
  pathItem: {
    operationId: string;
    path_id:string;
  };
  params:{
    Path: [
      {
        name: "name",
        required: true,
        schema: {
          type: "string",
          required: null
        }
      }
    ]
  }
};


type Products = Array<Product>;

export default function Sidebar() {

  //Declared States

  const [book, setBook] = useState<Products>([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const location = useLocation();
  const storedProductId = localStorage.getItem('productId');
  const productId = location.state?.productId || storedProductId;
  const storedIndexl = localStorage.getItem('indexl');
  const indexl = location.state?.indexl+1 || storedIndexl;;


  const handleItemClick = (item: any) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (productId) { // Check if productId is defined
          // Fetching the data from Swagger OpenAPI
          const response = await fetch(`http://localhost:8081/api/product/${productId}`);
          const data = await response.json();
          //console.log(data);
          //console.log(indexl);
          // Setting the data for access in the downstream components
          setBook(data.paths);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [productId,indexl]);

  useEffect(() => {
    if (productId) {
      localStorage.setItem('productId', productId);
    }
    if (indexl) {
      localStorage.setItem('indexl', indexl);
    }
  }, [productId,indexl]);


  return (
    <div>
      <div className="h-screen p-1 pt-4 w-96  divide-slate-500 overflow-y-auto">
        {book.map((data: Product, index) => {
          const isSelected = selectedItem === index;
          //we are passing the myState to Homebar component from here
          const myState = { endpoint: data.endpoint , httpmethod : data.httpMethod , ind:index ,productId:productId};
          return (
            <ul key={index} className="px-2">
              <Link to={`/documentation/${indexl}/${data.pathItem.path_id}`} state={myState}>
                <li
                  className={`text-md items-center cursor-pointer shadow hover:shadow-lg flex flex-row justify-between pt-2 pb-2 pr-2 ${
                    isSelected ? "bg-blue-200" : ""
                  }`}
                  onClick={() => handleItemClick(index)}
                >
                  {/* <div className="block pl-4">{index}</div> */}
                  {/* <div className="block pl-4">{index}</div> */}
                  <div className="block pl-4 overflow-hidden truncate">{data.endpoint}</div>
                  <span
                    className={`text-xs text-center font-semibold p-2 rounded-lg w-16 ${
                      data.httpMethod === "GET"
                        ? "bg-[#62AFFE]"
                        : data.httpMethod === "POST"
                        ? "bg-[#70CD90]"
                        : data.httpMethod === "PUT"
                        ? "bg-[#F09F2F]"
                        : data.httpMethod === "DELETE"
                        ? "bg-[#E64E3D]"
                        : ""
                    } text-dash-color`}
                  >
                    {data.httpMethod}
                  </span>
                 
                </li>
              </Link>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
