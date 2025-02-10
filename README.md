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

# Object settings

You can control friction, restitution, mass, gravity, where the object are, where they are supposed to go, **and much more**

## Gravity

default is `- 9.81`

We can change this on `Physics` tag, like I did

You use **negative values for y**, and x and z should be 0, which makes sens since gravity pulls you down

if you want to create effect where all objects are sucked up to the sky you would set `y` to be positive by some value

or you can change x or z if you want objects to be sucked by these sides

### `gravityScale`

if you want specific rigid body to have different gravity than the rest, you can specify it

you can use negatives to change direction

### YOU CAN ALSO CHANGE GRAVITY STUFF AT RUNTIME

I had problem with changing gravity scale because something internaly happens

I am able to change gravity scale only few seconds after realod

What happens is that collider wirefram changes color few moments after reload. After it changes color me changing gravity scale doesn't affect anything. **I THINK THIS IS SOME INTERNAL SETTING WHERE GRAVITY IS LOCKED**

## Restitution

Some call this as "control of 'bounciness'"

Default is `0` which means there is no bounce

**Rule of thumb, set same restitution on the floor and the body**, if you want object to bounce to the height it was released from, **so to bounce back to its initail position**

The floor doesn't have a restitution of 1, It's like dropping a bouncing ball on a flat and solid surface against dropping the same bouncing ball on a carpet

---

**didn't try to do this, just explaining**

By default, Rapier will take an average of the two restitution, It is possible to change that rule, but it has to be done within the Collider itself and not the RigidBody

We would need to access the automatically generated collider or create the Collider manually
We would also need to import CoefficientCombineRule from Rapier and choose one of the rules provided in that object

---

## Friction

Friction lets us decide how much the surfaces are supposed to rub off on each other

default is 0.7

0 would slide infinitely

but you also would need to set friction on the floor to be 0

## Mass

The mass of the RigidBody is automatically calculated as the sum of the masses of the Colliders that make up the RigidBody

The mass of the Colliders is automatically calculated according to their shape and volume

big objects will automatically have bigger mass

Contrary to popular belief, the mass won't change how fast an object falls

However the mass will influence the forces involved

If two objects collide while one has a huge mass and the other one has a small mass, the huge mass will push away the small mass

**To chage mass you must creaty collider by yourself**

**You can obtain mass by executing `.mass()` method on rigid body**

and then you can multiply mass when applying impulse

## Position and rotation (kinematicPosition type and kinematikVelocity type)

So far we have set dynamic and fixed (default) type on RigidBody

you can set position and rotation attributes on RigidBody as you know

But there is a ctach

For dynamic ånd fixed objects (the two types of objects we've covered), **you should not change those values at run time**

Their purpose is only to set the original position and rotation sbefore letting Rapier update the objects

**If you want to move an object, you have to apply forces to it**

If you really need update the object position and rotation directly, there are two options

Option 1: If you need to move it just once
You can do it with the appropriate methods, but you'll have to reset velocities that are currently applied on it and also make sure to not move it inside another RigidBody

We won't see that here because we will do it in the next workshop

Option 2: If you need to move it in time
(like a carousel or a moving obstacle)

**You can use the `kinematic` types** that we are going to discover now

But what if we really want to have an object that we can move and rotate?
It can be the player or it can be a carousel and we don't want to use unpredictable forces
We want them to move and rotate at an exact speed

We can use `kinematicPosition` and `kinematicVelocity` types

difference between them is how we update them

• For the kinematicPosition, we provide the next position and it'll update the object velocity accordingly

• For the kinematicVelocity, we provide the velocity directly

The kinematic object has two important functions
`setNextKinematicTranslation` to move the object, and `setNextKinematicRotation` to rotate the object

in our example we will use useFrame

we will create threejs Euler and Quaternion, and send that Quoterninon to `setNextKinematicRotation` call

# Events

4 different events

- onCollisionEnter: When the Rigidbody hit something
- onCollisionExit: when the Rigid Body separates from the object it just hit

When an object stops moving for a moment, Rapier will consider it as sleeping and won't update it unless it collides with something else or we call a function like applyImpulse on it
This improves performance since Rapier won't have to test objects that don't
move

- onSleep: when the RigidBody starts sleeping
- onWake: when the Rigid Body stops sleeping

# From a model

# Stress test

we are going to use InstancedMesh since we want to make sure that Three.js can handle hundreds of cubes

We will put InstancedMesh inside Physics but it doesn't need to be nested inside Physics

InstancedMesh needs three arguments

- geometry
- material
- number of instances

Matrix4 is a combination of position, rotation, and scale
They are used to move the vertices according to the object transformation When we change the position, rotation, or scale of an object, Three.js will calculate the Matrix4 automatically before rendering it

Here, we need to do it ourselves and there are many different methods available on Matrix4 to do that
One of them is `compose`, to which we need to send a position (Vector3), a rotation (Quaternion), and a scale (Vector3)

**With `InstancedRigidBodies`:**

Fill the instances array by pushing an object inside for each cube we want
Each objects needs 3 properties

- key: a random key (used by React)
- position: an array composed of 3 values for a Vector3 position
- rotation: an array composed of 3 values for an Euler rotation

**FOR BETTER PERFORMANCE DON'T FORGET TO DEACTIVATE `debug` ON `Physics` TAG**
