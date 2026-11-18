import {useCurrentFrame} from 'remotion';
import {Reveal,smooth} from './Motion';
import {counterAt,counterStep,hourReveal,labels,counterLadders} from '../data/timeline';

export function AnimatedCounter({stage,until=91}:{stage:number;until?:number}) {
  const f=useCurrentFrame();
  const colors=['#ffd0a6','#bde7e7','#d5bbeb','#f5b2ba','#c4d4da','#e4d7e0'];
  const ladder=counterLadders[stage], i=Math.floor((f-counterAt)/counterStep);
  const label=i<0?'':i<ladder.length?ladder[i]+(stage<4?' Ч':' Д'):labels[stage];
  return <Reveal at={hourReveal} until={until}><g transform="translate(60 131)">
    <path d={`M0 0h${84*smooth(f,hourReveal,hourReveal+12)}`} stroke={colors[stage]} strokeWidth="3.4" strokeLinecap="round"/>
    <text y="38" fontSize="16" fontWeight="810" letterSpacing="4" fill={colors[stage]}>ВРЕМЯ БЕЗ СНА</text>
    <text y="104" fontSize="60" fontWeight="850" letterSpacing="-1.5" fill="#f6ecdf" style={{fontVariantNumeric:'tabular-nums'}}>{label}</text>
  </g></Reveal>;
}
