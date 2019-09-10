import * as fs from 'fs';

const wrappersSource = '../contracts/build/wrappers';

const files = fs.readdirSync(wrappersSource);

let exports_:string[] = [];

for(let file of files) {
    fs.copyFileSync(`${wrappersSource}/${file}`, `./src/wrappers/${file}`)

    exports_.push(
    `export * from "./wrappers/${file.replace(".ts", "")}";`)
}


fs.writeFileSync('./src/index.ts', exports_.join("\n"));