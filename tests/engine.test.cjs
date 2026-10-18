const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');
const context=vm.createContext({});vm.runInContext(fs.readFileSync('src/game/engine.js','utf8'),context);const Engine=context.FlightEngine;
function create(){return new Engine(()=>.5);}
function obstacle(x=135,top=100,bottom=258){return{x,width:57,top,bottom,passed:false,label:'DATA'};}
test('idle scene never autoplays',()=>{const e=create();e.update(.01);assert.equal(e.state,'idle');assert.equal(e.y,157);assert.equal(e.obstacles.length,0);});
test('start, impulse and gravity use consistent units',()=>{const e=create();e.start();assert.equal(e.state,'running');assert.equal(e.velocity,-282);const y=e.y;e.update(1/120);assert.equal(e.velocity,-276);assert(e.y<y);});
test('flap resets upward velocity and is inactive outside play',()=>{const e=create();assert.equal(e.flap(),false);e.start();e.velocity=100;assert.equal(e.flap(),true);assert.equal(e.velocity,-282);assert.equal(e.flapAge,0);});
test('pause freezes simulation and resume preserves state',()=>{const e=create();e.start();e.pause();const y=e.y;e.update(1/30);assert.equal(e.y,y);e.resume();e.update(1/120);assert(e.y<y);});
test('upper boundary collides',()=>{const e=create();e.start();e.y=10;e.velocity=-20;e.update(1/120);assert.equal(e.state,'over');});
test('ground collides',()=>{const e=create();e.start();e.y=e.ground-10;e.velocity=10;e.update(1/120);assert.equal(e.state,'over');});
test('pipe bodies collide',()=>{const e=create();e.start();e.y=50;e.velocity=0;e.obstacles=[obstacle()];e.update(1/120);assert.equal(e.state,'over');});
test('pipe caps collide outside main body width',()=>{const e=create();e.start();e.y=100;e.velocity=0;e.obstacles=[obstacle(e.birdX+e.radius+2)];e.update(1/120);assert.equal(e.state,'over');});
test('safe gap stays playable',()=>{const e=create();e.start();e.y=180;e.velocity=0;e.obstacles=[obstacle()];e.update(1/120);assert.equal(e.state,'running');});
test('one point per passed obstacle, never twice',()=>{const e=create();e.start();e.y=180;e.velocity=0;e.obstacles=[obstacle(50)];e.update(1/120);assert.equal(e.score,1);assert.equal(e.justScored,true);e.update(1/120);assert.equal(e.score,1);assert.equal(e.justScored,false);});
test('obstacles scroll left and stale objects are discarded',()=>{const e=create();e.start();e.obstacles=[obstacle(-100)];e.update(1/120);assert.equal(e.obstacles.length,0);e.obstacles=[obstacle(400)];e.update(1/120);assert(e.obstacles[0].x<400);});
test('spawn produces forgiving bounded gaps',()=>{const e=create();for(let i=0;i<10;i++)e.spawn();for(const o of e.obstacles){assert.equal(o.bottom-o.top,158);assert(o.top>=57);assert(o.bottom<e.ground);}});
test('restart resets score, obstacles and velocity',()=>{const e=create();e.start();e.score=7;e.obstacles=[obstacle()];e.state='over';e.start();assert.equal(e.score,0);assert.equal(e.obstacles.length,0);assert.equal(e.state,'running');assert.equal(e.velocity,-282);});
test('equal simulation steps produce identical results',()=>{const a=create(),b=create();a.start();b.start();for(let i=0;i<45;i++){a.update(1/120);b.update(1/120);}assert.equal(a.y,b.y);assert.equal(a.distance,b.distance);});
test('invalid negative dt cannot reverse time',()=>{const e=create();e.start();const y=e.y;e.update(-1);assert.equal(e.y,y);assert.equal(e.elapsed,0);});
