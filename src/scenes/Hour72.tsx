import {useCurrentFrame} from 'remotion';
import {CharacterRig,FacialExpressions,pulse} from '../components/Character';
import {NeuronNetwork} from '../components/BrainIllustration';
import {Bedroom} from '../components/ParallaxBackground';
import {AnimatedCounter} from '../components/Infographic';
import {ParallaxCamera,Stage,mix,smooth} from '../components/Motion';
import {BrainView,Iris,Label} from './shared';

export function Hour72() {
  const f=useCurrentFrame(), wrong=pulse(f,89,141,209), fear=pulse(f,127,166,264), push=smooth(f,200,253);
  const shadow=`M${555-wrong*40} 771q-41-72-42-143l${-24-wrong*77} -45 29-8 19 20q-7-42 12-73 27-60 ${31+wrong*35} -11l-4 75 34-18 10 18-45 69 31 91z`;
  return <Stage>
    <ParallaxCamera t={f/390} dx={-21} dy={3} zoom={.13}>
      <Bedroom f={f} warm={.24} window={false}/>
      <path d="M457 448l196-23v356l-195 12z" fill="#433c66" opacity=".79"/>
      <path d="M574 724v-145m-35 153 70-8" stroke="#353047" strokeWidth="6"/>
      <path d="M548 562q25-13 48 3l9 34-64 4z" fill="#826c96" stroke="#4c466c" strokeWidth="3"/>
      <path d={shadow} fill="#10182f" opacity={.58+wrong*.22}/>
      <path d={shadow} fill="#995a82" opacity={wrong*.32} transform={`translate(${14*wrong} 3)`}/>
      <path d={shadow} fill="#6492a2" opacity={wrong*.18} transform={`translate(${-12*wrong} -1)`}/>
      <path d="M212 714q25-26 98-23l50 32-3 180-113 15-26-26z" fill="#4a3c59" stroke="#66516d" strokeWidth="4"/>
      <path d="M234 895l-19 193m118-205 40 194m-135-115 107-13" stroke="#585065" strokeWidth="7" fill="none"/>
      <CharacterRig f={f} x={302} y={711} scale={1.39} fatigue={.65} fear={fear} look={fear*.9} warm={.31} seated/>
    </ParallaxCamera>
    <g opacity={push}>
      <rect width="720" height="1280" fill="#241d3c"/>
      <g transform={`translate(428 899) scale(${mix(2.8,4.7,push)})`}>
        <FacialExpressions f={f} fatigue={.66} fear={fear+.19} warm={.23} look={.53} tag="reflection"/>
      </g>
      <path d={`M544 584q15 ${-19*wrong} 24-17l6 11-14 14z`} fill="#e1c0d5" opacity={.2+.62*wrong} />
    </g>
    <Iris f={f} from={251} to={289} cx={565} cy={603} tag="perception">
      <BrainView f={f+101} stress={.66} tag="illusion-brain" scale={mix(1.4,.82,smooth(f,253,373))}>
        <g transform="translate(360 641) scale(1.25)" opacity={.40*pulse(f,277,331,389)}>
          <NeuronNetwork f={f} stress={.71} deep tag="illusion-detail"/>
        </g>
        <Label at={287} until={386} eyebrow="ВОСПРИЯТИЕ" value="Тени оживают" label="Так это может ощущаться" accent="#d6b9ef"/>
      </BrainView>
    </Iris>
    <rect width="720" height="1280" fill="url(#vignette)" opacity=".78"/>
    <AnimatedCounter stage={2}/>
  </Stage>;
}
