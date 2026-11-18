import {useCurrentFrame} from 'remotion';
import {CharacterRig,FacialExpressions,pulse} from '../components/Character';
import {Bedroom} from '../components/ParallaxBackground';
import {AnimatedCounter} from '../components/Infographic';
import {Stage,mix,smooth} from '../components/Motion';
import {BrainView,Iris,Label} from './shared';

export function Day7() {
  const f=useCurrentFrame(), blackout=smooth(f,30,120), fall=smooth(f,191,269);
  const neural=1-smooth(f,164,200), wake=pulse(f,140,146,151), z=smooth(f,182,208);
  return <Stage background="#0b101c">
    <g opacity={1-z}>
      <g opacity={1-blackout*.94}><Bedroom f={f} warm={.06} window={false}/></g>
      <g transform={`translate(364 ${mix(823,865,blackout)}) scale(${mix(3.09,3.85,blackout)})`}>
        <FacialExpressions f={f} fatigue={.94} warm={.05} close={.86*pulse(f,50,71,96)} look={-.18+Math.sin(f/24)*.21} tag="day7-face"/>
      </g>
      <Iris f={f} from={105} to={136} cx={259} cy={661} tag="day7">
        <g opacity={neural}>
          <BrainView f={f} stress={.96} signal={.75-wake*.56} tag="day7-brain"/>
          <rect width="720" height="1280" fill="#101421" opacity={wake*.52}/>
        </g>
      </Iris>
    </g>
    <g opacity={z}>
      <defs><radialGradient id="day7-spot"><stop stopColor="#455464" stopOpacity=".67"/><stop offset="1" stopColor="#242b3f" stopOpacity="0"/></radialGradient></defs>
      <ellipse cx="372" cy="701" rx="309" ry="481" fill="url(#day7-spot)"/>
      <path d="M-30 1054q401-58 802 17" fill="none" stroke="#6b6375" opacity=".43" strokeWidth="2.2"/>
      <ellipse cx={mix(343,420,fall)} cy="1109" rx={mix(95,173,fall)} ry="24" fill="#080d18"/>
      <CharacterRig f={f} x={mix(353,413,fall)} y={624} scale={1.15} fatigue={.97} fear={pulse(f,204,215,246)*.51}
        warm={.17} close={fall*.78} look={-.22} fall={fall} tag="day7-drop"/>
    </g>
    <rect width="720" height="1280" fill="url(#vignette)" opacity=".74"/>
    <AnimatedCounter stage={5}/>
    <Label at={257} until={326} eyebrow="РИСК ТРАВМ И АВАРИЙ" value="Опасное состояние" label="Сроки и симптомы индивидуальны" accent="#d6b1b9" y={201}/>
  </Stage>;
}
