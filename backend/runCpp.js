const { exec } = require("child_process");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");

module.exports = async function runCpp(code, input = "") {
  return new Promise((resolve) => {
    const jobId = uuid();
    const folder = `/temp/${jobId}`;
    const codeFile = `${folder}/code.cpp`;
    const outFile = `${folder}/a.out`;
    const inputFile = `${folder}/input.txt`;

    // Create isolated temp folder
    fs.mkdirSync(folder, { recursive: true });

    // Write files
    fs.writeFileSync(codeFile, code);
    fs.writeFileSync(inputFile, input);

    // Compile + run
    const cmd = `
      g++ ${codeFile} -o ${outFile} 2>&1 &&
      ${outFile} < ${inputFile}
    `;

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
