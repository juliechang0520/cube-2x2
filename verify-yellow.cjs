const fs=require('fs'),vm=require('vm'),path=require('path');const script=fs.readFileSync(path.join(__dirname,'index.html'),'utf8').match(/<script>([\s\S]*)<\/script>/)[1];
vm.runInNewContext(script.slice(script.indexOf('function rotate'),script.indexOf('let state='))+`
const clone=x=>JSON.parse(JSON.stringify(x));const key=s=>JSON.stringify(s.map(f=>[...f.p,...f.n]));
const yellow=s=>JSON.stringify(s.filter(f=>f.color===1).map(f=>[...f.p,...f.n]).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b))));
const bottom=s=>JSON.stringify(s.filter(f=>f.p[1]<0).map(f=>[...f.p,...f.n,f.color]));
let goal=solved();apply(goal,'x2');const bottomGoal=bottom(goal),cases=lessons.filter(l=>l.group==='yellow');let q=[goal],seen=new Set([key(goal)]),S="R U R' U R U U R'".split(' ');
for(let i=0;i<q.length;i++){for(let a of [S,swapMoves,['U']]){let s=clone(q[i]);a.forEach(m=>apply(s,m));if(bottom(s)!==bottomGoal)throw Error('macro broke bottom');let k=key(s);if(!seen.has(k)){seen.add(k);q.push(s);}if(q.length>648)throw Error('unexpected state group');}}
if(q.length!==648)throw Error('coverage missing');
let signatures=cases.map(l=>{let s=solved();l.preset.forEach(m=>apply(s,m));return yellow(s);});let coverage=Array(8).fill(0);
for(let initial of q){let s=clone(initial),i=-1;for(let r=0;r<4;r++){i=signatures.indexOf(yellow(s));if(i>=0)break;apply(s,'U');}if(i<0)throw Error('case missing');coverage[i]++;cases[i].moves.forEach(m=>apply(s,m));if(s.filter(f=>f.color===1&&f.n[1]===1).length!==4||bottom(s)!==bottomGoal)throw Error('orientation failure');}
console.log('PASS: all 648 last-layer states (27 orientations × 24 permutations) covered; yellow face solved and bottom layer preserved. Cases:',coverage);
`,{console});
