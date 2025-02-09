import { useEffect, useRef } from "react";
// import { useFrame } from "@react-three/fiber";

import { OrbitControls /* , Stage */ } from "@react-three/drei";

import { Perf } from "r3f-perf";

// import { useControls } from "leva";

import {
  Physics,
  RigidBody,
  // CuboidCollider,
  // BallCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import { ThreeEvent } from "@react-three/fiber";
import { Vector3 } from "three";

export function Experience() {
  const cubeBodyRef = useRef<RapierRigidBody>(null);

  /* useEffect(() => {
    if (cubeBodyRef.current) {
      console.log(cubeBodyRef.current.collider);
    }
  }, []); */

  // const someControls = useControls("_", { test: 1 });

  // ------------------------------------------------------------
  // Event Handlers
  // ------------------------------------------------------------
  function clickEventHandler(ev: ThreeEvent<MouseEvent>) {
    // console.log("Click", ev);

    if (cubeBodyRef.current) {
      cubeBodyRef.current.applyImpulse(
        // new Vector3(0, 10, 0) // you can also write first parameter like this
        { x: 0, y: 20, z: 0 },

        // false // it will work just for the first time

        true
      );

      cubeBodyRef.current.applyTorqueImpulse(
        { x: 0, y: Math.PI * 0.3, z: 0 },
        true
      );
    }
  }
  // ------------------------------------------------------------
  // ------------------------------------------------------------

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
            position={[-2, 8, 0]}
            castShadow
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial args={[{ color: "orange" }]} />
          </mesh>
        </RigidBody>

        {/* CUBE */}
        <RigidBody
          ref={cubeBodyRef}
          // colliders="cuboid" // default
          //
          position={[2.5, 1, 0]}
          rotation-x={Math.PI * 0.1}
        >
          <mesh castShadow scale={1.6} onClick={clickEventHandler}>
            <boxGeometry args={[1, 1, 1]} />
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
