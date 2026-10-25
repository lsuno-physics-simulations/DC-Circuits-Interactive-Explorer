const fs=require('fs'),assert=require('assert'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
const model=new Function(html.match(/<script id="model">([\s\S]*?)<\/script>/)[1]+'; return {dcSolve,rcState,magneticForce,buildCircuit};')();
const {dcSolve,rcState,magneticForce,buildCircuit}=model;
const near=(a,b,tol=1e-10)=>assert(Math.abs(a-b)<=tol*Math.max(1,Math.abs(a),Math.abs(b)),`${a} != ${b}`);
function balance(s){s.kcl.forEach(x=>near(x,0));near(s.powerResidual,0);}
let s=dcSolve(3,[[2,3,10],[3,1,20]],[[2,1,12,0]]);s.Ir.forEach(x=>near(x,.4));near(s.V[2],8);balance(s);
s=dcSolve(2,[[2,1,10],[2,1,20]],[[2,1,12,2]]);near(s.V[1],12/(1+2*(1/10+1/20)));balance(s);
for(const E of [-24,0,24])for(const r of [0,20])for(const preset of ['series','parallel','mixed','two'])for(const open of [false,true]){
 const c=buildCircuit({E,R1:1,R2:1000,R3:37,r,E2:-17},preset,open),s=dcSolve(c.n,c.r,c.src);balance(s);assert.equal(c.paths.length,c.r.length);
}
s=dcSolve(4,[[2,3,10],[3,1,20],[3,4,30]],[[2,1,12,1],[4,1,18,2]]);assert(s.Ir[2]<0);balance(s);
for(const E of [-12,0,12])for(const V0 of [-8,0,7])for(const t of [0,1e-9,1,10]){const s=rcState(t,E,1000,.001,V0);near(s.residual,0);assert(s.Heat>=0);}
s=rcState(1,12,1000,.001,0);near(s.V,12*(1-Math.exp(-1)));near(s.I,.012/Math.E);
near(rcState(0,0,1000,.001,s.V).V,s.V);near(rcState(100,12,1000,.001,0).Wsource,.144);near(rcState(100,12,1000,.001,0).U,.072);
assert.deepEqual(magneticForce(2,[.3,0,0],[0,0,.5]),[0,-.3,0]);assert.deepEqual(magneticForce(-2,[.3,0,0],[0,0,.5]),[-0,.3,-0]);near(Math.hypot(...magneticForce(2,[0,0,.3],[0,0,.5])),0);
// Compile UI code independently to catch syntax errors.
new Function(html.match(/<script id="app">([\s\S]*?)<\/script>/)[1]);
const fixtures=JSON.parse(fs.readFileSync(path.join(__dirname,'matlab-reference.json'),'utf8'));
for(const f of fixtures){const src=Array.isArray(f.src[0])?f.src:[f.src],s=dcSolve(f.n,f.r,src);
 for(const key of ['V','Is','Ir','Pr','Pinternal','Psource','kcl']){const expected=Array.isArray(f.solution[key])?f.solution[key]:[f.solution[key]];assert.equal(s[key].length,expected.length);s[key].forEach((v,i)=>near(v,expected[i]));}
 near(s.powerResidual,f.solution.powerResidual);
}
console.log(`PASS: ${fixtures.length} circuits agree with exported MATLAB reference results.`);
console.log('PASS: DC reference solutions, 48 topology/extreme/open-branch combinations, KCL and power, RC energy and switching continuity, magnetic vector reversal, UI syntax.');
