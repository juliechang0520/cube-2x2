const fs=require('fs'),vm=require('vm'),path=require('path');const script=fs.readFileSync(path.join(__dirname,'index.html'),'utf8').match(/<script>([\s\S]*)<\/script>/)[1];
vm.runInNewContext(script.slice(script.indexOf('function rotate'),script.indexOf('let state='))+`
const clone=x=>JSON.parse(JSON.stringify(x));const key=s=>JSON.stringify(s.map(f=>[...f.p,...f.n]));
const yellow=s=>JSON.stringify(s.filter(f=>f.color===1).map(f=>[...f.p,...f.n]).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b))));
const bottom=s=>JSON.stringify(s.filter(f=>f.p[1]<0).map(f=>[...f.p,...f.n,f.color]));
function pairs(st){return [[0,-1,'left'],[0,1,'right'],[2,1,'front'],[2,-1,'back']].filter(([a,sg])=>{let f=st.filter(f=>f.p[1]>.1&&f.n[a]===sg);return f.length===2&&f[0].color===f[1].color}).map(x=>x[2]);}
function done(st){return [0,1,2].every(a=>[-1,1].every(sg=>new Set(st.filter(f=>f.n[a]===sg).map(f=>f.color)).size===1));}
let goal=solved();apply(goal,'x2');const bottomGoal=bottom(goal),cases=lessons.filter(l=>l.group==='yellow');let q=[goal],seen=new Set([key(goal)]),S="R U R' U R U U R'".split(' ');
for(let i=0;i<q.length;i++){for(let a of [S,swapMoves,['U']]){let s=clone(q[i]);a.forEach(m=>apply(s,m));if(bottom(s)!==bottomGoal)throw Error('macro broke bottom');let k=key(s);if(!seen.has(k)){seen.add(k);q.push(s);}if(q.length>648)throw Error('unexpected state group');}}
if(q.length!==648)throw Error('coverage missing');
let signatures=cases.map(l=>{let s=solved();l.preset.forEach(m=>apply(s,m));return yellow(s);});let coverage=Array(8).fill(0);
for(let initial of q){let s=clone(initial),i=-1;for(let r=0;r<4;r++){i=signatures.indexOf(yellow(s));if(i>=0)break;apply(s,'U');}if(i<0)throw Error('case missing');coverage[i]++;cases[i].moves.forEach(m=>apply(s,m));if(s.filter(f=>f.color===1&&f.n[1]===1).length!==4||bottom(s)!==bottomGoal)throw Error('orientation failure');
let matched=pairs(s);if(matched.length===0){lessons[20].moves.forEach(m=>apply(s,m));}else if(matched.length===1){for(let j=0;j<4&&!pairs(s).includes('left');j++)apply(s,'U');lessons[19].moves.forEach(m=>apply(s,m));}else if(matched.length!==4)throw Error('invalid pairs');
for(let j=0;j<4&&!done(s);j++)apply(s,'U');if(!done(s)||bottom(s)!==bottomGoal)throw Error('pipeline failed');}
for(let i=21;i<=24;i++){let st=solved();lessons[i].preset.forEach(m=>apply(st,m));if(i<24){const upper=st.find(f=>f.n[2]===1&&f.p[1]>0).color;const axis=i===23?2:0,sign=i===21?-1:i===22?1:-1;const lower=st.find(f=>f.n[axis]===sign&&f.p[1]<0).color;if(upper!==lower)throw Error('alignment description mismatch');}lessons[i].moves.forEach(m=>apply(st,m));if(!done(st))throw Error('alignment example');}

console.log('PASS: all 648 last-layer states (27 orientations × 24 permutations) covered; FULL CUBE solved through yellow orientation, corner matching and final alignment; bottom preserved. Alignment descriptions checked. Cases:',coverage);
`,{console});
