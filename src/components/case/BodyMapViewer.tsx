"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import {
  DoubleSide,
  Vector2,
  type Group,
  type Mesh,
} from "three";
import type { BodyMapRegion } from "@/lib/types";
import { regionMeta, type Marker3D } from "./body-map-regions";

const BODY_PROFILE = [
  new Vector2(0.001, 0),
  new Vector2(0.055, 0.02),
  new Vector2(0.075, 0.12),
  new Vector2(0.095, 0.42),
  new Vector2(0.11, 0.78),
  new Vector2(0.12, 0.98),
  new Vector2(0.105, 1.12),
  new Vector2(0.115, 1.34),
  new Vector2(0.09, 1.5),
  new Vector2(0.055, 1.58),
  new Vector2(0.085, 1.74),
  new Vector2(0.001, 1.8),
];

function LesionMarker3D({ position }: { position: Marker3D }) {
  const ringRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.scale.setScalar(
      1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.08
    );
  });

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color="#06b6d4" toneMapped={false} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.03, 0.036, 32]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.5}
          side={DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function AnatomyFigure({ marker }: { marker: Marker3D }) {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <latheGeometry args={[BODY_PROFILE, 64]} />
        <meshStandardMaterial color="#f0f3f8" roughness={0.88} metalness={0.02} />
      </mesh>

      {(
        [
          { pos: [-0.17, 1.38, 0.02] as const, rot: 0.28 },
          { pos: [-0.3, 1.1, 0.03] as const, rot: 0.12 },
          { pos: [0.17, 1.38, 0.02] as const, rot: -0.28 },
          { pos: [0.3, 1.1, 0.03] as const, rot: -0.12 },
        ] as const
      ).map((arm, i) => (
        <mesh
          key={i}
          position={arm.pos}
          rotation={[0, 0, arm.rot]}
          castShadow
        >
          <capsuleGeometry args={[0.042, 0.24, 8, 16]} />
          <meshStandardMaterial color="#f0f3f8" roughness={0.88} metalness={0.02} />
        </mesh>
      ))}

      <LesionMarker3D position={marker} />
    </group>
  );
}

function RotatingFigure({
  marker,
  initialAzimuth,
}: {
  marker: Marker3D;
  initialAzimuth: number;
}) {
  const groupRef = useRef<Group>(null);
  const spin = useRef(initialAzimuth);

  useEffect(() => {
    spin.current = initialAzimuth;
    if (groupRef.current) {
      groupRef.current.rotation.y = initialAzimuth;
    }
  }, [initialAzimuth]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    spin.current += delta * 0.45;
    groupRef.current.rotation.y = spin.current;
  });

  return (
    <group ref={groupRef} position={[0, -0.02, 0]}>
      <AnatomyFigure marker={marker} />
    </group>
  );
}

function Scene({
  marker,
  initialAzimuth,
}: {
  marker: Marker3D;
  initialAzimuth: number;
}) {
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 5]} intensity={1.15} castShadow />
      <directionalLight position={[-4, 3, -3]} intensity={0.35} />

      <RotatingFigure marker={marker} initialAzimuth={initialAzimuth} />

      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.2}
        scale={1.4}
        blur={2.5}
        far={1.5}
        color="#1a4b8c"
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.75}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
}

function ViewerError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
      <p className="text-xs text-muted">3D preview could not load</p>
      <button
        type="button"
        onClick={onRetry}
        className="text-xs font-semibold text-medical-blue hover:underline"
      >
        Retry
      </button>
    </div>
  );
}

interface BodyMapViewerProps {
  region: BodyMapRegion;
}

export function BodyMapViewer({ region }: BodyMapViewerProps) {
  const meta = useMemo(() => regionMeta[region], [region]);
  const [key, setKey] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <ViewerError onRetry={() => { setFailed(false); setKey((k) => k + 1); }} />;
  }

  return (
    <Canvas
      key={key}
      className="!h-full !w-full touch-none"
      dpr={[1, 1.5]}
      shadows
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "default",
        failIfMajorPerformanceCaveat: false,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
      camera={{ position: [0, 0.92, 2.6], fov: 34, near: 0.1, far: 100 }}
    >
      <Suspense fallback={null}>
        <Scene marker={meta.marker} initialAzimuth={meta.initialAzimuth} />
      </Suspense>
    </Canvas>
  );
}
