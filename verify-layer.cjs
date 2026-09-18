const fs=require('fs'),vm=require('vm'),path=require('path');const script=fs.readFileSync(path.join(__dirname,'index.html'),'utf8').match(/<script>([\s\S]*)<\/script>/)[1];
vm.runInNewContext(script.slice(script.indexOf('function rotate'),script.indexOf('let state='))+`
const clone=x=>JSON.parse(JSON.stringify(x));
function pairs(st){return [[0,-1,'left'],[0,1,'right'],[2,1,'front'],[2,-1,'back']].filter(([a,sg])=>{let f=st.filter(f=>f.p[1]>.1&&f.n[a]===sg);return f.length===2&&f[0].color===f[1].color}).map(x=>x[2]);}
function perms(a){if(!a.length)return [[]];return a.flatMap((v,i)=>perms(a.filter((_,j)=>j!==i)).map(p=>[v,...p]));}
const corners=[[-1,-1],[-1,1],[1,-1],[1,1]];let coverage={zero:0,one:0,four:0};
for(let p of perms([0,1,2,3])){let st=solved();for(let f of st){if(f.p[1]<0)continue;let i=corners.findIndex(([x,z])=>x===Math.sign(f.p[0])&&z===Math.sign(f.p[2])),dest=corners[p[i]],angle=0;for(let k=0;k<4;k++){let r=rotate([corners[i][0],0,corners[i][1]],1,k*Math.PI/2);if(Math.round(r[0])===dest[0]&&Math.round(r[2])===dest[1])angle=k*Math.PI/2;}f.p=rotate(f.p,1,angle).map(n=>Math.round(n*1000)/1000);f.n=rotate(f.n,1,angle).map(Math.round);f.verts=f.verts.map(v=>rotate(v,1,angle));}
let count=pairs(st).length;if(count===0){coverage.zero++;lessons[8].moves.forEach((m,i)=>{apply(st,m);if(i===16&&!pairs(st).includes('left'))throw Error('diagonal alignment');});}else if(count===1){coverage.one++;for(let k=0;k<4&&!pairs(st).includes('left');k++)apply(st,'U');lessons[7].moves.forEach(m=>apply(st,m));}else if(count===4)coverage.four++;else throw Error('unexpected pair count');
if(pairs(st).length!==4||st.filter(f=>f.color===0&&f.n[1]===1).length!==4)throw Error('layer incomplete');}
let flip=solved();apply(flip,'x2');if(flip.filter(f=>f.color===0&&f.n[1]===-1).length!==4)throw Error('flip');apply(flip,'x2');if(JSON.stringify(flip.map(f=>[f.p,f.n]))!==JSON.stringify(solved().map(f=>[f.p,f.n])))throw Error('flip inverse');console.log('PASS all 24 top-corner permutations:',coverage,'; whole-cube flip and inverse.');
`,{console});
