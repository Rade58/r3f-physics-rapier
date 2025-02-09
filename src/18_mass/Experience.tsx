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
        { x: 0, y: 20, z: 0 },

        // false // it will work just for the first time

        true
      );

      const mass = cubeBodyRef.current.mass();

      console.log("mass", mass);

      cubeBodyRef.current.applyTorqueImpulse(
        {
          x: Math.random() * 10,
          y: Math.random() * 10,
          z: Math.random() * 10,
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
          position={[2.5, 3, 0]}
          restitution={0}
          friction={0.7}
          //
          colliders={false}
        >
          <CuboidCollider
            args={[0.5, 0.5, 0.5]}
            // mass={2}
            // mass={9}
            mass={4}
            //
          />
          <mesh castShadow onClick={clickEventHandler}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>

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

        {/* ---------------------------------------------------- */}
      </Physics>
    </>
  );
}
