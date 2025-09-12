import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHightlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";



function App() {
  const [code, setCode] = useState(`function sum(){
    return 1+1
  }`);

  const [review, setReview] = useState(``);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {

    if (!code.trim()) {
    setReview("Please enter some code before reviewing.");
    return; 
  }

    setLoading(true);
    const response = await axios.post("https://ai-code-review-backend-eta.vercel.app/ai/get-review", {
      code,
    });

    setReview(response.data);
    setLoading(false);
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 15,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>

          <div
            onClick={reviewCode}
            className="review"
            style={{ pointerEvents: loading ? "none" : "auto" }}
          >
            {loading ? "Loading..." : "Review"}
          </div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[rehypeHightlight]}>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;

