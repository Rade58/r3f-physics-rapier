import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { type Mesh } from "three";

import { OrbitControls /* , Stage */ } from "@react-three/drei";

import { Perf } from "r3f-perf";

// import { useControls } from "leva";

import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

export function Experience() {
  // const someControls = useControls("_", { test: 1 });

  // const cubeRef = useRef<Mesh>(null);

  /* useFrame((state, delta) => {
    // const elapsed: number = state.clock.getElapsedTime();

    if (cubeRef.current) {
      cubeRef.current.rotation.y += delta;
    }
  }); */

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* ---------------------------------- */}
      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      {/* ---------------------------------- */}

      <Physics debug>
        {/* SPHERE */}
        <RigidBody colliders="ball">
          <mesh
            // position={[-2, 2, 0]}
            position={[0, 8, 0]}
            castShadow
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial args={[{ color: "orange" }]} />
          </mesh>
        </RigidBody>

        {/* TORUS */}
        <RigidBody
          // colliders="ball"
          // colliders="hull"
          // colliders="trimesh"
          colliders={false}
          //
          rotation-x={Math.PI * 0.2}
        >
          <CuboidCollider args={[1.2, 0.4, 1.2]} />
          <mesh
            //
            //
            position={[0, 0, 0]}
            //
            //
            castShadow
            rotation-x={Math.PI * 0.5}
          >
            <torusGeometry args={[1, 0.3, 16, 100]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>

        {/* FLOOR */}
        <RigidBody type="fixed">
          <mesh
            receiveShadow
            // rotation={[-Math.PI * 0.5, 0, 0]}
            // scale={10}
            // position-y={-1}
            position-y={-1.25}
            // visible={false}
          >
            {/* instead of plane */}
            {/* <planeGeometry /> */}
            {/* we want box for the floor */}
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial args={[{ color: "greenyellow" }]} />
          </mesh>
        </RigidBody>

        {/* ---------------------------------------------------- */}
      </Physics>
    </>
  );
}
