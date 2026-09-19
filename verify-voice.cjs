const fs=require('fs'),vm=require('vm'),path=require('path');const code=fs.readFileSync(path.join(__dirname,'index.html'),'utf8').match(/<script>([\s\S]*)<\/script>/)[1];
class Element{constructor(){this.clientWidth=280;this.clientHeight=280;this.style={};this.children=[];this.classList={toggle(){},add(){},remove(){}};}appendChild(c){if(c.parentElement)c.parentElement.children=c.parentElement.children.filter(x=>x!==c);this.children.push(c);c.parentElement=this;}remove(){if(this.parentElement)this.parentElement.children=this.parentElement.children.filter(x=>x!==this);this.parentElement=null;}setAttribute(){}querySelectorAll(){return []}addEventListener(){}getBoundingClientRect(){return{width:280,height:280}}getContext(){return new Proxy({},{get:()=>()=>{}})}}
let els={},clock=0;const el=id=>els[id]??=new Element();el('cubeStage').appendChild(el('originalCube'));
const sandbox={document:{getElementById:el,createElement:()=>new Element(),querySelectorAll:()=>[]},devicePixelRatio:1,ResizeObserver:class{observe(){}},performance:{now:()=>clock},requestAnimationFrame:f=>{clock+=1001;f(clock)},setTimeout:f=>f(),console};let spoken=[];sandbox.SpeechSynthesisUtterance=class{constructor(text){this.text=text}};sandbox.speechSynthesis={getVoices:()=>[{lang:'zh-TW',name:'test zh'},{lang:'en-US',name:'test en'}],speak:u=>spoken.push(u),cancel(){},pause(){},resume(){}};vm.createContext(sandbox);vm.runInContext(code,sandbox);

const assert=require('assert');const run=s=>vm.runInContext(s,sandbox);
(async()=>{
run("setMode('practice');chooseCase(0)");el('voiceToggle').onclick();assert.equal(run('voiceRate'),.7);
let p=el('next').onclick();assert.equal(run('step'),0);assert.equal(run('busy'),true);assert(spoken.at(-1).text.includes('右面'));assert.equal(spoken.at(-1).rate,.7);assert.equal(spoken.at(-1).lang,'zh-TW');
el('voicePause').onclick();assert.equal(run('voicePaused'),true);el('voicePause').onclick();assert.equal(run('voicePaused'),false);spoken.at(-1).onend();await p;assert.equal(run('step'),1);
p=el('next').onclick();el('voiceStop').onclick();await p;assert.equal(run('step'),1);assert.equal(run('busy'),false);
p=el('next').onclick();spoken.at(-1).onerror();await p;assert.equal(run('step'),1);assert(el('voiceStatus').textContent.includes('Voice unavailable'));
el('voiceLang').value='en-US';el('voiceLang').onchange();el('voiceRate').value='0.55';el('voiceRate').onchange();p=el('prev').onclick();assert(spoken.at(-1).text.includes('counterclockwise'));assert.equal(spoken.at(-1).rate,.55);spoken.at(-1).onend();await p;assert.equal(run('step'),0);
p=el('play').onclick();assert.equal(run('step'),0);el('voiceStop').onclick();await p;assert.equal(run('playing'),false);assert.equal(run('step'),0);
el('voiceRead').onclick();assert(run('voiceUtterance!==null'));run('chooseCase(2)');assert.equal(run('voiceUtterance'),null);
el('voiceToggle').onclick();await el('next').onclick();assert.equal(run('step'),1);
console.log('PASS: slow zh-TW/en-US narration precedes moves; end advances once, pause/resume works, stop/error prevents pending turns, Previous narrates inverse, autoplay cancellation is safe, changing lessons cancels stale speech, speech-off animation works. Speech synthesis mocked; real audibility/device voices unverified.');
})().catch(e=>{console.error(e);process.exitCode=1});
