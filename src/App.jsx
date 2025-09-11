import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import  rehypeHightlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [code, setCode] = useState(`function sum(){
    return 1+1
  }`)

  const [review, setReview] = useState(``)

  useEffect(() => {
    prism.highlightAll();
  },[]);


  //changed::::
  // async function reviewCode(){

  //  const response = await axios.post('http://localhost:3000/ai/get-review', {code})

  //  setReview(response.data)

  // }

  const API_URL = process.env.REACT_APP_API_URL;  

async function reviewCode() {
  const response = await axios.post(`${API_URL}/ai/get-review`, { code });
  setReview(response.data);
}


  return (
    <>
      <main>
        <div className="left">
          <div className="code">
           <Editor
           value={code}
           onValueChange={code=> setCode(code)}
           highlight={code=> prism.highlight(code, prism.languages.javascript, "javascript")}
           padding={10}
           style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 15,
            border: "1px solid #ddd",
            borderRadius: "5px",
            height: "100%",
            width: "100%"
           }}
           />
          </div>
          <div
          onClick={reviewCode} 
          
          className="review">Review</div>
        </div>
        <div className="right">
          <Markdown
          rehypePlugins={[rehypeHightlight]}
          >{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
