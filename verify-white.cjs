const fs=require('fs'),vm=require('vm'),path=require('path');const code=fs.readFileSync(path.join(__dirname,'index.html'),'utf8').match(/<script>([\s\S]*)<\/script>/)[1];
class Element{constructor(){this.clientWidth=280;this.clientHeight=280;this.style={};this.children=[];this.classList={toggle(){},add(){},remove(){}};}appendChild(c){if(c.parentElement)c.parentElement.children=c.parentElement.children.filter(x=>x!==c);this.children.push(c);c.parentElement=this;}remove(){if(this.parentElement)this.parentElement.children=this.parentElement.children.filter(x=>x!==this);this.parentElement=null;}setAttribute(){}querySelectorAll(){return []}addEventListener(){}getBoundingClientRect(){return{width:280,height:280}}getContext(){return new Proxy({},{get:()=>()=>{}})}}
let els={},clock=0;const el=id=>els[id]??=new Element();el('cubeStage').appendChild(el('originalCube'));
const sandbox={document:{getElementById:el,createElement:()=>new Element(),querySelectorAll:()=>[]},devicePixelRatio:1,ResizeObserver:class{observe(){}},performance:{now:()=>clock},requestAnimationFrame:f=>{clock+=1001;f(clock)},setTimeout:f=>f(),console};vm.createContext(sandbox);vm.runInContext(code,sandbox);

vm.runInContext(`
const goal=whiteSlots.map((f,i)=>f.n[1]===1?i:-1).filter(i=>i>=0),all=[goal],known=new Set([whiteKey(goal)]);
for(let h=0;h<all.length;h++)for(let perm of whitePerms){let n=all[h].map(i=>perm[i]),key=whiteKey(n);if(!known.has(key)){known.add(key);all.push(n);}}
if(all.length!==5670)throw Error('coverage '+all.length);
let maximum=0;
for(let input of all){let plan=planWhites(input),now=input.slice(),previous=upperWhite(now);maximum=Math.max(maximum,plan.moves.length);
for(let j=0;j<plan.moves.length;j++){now=now.map(i=>whitePerms[whiteMoves.indexOf(plan.moves[j])][i]);if(plan.checkpoints.includes(j+1)||j===plan.moves.length-1){let up=upperWhite(now);if(up.length<=previous.length||!previous.every(i=>up.includes(i)))throw Error('checkpoint');previous=up;}}
if(upperWhite(now).length!==4)throw Error('not solved');
let st=solved();plan.moves.slice().reverse().map(invert).forEach(m=>apply(st,m));let reconstructed=st.filter(f=>f.color===0).map(f=>whiteSlots.findIndex(g=>slotKey(g)===slotKey(f)));if(whiteKey(reconstructed)!==whiteKey(input))throw Error('reconstruction');
}
if(validateWhites([0,0,1,2])||validateWhites([0,1,2])||validateWhites([0,8,16,23]))throw Error('invalid accepted');
$('whiteExample').onclick();loadWhitePlan();if(selected!==28)throw Error('entry');setMode('practice');if(whiteKey(state.filter(f=>f.color===0).map(f=>whiteSlots.findIndex(g=>slotKey(g)===slotKey(f))))!==whiteKey([...enteredWhites]))throw Error('UI initial state');
console.log('PASS: all 5,670 valid white-position arrangements solve; every checkpoint increases top whites and preserves previously occupied top slots. Inverse presets reproduce every input. Maximum '+maximum+' quarter turns. Invalid input rejected; mock UI entry verified. No real browser/touch test.');
`,sandbox);
(async()=>{const stops=vm.runInContext('[...lessons[28].checkpoints,sequence.length]',sandbox);for(const stop of stops){await el('play').onclick();if(vm.runInContext('step',sandbox)!==stop)throw Error('autoplay checkpoint');}const count=vm.runInContext('state.filter(f=>f.color===0&&f.n[1]===1).length',sandbox);if(count!==4)throw Error('UI completion');for(let i=vm.runInContext('step',sandbox);i>0;i--)await el('prev').onclick();if(!vm.runInContext('whiteKey(state.filter(f=>f.color===0).map(f=>whiteSlots.findIndex(g=>slotKey(g)===slotKey(f))))===whiteKey([...enteredWhites])',sandbox))throw Error('UI reverse');console.log('PASS: generated-plan autoplay pauses at every checkpoint; previous restores original white input. Mock DOM only.');})();
