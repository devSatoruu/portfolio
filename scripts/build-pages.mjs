import fs from 'node:fs';
import path from 'node:path';
const repo=(process.env.GITHUB_REPOSITORY||'').split('/')[1];
const base=process.env.PAGES_BASE_PATH ?? (repo&&!repo.endsWith('.github.io')?`/${repo}/`:'/');
if(!/^\/(?:[A-Za-z0-9_.-]+\/)*$/.test(base))throw Error('Invalid Pages base path');
const output='site-build';fs.mkdirSync(output,{recursive:true});fs.cpSync('dist',output,{recursive:true});
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory()){walk(file);continue}if(!/\.(html|js|css)$/.test(file))continue;let s=fs.readFileSync(file,'utf8');if(base!=='/'){
 s=s.replaceAll('href="/','href="'+base).replaceAll('src="/','src="'+base);
 s=s.replaceAll("'/assets/'",JSON.stringify(base+'assets/')).replaceAll("'/projects/'",JSON.stringify(base+'projects/')).replaceAll("'/#'",JSON.stringify(base+'#'));
 if(entry.name==='app.js')s=s.replace('location.pathname.split',`location.pathname.slice(${base.length-1}).split`);
 s=s.replaceAll("url('/", "url('"+base).replaceAll('url("/','url("'+base);
 }fs.writeFileSync(file,s)}}walk(output);fs.writeFileSync(path.join(output,'.nojekyll'),'');console.log(`Built ${output} for ${base}`);
