import * as fs from 'fs';

const artifactsSource = '../contracts/build/artifacts';

const files = fs.readdirSync(artifactsSource);

let imports:string[] = [];
let exports_:string[] = [];

for(let file of files) {
    fs.copyFileSync(`${artifactsSource}/${file}`, `./artifacts/${file}`)

    const artifact = require(`../artifacts/${file}`);
    imports.push(`import * as ${artifact.contractName} from "../artifacts/${file}";`)
    exports_.push(`    ${artifact.contractName}`);
}


let content = 
`${imports.join("\n")}

export{
${exports_.join(",\n")}
}`



fs.writeFileSync('./src/index.ts', content);