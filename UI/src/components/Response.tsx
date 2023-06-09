import React ,{ ChangeEvent } from "react";
import { useEffect, useState, useRef } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { dracula } from "@uiw/codemirror-theme-dracula";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { EditorState } from "@codemirror/state";
import "./style.css";


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
interface ServerData {
  servers: {
    url: string;
    description: string;
    variables: null | any; 
    extensions: null | any; 
  }[];
}

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

interface Header {
  [key: string]: string;
}


type ResponseProps = {
  handleClick: (e: any) => Promise<void>;
  handleSelectUrl: (event: ChangeEvent<HTMLSelectElement>) => void;
  response: string;
  serverUrl: string;
  input: string;
  inputHeaders: Record<string, string>;
};


export default function Response({ handleClick,handleSelectUrl,response,serverUrl,input,inputHeaders}: ResponseProps) {
  const { id } = useParams();
  const location = useLocation();
  const myState = location.state;
  const [book, setBook] = useState<Product[]>([]);
 
  const [headerss, setHeaderss] = useState<Header>({});

  const [serverUrls, setServerUrls] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState("400");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/product/${myState.productId}`
        ); //`http://localhost:3005/${id}`http://localhost:3005/docs/book http://localhost:8081/api/product/${myState.productId}`
        const data = await response.json();
        setBook(data.paths);
        setHeaderss(data.headers);
    
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [myState.ind]);
  
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
        //console.log(urls);
      } catch (error) {
        console.error("Failed to fetch server URL", error);
      }
    };

    fetchServerUrl();
  }, []);

  return (
    <React.Fragment>

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
