import {GeneratedClientInfo} from "./init";
import fs from "fs";
import path from "path";

export function exportList(clients: GeneratedClientInfo[], {save}: { save?: string}) {
  const data = JSON.stringify(clients);
  if (save) {
    const filepath = save;
    ensureDir(filepath);
    fs.writeFileSync(filepath, data);
  }
  console.log(data);
}

/* istanbul ignore next */ //todo update node to v 10.x and user fs.mkdirSync({recursive: true})
function ensureDir(filePath: string) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDir(dirname);
  fs.mkdirSync(dirname);
}