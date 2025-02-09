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
