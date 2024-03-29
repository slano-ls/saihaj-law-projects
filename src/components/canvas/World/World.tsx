import { useStore } from "@/utils/state";
import { Environment, useTexture } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
// import { useControls } from "leva";
// import colors from "nice-color-palettes/1000.json";
import {
  BufferGeometry,
  Color,
  Mesh,
  RepeatWrapping,
  ShaderMaterial,
  Texture,
  Vector3,
} from "three";
import { WorldMaterial, WorldMaterialProps } from "./shader";
import { useFrame } from "@react-three/fiber";
import roughnessImg from "./img/roughness.jpg";
import normalImg from "./img/normal.jpg";
import displacementImg from "./img/displacement.jpg";
import metalnessImg from "./img/metalness.jpg";
import mapImg from "./img/map.jpg";
import { City } from "./City";
import { Floor } from "./Floor";
import { Particles } from "./Particles";
import { AmbientSound } from "./AmbientSound";
import { BoopSound } from "./BoopSound";
import { sphericalToCartesian } from "@/utils";

const colorsDark = useStore.getState().colors.colorsDark;
// const colorsDark = colors;

export function World(props: JSX.IntrinsicElements["mesh"]) {
  const ref = useRef<Mesh<BufferGeometry, WorldMaterialProps>>();
  const ref2 = useRef<Mesh<BufferGeometry, WorldMaterialProps>>();
  const [spherePos] = useState(() =>
    new Vector3(...sphericalToCartesian(1.0, 0.0, 45.35)).multiplyScalar(500),
  );

  const textures = useTexture(
    {
      roughnessMap: roughnessImg.src,
      normalMap: normalImg.src,
      displacementMap: displacementImg.src,
      metalnessMap: metalnessImg.src,
      map: mapImg.src,
    },
    textures => {
      Object.values(textures).forEach((t: Texture) => {
        t.wrapS = RepeatWrapping;
        t.wrapT = RepeatWrapping;
        t.repeat.set(4, 8);
      });
    },
  );

  const palette = useMemo(() => {
    return colorsDark[Math.floor(Math.random() * colorsDark.length)];
  }, []);

  const colors = useMemo(() => palette.map(c => new Color(c)), [palette]);

  const updateMaterials = (mat: ShaderMaterial, colors: Color[], t: number) => {
    mat.uniforms.uTime.value = t;

    mat.uniforms.uColor1.value.lerp(colors[0], 0.005);
    mat.uniforms.uColor2.value.lerp(colors[1], 0.005);
    mat.uniforms.uColor3.value.lerp(colors[2], 0.005);
    mat.uniforms.uColor3.value.lerp(colors[3], 0.005);
    mat.uniforms.uColor3.value.lerp(colors[4], 0.005);
  };

  useFrame(({ clock }) => {
    if (ref.current) {
      updateMaterials(ref.current.material, colors, clock.elapsedTime);
      updateMaterials(ref2.current.material, colors, clock.elapsedTime);
    }
  });

  return (
    <>
      <fogExp2 attach="fog" color={"#000000"} density={0.00375} />
      <fog attach="fog" color={"#000000"} near={320} far={400} />

      <Environment frames={Infinity} resolution={64}>
        <mesh ref={ref2} scale={10} {...props}>
          <sphereGeometry args={[1, 32, 32]} />
          <WorldMaterial />
        </mesh>
      </Environment>

      <mesh
        ref={ref}
        scale={1000}
        {...props}
        // onClick={() => console.log(palette.map(el => `"${el}"`).join(","))}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <WorldMaterial />
      </mesh>

      <City>
        <meshStandardMaterial
          {...textures}
          envMapIntensity={3}
          roughness={1}
          displacementScale={0}
        />
      </City>

      <Particles convergeTo={spherePos} />
      <AmbientSound position={[0, 0, 0]} />
      <AmbientSound position={[0, 0, 0]} startTime={0} />
      <BoopSound />

      <Floor position={[0, -30, -20]}>
        <meshStandardMaterial
          {...textures}
          transparent
          envMapIntensity={1}
          // metalness={1.2}
          roughness={22.5}
          displacementScale={0}
          // @ts-ignore
          normalScale={[0.02, 0.02]}
        />
      </Floor>
    </>
  );
}

function colorsEqual(a: Color, b: Color) {
  let epsilon = 0.0001;
  return (
    Math.abs(a.r - b.r) < epsilon && Math.abs(a.g - b.g) < epsilon && Math.abs(a.b - b.b) < epsilon
  );
}
