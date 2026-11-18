import {useCurrentFrame} from 'remotion';
import {CharacterRig,Hand,pulse} from '../components/Character';
import {Bedroom,Desk} from '../components/ParallaxBackground';
import {AnimatedCounter} from '../components/Infographic';
import {ParallaxCamera,Stage,mix,smooth} from '../components/Motion';
import {concentrationSteps} from '../data/timeline';
import {BrainView,Iris,Label} from './shared';

export function Hour24() {
  const f=useCurrentFrame(), rub=pulse(f,71,95,124), yawn=pulse(f,118,142,172);
  const stress=concentrationSteps.reduce((v,at)=>v+.125*smooth(f,at,at+12),.08);
  const miss=smooth(f,322,350);
  return <Stage>
    <ParallaxCamera t={f/390} dx={37} dy={-22} zoom={.13} pivotY={650}>
      <Bedroom f={f} warm={.83}/>
      <CharacterRig f={f} x={266} y={681} scale={1.30} seated fatigue={.28} look={.46-rub*.57} warm={.69} close={rub*.67} rub={rub} yawn={yawn}/>
      <Desk f={f}/>
    </ParallaxCamera>
    <Iris f={f} from={176} to={212} cx={305} cy={562} tag="focus">
      <BrainView f={f} stress={stress} tag="focus-brain" scale={1.06}>
        <Label at={213} until={319} eyebrow="ВНИМАНИЕ" value="Концентрация падает" label="Схематично" accent="#a9eadc">
          <path d="M0 163h386" stroke="#a3dcd7" strokeOpacity=".25" strokeWidth="6"/>
          <path d={`M0 163h${386*(1-stress)}`} stroke="#b0e2cf" strokeWidth="6"/>
        </Label>
      </BrainView>
    </Iris>
    {f>=323&&<g opacity={smooth(f,323,339)}>
      <Bedroom f={f} warm={.56}/>
      <g transform="translate(35 329) scale(1.13)">
        <path d="M-40 354l642-113 47 435-679 96z" fill="#2d364d" stroke="#ada0ae" strokeWidth="5"/>
        <path d="M55 409l522-86m-499 151 472-74m-451 146 412-65" stroke="#9d9dad" strokeWidth="2" opacity=".58"/>
        {[0,1,2].map((r)=><g key={r}>{Array.from({length:6},(_,i)=><path key={i} d={`M${47+i*81+r*18} ${426+r*74-i*11}l51-7 14 32-54 9z`} fill="#434b64" stroke="#8a8ca2" strokeWidth="2"/>)}</g>)}
        <path d="M336 518l51-7 14 32-54 9z" fill="#97b2b8" stroke="#bbdfd7" strokeWidth="3"/>
        <path d="M405 505l51-7 14 32-54 9z" fill="#825669" stroke="#edbcae" opacity={smooth(f,351,363)} strokeWidth="4"/>
        <g transform={`translate(${mix(540,440,miss)} ${mix(653,560,miss)}) rotate(168) scale(2.7)`}><Hand/></g>
      </g>
      <Label at={354} until={389} eyebrow="РЕАКЦИЯ" value="Промах" accent="#f5bbab" y={1002}/>
    </g>}
    <rect width="720" height="1280" fill="url(#vignette)" opacity=".68"/>
    <AnimatedCounter stage={0}/>
  </Stage>;
}
