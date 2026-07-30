
"use client"; import {useEffect,useState} from "react";
export function useMobile(breakpoint=1024){const [mobile,setMobile]=useState(false);useEffect(()=>{const q=matchMedia(`(max-width:${breakpoint-1}px)`);const u=()=>setMobile(q.matches);u();q.addEventListener("change",u);return()=>q.removeEventListener("change",u)},[breakpoint]);return mobile}
