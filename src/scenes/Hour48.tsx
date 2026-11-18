import {useCurrentFrame} from 'remotion';
import {CharacterRig,pulse} from '../components/Character';
import {Corridor} from '../components/ParallaxBackground';
import {AnimatedCounter} from '../components/Infographic';
import {ParallaxCamera,Stage,mix,smooth} from '../components/Motion';
import {micro} from '../data/timeline';
import {BrainView,Label} from './shared';

export function Hour48() {
  const f=useCurrentFrame(), [start,end]=micro;
  const lapse=pulse(f,start-5,start+3,end+3);
  const calm=1-smooth(f,end+11,end+37), jump=Number(f>=end);
  const wave=Array.from({length:91},(_,i)=>{
    const t=i/90, x=604*t, a=(.38+.62*Math.sin(i*.17+f/22)**2);
    const gap=1-.91*pulse(t,.38,.50,.64);
    return `${i===0?'M':'L'}${x} ${182+gap*(Math.sin(i*1.6+f*.1)+.49*Math.sin(i*2.9-f*.06))*a*22}`;
  }).join(' ');
  const signalAge=smooth(f,252,325);
  return <Stage>
    <ParallaxCamera t={f/390} dx={Math.sin(f/19)*12} dy={34+24*jump} zoom={.14} pivotY={635}>
      <Corridor f={f+jump*36}/>
      <ellipse cx="359" cy="1090" rx="131" ry="25" fill="#111827" opacity=".65"/>
      <CharacterRig f={f+jump*36} x={338+jump*20} y={616} scale={1.22} fatigue={.53} warm={.31}
        walk={mix(.64,0,smooth(f,end+6,end+43))} look={jump*calm*-.59}
        fear={jump*calm*.65} close={.97*pulse(f,start-26,start+2,end+5)}
        fall={jump*calm*.12}/>
    </ParallaxCamera>
    <rect width="720" height="1280" fill="url(#vignette)" opacity={.78+lapse*.14}/>
    <path d={`M0 0H720V${lapse*655}Q360 ${lapse*561} 0 ${lapse*655}ZM0 1280H720V${1280-lapse*661}Q360 ${1280-lapse*568} 0 ${1280-lapse*661}Z`} fill="#0a101c"/>
    {f>=225&&<g opacity={smooth(f,225,251)}>
      <BrainView f={f} stress={.46} tag="micro-brain" signal={1-.72*pulse(f,283,296,309)} scale={.97}/>
      <Label at={250} until={386} eyebrow="МИКРОСОН" value="Несколько секунд" label="Сигнал показан схематично" y={916} accent="#baeee7">
        <path d="M0 182h604" stroke="#92d3d0" opacity=".24"/>
        <path d={wave} fill="none" stroke="#a2e2dc" strokeWidth="2.8" pathLength="1" strokeDasharray="1" strokeDashoffset={1-signalAge} strokeLinecap="round"/>
      </Label>
    </g>}
    <AnimatedCounter stage={1}/>
  </Stage>;
}
