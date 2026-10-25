const fs=require('fs'),path=require('path'),assert=require('assert');
const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
class Element{
 constructor(id){this.id=id;this.hidden=false;this.checked=false;this.disabled=false;this.innerHTML='';this.textContent='';this.value=({preset:'series',loop:'1',switch:'charge'})[id]||'';this.handlers={};this.dataset={};}
 addEventListener(e,f){this.handlers[e]=f;} setAttribute(k,v){this[k]=v;} click(){this.handlers.click?.();}
 querySelector(s){return this.querySelectorAll(s)[0]||null;}
 querySelectorAll(s){if(s!=='svg')throw Error(s);return [...this.innerHTML.matchAll(/<svg[^>]*viewBox="0 0 ([\d.]+) ([\d.]+)"[^>]*>([\s\S]*?)<\/svg>/g)].map(m=>({viewBox:{baseVal:{width:+m[1],height:+m[2]}},innerHTML:m[3]}));}
}
const nodes={},get=id=>nodes[id]??=new Element(id),tabs=['dc','rc','mag'].map(mode=>{const x=new Element(mode);x.dataset.mode=mode;return x;});
const doc={getElementById:get,querySelectorAll:s=>{assert.equal(s,'[data-mode]');return tabs;},addEventListener(){},createElement:()=>new Element('download')};
let queued,downloads=[];const url={createObjectURL:b=>{downloads.push(b);return'blob:test';},revokeObjectURL(){}};
const api=new Function('document','window','requestAnimationFrame','Blob','URL','setTimeout',html.match(/<script id="model">([\s\S]*?)<\/script>/)[1]+html.match(/<script id="app">([\s\S]*?)<\/script>/)[1]+';return{run:s=>eval(s)};')(doc,{innerWidth:1280,addEventListener(){},matchMedia:()=>({matches:false})},cb=>queued=cb,Blob,url,()=>{});
const run=s=>api.run(s);
function svgCheck(){for(const id of ['diagram','plots']){assert(!/NaN|Infinity|undefined/.test(get(id).innerHTML),id+' invalid svg');assert(get(id).innerHTML.includes('<svg'));}}
svgCheck();
for(const preset of ['series','parallel','mixed','two']){get('preset').value=preset;get('preset').handlers.change();svgCheck();get('loop').value='2';get('loop').handlers.change();svgCheck();}
get('preset').value='mixed';get('preset').handlers.change();get('open').checked=true;get('open').handlers.change();assert(get('loop').disabled);assert.equal(get('loop').value,'1');svgCheck();
run("setParam('E',-24)");svgCheck();run("setParam('E','bad')");assert.equal(run('p.E'),-24);
run("setParam('E',12)");
tabs[1].click();svgCheck();assert.equal(run('mode'),'rc');run('t=p.R1*p.C*1e-6;render()');const before=run('rcState(t,p.E,p.R1,p.C*1e-6,V0).V');get('switch').value='discharge';get('switch').handlers.change();assert.equal(run('V0'),before);assert.equal(run('t'),0);svgCheck();get('step').click();assert(run('t')>0);get('play').click();assert(run('running'));queued(1000);queued(1100);get('play').click();assert(!run('running'));get('reset').click();assert.equal(run('V0'),12);svgCheck();
tabs[2].click();for(const [k,v] of [['angle',0],['angle',90],['angle',180],['B',0],['B',-2],['E',-24],['E',0]]){run(`setParam('${k}',${v})`);svgCheck();}assert(get('play').disabled);
for(const tab of tabs){tab.click();get('export').click();svgCheck();}
assert.equal(downloads.length,3);
Promise.all(downloads.map((b,i)=>b.text().then(s=>{assert(s.includes('<svg'));}))).then(()=>console.log('PASS: UI initialization, four presets and loops, open-branch loop guard, invalid input, RC continuity/playback/reset, magnetic zero/reversal, three figure exports.'));



