import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const routes=['/','/projects/bowlstation/','/projects/tripcraft-ai/','/projects/super-maria-sisters/','/projects/tcd-ai-copilot/'];
for(const base of ['/','/portfolio/']){
 execFileSync(process.execPath,['scripts/build-pages.mjs'],{env:{...process.env,PAGES_BASE_PATH:base},stdio:'pipe'});
 const source=fs.readFileSync('site-build/app.js','utf8');execFileSync(process.execPath,['--check','site-build/app.js']);
 for(const route of routes){const app={innerHTML:''},document={title:'',querySelector:()=>app};const pathname=base+route.slice(1);vm.runInNewContext(source.split('// Visual preferences')[0],{document,location:{pathname},Date});
 for(const m of app.innerHTML.matchAll(/(?:href|src)="(\/[^"#]*)(?:#[^"]*)?"/g)){assert.ok(m[1].startsWith(base),`Escaped base: ${m[1]}`);let p=m[1].slice(base.length);assert.ok(fs.existsSync(path.join('site-build',p.endsWith('/')||!p?p+'index.html':p)),m[1])}
 if(route!=='/')assert.ok(app.innerHTML.includes('<h2>Situation</h2>'),`Failed case routing ${pathname}`);
 const html=fs.readFileSync(path.join('site-build',route,'index.html'),'utf8');assert.ok(html.includes(`href="${base}style.css"`));assert.ok(html.includes(`src="${base}app.js"`));
 }console.log(`PASS GitHub Pages base ${base}: all five routes, assets, resume and case-study routing`)
}
