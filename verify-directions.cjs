const fs=require('fs'),vm=require('vm'),path=require('path');const code=fs.readFileSync(path.join(__dirname,'index.html'),'utf8').match(/<script>([\s\S]*)<\/script>/)[1];
class Element{constructor(){this.clientWidth=280;this.clientHeight=280;this.style={};this.children=[];this.classList={toggle(){},add(){},remove(){}};}appendChild(c){if(c.parentElement)c.parentElement.children=c.parentElement.children.filter(x=>x!==c);this.children.push(c);c.parentElement=this;}remove(){if(this.parentElement)this.parentElement.children=this.parentElement.children.filter(x=>x!==this);this.parentElement=null;}setAttribute(){}querySelectorAll(){return []}addEventListener(){}getBoundingClientRect(){return{width:280,height:280}}getContext(){return new Proxy({},{get:()=>()=>{}})}}
let els={},clock=0;const el=id=>els[id]??=new Element();el('cubeStage').appendChild(el('originalCube'));
const sandbox={document:{getElementById:el,createElement:()=>new Element(),querySelectorAll:()=>[]},devicePixelRatio:1,ResizeObserver:class{observe(){}},performance:{now:()=>clock},requestAnimationFrame:f=>{clock+=1001;f(clock)},setTimeout:f=>f(),console};vm.createContext(sandbox);vm.runInContext(code,sandbox);

vm.runInContext(`
for(const face of ['R','U','D','F'])for(const suffix of ['',"'"]){
 let st=solved();st.forEach((f,i)=>f.color=i);let before=faceGuideCells(st,face).map(f=>f.color);apply(st,face+suffix);let after=faceGuideCells(st,face).map(f=>f.color),order=suffix?[1,3,0,2]:[2,0,3,1];if(after.join()!==order.map(i=>before[i]).join())throw Error('mirrored direction '+face+suffix);
 let svg=faceGuideSVG(solved(),face+suffix,true,false);if(svg.includes('scale(-1 1)')!==Boolean(suffix))throw Error('arc direction');
}
setMode('practice');chooseCase(1);const beforeState=JSON.stringify(state);renderTurnDiagram();if(JSON.stringify(state)!==beforeState)throw Error('preview mutated state');if(!$('turnDiagram').innerHTML.includes('轉動後'))throw Error('missing guide');
chooseCase(10);if(!$('turnDiagram').innerHTML.includes('Whole-cube flip')||$('turnDiagram').innerHTML.includes('<svg'))throw Error('whole flip confused with face turn');
$('whiteExample').onclick();loadWhitePlan();if(!$('turnDiagram').innerHTML.includes('Match white only'))throw Error('custom colors');
step=sequence.length;update();if($('turnDiagram').innerHTML!=='')throw Error('stale guide at completion');
setMode('explore');if($('turnDiagram').innerHTML!=='')throw Error('guide in explore');
console.log('PASS: face-on R/U/D/F diagrams map all four stickers clockwise and counterclockwise correctly; arrow mirroring agrees, preview does not mutate state, whole-cube flip is separate, custom colors hidden and guide clears on completion/exploration. Mock DOM only.');
`,sandbox);
fs.writeFileSync('/tmp/cube-direction.svg',vm.runInContext('faceGuideSVG(solved(),"R",true,false)',sandbox));
