# R3F Workshops - Phyisics with Rapier

- Bootstraped with:

```
pnpm create vite
```

- dependancies

```
pnpm add three @react-three/fiber @react-three/drei leva@0.9.34
```

```
pnpm add -D r3f-perf @types/three
```

# `@react-three/rapier`

```
pnpm add @react-three/rapier
```

# Leva @0.9.34

---

---

# Learn from here

<https://rapier.rs/docs/user_guides/javascript/getting_started_js>

<https://rapier.rs/docs/api/javascript/JavaScript3D/>

# Examples

<https://pmndrs.github.io/react-three-rapier/>

Searsh "rapier" here:

<https://r3f.docs.pmnd.rs/getting-started/examples>

# Physics and RigidBody taga

We nest our meshes in Physics tag and we wrap our floor mesh in fixed RigidBody and for example we wrap sphere mesh in dynamic RigidBody

- We don't have to update the physics in each frame
- Three.js objects are automatically associated with the corresponding RigidBody Surrounding them
- React Three Rapier creates a physics shape matching the Three.js objects
- We don't have to specify surface properties, object mass, gravity, etc.

# Colliders

Shapes that make up our RigidBody

## To better see colliders use `debug` attribute on Physics tag

you will see shapes of rigid bodies (colliders)

we use this during development

also you will have a lot of wireframes because of this and thiat can impact performances

The wireframe you can see around rigid body is a collider

for example for our sphere collider will be cube (**cuboid** to be precise) by default (because cubes are default)

cuboids are addaptable (you will see this if you change the scale of the mesh, you will see that cuboid will adapt)

**If you have non cuboid shape, a rectangular shape for example, cuboid will adapt and you will see wireframe encapsulating perfectly that shape**

## Composed objects

We can put multiple meshes inside one RigidBody tag

try putting cube and sphere from our example, with debug enabled

# For better visualization

Go to <https://bruno-simon.com/#debug> to see all colliders on his website

just move car and in lil gui you will see physics; there you can check `modelsVisible`; I guess this will set debug on Physics tag

## Switching from default cuboid to ball

just set up `colliders="ball"` on RigidBody

## Hull collider

`colliders="hull"`

It's like putting elastic membrane around object. We tested this with torus

## Trimesh collider

`colliders="trimesh"`

hull is sometimes not good enough, because "elastic thing" doesn't follow crevice for example

this is visible with torus and a ball, ball will fall inside torus crevice

**But this is bad for performances, and you shoud avoid using it with rigid bodies that have `type="dynamic"`**

Colliders generated with a trimesh are empty on the inside and it makes collision detection more complicated and prone to bugs
A fast object might get through the trimesh or end up stuck on its surface

<https://rapier.rs/docs/user_guides/rust/colliders/>

![some custom collider vizualizations](https://rapier.rs/assets/images/supported_shapes-a5d1235ff41b0c0f38fe34ed6e1b1cce.svg)

# Custom Colliders

make sure to use `colliders={false}`

We nest these in RigidBody tag, and their args array will determine dimensions (we tested bunch of these with our torus)

- BallCollider <https://rapier.rs/javascript3d/classes/Ball.html>
- CuboidCollider <https://rapier.rs/javascript3d/classes/Cuboid.html>
- RoundCuboidCollider <https://rapier.rs/javascript3d/classes/Round Cuboid.html>
- CapsuleCollider <https://rapier.rs/javascript3d/classes/Capsule.html>
- ConeCollider <https://rapier.rs/javascript3d/classes/Cone.html>
- CylinderCollider <https://rapier.rs/javascript3d/classes/Cylinder.html>
- ConvexHullCollider <https://rapier.rs/javascript3d/classes/ConvexPolyhedron.html>
- TrimeshCollider <https://rapier.rs/javascript3d/classes/TriMesh.html>
- HeightfieldCollider <https://rapier.rs/javascript3d/classes/Heightfield.html>

avoid setting position and totation on mesh, do it on RigidBody; **this is because you can mess up position and rotation**

scale isn't supported on the rigid body

**You can also nest multiple custom collodiers in RigidBody**

# Access body and apply forces

You need refrence, so we will use `useRef` hook with RigidBody

And we use reference to apply `impulse`

**Available methods you can apply on `RapierRigidBody` instance:**

<https://rapier.rs/docs/api/javascript/JavaScript3D> (look for Methods) (try them out and you will be aware what they do so you can apply them in your projects)

- addForce is used to apply a force that lasts for quite a long time (like the wind)
- applyImpulse is used to apply a short force for a very short period of time (like for a projectile)

To make something jump, we'd better use applyImpulse

## For rotation, search for `torque`

The keyword for a rotation is torque
addTorque (equivalent of addForce)
applyTorqueImpulse (equivalent of applyImpulse)
Let's use the applyTorqueImpulse

<https://rapier.rs/docs/api/javascript/JavaScript3D>
