
/* DOM-independent physics: logical pixels, fixed simulation step. */
'use strict';
class FlightEngine {
 constructor(random=Math.random){this.random=random;this.width=520;this.height=390;this.ground=354;this.birdX=140;this.radius=11;this.reset();}
 reset(){this.state='idle';this.y=157;this.velocity=0;this.score=0;this.elapsed=0;this.distance=0;this.spawnTimer=.8;this.obstacles=[];this.flapAge=1;this.justScored=false;}
 start(){this.reset();this.state='running';this.flap();}
 flap(){if(this.state==='running'){this.velocity=-282;this.flapAge=0;return true;}return false;}
 pause(){if(this.state==='running')this.state='paused';}
 resume(){if(this.state==='paused')this.state='running';}
 spawn(){const gap=158,top=57+this.random()*111;this.obstacles.push({x:this.width+32,width:57,top,bottom:top+gap,passed:false,label:['DATA','ONTOLOGY','AI','APPS'][(this.score+this.obstacles.length)%4]});}
 update(dt){this.justScored=false;if(this.state!=='running')return;dt=Math.min(Math.max(dt,0),1/30);this.elapsed+=dt;this.flapAge+=dt;const speed=Math.min(131+this.score*1.5,158);this.distance+=speed*dt;this.velocity+=720*dt;this.y+=this.velocity*dt;this.spawnTimer-=dt;if(this.spawnTimer<=0){this.spawn();this.spawnTimer=1.98;}
  for(const o of this.obstacles){if(!o.passed&&o.x+o.width+5<this.birdX-this.radius){o.passed=true;this.score++;this.justScored=true;}o.x-=speed*dt;const inBody=this.birdX+this.radius>o.x&&this.birdX-this.radius<o.x+o.width;const inCap=this.birdX+this.radius>o.x-5&&this.birdX-this.radius<o.x+o.width+5;const hitsBody=inBody&&(this.y-this.radius<o.top-12||this.y+this.radius>o.bottom+12);const hitsCap=inCap&&(this.y+this.radius>o.top-12&&this.y-this.radius<o.top||this.y+this.radius>o.bottom&&this.y-this.radius<o.bottom+12);if(hitsBody||hitsCap){this.state='over';return;}}
  if(this.y-this.radius<=0||this.y+this.radius>=this.ground){this.state='over';return;}while(this.obstacles.length&&this.obstacles[0].x+this.obstacles[0].width< -10)this.obstacles.shift();
 }
}
globalThis.FlightEngine=FlightEngine;
