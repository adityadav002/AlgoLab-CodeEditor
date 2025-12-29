export default function InputBox({ input, setInput }) {
  return (
    <div style={panel}>
      <div style={title}>Input</div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Standard input..."
        style={textarea}
      />
    </div>
  );
}

const panel = {
  display: "flex",
  flexDirection: "column",
  borderRight: "1px solid #222",
};

const title = {
  padding: "6px 10px",
  borderBottom: "1px solid #222",
  fontSize: "14px",
  color: "#aaa",
};

const textarea = {
  flex: 1,
  background: "#000",
  color: "#fff",
  border: "none",
  outline: "none",
  padding: "10px",
  fontFamily: "monospace",
};
