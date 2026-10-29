import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=path.resolve('dist');
const code=fs.readFileSync(path.join(root,'app.js'),'utf8').split('// Visual preferences')[0];
for(const route of ['/','/projects/bowlstation/','/projects/tripcraft-ai/','/projects/super-maria-sisters/','/projects/tcd-ai-copilot/']){
 const app={innerHTML:''};const document={title:'',querySelector:()=>app};
 vm.runInNewContext(code,{document,location:{pathname:route},Date});
 const html=app.innerHTML;
 assert.ok(html.includes('Last updated: October 28, 2026'));
 assert.ok(html.includes('mailto:aljun.agunas@yahoo.ca'));
 assert.ok(html.includes('Aljun Agunas'));
 assert.ok(!html.includes('501-6329'));
 for(const match of html.matchAll(/(?:href|src)="(\/[^"#]*)(?:#[^"]*)?"/g)){
  const target=match[1];const file=path.join(root,target.endsWith('/')?target+'index.html':target);
  assert.ok(fs.existsSync(file),`${route}: missing ${target}`);
 }
 const headings=[...html.matchAll(/<h1[ >]/g)];assert.equal(headings.length,1,`${route}: one main heading`);
 if(route!=='/')for(const heading of ['Situation','Task','Action','Result'])assert.ok(html.includes(`<h2>${heading}</h2>`));
 assert.equal((html.match(/data-nav=/g)||[]).length,6);
 assert.ok(!html.includes('undefined'));
 console.log(`PASS ${route}: navigation, internal links, images, heading structure${route!=='/'?', STAR content':''}`);
}
const css=fs.readFileSync(path.join(root,'style.css'),'utf8');assert.ok(css.includes('@media(max-width:720px)'));assert.ok(css.includes('prefers-reduced-motion'));
console.log('PASS responsive and reduced-motion rules present (visual mobile QA remains required).');
