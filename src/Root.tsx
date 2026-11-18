import {AbsoluteFill,Composition,Sequence} from 'remotion';
import '@fontsource-variable/manrope';
import {Intro} from './scenes/Intro';
import {Hour24} from './scenes/Hour24';
import {Hour48} from './scenes/Hour48';
import {Hour72} from './scenes/Hour72';
import {Hour96} from './scenes/Hour96';
import {Day5And6} from './scenes/Day5And6';
import {Day7} from './scenes/Day7';
import {Finale} from './scenes/Finale';
import {SoundDesign} from './audio/SoundDesign';
import {starts,titles} from './data/timeline';

const scenes=[Intro,Hour24,Hour48,Hour72,Hour96,Day5And6,Day7,Finale];
function Film({music=true,sfx=true}:{music?:boolean;sfx?:boolean}) {
  return <AbsoluteFill style={{background:'#0a101d'}}>
    {scenes.map((Scene,i)=><Sequence key={titles[i]} name={titles[i]} from={starts[i]} durationInFrames={starts[i+1]-starts[i]} premountFor={8}><Scene/></Sequence>)}
    <SoundDesign music={music} sfx={sfx}/>
  </AbsoluteFill>;
}
const defaults={music:true,sfx:true};
export function Root() {
  return <>
    <Composition id="StopSleep" component={Film} width={1080} height={1920} fps={30} durationInFrames={2700} defaultProps={defaults}/>
    <Composition id="StopSleepPreview" component={Film} width={720} height={1280} fps={30} durationInFrames={2700} defaultProps={defaults}/>
  </>;
}
