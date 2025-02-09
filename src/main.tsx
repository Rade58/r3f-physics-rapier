import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// -----------------------------------------------------------
// import { App } from "./0_setup/App"; // with Stage, no light, no shadows enabled
// import { App } from "./1_setup/App"; // with lights without Stage
// import { App } from "./3_setup/App";
// -----------------------------------------------------------
// import { App } from "./4_setup/App"; // floor is a box, not a plane
// -----------------------------------------------------------

// import { App } from "./5_physics_n_rigid_body/App";
// import { App } from "./6_colliders/App";
// import { App } from "./7_composed_objects/App";
// import { App } from "./8_ball_instead_cuboid/App";
// import { App } from "./9_hull_collider/App";
// import { App } from "./10_trimesh_collider/App";
import { App } from "./11_cutom_collider/App";

// -----------------------------------------------------------

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
