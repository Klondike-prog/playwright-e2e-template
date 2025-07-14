const fs = require('fs');
const path = require('path');

const logDir = path.resolve(__dirname, '../logs');

function getTxtFilesRecursively(dir: string): { folder: string, files: string[] }[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries
    .filter(entry => entry.isDirectory())
    .map(folder => {
      const folderPath = path.join(dir, folder.name);
      const txtFiles = fs.readdirSync(folderPath)
        .filter(f => f.endsWith('.txt'));

      return {
        folder: folder.name,
        files: txtFiles
      };
    });
}

if (!fs.existsSync(logDir)) {
  console.log('Log directory does not exist. Skipping index generation.');
  process.exit(0);
}

const foldersWithTxt = getTxtFilesRecursively(logDir);

const indexHtml = `
<html>
  <head>
    <title>Playwright Test Logs</title>
    <style>
      body { font-family: sans-serif; padding: 20px; }
      h2 { color: #444; }
      h3 { margin-top: 20px; }
      ul { list-style-type: none; padding-left: 10px; }
      li { margin: 4px 0; }
    </style>
  </head>
  <body>
    <h2>Playwright Test Logs</h2>
    ${foldersWithTxt.map(({ folder, files }) => `
      <h3>${folder}</h3>
      <ul>
        ${files.map(f => `<li><a href="${folder}/${f}">${f}</a></li>`).join('\n')}
      </ul>
    `).join('\n')}
  </body>
</html>
`;

fs.writeFileSync(path.join(logDir, 'index.html'), indexHtml);
console.log('✓  Html reporter with logs created - logs/index.html generated.');
