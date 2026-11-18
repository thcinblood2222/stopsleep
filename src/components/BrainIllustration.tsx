import {interpolateColors} from 'remotion';
import {fract,mix,noise,smooth} from './Motion';

const silhouette='M-257 40C-280 7-280-51-262-85c-6-35 27-68 52-75 13-48 52-62 84-60 30-30 74-37 107-26 29-21 79-16 103 6 39-1 70 18 83 49 41 4 74 35 83 67 26 28 30 72 12 107 1 36-27 65-56 76-18 26-55 34-82 33-27 22-63 22-84 10-42 23-77 9-102-13-30 16-69 9-95-14-39 6-62-15-70-39-28 0-44-12-52-34z';
const gyri=[
  'M-249-81c30 14 25 58 55 61 34 3 32-45 60-53 32-10 31 33 59 47 30 16 62-5 65-28',
  'M-221-137q29-8 43 15t40 16q14-2 23-22 21-34 49-24 14 5 17 32 3 20 25 25',
  'M-176-171q-11 25 14 33m29-53q28-17 48-10 24 8 27 26t21 19m31-59q42-16 66 15 5 14 22 28',
  'M-16-38q8-37 39-32 36 6 37 30 2 20 18 22 27 6 38-20 9-24 36-19 26 11 25 36',
  'M4-178q33-15 50 13 9 33 46 31t57-26m-131 0q-14 17-10 35t34 28',
  'M85-206q45 13 34 35-12 28 18 33 13 3 32-7 21-8 38 6m-55-42q22 29 42 30',
  'M154-117q-12 20 11 42 14 8 33 2 27-7 34 25 2 24-27 28',
  'M89-113q-10 10-3 30 10 22 34 18m79-54q39 14 35 40',
  'M-256 14q28-16 46 17 17 25 49 18 24-6 30-28 5-22 30-18 25 4 31 32 5 16 31 16 26 0 34-21',
  'M-189 58q7 30 31 37 29 7 53-14 31-26 48-7t47 16',
  'M-168-14q-19 6-18 22 0 9 14 15m48-47q21-19 30 6 16 33 43 27',
  'M9 75q17-23 36-14 19 10 28 29m-15-54q8-15 30-14 28 5 43-10t8-38',
  'M90 64q8-19 38-21 22 0 32-18t26-23m-46 74q12-18 41-19 31-1 37-33',
  'M187 36q2-25 21-29 19-4 29-21m-201 34q-9-28 11-41m-272 66q7 13 29 11',
  'M-29 61q-2-19 23-23 15-2 18-22m116 72q-30 12-41 7m36-211q9 12 6 28',
];
const edgeColors=['#ce9ea0','#b18aa8','#788eb5','#88aab9','#9a81ae'];
export function NeuronNetwork({f,stress=0,deep=false,alpha=1,tag='net'}:{f:number;stress?:number;deep?:boolean;alpha?:number;tag?:string}) {
  const nodes=Array.from({length:35},(_,i)=>({x:(noise(i+771)-.5)*525,y:(noise(i+281)-.5)*435-35}));
  const detail=deep?1.2:1;
  const color=interpolateColors(stress,[0,.58,1],['#a3e8db','#d6addd','#e3acac']);
  return <g opacity={alpha}>
    <defs><radialGradient id={tag+'glow'}><stop stopColor={color} stopOpacity=".46"/><stop offset="1" stopColor={color} stopOpacity="0"/></radialGradient></defs>
    {nodes.map((p,i)=>{
      const q=nodes[(i*7+11)%nodes.length], cx=(p.x+q.x)*.5+38*Math.sin(i),cy=(p.y+q.y)*.5+26*Math.cos(i);
      const d=`M${p.x} ${p.y}Q${cx} ${cy} ${q.x} ${q.y}`;
      const t=fract(f*(.0048+noise(i+891)*.005)/(1+stress*.67)+noise(i+377));
      const gate=1-stress*.91*smooth(Math.sin(f/(4+i%7)+i*2),.3,.94);
      const dotX=mix(mix(p.x,cx,t),mix(cx,q.x,t),t),dotY=mix(mix(p.y,cy,t),mix(cy,q.y,t),t);
      return <g key={i} opacity={gate}>
        <path d={d} stroke={edgeColors[i%edgeColors.length]} strokeWidth={.7+noise(i)*1.33} strokeOpacity=".65" fill="none"/>
        <path d={`M${p.x} ${p.y}q${Math.sin(i)*25} -23 ${Math.sin(i)*58} -47m${-Math.sin(i)*58} 47q${Math.cos(i)*22} 17 ${Math.cos(i)*36} 31`} stroke={color} strokeWidth=".7" strokeOpacity=".51" fill="none"/>
        <ellipse cx={dotX} cy={dotY} rx={16*detail} ry={14*detail} fill={`url(#${tag}glow)`} opacity=".84"/>
        <circle cx={dotX} cy={dotY} r={1.35+noise(i)*1.3} fill={color}/>
        <circle cx={p.x} cy={p.y} r={1.5+noise(i)*2} fill={color} opacity={.54+.4*Math.sin(f/17+i)**2}/>
      </g>;
    })}
  </g>;
}
export function BrainIllustration({f,x=360,y=542,scale=1,stress=0,signals=1,tag='brain'}:{
  f:number;x?:number;y?:number;scale?:number;stress?:number;signals?:number;tag?:string;
}) {
  const hue=interpolateColors(stress,[0,.55,1],['#c5919e','#8b72a3','#8e657d']);
  const detail=interpolateColors(stress,[0,1],['#fbd2b3','#d8a1b0']);
  return <g transform={`translate(${x} ${y+Math.sin(f/24)*4}) scale(${scale}) rotate(${-8+Math.sin(f/57)*1.8})`}>
    <defs>
      <clipPath id={tag+'clip'}><path d={silhouette}/></clipPath>
      <radialGradient id={tag+'halo'}><stop stopColor="#b78bdb" stopOpacity=".38"/><stop offset="1" stopColor="#b688da" stopOpacity="0"/></radialGradient>
      <linearGradient id={tag+'brain'} x2="90%" y2="85%"><stop stopColor={detail}/><stop offset=".30" stopColor={hue}/><stop offset=".70" stopColor="#5c516d"/><stop offset="1" stopColor="#33334f"/></linearGradient>
      <linearGradient id={tag+'stem'} x2="85%" y2="92%"><stop stopColor="#a3889e"/><stop offset="1" stopColor="#433c5a"/></linearGradient>
    </defs>
    <ellipse cy="-56" rx="313" ry="276" fill={`url(#${tag}halo)`}/>
    <path d="M90 48q34 35 26 68l-27 27-15 67-33-5-7-61-41-46-8-41z" fill={`url(#${tag}stem)`} stroke="#75627e" strokeWidth="3"/>
    <path d="M46 112q25 16 37 14l-12 56m-29-46 7 60" stroke="#cab1bd" strokeWidth="2.2" opacity=".66" fill="none"/>
    <path d="M113 32q70-17 111 14 24 16 9 52-17 44-66 54-42 11-83-9-17-10-9-42z" fill={`url(#${tag}stem)`} stroke="#a0829d" strokeWidth="3"/>
    {Array.from({length:8},(_,i)=><path key={i} d={`M${98+i*4} ${69+i*9}q56 ${-31+i*1.75} ${128-i*7} ${-17+i*3}`} fill="none" stroke={i%2?'#e5a4ad':'#392c53'} opacity=".61" strokeWidth="3"/>)}
    <path d={silhouette} fill={`url(#${tag}brain)`} stroke="#ccb1c7" strokeWidth="3.8"/>
    <g clipPath={`url(#${tag}clip)`}>
      <path d="M-278-127q114 36 231-77l70-56-330-10z" fill="#d9a0ac" opacity=".44"/>
      <path d="M45-229q66 78 170 85l100-18V-292H70z" fill="#747eaa" opacity=".51"/>
      <path d="M-20-99q150 13 233 125l94-1V128H-95z" fill="#8d75a4" opacity=".56"/>
      <path d="M-294 55q130-40 226 39l-30 33h-205z" fill="#554160" opacity=".46"/>
      <g fill="none" strokeLinecap="round">
        {gyri.map((d,i)=><g key={d}><path d={d} stroke="#423347" opacity=".54" strokeWidth={8+(i%3)*.9}/><path d={d} transform="translate(-2 -3)" stroke={detail} opacity=".61" strokeWidth={2+noise(i)*1.5}/></g>)}
      </g>
      <NeuronNetwork f={f} stress={stress} alpha={signals} tag={tag+'neurons'}/>
    </g>
    <path d="M-263-77q-7-42 29-67 20-59 80-67 60-48 126-34 66-28 115 6" fill="none" stroke={detail} strokeWidth="3.3" opacity=".76" strokeLinecap="round"/>
  </g>;
}
export function NeuralStage({f,stress=.2,children}:{f:number;stress?:number;children?:React.ReactNode}) {
  return <g>
    <defs><radialGradient id="nerve-room" cx=".47" cy=".44" r=".60"><stop stopColor={interpolateColors(stress,[0,1],['#344863','#392b49'])}/><stop offset=".63" stopColor="#202038"/><stop offset="1" stopColor="#0b1021"/></radialGradient></defs>
    <rect x="-100" y="-100" width="920" height="1480" fill="url(#nerve-room)"/>
    <g opacity=".20" stroke="#baa0bc" fill="none">{[138,210,288,369].map(r=><ellipse key={r} cx="360" cy="525" rx={r} ry={r*.93} strokeDasharray={r%2?'3 11':'1 7'}/>)}<path d="M56 525h608M360 189v710" strokeDasharray="6 13"/></g>
    <g transform={`translate(${360+Math.sin(f/58)*20} 560) scale(1.43)`}><NeuronNetwork f={f} deep stress={stress} alpha={.26} tag="background-net"/></g>
    {children}
  </g>;
}
