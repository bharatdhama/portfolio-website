import { readFile, writeFile, mkdir, cp, access, rm, readdir } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
import vm from 'node:vm';
const root=process.cwd();
const html=await readFile('src/index.html','utf8');
const links=[...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m=>m[1]);
for(const ref of links){
 if(/^(?:https?:|mailto:|#)/.test(ref))continue;
 if(ref.startsWith('/')||ref.includes('..'))throw new Error('Non-portable local reference: '+ref);
 const clean=ref.replace(/^\.\//,'');
 const from=clean.startsWith('assets/')?'public':'src';
 await access(join(from,clean));
}
for(const file of ['src/game/engine.js','src/app.js'])new vm.Script(await readFile(file,'utf8'),{filename:file});
if(!html.includes('id="projects"')||!html.includes('id="about"')||!html.includes('id="contact"'))throw new Error('Missing core sections');
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});
await cp('src','dist',{recursive:true});await cp('public','dist',{recursive:true});
await writeFile('dist/.nojekyll','');
async function bytes(dir){let n=0;for(const e of await readdir(dir,{withFileTypes:true})){const p=join(dir,e.name);n+=e.isDirectory()?await bytes(p):(await readFile(p)).length;}return n;}
console.log(`Production build passed. ${links.length} HTML references checked. Static output: ${await bytes('dist')} bytes.`);
