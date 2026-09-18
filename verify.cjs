const fs=require('fs'),vm=require('vm'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8'),script=html.match(/<script>([\s\S]*)<\/script>/)[1];new vm.Script(script);
let engine=script.slice(script.indexOf('function rotate'),script.indexOf('let state='));
vm.runInNewContext(engine+`
const sig=s=>JSON.stringify(s.map(f=>[f.p,f.n,f.color]));const base=sig(solved());
for(const m of ['R','U','D','F']){let s=solved();for(let i=0;i<4;i++)apply(s,m);if(sig(s)!==base)throw Error('four-turn identity');apply(s,m);apply(s,m+"'");if(sig(s)!==base)throw Error('inverse');}
for(const l of lessons){let s=solved();l.moves.slice().reverse().map(invert).forEach(m=>apply(s,m));if(l.moves.length&&sig(s)===base)throw Error('invalid setup');l.moves.forEach(m=>apply(s,m));if(sig(s)!==base)throw Error('exercise failed');}
let counts=[0,0,0,0,0],s=solved(),seed=723;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
for(let i=0;i<200000;i++){apply(s,['R','U','D','F',"R'","U'","D'","F'"][Math.floor(rand()*8)]);let top=s.filter(f=>f.n[1]===1&&f.color===0);if(top.length!==3||top.some(f=>f.p[0]>.1&&f.p[2]>.1))continue;let last=s.find(f=>f.color===0&&f.n[1]!==1);if(!(last.p[0]>.1&&last.p[2]>.1))continue;let index=last.p[1]<0?(last.n[2]===1?1:last.n[0]===1?2:3):(last.n[0]===1?4:5);if(!index)continue;let sample=JSON.parse(JSON.stringify(s));lessons[index].moves.forEach((m,j)=>{apply(sample,m);if(lessons[index].transition===j+1){let w=sample.find(f=>f.color===0&&f.n[1]!==1),expected=lessons[index].nextCase===1?2:0;if(!w||w.p[0]<.1||w.p[1]>-.1||w.p[2]<.1||w.n[expected]!==1)throw Error('transition mismatch');}});if(sample.filter(f=>f.n[1]===1&&f.color===0).length!==4)throw Error('general case failed');counts[index-1]++;}
console.log('Coverage',counts);if(counts.some(n=>n<5))throw Error('insufficient case coverage');console.log('PASS syntax, move identities, all seven examples, independent legal matching cases:',counts);
`,{console});
