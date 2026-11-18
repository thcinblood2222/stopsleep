import {useCurrentFrame} from 'remotion';
import {CharacterRig} from '../components/Character';
import {Bed,Bedroom} from '../components/ParallaxBackground';
import {BrainIllustration,NeuralStage} from '../components/BrainIllustration';
import {ParallaxCamera,Reveal,Stage,mix,smooth} from '../components/Motion';

export function Finale() {
  const f=useCurrentFrame(), resolve=smooth(f,66,142), end=smooth(f,219,239);
  return <Stage background="#0b101d">
    <g opacity={1-resolve}>
      <NeuralStage f={f} stress={.8}>
        <BrainIllustration f={f} x={360-resolve*144} y={560+resolve*163} scale={mix(.96,.31,resolve)}
          stress={.83-resolve*.63} signals={.75-resolve*.37} tag="final-brain"/>
      </NeuralStage>
    </g>
    <g opacity={resolve}>
      <ParallaxCamera t={resolve} dx={-4} dy={9} zoom={-.09}>
        <Bedroom f={f} warm={.55}/>
        <Bed f={f} blanket={false}/>
        <CharacterRig f={f} x={297} y={750} scale={1.06} warm={.58} fatigue={.38} close={1} lying tag="final-sleep"/>
        <Bed f={f} onlyBlanket/>
      </ParallaxCamera>
    </g>
    <rect width="720" height="1280" fill="url(#vignette)" opacity=".95"/>
    <Reveal at={112} until={232}><g transform="translate(56 978)">
      <path d="M0-39h69" stroke="#eebea6" strokeWidth="4"/>
      <text fill="#f5e8de" fontSize="55" fontWeight="860" letterSpacing="-1.7">СОН НЕОБХОДИМ</text>
      <text y="65" fill="#f5e8de" fontSize="63" fontWeight="860" letterSpacing="-1.8">ДЛЯ ЖИЗНИ</text>
    </g></Reveal>
    <rect width="720" height="1280" fill="#090b15" opacity={end}/>
  </Stage>;
}
