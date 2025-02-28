import {
  useMatcapTexture,
  Center,
  Text3D,
  OrbitControls,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useRef, useEffect } from "react";
import * as THREE from "three";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
  const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);
  const donutRef = useRef();
  //   const [torusGeometry, setTorusGeometery] = useState();
  //   const [material, setMaterial] = useState();
  //   const tempArray =
  useEffect(() => {
    matcapTexture.encoding = THREE.sRGBEncoding;
    matcapTexture.needsUpdate = true;
    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, []);
  useFrame((state, delta) => {
    for (const donut of donutRef.current.children) {
      donut.rotation.x += delta * 0.101;
      donut.rotation.y += delta * 0.101;
    }
  });
  return (
    <>
      <Perf position="top-left" />
      {/* <torusGeometry ref={setTorusGeometery} args={[1, 0.6, 16, 32]} />
      <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} /> */}

      <OrbitControls makeDefault />
      <Center>
        <Text3D
          material={material}
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.0042}
          curveSegments={32}
          bevelEnabled
          bevelThickness={0.13}
          bevelSize={0.02}
          bevelOffset={0.021}
          bevelSegments={50}
        >
            random d0nutz
        </Text3D>
      </Center>

      <group ref={donutRef}>
        {[...Array(100)].map((_, index) => (
          <mesh
            key={index}
            material={material}
            geometry={torusGeometry}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
            scale={0.2 + Math.random() * 0.2}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          />
        ))}
      </group>
    </>
  );
}
