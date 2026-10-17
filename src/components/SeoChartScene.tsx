import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, Html, RoundedBox } from "@react-three/drei";
import { useRef, type MutableRefObject } from "react";
import { Group, MathUtils } from "three";
import { seoSteps } from "@/lib/seo-chart";

type Palette = { primary: string; floor: string; light: string; accent: string };

function Step({ index, progress, reduced, palette }: { index: number; progress: MutableRefObject<number>; reduced: boolean; palette: Palette }) {
  const ref = useRef<Group>(null);
  const step = seoSteps[index];
  useFrame((_, rawDelta) => {
    const group = ref.current;
    if (!group) return;
    const target = reduced || index === 0 ? 1 : MathUtils.clamp((progress.current * 5 - index + 0.8) / 0.8, 0, 1);
    const next = reduced ? target : MathUtils.damp(group.scale.y, target, 8, Math.min(rawDelta, 0.05));
    group.scale.y = Math.max(0.001, next);
    group.visible = next > 0.005;
  });
  if (!step) return null;
  const x = (index - 2.5) * 1.45;
  return <group position={[x, 0, 0]}>
    <group ref={ref} scale={[1, index === 0 || reduced ? 1 : 0.001, 1]}>
      <RoundedBox args={[1.02, step.height, 1.12]} radius={0.025} smoothness={2} position={[0, step.height / 2, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial color={palette.primary} roughness={0.24} metalness={0.18} clearcoat={0.65} clearcoatRoughness={0.2} />
      </RoundedBox>
    </group>
    <Html position={[0, -0.15, 0.9]} center zIndexRange={[4, 0]}><span className="seo-axis-label">J{step.day}</span></Html>
  </group>;
}

function Scene({ progress, reduced, palette }: { progress: MutableRefObject<number>; reduced: boolean; palette: Palette }) {
  const { camera, size } = useThree();
  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    camera.position.x = MathUtils.damp(camera.position.x, 7.4 - progress.current * 1.4, 3, dt);
    camera.lookAt(0, 2, 0);
    if ("zoom" in camera) { camera.zoom = Math.min(size.width / 12.7, size.height / 8.2); camera.updateProjectionMatrix(); }
  });
  return <>
    <ambientLight intensity={0.7} />
    <directionalLight position={[-4, 9, 5]} intensity={3} color={palette.light} castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-10} shadow-camera-right={10} shadow-camera-top={10} shadow-camera-bottom={-10} shadow-bias={-0.001} />
    <Environment resolution={64}>
      <Lightformer position={[0, 8, 3]} scale={[15, 8, 1]} intensity={2} color={palette.light} />
      <Lightformer position={[-8, 2, 0]} rotation-y={Math.PI / 2} scale={[10, 4, 1]} intensity={1.5} color={palette.accent} />
    </Environment>
    <mesh rotation-x={-Math.PI / 2} position-y={-0.12} receiveShadow><planeGeometry args={[200, 200]} /><meshStandardMaterial color={palette.floor} roughness={0.85} /></mesh>
    <mesh position={[0, -0.045, 0]} receiveShadow><boxGeometry args={[9, 0.09, 2.2]} /><meshStandardMaterial color={palette.floor} roughness={0.5} metalness={0.12} /></mesh>
    {seoSteps.map((step, index) => <Step key={step.day} index={index} progress={progress} reduced={reduced} palette={palette} />)}
  </>;
}

export default function SeoChartScene({ progress, reduced, palette, active }: { progress: MutableRefObject<number>; reduced: boolean; palette: Palette; active: boolean }) {
  return <Canvas orthographic shadows dpr={[1, 1.5]} camera={{ position: [7.4, 6.4, 13], zoom: 55, near: 0.1, far: 300 }} frameloop={active ? "always" : "demand"} gl={{ antialias: true, alpha: true }}>
    <Scene progress={progress} reduced={reduced} palette={palette} />
  </Canvas>;
}