import {useCurrentFrame} from 'remotion';
import {CharacterRig,pulse} from '../components/Character';
import {Corridor} from '../components/ParallaxBackground';
import {AnimatedCounter} from '../components/Infographic';
import {ParallaxCamera,Stage,mix,smooth} from '../components/Motion';
import {BrainView,Iris,Label} from './shared';

function Passer({f,x,y,side}:{f:number;x:number;y:number;side:number}) {
  return <g transform={`translate(${x} ${y}) scale(${side} 1)`}>
    <path d="M-17-105q-14-20-6-38 6-14 19-13 20 1 23 20l-7 30 13 26 11 87-58 3-7-74 7-8z" fill="#29323f" stroke="#667083" strokeWidth="2"/>
    <path d="M-22-2l-6 80 15 4L0 19l7 59 15-3 3-75" stroke="#1c2534" fill="#2a3648" strokeWidth="4" transform={`rotate(${Math.sin(f/10)*7})`}/>
    <path d="M16-95l5 39-14 32m-24-98q-3-16 10-20" stroke="#9198a3" strokeOpacity=".44" strokeWidth="2" fill="none"/>
  </g>;
}
export function Day5And6() {
  const f=useCurrentFrame(), tilt=smooth(f,97,209), stop=smooth(f,118,168);
  const missing=1-.92*pulse(f,102,112,136), ghost=pulse(f,133,149,173);
  return <Stage>
    <g transform={`translate(360 620) rotate(${tilt*6.5}) scale(${1+tilt*.135}) translate(-360 -620)`}>
      <ParallaxCamera t={f/360} dx={27} dy={17} zoom={.06} pivotY={513}>
        <Corridor f={f} street stress={.81}/>
        <g opacity={missing*.88}><Passer f={f} x={mix(480,589,smooth(f,0,163))} y={mix(735,851,smooth(f,0,171))} side={-1}/></g>
        <g opacity={.75}><Passer f={f+23} x={mix(169,120,smooth(f,53,210))} y={815} side={1}/></g>
        <path d={`M238 1061l180 32 ${-185-ghost*160} 38-79-29z`} fill="#121b2d" opacity=".57"/>
        <ellipse cx="353" cy="1120" rx="139" ry="31" fill="#15202d" opacity=".72"/>
        <CharacterRig f={f} x={338+tilt*38} y={657} scale={1.24} fatigue={.89} warm={.09} walk={(1-stop)*.47}
          look={Math.sin(f/28)*.67} fear={.29+ghost*.45} fall={ghost*.1}/>
      </ParallaxCamera>
    </g>
    <rect width="720" height="1280" fill="url(#vignette)" opacity=".77"/>
    <Iris f={f} from={215} to={252} cx={390} cy={558} tag="street-mind">
      <BrainView f={f+91} stress={.9} signal={.68} tag="street-brain" scale={1.08}>
        <Label at={258} until={355} eyebrow="СУБЪЕКТИВНОЕ ВОСПРИЯТИЕ" value="Потеря ориентации" label="Симптомы различаются" y={956} accent="#c6d5df"/>
      </BrainView>
    </Iris>
    <AnimatedCounter stage={4}/>
  </Stage>;
}
