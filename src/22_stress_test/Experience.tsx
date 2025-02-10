import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

import { OrbitControls /* , Stage */, useGLTF } from "@react-three/drei";

import { Perf } from "r3f-perf";

// import { useControls } from "leva";

import {
  Physics,
  RigidBody,
  // CuboidCollider,
  // BallCollider,
  RapierRigidBody,
  // CuboidCollider,
  CollisionEnterHandler,
  CylinderCollider,
  CuboidCollider,
  InstancedRigidBodies,
} from "@react-three/rapier";
import { ThreeEvent } from "@react-three/fiber";
import { Euler, InstancedMesh, Matrix4, Quaternion, Vector3 } from "three";

export function Experience() {
  const [hitSound] = useState(() => {
    return new Audio("/sounds/hit.mp3");
  });

  console.log({ hitSound });

  const cubeBodyRef = useRef<RapierRigidBody>(null);
  const twisterRef = useRef<RapierRigidBody>(null);

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
  // ------------------------------------------------------------
  /* const collisionEnterHandler: CollisionEnterHandler = (ev) => {
    console.log("Collision Enter", ev);

    hitSound.currentTime = 0;
    hitSound.volume = Math.random();
    hitSound.play();
  }; */
  // ------------------------------------------------------------
  // ------------------------------------------------------------
  // ------------------------------------------------------------

  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();

    const eulerRotation = new Euler(0, elapsed * 5, 0);
    const quoternionRotation = new Quaternion();
    quoternionRotation.setFromEuler(eulerRotation);

    const angle = elapsed * 0.5;

    if (twisterRef.current) {
      // Uses Quaternion way of rotation

      twisterRef.current.setNextKinematicRotation(quoternionRotation);

      twisterRef.current.setNextKinematicTranslation({
        x: Math.cos(angle) * 2,
        y: -0.8,
        z: Math.sin(angle) * 4,
      });
    }
  });
  // ------------------------------------------------------------
  // ------------------------------------------------------------

  const cubesCount = 300;

  // no need for this if we are using InstancedRigidBodies tag
  /* const cubes = useRef<InstancedMesh>(null);

  useEffect(() => {
    for (let i = 0; i < cubesCount; i++) {
      const matrix = new Matrix4();

      matrix.compose(
        new Vector3(i * 2, 0, 0),
        new Quaternion(),
        new Vector3(1, 1, 1)
      );

      if (cubes.current) {
        cubes.current.setMatrixAt(i, matrix);
      }
    }
  }, []);
 */

  const instances = useMemo(() => {
    const instances: {
      key: string;
      position: [number, number, number];
      rotation: [number, number, number];
    }[] = [];

    for (let i = 0; i < cubesCount; i++) {
      instances.push({
        key: "instance_" + i,
        // position: [i * 2, 0, 0],
        // position: [0, i * 2, 0],
        // cubes falling from the sky
        position: [
          (Math.random() - 0.5) * 8,
          6 + i * 0.2,
          (Math.random() - 0.5) * 8,
        ],
        //

        // rotation: [0, 0, 0],
        rotation: [Math.random(), Math.random(), Math.random()],
      });
    }

    return instances;
  }, []);

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* ---------------------------------- */}
      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      {/* ---------------------------------- */}

      <Physics
        // debug
        gravity={[0, -9.81, 0]}
      >
        {/* --------------------------------------------------- */}
        {/* --------------------------------------------------- */}
        {/* Invisible walls */}
        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.25]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.25]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.25, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.25, 1, 0]} />
        </RigidBody>

        {/* --------------------------------------------------- */}
        {/* --------------------------------------------------- */}

        {/* SPHERE */}
        <RigidBody
          colliders="ball"
          // gravityScale={-0.2}
        >
          <mesh position={[-2, 0, 0]} castShadow>
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
          // onCollisionEnter={collisionEnterHandler}
          // onCollisionExit={(ev) => {
          //   console.log("collision exit", ev);
          // }}
          // onSleep={() => {
          //   console.log("sleep");
          // }}
          // onWake={() => {
          //   console.log("wake");
          // }}
        >
          <mesh castShadow position={[1.5, 0, 0]} onClick={clickEventHandler}>
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
          ref={twisterRef}
        >
          <mesh castShadow>
            <boxGeometry args={[0.4, 0.4, 3]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>
        {/* ---------------------------------------------------- */}
        {/* ---------------------------------------------------- */}

        {/* ------------------------------------------------------- */}
        {/* ------------------------------------------------------- */}
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
        {/* ---------------------------------------------------- */}
        {/* ---------------------------------------------------- */}
        {/* ---------------------------------------------------- */}
        {/* ---------------------------------------------------- */}
        <InstancedRigidBodies instances={instances}>
          <instancedMesh
            castShadow
            receiveShadow
            args={[null, null, cubesCount]}

            // ref={cubes}
          >
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  );
}
