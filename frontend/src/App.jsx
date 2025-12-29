import React, { useState, useEffect } from "react";
import API from "./api";
import CodeEditor from "./components/CodeEditor";
import InputBox from "./components/InputBox";
import Output from "./components/Output";

export default function App() {
  const [code, setCode] = useState("");
  const [lang, setLang] = useState("cpp");
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    setResult(null);

    try {
      const job = await API.post("/run", { code, lang, input });
      const jobId = job.data.jobId;

      const interval = setInterval(async () => {
        const res = await API.get(`/result/${jobId}`);
        if (res.data.state === "completed") {
          setResult(res.data.result);
          clearInterval(interval);
          setLoading(false);
        }
      }, 1000);
    } catch {
      setLoading(false);
      alert("Error running code");
    }
  };

  useEffect(() => {
  if (lang === "cpp") {
    setCode(`#include <bits/stdc++.h>
using namespace std;

int main() {
    
    return 0;
}`);
  } else if (lang === "python") {
    setCode(`print("Hello World")`);
  } else {
    setCode(`console.log("Hello World");`);
  }
}, [lang]);


  return (
    <div style={styles.app}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>AlgoLab</h2>

        <div style={styles.controls}>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            style={styles.select}
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>

          <button
            onClick={runCode}
            disabled={loading}
            style={styles.runBtn}
          >
            {loading ? "Running..." : "Run"}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div style={styles.editorWrapper}>
        <CodeEditor code={code} setCode={setCode} lang={lang} />
      </div>

      {/* Bottom */}
      <div style={styles.bottomPanel}>
        <InputBox input={input} setInput={setInput} />
        <Output result={result} />
      </div>
    </div>
  );
}

/* ================== STYLES (PASTE AT BOTTOM) ================== */

const styles = {
  app: {
    height: "100vh",
    background: "#000",
    color: "green",
    display: "flex",
    flexDirection: "column",
  },

  header: {
    padding: "12px 20px",
    borderBottom: "1px solid #222",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    margin: 0,
    fontWeight: 500,
  },

  controls: {
    display: "flex",
    gap: "10px",
  },

  select: {
    background: "#000",
    color: "#fff",
    border: "1px solid #333",
    padding: "6px 10px",
  },

  runBtn: {
    background: "green",
    color: "#000",
    border: "none",
    padding: "6px 16px",
    cursor: "pointer",
    fontWeight: 600,
    transition: "smooth"
  },

  editorWrapper: {
    flex: 1,
    minHeight: 0, 
  },

  bottomPanel: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    borderTop: "1px solid #222",
    height: "220px",
  },
};
