import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { useRef, type MutableRefObject, type RefObject } from "react";
import { Group, MathUtils, Vector3 } from "three";
import { seoSteps } from "@/lib/seo-chart";

type Palette = { primary: string; floor: string; light: string; accent: string };

function Step({ index, progress, reduced, palette, annotationLayer }: { index: number; progress: MutableRefObject<number>; reduced: boolean; palette: Palette; annotationLayer: RefObject<HTMLDivElement | null> }) {
  const ref = useRef<Group>(null);
  const point = useRef(new Vector3());
  const step = seoSteps[index];
  useFrame(({ camera, size }, rawDelta) => {
    const group = ref.current;
    if (!group) return;
    const target = reduced || index === 0 ? 1 : MathUtils.clamp((progress.current * (seoSteps.length - 1) - index + 0.8) / 0.8, 0, 1);
    const next = reduced ? target : MathUtils.damp(group.scale.y, target, 8, Math.min(rawDelta, 0.05));
    group.scale.y = Math.max(0.001, next);
    group.visible = next > 0.005;
    const annotation = annotationLayer.current?.querySelector<HTMLElement>(`[data-step-day="${step?.day}"]`);
    if (annotation && step) {
      point.current.set((index - (seoSteps.length - 1) / 2) * 3.6, step.height + 0.55, 0).project(camera);
      annotation.style.left = `${(point.current.x + 1) * size.width / 2}px`;
      annotation.style.top = `${(1 - point.current.y) * size.height / 2}px`;
      annotation.style.opacity = String(next);
      annotation.style.visibility = next > 0.05 ? "visible" : "hidden";
    }
  });
  if (!step) return null;
  const x = (index - (seoSteps.length - 1) / 2) * 3.6;
  return <group position={[x, 0, 0]}>
    <group ref={ref} scale={[1, index === 0 || reduced ? 1 : 0.001, 1]}>
      <RoundedBox args={[0.86, step.height, 0.58]} radius={0.055} smoothness={5} position={[0, step.height / 2, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial color={palette.primary} roughness={0.3} metalness={0.12} clearcoat={0.85} clearcoatRoughness={0.25} envMapIntensity={0.8} />
      </RoundedBox>
    </group>
  </group>;
}

function Scene({ progress, reduced, palette, annotationLayer }: { progress: MutableRefObject<number>; reduced: boolean; palette: Palette; annotationLayer: RefObject<HTMLDivElement | null> }) {
  const { camera, size } = useThree();
  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    camera.position.x = MathUtils.damp(camera.position.x, 7.4 - progress.current * 1.4, 3, dt);
    camera.lookAt(0, 2.8, 0);
    if ("zoom" in camera) { camera.zoom = Math.min(size.width / 25, size.height / 11); camera.updateProjectionMatrix(); }
  });
  return <>
    <ambientLight intensity={0.7} />
    <directionalLight position={[-4, 9, 5]} intensity={3} color={palette.light} castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-10} shadow-camera-right={10} shadow-camera-top={10} shadow-camera-bottom={-10} shadow-bias={-0.001} />
    <Environment resolution={64}>
      <Lightformer position={[0, 8, 3]} scale={[15, 8, 1]} intensity={2} color={palette.light} />
      <Lightformer position={[-8, 2, 0]} rotation-y={Math.PI / 2} scale={[10, 4, 1]} intensity={1.5} color={palette.accent} />
    </Environment>
    {seoSteps.map((step, index) => <Step key={step.day} index={index} progress={progress} reduced={reduced} palette={palette} annotationLayer={annotationLayer} />)}
  </>;
}

export default function SeoChartScene({ progress, reduced, palette, active, annotationLayer }: { progress: MutableRefObject<number>; reduced: boolean; palette: Palette; active: boolean; annotationLayer: RefObject<HTMLDivElement | null> }) {
  return <Canvas orthographic shadows dpr={[1, 1.5]} camera={{ position: [7.4, 6.4, 13], zoom: 55, near: 0.1, far: 300 }} frameloop={active ? "always" : "demand"} gl={{ antialias: true, alpha: true }} onCreated={({ gl }) => gl.setClearAlpha(0)}>
    <Scene progress={progress} reduced={reduced} palette={palette} annotationLayer={annotationLayer} />
  </Canvas>;
}