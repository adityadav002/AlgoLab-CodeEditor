const { exec } = require("child_process");
const { v4: uuid } = require("uuid");
const fs = require("fs");

module.exports = async function runJs(code, input = "") {
  return new Promise((resolve) => {
    const id = uuid();
    const folder = `/temp/${id}`;
    const codeFile = `${folder}/code.js`;
    const inputFile = `${folder}/input.txt`;

    fs.mkdirSync(folder, { recursive: true });

    fs.writeFileSync(codeFile, code);
    fs.writeFileSync(inputFile, input);

    const cmd = `node ${codeFile} < ${inputFile}`;

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        return resolve({
          error: error.message,
          stdout,
          stderr,
        });
      }

      resolve({ stdout, stderr });
    });
  });
};
