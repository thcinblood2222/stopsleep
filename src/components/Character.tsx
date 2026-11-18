import {interpolateColors} from 'remotion';
import {mix,smooth} from './Motion';

type FaceProps={f:number;fatigue:number;fear?:number;look?:number;yawn?:number;close?:number;warm?:number;tag?:string;};
export function FacialExpressions({f,fatigue,fear=0,look=0,yawn=0,close=0,warm=.4,tag='face'}:FaceProps) {
  const blinkPhase=((f+43)%102)-49;
  const blink=Math.max(0,1-Math.abs(blinkPhase)/(4+5*fatigue));
  const aperture=Math.max(.035,(1-.47*fatigue+.35*fear)*(1-Math.max(close,blink)));
  const skin=interpolateColors(warm,[0,1],['#b6a6bc','#f3c39b']);
  const cheek=interpolateColors(warm,[0,1],['#7b647e','#bd7c72']);
  const dark=interpolateColors(warm,[0,1],['#51415f','#784e5d']);
  return <g>
    <defs>
      <linearGradient id={tag+'skin'} x2="100%" y2="72%"><stop stopColor={skin}/><stop offset=".57" stopColor={cheek}/><stop offset="1" stopColor={dark}/></linearGradient>
      <linearGradient id={tag+'hair'} x2="90%" y2="90%"><stop stopColor={warm>.45?'#70544f':'#554a64'}/><stop offset=".55" stopColor="#312b44"/><stop offset="1" stopColor="#14192d"/></linearGradient>
    </defs>
    <path d="M-24-11l-5 42q29 31 58 0l-6-45z" fill={`url(#${tag}skin)`} stroke="#4e4059" strokeWidth="2"/>
    <path d="M-63-62q-13-11-17 2 2 23 17 27m119-36q17-8 18 9 0 16-17 27" fill={cheek} stroke={dark} strokeWidth="2.4"/>
    <path d="M-64-89q-5 49 11 74 16 23 47 31 29 0 48-19 21-21 24-64l-1-37-21-26-71-16-35 49z" fill={`url(#${tag}skin)`} stroke="#392d49" strokeWidth="2.4"/>
    <path d="M-56-37q5 23 19 34l27 15q-18-3-42-17-9-18-10-31zm92 23q-8 17-28 28 25-4 40-24l9-24z" fill={dark} opacity=".45"/>
    <path d="M-65-49q-11-15-12-36-10-28 10-48 6-19 37-30l-4-9 31 6 19-11 1 10 29-1 18 16q25 20 18 46l-15 40-7-4q2-30-14-46-12 11-33 10l11-13q-28 20-57 19-12 7-22 49z" fill={`url(#${tag}hair)`} stroke="#151b31" strokeWidth="2.6"/>
    <g fill="none" stroke="#c28d85" opacity={.31+warm*.18} strokeLinecap="round">
      <path d={`M-68-116q14 ${-31+Math.sin(f/16)*3} 57-40m-40 40q29-28 65-31m-53 26q34-25 69-23m-2 10q19-7 36 10m-1-13q13 12 15 28`} strokeWidth="2.5"/>
      <path d="M-68-106q-6 15-2 26m-2-36q11-23 28-29m92 3q21 17 23 32" strokeWidth="1.15"/>
    </g>
    {[-35,24].map((x,i)=><g key={x} transform={`translate(${x} -64)`}>
      <path d="M-16 3q16 11 33-1-1 13-17 15-13-1-16-14z" fill="#5b3858" opacity={.12+.62*fatigue}/>
      <path d={`M-15 ${-13-fear*7}q12 ${-6-(i===0?fear*8:0)} 29 ${-1+fatigue*4}`} stroke="#36283d" strokeWidth="4.2" fill="none" strokeLinecap="round"/>
      <g transform={`scale(1 ${aperture})`}>
        <path d="M-14 0Q-1-12 15-1 4 11-14 0z" fill={interpolateColors(fatigue,[0,1],['#f3e0ce','#d2aeb7'])} stroke="#4f354c" strokeWidth="1.9"/>
        <ellipse cx={mix(-5,7,(look+1)/2)} cy="-1" rx="5.6" ry="6.6" fill="#617687"/>
        <ellipse cx={mix(-5,7,(look+1)/2)+.8} cy="-1" rx="3.1" ry="4.1" fill="#182337"/>
        <circle cx={mix(-5,7,(look+1)/2)-1} cy="-3" r="1.8" fill="#f5e8d4"/>
      </g>
      <path d="M-13 3q11 6 24 1" stroke="#a97484" strokeWidth="1.2" opacity={.34+.4*fatigue} fill="none"/>
    </g>)}
    <path d={`M-4-57q${-6+3*look} 14-9 22l8 5 12-3`} fill="none" stroke={dark} strokeWidth="2.2" opacity=".85" strokeLinecap="round"/>
    <path d={`M-19-13Q-5 ${-16-13*yawn-4*fear} 13 -14Q1 ${-9+21*yawn+9*fear} -19-13z`} fill="#492737" stroke="#6d4057" strokeWidth="1.8"/>
    <path d="M-12-5q13 4 22-1m-43 6l2-4m3 7l2-4m4 7l2-4m4 6l2-5m4 6l2-5m5 5l2-5m6 2l2-5m5 3l2-4" stroke="#583e56" fill="none" opacity={.43+.24*fatigue} strokeWidth="1.15"/>
  </g>;
}
export function Hand() {
  return <g>
    <path d="M-10 0q-7 6-10 16l-2 8q1 4 5 1l6-8-2 13q2 4 6 2l3-12-1 14q2 4 5 1l3-13 1 11q3 3 5-1l2-11q3 4 6 0l-1-12-5-12z" fill="#a57b84" stroke="#54405a" strokeWidth="1.6"/>
    <path d="M-11 17q7 0 8-8m3 11l2-6m5 7l1-6" fill="none" stroke="#694b65" strokeWidth="1.6" strokeLinecap="round"/>
  </g>;
}
function Arm({a,e,flip=false}: {a:number;e:number;flip?:boolean}) {
  return <g transform={`rotate(${a})`}>
    <path d="M-22 9Q-19-8 0-11q24 1 26 23L19 75q-13 17-34 4z" fill="url(#ss-sleeve)" stroke="#22374b" strokeWidth="2.6"/>
    <path d="M-13 18q9 20 5 53m-8-9q8 10 24 9" stroke="#9eabb7" opacity=".39" fill="none" strokeWidth="2"/>
    <g transform={`translate(0 76) rotate(${e})`}>
      <path d="M-18-5q21-11 36 1l-4 63q-14 11-27 0l-6-41z" fill="url(#ss-sleeve)" stroke="#25374a" strokeWidth="2.6"/>
      <path d="M-14 36l18 9m-17 6q13 8 26 2" stroke="#9aa9b7" opacity=".46" fill="none" strokeLinecap="round"/>
      <g transform={`translate(0 61) scale(${flip?-1:1} 1)`}><Hand/></g>
    </g>
  </g>;
}
export function CharacterRig({f,x,y,scale=1,fatigue=.2,fear=0,look=0,warm=.4,walk=0,seated=false,close=0,yawn=0,rub=0,phone=false,fall=0,lying=false,tag='hero'}:{
  f:number;x:number;y:number;scale?:number;fatigue?:number;fear?:number;look?:number;warm?:number;walk?:number;seated?:boolean;close?:number;yawn?:number;rub?:number;phone?:boolean;fall?:number;lying?:boolean;tag?:string;
}) {
  const gait=Math.sin(f/(9+7*fatigue))*walk, breath=Math.sin(f/14)*(1+fatigue), lean=3*fatigue+Math.sin(f/31)*1.6+fall*39;
  const phoneLift=phone?1:0, sit=Number(seated);
  return <g transform={`translate(${x} ${y+breath+Math.abs(gait)*6+fall*131}) scale(${scale}) rotate(${lying?-81:lean})`}>
    <defs>
      <linearGradient id="ss-sleeve" x2="90%" y2="70%"><stop stopColor={warm>.5?'#788f89':'#65818e'}/><stop offset=".58" stopColor="#41586d"/><stop offset="1" stopColor="#29354b"/></linearGradient>
      <linearGradient id="ss-fabric" x2="86%" y2="99%"><stop stopColor={warm>.5?'#83958b':'#718793'}/><stop offset=".41" stopColor="#435e72"/><stop offset="1" stopColor="#233348"/></linearGradient>
    </defs>
    {[-1,1].map(side=><g key={side} transform={`translate(${side*43} 207) rotate(${side*(gait*19+3)-sit*side*30+fall*side*45})`}>
      <path d="M-30-14q29-18 62-2l-4 112-9 46-43-1-8-57z" fill="#344055" stroke="#202a3d" strokeWidth="3"/>
      <path d="M-20 4q8 55 3 101m39-37l-40 12m0 42q21 5 39-2" stroke="#73808f" fill="none" opacity=".56" strokeWidth="2"/>
      <g transform={`translate(0 132) rotate(${side*(-gait*9+sit*14)})`}>
        <path d="M-23 0q23 8 44-1l8 10 25 15 1 12q-48 7-79-1z" fill="#6f697b" stroke="#22283d" strokeWidth="2.5"/>
        <path d="M-26 29q40 6 81 0v9q-43 9-81 0z" fill="#b6a7ad"/><path d="M14 12l18-2m-12 9l17-4" stroke="#d4c5c7" strokeWidth="1.9"/>
      </g>
    </g>)}
    <path d="M-79 40q24-24 51-26l18 9 14 0 26-10q36 1 58 27l-5 166q-71 38-169 4z" fill="url(#ss-fabric)" stroke="#26364c" strokeWidth="3"/>
    <path d="M-31 19q19 45 54 20l15-21m-63 17q24 39 59 3m-101 36q10 30 8 77m33 19q-29 13-47 11m147 0q-37-3-49-18m-85 36q52 12 122-4" stroke="#a8b8bb" opacity=".49" strokeWidth="2" fill="none"/>
    <path d="M32 91l32-4-3 30-13 7-15-7z" fill="#536c7c" stroke="#79909b" strokeWidth="1.5"/>
    <g transform={`translate(0 ${3+fatigue*13}) rotate(${look*10+Math.sin(f/25)*1.65+fall*11})`}>
      <FacialExpressions f={f} fatigue={fatigue} fear={fear} close={close} look={look} yawn={yawn} warm={warm} tag={tag}/>
    </g>
    <g transform="translate(-71 53)"><Arm a={11-gait*18+rub*128+fall*15} e={-11-rub*89-sit*30}/></g>
    <g transform="translate(73 51)"><Arm a={-8+gait*18+phoneLift*32-fall*49} e={10+phoneLift*103+sit*21} flip/></g>
    {phone&&<g transform="translate(77 95) rotate(13)"><rect x="-15" y="-42" width="29" height="49" rx="5" fill="#1a263b" stroke="#aabbbf" strokeWidth="2"/><path d="M-10-32h20v32h-20z" fill="#779d9b"/><path d="M-5-26h10m-10 8h7" stroke="#e7dacb" strokeWidth="2"/></g>}
  </g>;
}
export const pulse=(f:number,inAt:number,peak:number,outAt:number)=>smooth(f,inAt,peak)*(1-smooth(f,peak,outAt));
