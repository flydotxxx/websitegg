import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { Vector2, VideoTexture, SRGBColorSpace } from "three";

function Film({ video, active }: { video: HTMLVideoElement; active: boolean }) {
  const texture = useMemo(() => {
    const result = new VideoTexture(video);
    result.colorSpace = SRGBColorSpace;
    return result;
  }, [video]);
  useEffect(() => () => texture.dispose(), [texture]);
  const uniforms = useMemo(() => ({
    uVideo: { value: texture },
    uTime: { value: 0 },
    uPointer: { value: new Vector2(0.7, 0.5) },
    uAspect: { value: 1 },
    uVideoAspect: { value: video.videoWidth / video.videoHeight || 16 / 9 },
  }), [texture, video]);
  useFrame(({ size }, rawDelta) => {
    if (!active) return;
    const dt = Math.min(rawDelta, 0.05);
    uniforms.uTime.value += dt;
    uniforms.uAspect.value = size.width / size.height;
  });
  useEffect(() => {
    const parent = video.parentElement;
    if (!parent) return;
    const move = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      uniforms.uPointer.value.set((event.clientX - rect.left) / rect.width, 1 - (event.clientY - rect.top) / rect.height);
    };
    parent.addEventListener("pointermove", move);
    return () => parent.removeEventListener("pointermove", move);
  }, [video, uniforms]);
  return <mesh frustumCulled={false}>
    <planeGeometry args={[2, 2]} />
    <shaderMaterial depthTest={false} depthWrite={false} toneMapped={false} uniforms={uniforms}
      vertexShader={`varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.0,1.0); }`}
      fragmentShader={`
        uniform sampler2D uVideo;
        uniform float uTime, uAspect, uVideoAspect;
        uniform vec2 uPointer;
        varying vec2 vUv;
        float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
        void main(){
          vec2 uv=vUv;
          vec2 d=uv-uPointer;
          d.x*=uAspect;
          float dist=length(d);
          float ripple=sin(dist*38.0-uTime*2.8)*exp(-dist*4.5);
          uv+=normalize(d+vec2(0.0001))*ripple*0.005;
          uv.x+=sin(uv.y*12.0+uTime*0.35)*0.0015;
          if(uAspect>uVideoAspect){uv.y=(uv.y-0.5)*uVideoAspect/uAspect+0.5;}
          else{uv.x=(uv.x-0.5)*uAspect/uVideoAspect+0.5;}
          vec3 film=texture2D(uVideo,uv).rgb;
          float grain=hash(gl_FragCoord.xy+floor(uTime*18.0))-.5;
          film+=grain*0.025;
          gl_FragColor=vec4(film,1.0);
          #include <colorspace_fragment>
        }
      `} />
  </mesh>;
}

export default function CinematicCanvas({ video, active }: { video: HTMLVideoElement; active: boolean }) {
  return <div className="cinematic-webgl" aria-hidden="true">
    <Canvas flat dpr={1} frameloop={active ? "always" : "never"} gl={{ alpha: true, antialias: false, powerPreference: "low-power" }} fallback={null}>
      <Film video={video} active={active} />
    </Canvas>
  </div>;
}