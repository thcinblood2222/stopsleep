import {useCurrentFrame} from 'remotion';
import {CharacterRig,pulse} from '../components/Character';
import {Bed,Bedroom} from '../components/ParallaxBackground';
import {ParallaxCamera,Reveal,Stage,mix,smooth} from '../components/Motion';
import {BrainView,Iris} from './shared';

export function Intro() {
  const f=useCurrentFrame(), push=smooth(f,86,133), close=pulse(f,104,118,139);
  return <Stage>
    <ParallaxCamera t={f/210} dx={-18} dy={-26} zoom={.16}>
      <Bedroom f={f} warm={.94}/>
      <Bed f={f} blanket={false}/>
      <CharacterRig f={f} x={297} y={750} scale={1.06} warm={.91} fatigue={.14} look={-.4} close={close} lying/>
      <Bed f={f} x={330} y={625} onlyBlanket/>
      <g transform="translate(65 672) rotate(-3)">
        <path d="M-19-15h111l13 45H-29z" fill="#272538" stroke="#93757c" strokeWidth="2.4"/>
        <text x="-11" y="20" fill="#ffd4a3" fontSize="31" fontWeight="800" letterSpacing="1.2">03:47</text>
      </g>
    </ParallaxCamera>
    <g opacity={push}>
      <Bedroom f={f} warm={.66} window={false}/>
      <CharacterRig f={f} x={mix(380,413,push)} y={mix(793,836,push)}
        scale={mix(2,4.35,smooth(f,104,170))} fatigue={.19} fear={smooth(f,138,158)*.32}
        warm={.79} look={-.29} close={close} tag="intro-close"/>
    </g>
    <rect width="720" height="1280" fill="url(#vignette)"/>
    <Reveal at={27} until={132}><g transform="translate(54 956)">
      <path d="M0-49h75" stroke="#f9c99c" strokeWidth="4"/>
      <text y="22" fill="#fff0df" fontSize="59" letterSpacing="-2.2" fontWeight="860">ЧТО, ЕСЛИ НЕ СПАТЬ</text>
      <text y="103" fill="#fff0df" fontSize="81" letterSpacing="-2.6" fontWeight="860">7 ДНЕЙ?</text>
    </g></Reveal>
    <Iris f={f} from={168} to={202} cx={259} cy={584} tag="intro">
      <BrainView f={f+53} stress={.05} tag="intro-brain" scale={mix(.5,1.06,smooth(f,168,207))}/>
    </Iris>
  </Stage>;
}
