
export function Avatar({name,src,size="md"}:{name:string;src?:string;size?:"sm"|"md"|"lg"}){
  const classes={sm:"size-8 text-xs",md:"size-11 text-sm",lg:"size-20 text-xl"};
  const initials=name.split(/\s+/).slice(0,2).map((part)=>part[0]?.toUpperCase()).join("");
  return src?<img src={src} alt={name} className={`${classes[size]} rounded-full object-cover`}/>:<span className={`${classes[size]} grid place-items-center rounded-full bg-emerald-800 font-bold text-white`}>{initials}</span>;
}
