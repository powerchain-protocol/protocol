
"use client";
import {useEffect,useRef} from "react";
import * as THREE from "three";

export function Globe({className=""}:{className?:string}){
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const mount=ref.current;if(!mount)return;
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(45,mount.clientWidth/Math.max(mount.clientHeight,1),.1,100);
    camera.position.z=5.5;
    const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(mount.clientWidth,mount.clientHeight);mount.appendChild(renderer.domElement);
    const globe=new THREE.Mesh(new THREE.SphereGeometry(1.55,64,64),new THREE.MeshBasicMaterial({color:0x064e3b,wireframe:true,transparent:true,opacity:.32}));
    const core=new THREE.Mesh(new THREE.SphereGeometry(1.42,64,64),new THREE.MeshPhongMaterial({color:0x052e2b,transparent:true,opacity:.78,shininess:90}));
    const group=new THREE.Group();group.add(globe,core);scene.add(group);
    scene.add(new THREE.AmbientLight(0xffffff,.9));
    const point=new THREE.PointLight(0xa3e635,18,15);point.position.set(3,3,5);scene.add(point);
    let frame=0;const render=()=>{frame=requestAnimationFrame(render);group.rotation.y+=.0026;group.rotation.x=.08*Math.sin(Date.now()*.00025);renderer.render(scene,camera)};render();
    const resize=()=>{camera.aspect=mount.clientWidth/Math.max(mount.clientHeight,1);camera.updateProjectionMatrix();renderer.setSize(mount.clientWidth,mount.clientHeight)};addEventListener("resize",resize);
    return()=>{cancelAnimationFrame(frame);removeEventListener("resize",resize);renderer.dispose();mount.removeChild(renderer.domElement)};
  },[]);
  return <div ref={ref} className={`min-h-[320px] w-full ${className}`}/>;
}
