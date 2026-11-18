import {RenderInternals} from '@remotion/renderer';
import {resolve} from 'node:path';

const mode=process.argv[2]??'final';
if(!['preview','final'].includes(mode)) throw new Error('Expected preview or final');
const [width,height]=mode==='preview'?[720,1280]:[1080,1920];
const probe=await RenderInternals.callFf({bin:'ffprobe',args:['-v','error','-show_entries',
  'stream=codec_name,width,height,r_frame_rate,nb_frames:format=duration','-of','json',resolve(`out/${mode}.mp4`)],
  indent:false,logLevel:'error',binariesDirectory:null,cancelSignal:undefined});
const result=JSON.parse(probe.stdout);
console.log(JSON.stringify(result,null,2));
const video=result.streams.find(s=>s.codec_name==='h264');
const audio=result.streams.find(s=>s.codec_name==='aac');
if(!video||!audio||video.width!==width||video.height!==height||video.r_frame_rate!=='30/1'||
   Number(video.nb_frames)!==2700||Math.abs(Number(result.format.duration)-90)>.1){
  throw new Error('Rendered film does not match its delivery specification');
}
