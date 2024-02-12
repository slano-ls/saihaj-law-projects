/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 -p 5 --types ./cities.glb
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    cities: THREE.Mesh;
  };
  materials: {};
};

type Props = JSX.IntrinsicElements["group"] & {
  children?: React.ReactNode;
};

export function City({ children, ...props }: Props) {
  const { nodes } = useGLTF("/models/cities.glb") as GLTFResult;
  return (
    <group {...props} dispose={null} position={[0, -30, -600]}>
      <mesh geometry={nodes.cities.geometry} scale={15} scale-y={25}>
        {children}
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/cities.glb");