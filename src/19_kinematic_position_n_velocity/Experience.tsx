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
  CuboidCollider,
} from "@react-three/rapier";
import { ThreeEvent } from "@react-three/fiber";
import { Vector3 } from "three";

export function Experience() {
  const cubeBodyRef = useRef<RapierRigidBody>(null);

  // const someControls = useControls("_", { test: 1 });

  // ------------------------------------------------------------
  // Event Handlers
  // ------------------------------------------------------------
  function clickEventHandler(ev: ThreeEvent<MouseEvent>) {
    // console.log("Click", ev);

    if (cubeBodyRef.current) {
      cubeBodyRef.current.applyImpulse(
        // new Vector3(0, 10, 0) // you can also write first parameter like this
        { x: 0, y: 5, z: 0 },

        // false // it will work just for the first time

        true
      );

      cubeBodyRef.current.applyTorqueImpulse(
        {
          x: Math.random() - 0.5,
          y: Math.random() - 0.5,
          z: Math.random() - 0.5,
        },
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

      <Physics
        debug
        // gravity on the moon
        // gravity={[0, -1.625, 0]}
        // back to earth
        gravity={[0, -9.81, 0]}
      >
        {/* SPHERE */}
        <RigidBody
          colliders="ball"
          // gravityScale={-0.2}
        >
          <mesh position={[-2, 8, 0]} castShadow>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial args={[{ color: "orange" }]} />
          </mesh>
        </RigidBody>

        {/* CUBE */}
        <RigidBody
          ref={cubeBodyRef}
          restitution={0}
          friction={0.7}
          //
        >
          <mesh castShadow position={[3, 3, 0]} onClick={clickEventHandler}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>

        {/* ---------------------------------------------------- */}
        {/* ---------------------------------------------------- */}
        <RigidBody
          friction={0}
          position={[0, -0.8, 0]}
          type="kinematicPosition"
        >
          <mesh castShadow>
            <boxGeometry args={[0.4, 0.4, 3]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>
        {/* ---------------------------------------------------- */}
        {/* ---------------------------------------------------- */}
        {/* FLOOR */}
        <RigidBody
          type="fixed"
          // restitution={0.5}
          friction={0.7}
        >
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial args={[{ color: "greenyellow" }]} />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
}
