import {writeFileSync, mkdirSync} from 'node:fs';
import {starts,hourReveal,counterAt,counterStep,counterLadders,labels,micro,concentrationSteps} from '../src/data/timeline.ts';

const rate = 48000, frames = 90*rate, tau = 2*Math.PI;
let seed=1203657;
function random() {
  seed=(Math.imul(seed,1664525)+1013904223)>>>0;
  return seed/2147483648-1;
}
function wav(name, data) {
  const buffer=Buffer.alloc(44+data.length*2);
  buffer.write('RIFF');buffer.writeUInt32LE(buffer.length-8,4);
  buffer.write('WAVEfmt ',8);buffer.writeUInt32LE(16,16);buffer.writeUInt16LE(1,20);buffer.writeUInt16LE(1,22);
  buffer.writeUInt32LE(rate,24);buffer.writeUInt32LE(rate*2,28);buffer.writeUInt16LE(2,32);buffer.writeUInt16LE(16,34);
  buffer.write('data',36);buffer.writeUInt32LE(data.length*2,40);
  data.forEach((v,i)=>buffer.writeInt16LE(Math.round(Math.max(-1,Math.min(1,v))*32767),44+i*2));
  writeFileSync(new URL(`../public/audio/${name}.wav`,import.meta.url),buffer);
}
const clip=x=>Math.max(0,Math.min(1,x));
const envelope=(t,a,b)=>clip((t-a)/1.9)*clip((b-t)/2.5);
const music=new Float32Array(frames), ambience=new Float32Array(frames), effects=new Float32Array(frames);
const chords=[[55,82.41,130.81,164.81],[49,73.42,116.54,146.83],[46.25,61.74,110,138.59],
 [43.65,61.74,103.83,116.54],[41.20,55,98,123.47],[36.71,53.17,87.31,104.9],
 [34.65,52.01,82.41,98],[46.25,69.3,116.54,155.56]];
const microIn=(starts[2]+micro[0])/30,microOut=(starts[2]+micro[1])/30;
const microGain=t=>1-.985*clip((t-microIn+.10)/.12)*clip((microOut+.09-t)/.1);
let air=0, room=0;
for(let i=0;i<frames;i++){
  const t=i/rate, raw=random();
  air=.85*air+.15*raw; room=.993*room+.007*raw;
  let bed=0, bass=0;
  for(let j=0;j<chords.length;j++){
    const a=starts[j]/30-1.15,b=starts[j+1]/30+1.18;
    if(t<a||t>b)continue;
    const chord=chords[j], env=envelope(t,a,b), darkness=j===7?.16:j/7;
    let voice=0;
    for(let k=0;k<chord.length;k++){
      const hz=chord[k], tremolo=.78+.22*Math.sin(t*(.65+darkness+k*.17)+k);
      voice+=tremolo*(Math.sin(tau*hz*t+.39*Math.sin(t*.31+k))+
        darkness*.27*Math.sin(tau*(hz*.995*t)+k))*(k===0?.040:.016);
    }
    bed+=voice*env;
    bass+=env*darkness*(.74+.26*Math.sin(tau*t*(.76+darkness*.22)+Math.sin(t*.62)*.5))*
      (.045*Math.sin(tau*(35.1-.64*j)*t)+.015*Math.sin(tau*(52.2-j)*t));
  }
  const rain=Math.max(envelope(t,-2,11),.57*envelope(t,57,68),.49*envelope(t,85,91));
  const hall=envelope(t,19,28), stress=envelope(t,32,80);
  const fade=clip(t/.25)*clip((90-t)/.65)*microGain(t);
  music[i]=(bed+bass)*fade;
  ambience[i]=(air*(.023+rain*.16)+room*(.18+stress*.75)+
    hall*.012*Math.sin(tau*46*t)+stress*.009*Math.sin(tau*(76.3*t+.035*Math.sin(t))))*fade;
}
const cues=[];
function effect(frame,name,length,fn){
  const start=Math.round(frame/30*rate);
  cues.push([frame,name]);
  for(let i=0;i<Math.min(length*rate,frames-start);i++)effects[start+i]+=fn(i/rate)*microGain((start+i)/rate);
}
function tone(frame,label,from,to,length=.17,gain=.12){
  effect(frame,label,length,t=>{
    const phase=tau*(from*t+(to-from)*t*t/(2*length)), e=clip(t/.006)*Math.exp(-t/(length*.33))*clip((length-t)/.014);
    return gain*e*(Math.sin(phase)+.23*Math.sin(phase*2.03)+.09*Math.sin(phase*3.61));
  });
}
function wash(frame,label,length,gain,grain=.1){
  let filtered=0;
  effect(frame,label,length,t=>{
    filtered=(1-grain)*filtered+grain*random();
    const e=Math.sin(Math.PI*t/length)**2;
    return gain*e*(filtered+.23*Math.sin(tau*(91*t-17*t*t)));
  });
}
function impact(frame,label,gain=.22,hz=56){
  effect(frame,label,1.08,t=>gain*clip(t/.006)*Math.exp(-t*4.9)*
    (Math.sin(tau*(hz*t-11*t*t))+.24*Math.sin(tau*(hz*1.87*t-18*t*t))+.16*random()*Math.exp(-t*20)));
}
function step(frame,label,gain=.095){
  effect(frame,label,.26,t=>gain*clip(t/.004)*Math.exp(-t*20)*
    (Math.sin(tau*(119*t-117*t*t))+.62*random()*Math.exp(-14*t)));
}
for(const f of [12,42,72,102,132,162])tone(f,'Тиканье часов',1250,820,.044,.057);
wash(167,'Нырок через зрачок',1.28,.34,.19);
for(let i=0;i<6;i++){
  const start=starts[i+1], ladder=counterLadders[i];
  impact(start,'Начало этапа · '+labels[i],.16+i*.014,63-i*4);
  wash(start+hourReveal,'Появление строки времени',.32,.19,.25);
  for(let n=0;n<=ladder.length;n++)tone(start+counterAt+n*counterStep,'Цифровой счётчик · '+(ladder[n]??labels[i]),570+i*26+n*103,640+i*38+n*113,.075,.077);
}
wash(starts[1]+178,'Переход в мозг',1.16,.25);
tone(starts[1]+211,'Появление шкалы внимания',875,943,.13,.073);
for(const [i,f] of concentrationSteps.entries())tone(starts[1]+f,'Снижение концентрации',1150-i*152,770-i*113,.21,.12);
for(const f of [195,232,273,304])tone(starts[1]+f,'Импульс по нейронной сети',1590,1170,.058,.042);
step(starts[1]+351,'Промах по клавише',.145);
for(const f of [61,86,111,136,184])step(starts[2]+f,'Шаг в коридоре');
cues.push([starts[2]+micro[0],'Микросон · провал громкости'],[starts[2]+micro[1],'Микросон · возврат изображения']);
impact(starts[2]+micro[1]+1,'Возврат звука после микросна',.24,46);
tone(starts[2]+253,'Появление схематичной волны',460,650,.20,.095);
tone(starts[2]+292,'Провал на схематичной волне',560,225,.33,.091);
wash(starts[3]+88,'Движение тени',1.77,.23,.17);
wash(starts[3]+130,'Отдалённый неразборчивый шорох',1.65,.23,.09);
impact(starts[3]+163,'Вздрагивание',.13,44);
wash(starts[3]+254,'Переход от глаза к нейронам',.90,.26,.22);
tone(starts[3]+290,'Появление подписи о восприятии',626,382,.22,.088);
step(starts[4]+89,'Вздрагивание у телефона',.12);
tone(starts[4]+112,'Уведомление на телефоне',1110,1530,.15,.092);
wash(starts[4]+134,'Буквы расплываются',1.38,.29,.28);
wash(starts[4]+223,'Погружение в схему памяти',1.12,.23,.09);
tone(starts[4]+234,'Появление подписи о памяти',620,530,.17,.083);
for(const [i,f] of [246,253,260,267,274,281,288,295,302].entries())tone(starts[4]+f,'Фрагменты воспоминаний',1120-52*i,670-38*i,.13,.094-i*.006);
for(const f of [56,83,110,139])step(starts[5]+f,'Шаг на мокрой улице',.103);
wash(starts[5]+101,'Сбой восприятия прохожего',.47,.23,.21);
wash(starts[5]+146,'Уличное эхо',1.28,.29,.13);
wash(starts[5]+220,'Переход к сетям восприятия',1.18,.28,.19);
tone(starts[5]+258,'Появление подписи об ориентации',510,339,.16,.089);
wash(starts[6]+108,'Погружение в темноту',1.05,.20);
for(const f of [142,171,211])impact(starts[6]+f,'Редкий низкий пульс',.13,40);
step(starts[6]+253,'Персонаж опускается на пол',.19);
wash(starts[6]+257,'Появление предупреждения о риске травм',.39,.18,.21);
wash(starts[7]+70,'Переход к спящему персонажу',1.72,.18,.16);
tone(starts[7]+113,'Появление финального титра',493,409,.27,.078);
impact(starts[7]+212,'Финальное затемнение',.23,39);
mkdirSync(new URL('../public/audio/',import.meta.url),{recursive:true});
wav('music',music);wav('ambience',ambience);wav('effects',effects);
function timecode(f) {
  const s=Math.floor(f/30);
  return [Math.floor(s/60),s%60,f%30].map(v=>String(v).padStart(2,'0')).join(':');
}
if(process.argv.includes('--table')){
  const sorted=cues.sort((a,b)=>a[0]-b[0]);
  writeFileSync(new URL('../docs/sfx-cues.md',import.meta.url),
    '# Звуковые эффекты\n\nТаймкод в формате минута, секунда, кадр (30 fps). Эмбиент, шумы и эффекты синтезируются на отдельных дорожках. Номер кадра отсчитывается от нуля.\n\n| Таймкод | Кадр | Событие |\n|---|---:|---|\n'+
    sorted.map(([f,name])=>`| ${timecode(f)} | ${f} | ${name} |`).join('\n')+'\n');
}
