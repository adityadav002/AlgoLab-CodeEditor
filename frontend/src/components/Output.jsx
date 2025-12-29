export default function Output({ result }) {
  return (
    <div style={panel}>
      <div style={title}>Output</div>

      <pre style={output}>
        {!result && "Program output will appear here..."}

        {result?.stdout}
        {result?.stderr && `\nErrors:\n${result.stderr}`}
        {result?.error && `\nError:\n${result.error}`}
      </pre>
    </div>
  );
}

const panel = {
  display: "flex",
  flexDirection: "column",
};

const title = {
  padding: "6px 10px",
  borderBottom: "1px solid #222",
  fontSize: "14px",
  color: "#aaa",
};

const output = {
  flex: 1,
  background: "#000",
  color: "#fff",
  margin: 0,
  padding: "10px",
  overflow: "auto",
  fontFamily: "monospace",
};
