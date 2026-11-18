import type {ReactNode} from 'react';
import {BrainIllustration, NeuralStage} from '../components/BrainIllustration';
import {InfographicSystem,smooth} from '../components/Motion';

export function Iris({f,from,to,cx=360,cy=540,tag,children}:{
  f:number;from:number;to:number;cx?:number;cy?:number;tag:string;children:ReactNode;
}) {
  if(f<from)return null;
  const t=smooth(f,from,to), r=3+t*1530;
  return <g>
    <defs><clipPath id={tag+'iris'}><circle cx={cx} cy={cy} r={r}/></clipPath></defs>
    <g clipPath={`url(#${tag}iris)`}>{children}</g>
    {t<.96&&<circle cx={cx} cy={cy} r={r} stroke="#dfb8c6" strokeOpacity={Math.sin(Math.PI*t)*.61} strokeWidth={4} fill="none"/>}
  </g>;
}
export function BrainView({f,stress,signal=1,tag,scale=1,children}:{
  f:number;stress:number;signal?:number;tag:string;scale?:number;children?:ReactNode;
}) {
  return <NeuralStage f={f} stress={stress}>
    <BrainIllustration f={f} stress={stress} signals={signal} scale={scale} tag={tag}/>
    {children}
  </NeuralStage>;
}
export function Label({at,until,eyebrow,value,label,y=965,accent='#d6bce1',children}:{
 at:number;until:number;eyebrow:string;value:string;label?:string;y?:number;accent?:string;children?:ReactNode;
}) {
  return <InfographicSystem at={at} until={until} eyebrow={eyebrow} value={value} label={label} accent={accent} y={y}>{children}</InfographicSystem>;
}
