import {interpolateColors} from 'remotion';
import {fract,noise,smooth} from './Motion';

function Rain({f,clip,subtle=false}:{f:number;clip?:string;subtle?:boolean}) {
  return <g clipPath={clip} opacity={subtle?.46:.85}>{Array.from({length:74},(_,i)=>{
    const d=noise(i+229), y=fract(noise(i+95)+f*(.005+d*.014))*1400-65;
    const x=fract(noise(i+821)-f*(.0006+d*.0007))*790-35;
    return <path key={i} d={`M${x} ${y}l${-1-d*8} ${6+d*26}`} stroke="#b0c8d4" strokeWidth={.6+d*1.3} strokeLinecap="round" opacity={.12+d*.46}/>;
  })}</g>;
}
export function Dust({f,x=0,y=0,width=720,height=1280,opacity=.45}:{f:number;x?:number;y?:number;width?:number;height?:number;opacity?:number}) {
  return <g opacity={opacity}>{Array.from({length:28},(_,i)=>{
    const v=noise(i+314);
    return <circle key={i} cx={x+fract(noise(i+445)+f*(.0002+v*.0006))*width}
      cy={y+fract(noise(i+698)+Math.sin(f/148+i)*.07)*height} r={.6+v*1.8} fill={i%3?'#e8d8b2':'#adceda'} opacity={.19+v*.62}/>;
  })}</g>;
}
export function Bedroom({f,warm=.8,severity=.1,window=true}:{f:number;warm?:number;severity?:number;window?:boolean}) {
  const bg=interpolateColors(warm,[0,1],['#222b51','#4d3549']);
  const low=interpolateColors(warm,[0,1],['#131b35','#362639']);
  return <g>
    <defs>
      <linearGradient id="room-wall" x2="0%" y2="100%"><stop stopColor={bg}/><stop offset=".72" stopColor={low}/><stop offset="1" stopColor="#151725"/></linearGradient>
      <linearGradient id="room-window" x2="9%" y2="100%"><stop stopColor="#101935"/><stop offset="1" stopColor="#354d74"/></linearGradient>
      <linearGradient id="room-board" x2="90%" y2="97%"><stop stopColor="#786271"/><stop offset=".45" stopColor="#403646"/><stop offset="1" stopColor="#272b40"/></linearGradient>
      <radialGradient id="room-lamp"><stop stopColor={warm>.4?'#ffbd86':'#a078b9'} stopOpacity=".41"/><stop offset="1" stopColor="#f5a56f" stopOpacity="0"/></radialGradient>
      <clipPath id="room-glass"><path d="M413 165h213v422H413z"/></clipPath>
    </defs>
    <path d="M-130-110H858v1480H-130z" fill="url(#room-wall)"/>
    <path d="M-78 84l377 64 384-68M298 145v666m-350-14 350 16 483-82" fill="none" stroke="#9e83a0" strokeOpacity=".31" strokeWidth="2"/>
    <path d="M-120 822l431-42 468 25v520h-900z" fill="#272738"/>
    <path d="M-96 951l424-168m-231 545 269-540m32 531 15-533m276 550L469 789m-549 236q462-102 876-47m-885 160q455-98 895-29M-85 1273q459-79 894-26" fill="none" stroke="#5d4b60" opacity=".67" strokeWidth="2"/>
    <g opacity={window?1:0} transform={`translate(${-f*.026} ${Math.sin(f/77)*2})`}>
      <path d="M384 139l262-20 9 486-269-4z" fill="#242535" stroke="#987987" strokeWidth="6"/>
      <path d="M413 165h213v422H413z" fill="url(#room-window)"/>
      <g clipPath="url(#room-glass)">
        <path d="M390 533l29-33 21 15v-74h48v85l29-20v-43h46v41h22v-83h52v190H390z" fill="#1c2a46"/>
        {Array.from({length:15},(_,i)=><path key={i} d={`M${423+i*14} ${510+noise(i)*46}h5v9h-5z`} fill={i%3?'#e6b08d':'#789fbc'} opacity={.26+.35*noise(i+56)}/>)}
        <Rain f={f} clip="url(#room-glass)"/>
        <path d="M444 165h31l-62 301v-80zm76 0h19l-126 413v-73zm74 0h11L481 587h-17z" fill="#bac4d7" opacity=".10"/>
      </g>
      <path d="M506 158v429m-97-228h222M396 590l254-6 9 21-276 7z" fill="none" stroke="#62536b" strokeWidth="8"/>
      <path d={`M628 124q-22 208 ${-16+Math.sin(f/29)*5} 469l56 10V119zm-238 9q-23 195-35 477l45 0q-5-231 9-479z`} fill="#33304b" stroke="#71637e" strokeWidth="2.5"/>
    </g>
    <path d="M47 263l146 12v185l-146-4z" fill="#272536" stroke="#98778b" strokeWidth="5"/>
    <path d="M65 287l110 9v145l-110-3z" fill="#4e435b"/><path d="M70 426l33-42 15 17 34-58 19 23 0 70z" fill="#1d263d"/><circle cx="104" cy="331" r="16" fill="#aa8490" opacity=".68"/>
    <path d="M-8 727l226-23 34 15-9 139-248 11z" fill="url(#room-board)" stroke="#282638" strokeWidth="3"/>
    <path d="M-2 745l232-23m-217 69l218-12m-224 53l226-10" stroke="#ad8795" opacity=".44" strokeWidth="2"/>
    <path d="M55 734v-98q0-28 30-35l29-3m-74 131q18-13 39 0" stroke="#bd9d9f" fill="none" strokeWidth="4" strokeLinecap="round"/>
    <path d="M101 584q34-20 59 3l11 35-91 0z" fill="#b98383" stroke="#584557" strokeWidth="2.5"/>
    <path d="M85 621l76 1" stroke="#f4cb9f" strokeWidth="3.4"/>
    <ellipse cx="124" cy="634" rx={252+severity*35} ry="231" fill="url(#room-lamp)" opacity={.66+.045*Math.sin(f/18)}/>
    <path d="M183 668h36l-4 46h-28z" fill="#a2bed0" fillOpacity=".16" stroke="#a5bacb" strokeOpacity=".77" strokeWidth="2"/><path d="M186 688h29l-2 22h-24z" fill="#83afba" opacity=".49"/><path d="M187 674l5 31" stroke="#e4dfd5" opacity=".57"/>
    <path d="M132 712l34-4 9 9-38 4z" fill="#172439" stroke="#897488" strokeWidth="1.5"/>
    <Dust f={f} x={50} y={430} width={459} height={480}/>
  </g>;
}
export function Bed({f,x=330,y=625,blanket=true,onlyBlanket=false}:{f:number;x?:number;y?:number;blanket?:boolean;onlyBlanket?:boolean}) {
  const lift=Math.sin(f/16)*3;
  return <g transform={`translate(${x} ${y})`}>
    <defs><linearGradient id="bed-blanket" x2="90%" y2="85%"><stop stopColor="#90839a"/><stop offset=".48" stopColor="#635879"/><stop offset="1" stopColor="#373650"/></linearGradient></defs>
    {!onlyBlanket&&<><path d="M-348 78q112-67 253-26l438 130v163q-161 52-461-24l-228-87z" fill="#332c43" stroke="#171d31" strokeWidth="5"/>
    <path d="M-353 81q99-58 231-31 197 25 471 128l-11 60q-190 42-490-36l-198-76z" fill="#7f748d" stroke="#433b59" strokeWidth="4"/>
    <path d="M-321 65q35-76 114-56 72 13 117 96l-20 36q-137-5-213-51z" fill="#998390" stroke="#5c4f68" strokeWidth="3.2"/>
    <path d="M-312 83q76-29 176 26m-153-73q59 4 98 40m-95 18q72 22 144 26" fill="none" stroke="#dfb9a7" opacity=".38" strokeWidth="2.3"/></>}
    {blanket&&<path d={`M-80 ${87+lift}q132-12 244 45l185 48v167q-119 25-245-9l-205-90-10-119z`} fill="url(#bed-blanket)" stroke="#4c415f" strokeWidth="3.8"/>}
    {blanket&&<path d="M-83 114q134 2 249 61l183 49m-412-88q126 2 184 36m-144-1q33 37 140 80m-29-16 138 47m-116-10q125 47 224 39" fill="none" stroke="#d1b2bf" strokeWidth="2.6" opacity=".38"/>}
  </g>;
}
export function Desk({f,screen=1}:{f:number;screen?:number}) {
  return <g>
    <defs>
      <linearGradient id="desk-wood" x2="67%" y2="100%"><stop stopColor="#8f6872"/><stop offset="1" stopColor="#45394d"/></linearGradient>
      <linearGradient id="monitor" x2="94%" y2="94%"><stop stopColor="#90c3c3"/><stop offset=".8" stopColor="#375d82"/><stop offset="1" stopColor="#222f53"/></linearGradient>
      <radialGradient id="monitor-halo"><stop stopColor="#85c7e3" stopOpacity=".31"/><stop offset="1" stopColor="#85c7e3" stopOpacity="0"/></radialGradient>
    </defs>
    <ellipse cx="556" cy="693" rx="313" ry="327" fill="url(#monitor-halo)" opacity={screen*(.91+.06*Math.sin(f/11))}/>
    <path d="M-40 944l467-114 338 73v110l-805 44z" fill="url(#desk-wood)" stroke="#42354b" strokeWidth="3.5"/>
    <path d="M-16 956l430-107 330 72m-763 74 703-58m-708 90q321-31 701-55" stroke="#c29b9b" opacity=".34" strokeWidth="2.2" fill="none"/>
    <path d="M458 855l9-70 39-9 16 76-12 15-115 4-27-14z" fill="#232840" stroke="#637087" strokeWidth="3"/>
    <path d="M392 541l281-24 11 274-282 18z" fill="#1d243b" stroke="#6f7891" strokeWidth="5"/>
    <path d="M412 553l242-20 12 237-244 18z" fill="url(#monitor)" opacity={screen}/>
    <path d="M438 593l92-5m-87 17 125-9m-120 55 160-12m-161 23 100-8m-98 22 152-13" stroke="#cae7eb" opacity=".52" strokeWidth="4"/>
    <path d="M517 712l107-8 2 32-106 8z" fill="#b7d5d4" opacity=".6"/>
    <path d="M389 901l163-15 71 24-170 19z" fill="#252b41" stroke="#8b8195" strokeWidth="2"/>
    <path d="M435 903l129-10m-111 19 128-10m-101 18 122-10" stroke="#b2a9ba" strokeWidth="2.4" strokeDasharray="4 5"/>
    <path d="M287 921q14-20 34-10l6 9q-17 14-40 8z" fill="#3c3e54" stroke="#9a8ea0" strokeWidth="2"/>
  </g>;
}
export function Corridor({f,stress=.3,street=false}:{f:number;stress?:number;street?:boolean}) {
  const push=fract(f/(street?173:124)), y=street?514:493;
  return <g>
    <defs>
      <linearGradient id="passage" x2="4%" y2="100%"><stop stopColor={street?'#151e2a':'#20293c'}/><stop offset=".51" stopColor={street?'#344254':'#566782'}/><stop offset="1" stopColor="#141929"/></linearGradient>
      <radialGradient id="passage-light"><stop stopColor="#c7d2de" stopOpacity=".31"/><stop offset="1" stopColor="#b7cde8" stopOpacity="0"/></radialGradient>
      <linearGradient id="street-reflect" x2="0%" y2="100%"><stop stopColor="#9fb7ca" stopOpacity=".32"/><stop offset="1" stopColor="#759bb6" stopOpacity="0"/></linearGradient>
    </defs>
    <rect x="-150" y="-150" width="1020" height="1580" fill="url(#passage)"/>
    <ellipse cx="360" cy={y} rx="265" ry="361" fill="url(#passage-light)"/>
    {[-1,1].map(side=><g key={side} transform={`translate(360 0) scale(${side} 1)`}>
      <path d={street?`M0 ${y}l35-36v-33l49-30v-45l76-44v-51l87-49v-39l82-54v-42l111-75v1370L0 620z`:`M0 ${y}L436 -160v1465L0 620z`} fill={street?'#252b3a':'#303b50'} stroke="#8391a5" strokeOpacity=".42" strokeWidth="3"/>
      <path d={`M0 ${y+63}l453 368v46L0 ${y+80}z`} fill="#606a7d" opacity=".73"/>
      {Array.from({length:6},(_,i)=>{
        const u=Math.pow(fract((i+push)/6),1.8);
        const x=20+u*457, top=y-(street?403:612)*u, bottom=y+111+438*u;
        const w=23+u*136, h=55+u*130, fill=noise(i+side*24)>.48?'#a79497':'#91aabb';
        return <g key={i} opacity={smooth(u,.002,.10)*(1-smooth(u,.8,.99))}>
          <path d={`M${x} ${top} V${bottom}m3-3 ${w*.4} ${w*.23}`} stroke="#1a2033" strokeWidth={2+u*9} fill="none"/>
          {Array.from({length:street?4:2},(_,k)=>{
            const a=x+u*12, b=top+(k+1)*h*.7;
            const shine=.24+.56*smooth(Math.sin(f/(14+i)+i+k*3+side),-.5,.62);
            return <g key={k}>
              <path d={`M${a} ${b}l${w} ${-w*.51}v${h*.49}l-${w} ${w*.19}z`} fill="#203047" stroke="#687386" strokeWidth="2"/>
              <path d={`M${a+3} ${b+3}l${w-5} ${-w*.49}v${h*.34}l-${w-5} ${w*.25}z`} fill={fill} opacity={shine}/>
              <path d={`M${a+w*.53} ${b-w*.24}v${h*.40}`} stroke="#303b52" strokeWidth={2+u*3}/>
            </g>;
          })}
          <path d={`M${x+5} ${bottom-8}l${w} ${w*.76} -${w*.2} ${h*.36} -${w} ${-h*.79}z`} fill="url(#street-reflect)" opacity={.45+stress*.25}/>
        </g>;
      })}
    </g>)}
    <path d={`M360 ${y+101}L-174 1303h1069z`} fill={street?'#202839':'#30394c'} opacity=".88"/>
    <path d={`M59 1310l301-${1310-y-101} 299 ${1310-y-101}M-70 1215l430-${1215-y-101} 440 ${1215-y-101}`} stroke="#8797aa" opacity=".39" strokeWidth="2.4" fill="none"/>
    {Array.from({length:9},(_,i)=>{
      const t=fract((i+push)/9), d=t*t, z=y+183+d*698;
      return <path key={i} d={`M${360-d*363} ${z}q${d*359} ${-16*d} ${d*724} 0`} stroke="#9397aa" opacity={(1-t)*.28} strokeWidth={.5+d*2} fill="none"/>;
    })}
    {!street&&Array.from({length:5},(_,i)=>{
      const t=fract((i+push)/5), d=t*t;
      return <g key={i} opacity={(1-t)*.84}><ellipse cx="360" cy={y-d*475} rx={29+d*188} ry={25+d*112} fill="url(#passage-light)"/><path d={`M${357-d*100} ${y-d*475}h${6+d*206}`} stroke="#cae5e5" strokeWidth={1+d*5} opacity=".83"/></g>;
    })}
    {street&&<g>
      <path d="M91 899V366q0-67 69-67h26m-93 593-10 9h32m74-602q22-7 34 8l-5 7h-35z" fill="none" stroke="#101c2c" strokeWidth="7"/>
      <path d="M93 871V372q0-64 65-68m30 7h31" stroke="#a4acb6" strokeWidth="2" opacity=".67" fill="none"/>
      <ellipse cx="201" cy="310" rx="106" ry="82" fill="url(#passage-light)"/>
      <path d="M25 1028q142-65 218-17l-34 38-123 32-67-2zM422 951q156-61 300-30l30 56-137 15z" fill="url(#street-reflect)" opacity=".68"/>
      <Rain f={f} subtle/>
    </g>}
  </g>;
}
export function PhoneDetail({f,distortion}:{f:number;distortion:number}) {
  const drift=Math.sin(f/19)*4;
  return <g transform={`translate(${356+drift} 587) rotate(${-13+3*Math.sin(f/28)})`}>
    <path d="M159 379q-51-29-83-57L7 290q-105-17-156-104-26-58-16-125 9-26 29-12l37 72 194 27 52-94q16-16 28-1l4 48 28 98 76 86z" fill="#957486" stroke="#503851" strokeWidth="5"/>
    <rect x="-144" y="-268" width="285" height="531" rx="49" fill="#1b2336" stroke="#a798a8" strokeWidth="4"/>
    <rect x="-129" y="-249" width="256" height="491" rx="35" fill="#3a4966"/>
    <path d="M-122-182q105-94 233 34l12 363q-205 41-247-37z" fill="#556d82" opacity=".73"/>
    <path d="M-28-226h58" stroke="#20263b" strokeWidth="8" strokeLinecap="round"/>
    <rect x="-107" y="-96" width="213" height="134" rx="16" fill="#9a9fae" opacity=".92"/>
    <g fill="#222e45" fontWeight="790" fontSize="21">
      <text x={-89+Math.sin(f/7)*distortion*6} y="-53">Напоминание</text>
      <text x={-89+Math.sin(f/5)*distortion*9} y="-14" opacity={1-distortion*.72}>Купить молоко</text>
      {distortion>.08&&<text x={-89+distortion*16} y="-13" opacity={distortion*.65} fill="#733e62">Купить молоко</text>}
    </g>
    <path d="M-37 222h76" stroke="#e5d2d9" strokeWidth="4" strokeLinecap="round" opacity=".63"/>
    <path d="M-166 58q20-24 30-8l38 118 74 53q17 15 6 32-40 46-101-6-35-47-47-189z" fill="#a78792" stroke="#61495f" strokeWidth="3"/>
    <path d="M-146 73l12 39m31 74q33 32 62 44" fill="none" stroke="#c9a6a9" strokeWidth="2.5" opacity=".65"/>
  </g>;
}
