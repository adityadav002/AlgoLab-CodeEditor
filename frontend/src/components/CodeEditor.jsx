import { Editor } from "@monaco-editor/react";

export default function CodeEditor({ code, setCode, lang }) {
  function handleBeforeMount(monaco) {
    monaco.editor.defineTheme("blackWhiteTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [{ token: "", foreground: "FFFFFF" }],
      colors: {
        "editor.background": "#000000",
        "editor.foreground": "#ffffff",
        "editorCursor.foreground": "#ffffff",
        "editor.lineHighlightBackground": "#111111",
        "editorLineNumber.foreground": "#555555",
        "editor.selectionBackground": "#333333",
      },
    });
  }

  return (
    <Editor
      height="100%"
      language={lang === "cpp" ? "cpp" : lang}
      value={code ?? ""}
      beforeMount={handleBeforeMount}
      theme="blackWhiteTheme"
      onChange={(value) => setCode(value ?? "")}
      options={{
        fontSize: 16,
        minimap: { enabled: false },
        automaticLayout: true,
        scrollBeyondLastLine: false,
        autoClosingBrackets: "always",
        autoClosingQuotes: "always",
        matchBrackets: "always",
        quickSuggestions: true,
        wordBasedSuggestions: true,
        readOnly: false,
      }}
    />
  );
}
