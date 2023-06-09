import React from "react";
import Response from './Response'
import { useEffect, useState, useRef } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { dracula } from "@uiw/codemirror-theme-dracula";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { EditorState } from "@codemirror/state";
import "./style.css";
import { IoMdRadioButtonOn } from "react-icons/io";
import loginimg from "./images/login.png";


interface ResolvedProperties {
  [key: string]: {
    description: string;
    type: string;
  };
}

interface FormData {
  [key: string]: string;
}

interface ServerData {
  servers: {
    url: string;
    description: string;
    variables: null | any; 
    extensions: null | any; 
  }[];
}

type ApiResponse = {
  openapi: string;
  info: Record<string, any>;
  servers: any[];
  components: Record<string, any>;
  paths: any[];
  headers: Record<string, string>[];
};

type PathParam = {
  name: string;
  required: boolean;
  schema: any;
};

type QueryParam = {
  name: string;
  required: boolean;
  schema: any;
};

type Params = {
  Path?: PathParam[];
  Query?: QueryParam[];
};

type Product = {
  endpoint: string;
  params: Params;
  httpMethod: string;
  pathItem: {
    path_id: string;
    operationId: string;
    description: string;
    summary: string;
    responses: {
      200: {
        description: string;
      };
      404: {
        description: string;
      };
    };
  };
};

type ProductResponse = {
  Products: Product[];
};

interface RequestOptions {
  method: string;
  headers: {
    "Content-Type": string;
  };
  body?: string;
}

interface Header {
  [key: string]: string;
}

interface ApiResponseHeader {
  headers: Header[];
}

export default function Home() {
  const { id } = useParams();
  const location = useLocation();
  const myState = location.state;
  const indexl = location.state.indexl + 1;
  const productId = location.state?.productId;
  const [book, setBook] = useState<Product[]>([]);
  const [input, setInput] = useState("");
  //const [headers, setHeaders] = useState<Header[]>([]);
  const [headerss, setHeaderss] = useState<Header>({});
  const [inputHeaders, setInputHeaders] = useState<Header>({});
  const [selectedUrl, setSelectedUrl] = useState<string>("");
  const [resolvedProperties, setResolvedProperties] =
    useState<ResolvedProperties | null>(null);
  const refValue = useRef(0);
  const [serverUrl, setServerUrl] = useState<string>("");
  const [input2, setInput2] = useState("");
  const [serverUrls, setServerUrls] = useState<string[]>([]);
  const [response, setResponse] = useState("Click Try It! to start a request");
  const [selectedOption, setSelectedOption] = useState("400");
  const [input3, setInput3] = useState("");

  useEffect(() => {
    const fetchDataAndDereference = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/product/${myState.productId}`
        );
        const jsonData = await response.json();
        //console.log(jsonData);
        const ref =
          jsonData?.paths[myState.ind]?.pathItem?.requestBody?.content[
            "application/json"
          ]?.schema?.$ref;
        refValue.current = ref;
        //console.log({productId});
        //console.log(ref);
        //console.log(myState.ind);
        function resolveReference(jsonData: any, ref: any) {
          const refParts = ref.split("/");
          let resolvedValue = jsonData;
          for (let i = 1; i < refParts.length; i++) {
            resolvedValue = resolvedValue[refParts[i]];
          }
          return resolvedValue;
        }

        //console.log(resolveReference(jsonData, ref).properties);
        const resolvedProps = resolveReference(jsonData, ref).properties;
        setResolvedProperties(resolvedProps);
        //console.log(resolvedProps);
      } catch (error) {
        //console.error(error);
      }
    };

    fetchDataAndDereference();
  }, [myState?.ind]);

  useEffect(() => {
    const fetchServerUrl = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/product/${myState.productId}`
        );
        const data: ServerData = await response.json();
        //console.log(data);
        const urls = data.servers.map((server) => server.url);
        setServerUrls(urls);
        const serverUrl = data.servers[0].url;
        //console.log(urls);
        setServerUrl(serverUrl);
      } catch (error) {
        console.error("Failed to fetch server URL", error);
      }
    };

    fetchServerUrl();
  }, []);

  const [formData, setFormData] = useState<FormData>({});

  const handleSelectUrl = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUrl(event.target.value);
    setServerUrl(event.target.value);
  };

  const handleInputChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  //var url = `http://localhost:8080${myState.endpoint}`;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formDataJSON = Object.fromEntries(formData.entries());
    //console.log(formDataJSON);

    const requestOptions: RequestOptions = {
      method: `${myState.httpmethod}`,
      headers: {
        "Content-Type": "application/json",
        // Add any required headers here
      },
      // body: JSON.stringify(formDataJSON),
    };

    if (`${myState.httpmethod}` === "PUT") {
      // const formData = new FormData(e.currentTarget);
      // const formDataJSON = Object.fromEntries(formData.entries());
      // console.log(formData);

      requestOptions.body = JSON.stringify(formDataJSON);
      //console.log(formDataJSON);
    }

    // Send POST request with JSON data in the body
    fetch(`${serverUrl}${myState.endpoint}${input}`, requestOptions)
      // "http://localhost:8080/book-api/"
      // , {
      //   method: `${myState.httpmethod}`,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formDataJSON),
      // })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  //This code is for fetching json data from swagger and
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/product/${myState.productId}`
        ); //`http://localhost:3005/${id}`http://localhost:3005/docs/book http://localhost:8081/api/product/${myState.productId}`
        const data = await response.json();
        setBook(data.paths);
        //setHeaders(data.headers);
        setHeaderss(data.headers);
        //console.log(data);
        //console.log(data.paths[0].params.Path[0].name);
        // const pathKeys = Object.keys(data.paths);
        // console.log(pathKeys);
        // console.log(myState.ind);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [myState.ind]);


  
  const handleClick = async (e: any) => {
    try {
      //This below function sets the url based upon the params value it get from response

      let url = `${serverUrl}${myState.endpoint}`;
      //console.log(url);
      const response = await fetch(
        `http://localhost:8081/api/product/${myState.productId}`
      ); //`http://localhost:3005/${id}`
      const datap = await response.json();

      const pathParams: any = {};

      for (let i = 0; i < datap.paths.length; i++) {
        const path = datap.paths[i];
        const params = path.params;
        const id = `_${i}`; // Generate a unique identifier for this object

        for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const newKey = `${key}${id}`; // Add the identifier as a suffix to the key
            pathParams[newKey] = pathParams.hasOwnProperty(newKey)
              ? [...pathParams[newKey], params[key]]
              : [params[key]];
          }
        }
      }

      //console.log(pathParams);

      for (let i = 0; i < datap.paths.length; i++) {
        const path = datap.paths[i];
        const params = path.params;
        if (params.hasOwnProperty("Path")) {
          const pathParameters = params["Path"];
          for (let j = 0; j < pathParameters.length; j++) {
            const pathParameter = pathParameters[j];
            if (pathParameter.hasOwnProperty("name")) {
              url = url.replace(
                `{${pathParameter.name}}`,
                encodeURIComponent(input)
              );
            }
          }
        }
      }

      //console.log(url);

      for (const key in pathParams) {
        if (key.startsWith("Query_")) {
          const queryParameters = pathParams[key][0];
          if (queryParameters && queryParameters.length > 0) {
            url += "?";
            for (let i = 0; i < queryParameters.length; i++) {
              const queryParameter = queryParameters[i];
              if (queryParameter.hasOwnProperty("name")) {
                if (i > 0) {
                  url += "&";
                }
                url += `${queryParameter.name}=${encodeURIComponent(input)}`;
              }
            }
          }
        }
      }

      const requestOptions: RequestOptions = {
        method: `${myState.httpmethod}`,
        headers: {
          "Content-Type": "application/json",

          ...inputHeaders,

          // Add any required headers here
        },
        // body: JSON.stringify(formDataJSON),
      };
      //console.log(inputHeaders);

      if (`${myState.httpmethod}` === "PUT") {
        // const formData = new FormData(e.currentTarget);
        // const formDataJSON = Object.fromEntries(formData.entries());
        // console.log(formData);

        requestOptions.body = JSON.stringify(formData);
        console.log(formData);
      }

      if (`${myState.httpmethod}` === "POST") {
        // const formData = new FormData(e.currentTarget);
        // const formDataJSON = Object.fromEntries(formData.entries());
        // console.log(formData);

        requestOptions.body = JSON.stringify(formData);
        console.log(formData);
      }

      let responseMessage = "";
      if (`${myState.httpmethod}` === "DELETE") {
        responseMessage = "Deleted Successfully";
        setResponse(responseMessage);
      }

      const result = await fetch(
        //  `http://localhost:8080/book-api/${input}`
        url,
        requestOptions
      );
      const data = await result.json();
      if (data !== null) {
        setSelectedOption("200");
      }
      setResponse(JSON.stringify(data, null, 2));
    } catch (error: any) {
      setResponse(JSON.stringify(error.response.data, null, 2));
    }
  };

  if (location.pathname === `/documentation/${indexl}`) {
    //(location.pathname === `/documentation/${location.state.index}`)${indexl} 
    //It will be loaded when an endpoint would be selected
    return (
      <div className="w-full p-1 bg-dash-color">
        <div>
          <div className="py-52  bg-dash-color font-manrope h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <img
                src={loginimg}
                className="max-w-sm max-h-96 rounded-lg shadow-2xl"
              />
              <div>
                <h1 className="text-5xl font-bold">API Documentation !</h1>
                <p className="py-6">
                  Welcome to Perfios API Documentation Start By clicking one of
                  the Endpoints.
                </p>
                {/* <button className="btn btn-primary">Get Started</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <React.Fragment>
      <div className="w-full p-1 bg-dash-color">
        {book
          .filter((data) => data.pathItem.path_id === id)
          .map((data: Product, index) => {
            return (
              <React.Fragment key={index}>
                {/*  This loads the breadcrumbs part and the home creen part
                <div className="p-2">{myState.ind}</div> */}
                <div className="text-sm breadcrumbs pt-4 pl-4">
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <a>{data.pathItem.operationId}</a>
                    </li>
                    <li>{data.httpMethod}</li>
                  </ul>
                </div>

                <div key={data.pathItem.path_id} className="p-4">
                  <h1 className="text-2xl pb-2 font-bold ">
                    {data.pathItem.summary}
                  </h1>
                  <div className="flex">
                    <div
                      className={`text-xs text-center font-semibold p-1 rounded-lg w-14 ${
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
                    </div>
                    <div className="pl-2">
                      http://localhost:8081{data.endpoint}
                    </div>
                  </div>
                  {/* <div className="p-2 pt-4">{data.pathItem.summary}</div> */}
                  <div className="p-2">{data?.pathItem?.description}</div>
                </div>
                <div className="divider"></div>

                <div className="flex flex-col p-4">
                  {/* <div className="pb-2 font-semibold">Path/Query Params</div>
                  <div className="border-2 border-dashed p-4 hover:bg-base-200 flex">
                    <div className="flex-grow">
                      <div className="">Product_id string required</div>
                      <div className="">
                        The ProductTitle or ID for which you want to view the
                        order details:
                      </div>
                    </div>
                    <div className="flex-shrink">
                      <input
                        placeholder="Enter Value"
                        className="input input-bordered input-sm w-full max-w-xs"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                      />
                    </div>
                  </div> */}

                  <div>
                    {book
                      .filter((data) => data.pathItem.path_id === id)
                      .map((endpoint, index) => {
                        // Extract the params information from the endpoint object
                        const pathParams = endpoint.params.Path || [];
                        const queryParams = endpoint.params.Query || [];

                        if (
                          pathParams.length === 0 &&
                          queryParams.length === 0
                        ) {
                          return null; // Hide the container if there are no params
                        }

                        return (
                          <div key={index}>
                            {pathParams.length > 0 || queryParams.length > 0 ? (
                              <div className="pb-2 font-semibold">
                                Path/Query Params
                              </div>
                            ) : null}
                            <div className="border p-4 hover:bg-base-200 flex">
                              <div className="flex-grow pt-2">
                                {pathParams.map((param, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-between"
                                  >
                                    <div className="flex items-center">
                                      {param.name}{" "}
                                      {param.required && (
                                        <span className="text-red-500">*</span>
                                      )}
                                    </div>
                                    <div className="flex-shrink pt-3">
                                      <input
                                        placeholder="Enter Value"
                                        className="input input-bordered input-sm w-full max-w-xs"
                                        type="text"
                                        value={index === 0 ? input : index === 1 ? input2 : input3}
                                        onChange={(e) => {
                                          if (index === 0) setInput(e.target.value);
                                          else if (index === 1) setInput2(e.target.value);
                                          else setInput3(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                ))}
                                {queryParams.map((param, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-between "
                                  >
                                    <div className="flex items-center">
                                      {param.name}{" "}
                                      {param.required && (
                                        <span className="text-red-500">*</span>
                                      )}
                                    </div>
                                    <div className="flex-shrink pt-3">
                                      <input
                                        placeholder="Enter Value"
                                        className="input input-bordered input-sm w-full max-w-xs "
                                        type="text"
                                        value={index === 0 ? input : index === 1 ? input2 : input3}
                                        onChange={(e) => {
                                          if (index === 0) setInput(e.target.value);
                                          else if (index === 1) setInput2(e.target.value);
                                          else setInput3(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                              {/* <div className="flex-shrink">
                                <input
                                  placeholder="Enter Value"
                                  className="input input-bordered input-sm w-full max-w-xs"
                                  type="text"
                                  value={input}
                                  onChange={(e) => setInput(e.target.value)}
                                />
                              </div> */}
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  <div>
                    <div className="pb-2 pt-2 font-semibold">Headers</div>
                    {/* {Object.keys(headers).length > 0 ? (
                      Object.keys(headers).map((headerKey, index) => {
                        const handleChange = (
                          e: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const updatedHeader = {
                            ...inputHeader,
                            [headerKey]: e.target.value,
                          };
                          setInputHeader(updatedHeader);
                        };

                        return (
                          <div
                            key={index}
                            className="border-2 border-dashed p-4 hover:bg-base-200 flex items-center"
                          >
                            <div className="flex-grow">{headerKey}:</div>
                            <div className="flex-shrink">
                              <input
                                placeholder="Enter Value"
                                className="input input-bordered input-sm w-full max-w-xs"
                                type="text"
                                value={inputHeader[headerKey] || ""}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div>No headers found</div>
                    )} */}

                    {Object.entries(headerss).map(
                      ([headerKey, headerValue], index) => (
                        <div
                          key={index}
                          className="border p-4 hover:bg-base-200 flex items-center"
                        >
                          <div className="flex-grow">{headerKey}:</div>
                          <div className="flex-shrink">
                            <input
                              placeholder="Enter Value"
                              className="input input-bordered input-sm w-full max-w-xs"
                              type="text"
                              value={inputHeaders[headerKey] || headerValue}
                              onChange={(e) => {
                                const updatedHeader = {
                                  ...inputHeaders,
                                  [headerKey]: e.target.value,
                                };
                                setInputHeaders(updatedHeader);
                              }}
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  <form onSubmit={handleSubmit}>
                    {resolvedProperties &&
                    Object.keys(resolvedProperties).length > 0 ? (
                      <div className="pb-2 pt-2 font-semibold">Body Params</div>
                    ) : null}
                    {resolvedProperties &&
                      Object.keys(resolvedProperties).map((key) => {
                        if (key !== "id" && refValue.current !== undefined) {
                          return (
                            <div
                              key={key}
                              className="border p-4 hover:bg-base-200 flex items-center"
                            >
                              <div className="flex-grow">
                                <div>{key}:</div>
                                {resolvedProperties[key].description}
                              </div>
                              <div className="flex-shrink tooltip tooltip-primary" data-tip={resolvedProperties[key].type}>
                                <input
                                  placeholder="Enter Value"
                                  className="input input-bordered input-sm w-full max-w-xs"
                                  type="text"
                                  name={key}
                                  value={formData[key] || ""}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                          );
                        }
                      })}
                  </form>

                  {/* <div className="border-2 border-dashed p-4 hover:bg-base-200 flex">
                      The book title for which you want to view the order
                      details :
                      <div className="pl-2"> */}
                  {/* <input type="text" name="title" /> */}
                  {/* <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                        /> */}
                  {/* </div>
                    </div> */}

                  {/* <button 
                        className="btn btn-primary text-dash-color"
                        type="submit"
                      >
                        Post/Put
                      </button> */}

                  <div className="pb-2 pt-2 font-semibold">Responses</div>
                  <div className="border p-4 hover:bg-base-200">
                    <span className="flex">
                      <IoMdRadioButtonOn className="text-green-700" /> 200{" "}
                      <br />
                      {data?.pathItem?.responses[200]?.description}
                    </span>
                    <br />
                    <span className="flex">
                      <IoMdRadioButtonOn className="text-red-700" /> 404 <br />
                      {data?.pathItem?.responses[404]?.description}
                    </span>
                  </div>
                </div>
                <div className="divider pl-1 pr-1"></div>
              </React.Fragment>
            );
          })}
      </div>

      <div className="divider lg:divider-horizontal"></div>

      {/* <Response handleClick={handleClick} handleSelectUrl={handleSelectUrl} response={response} serverUrl={serverUrl}
        input={input}
        inputHeaders={inputHeaders}/> */}

      <div className="w-fixed w-3/5 flex-shrink bg-dash-color flex-grow-0 px-2">
        {book
          .filter((data) => data.pathItem.path_id === id)
          .map((data: Product, index) => {
            return (
              <React.Fragment key={index}>
                <div className="flex sm:flex-col px-2 pt-2">
                  <div className="rounded-xl border mb-3 w-full">
                    <span className="text-dark-blue pt-2 flex">
                      {/* <h1 className="pr-4">Base Url: {serverUrl}</h1> */}
                      <div>
                        <h1 className="pr-4">Base Urls:</h1>
                        <select value={serverUrl} onChange={handleSelectUrl}>
                          {/* <option value="">Select URL</option> */}
                          {serverUrls.map((url, index) => (
                            <option key={index} value={url}>
                              {url}
                            </option>
                          ))}
                        </select>
                        {/* {selectedUrl && <p>Selected URL: {selectedUrl}</p>} */}
                      </div>
                      {/* <div className="">http://localhost:8080</div> */}
                    </span>
                  </div>

                  <div className="card w-5/6 shadow-xl text-black bg-base-200 p-2">
                    <h2 className="card-title pl-4 pt-2 pb-4">Request</h2>

                    <CodeMirror
                      value={`${serverUrl}${myState.endpoint}${input}
--request ${myState.httpmethod}\ \n--url ${serverUrl}${
                        myState.endpoint
                      }${input}\ \n--header 'accept: application/json' \ \n--header 'content-type: application/json' \  \n--header 'x-headers:${JSON.stringify(
                        inputHeaders
                      )}'`}
                      height="150px"
                      theme={dracula}
                      extensions={[json(), EditorState.readOnly.of(true)]}
                    />
                    <div className="pt-2 flex flex-row-reverse">
                      <button
                        onClick={handleClick}
                        className="btn btn-primary text-dash-color"
                        type="button"
                      >
                        Try it
                      </button>
                    </div>
                  </div>

                  <div className="card w-5/6 shadow-xl text-black bg-base-200 mt-6 p-2 ">
                    <div className="flex flex-row gap-x-48">
                      <span className="card-title pt-3 pl-4 pb-4 basis-1/4">
                        Response
                      </span>
                      <span className="pt-4">
                        <select
                          className="select select-bordered select-xs w-full max-w-xs basis-1/4"
                          value={selectedOption}
                          onChange={(e) => setSelectedOption(e.target.value)}
                        >
                          <option>200</option>
                          <option>400</option>
                        </select>
                      </span>
                    </div>

                    <CodeMirror
                      value={response}
                      height="150px"
                      theme={dracula}
                      extensions={[json(), EditorState.readOnly.of(true)]}
                    />
                  </div>
                </div>
              </React.Fragment>
            );
          })}
      </div>
    </React.Fragment>
  );
}
