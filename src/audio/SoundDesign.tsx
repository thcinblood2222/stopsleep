import {Audio} from '@remotion/media';
import {Sequence,staticFile} from 'remotion';
export function SoundDesign({music,sfx}:{music:boolean;sfx:boolean}) {
  return <>
    {music&&<Sequence name="Музыка"><Audio src={staticFile('audio/music.wav')}/></Sequence>}
    {sfx&&<Sequence name="Дождь, шаги и звуки пространства"><Audio src={staticFile('audio/ambience.wav')}/></Sequence>}
    {sfx&&<Sequence name="Синхронные акценты"><Audio src={staticFile('audio/effects.wav')}/></Sequence>}
  </>;
}
