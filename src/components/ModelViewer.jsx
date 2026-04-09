import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";

function Model({ path }) {
  const gltf = useGLTF(path);
  const { actions } = useAnimations(gltf.animations, gltf.scene);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => action.play());
    }
  }, [actions]);

  return <primitive object={gltf.scene} scale={1.6} position={[0, -0.8, 0]} />;
}

export default function ModelViewer() {
  return (
    <div style={{ width: "400px", height: "500px" }}>
      <Canvas
        camera={{ position: [0, 1.2, 3.5], fov: 55 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={3} />
        <directionalLight position={[-5, 5, -5]} intensity={1.5} />
        <pointLight position={[0, 5, 0]} intensity={2} />
        <Suspense fallback={null}>
          <Model path="/models/model.glb" />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          target={[0, 0.5, 0]}
        />
      </Canvas>
    </div>
  );
}