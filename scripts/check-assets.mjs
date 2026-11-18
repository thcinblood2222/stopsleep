import {stat} from 'node:fs/promises';
for(const item of ['audio/music.wav','audio/ambience.wav','audio/effects.wav','assets/brain.svg','assets/character.svg','assets/bedroom.svg']){
  const asset=new URL(`../public/${item}`,import.meta.url);
  try {if((await stat(asset)).size===0) throw new Error('empty');}
  catch { throw new Error(`Missing or empty asset: public/${item}`); }
}
