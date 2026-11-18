import {useCurrentFrame} from 'remotion';
import {CharacterRig,pulse} from '../components/Character';
import {Bedroom,PhoneDetail} from '../components/ParallaxBackground';
import {AnimatedCounter} from '../components/Infographic';
import {Stage,ParallaxCamera,mix,noise,smooth} from '../components/Motion';
import {Iris,Label} from './shared';
import {BrainIllustration,NeuralStage} from '../components/BrainIllustration';

export function Hour96() {
  const f=useCurrentFrame(), phone=smooth(f,86,125)*(1-smooth(f,209,236)), jitter=pulse(f,71,91,129);
  const ghost=smooth(f,278,303)*(1-smooth(f,345,377));
  return <Stage>
    <ParallaxCamera t={f/390} dx={-14} dy={-20} zoom={.11}>
      <Bedroom f={f} warm={.10} severity={.8} window={false}/>
      <path d="M546 207l131 8 11 585-144-18z" fill="#4c2e46" stroke="#84526b" strokeWidth="3.6"/>
      <path d="M555 230l106 7 12 544-119-18z" stroke="#aa5c70" strokeWidth="2.5" opacity=".55" fill="none"/>
      <g opacity={ghost*.28} transform="translate(-127 3)"><CharacterRig f={f-27} x={354} y={629} scale={1.15} fatigue={.78} warm={.18} look={-.9} walk={.35} tag="memory-left"/></g>
      <g opacity={ghost*.24} transform="translate(143 9)"><CharacterRig f={f-74} x={343} y={644} scale={1.09} fatigue={.76} warm={.21} look={.9} walk={.51} tag="memory-right"/></g>
      <CharacterRig f={f} x={352+jitter*7} y={612-jitter*9} scale={1.2} fatigue={.78} fear={.28+jitter*.57} look={mix(.61,-.67,smooth(f,275,347))} warm={.19} phone={f<277}/>
    </ParallaxCamera>
    <g opacity={phone}>
      <rect width="720" height="1280" fill="#241e34"/>
      <PhoneDetail f={f} distortion={smooth(f,132,199)}/>
    </g>
    <Iris f={f} from={203} to={237} cx={337} cy={480} tag="memory">
      <g opacity={1-smooth(f,297,337)}>
        <NeuralStage f={f} stress={.85}>
          <BrainIllustration f={f} x={360} y={493} stress={.83} signals={.53} tag="memory-brain"/>
          {Array.from({length:9},(_,i)=>{
            const d=smooth(f,241+i*5,277+i*6), a=i*2.399, radius=185+noise(i+778)*104;
            const x=360+Math.cos(a)*(radius+d*60),y=522+Math.sin(a)*(radius+d*26);
            return <g key={i}>
              <path d={`M360 490Q${x} 493 ${x} ${y}`} stroke="#ebadbf" strokeWidth="1.5" opacity={(1-d)*.68} fill="none"/>
              <g transform={`translate(${x} ${y}) rotate(${Math.sin(i)*13+d*18})`} opacity={.67*(1-d*.86)}>
                <path d="M-26-31h51v56l-52 5z" fill="#4f4564" stroke="#cc9ab8" strokeWidth="1.7"/>
                <path d="M-19 12l12-16 10 8 10-12 7 12m-35-25h28" fill="none" stroke="#dab2c1" strokeWidth="2"/>
              </g>
            </g>;
          })}
        </NeuralStage>
      </g>
    </Iris>
    <rect width="720" height="1280" fill="url(#vignette)" opacity=".74"/>
    <AnimatedCounter stage={3}/>
    <Label at={234} until={342} eyebrow="ПАМЯТЬ И ВНИМАНИЕ" value="Теряется нить" label="Схематично" accent="#f0b5c0" y={993}/>
  </Stage>;
}
