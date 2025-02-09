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

- We don't have to update the physics in each frame
- Three.js objects are automatically associated with the corresponding RigidBody Surrounding them
- React Three Rapier creates a physics shape matching the Three.js objects
- We don't have to specify surface properties, object mass, gravity, etc.
