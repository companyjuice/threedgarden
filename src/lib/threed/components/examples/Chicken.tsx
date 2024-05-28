/*
  Chicken.glb
  Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef, useMemo, useContext, createContext } from 'react'
import { useGLTF, Merged } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

const fileGLB = './objects/glb/Chicken.glb'

type GLTFResult = GLTF & {
  nodes: {
    Hen_HP002: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
  }
}

const context = createContext(null)

// @ts-expect-error
export function Instances({ children, ...props }) {
  const { nodes } = useGLTF(fileGLB) as GLTFResult
  const instances = useMemo(
    () => ({
      HenHP: nodes.Hen_HP002,
    }),
    [nodes]
  )
  return (
    <Merged meshes={instances} {...props}>
      {/* @ts-expect-error */}
      {(instances) => <context.Provider value={instances} children={children} />}
    </Merged>
  )
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const instances = useContext(context)
  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="RootNode" />
        <group name="Light" position={[4.076, 5.904, -1.005]} rotation={[1.89, 0.881, -2.045]} />
        <group name="Camera" position={[7.359, 4.958, 6.926]} rotation={[1.242, 0.33, -0.76]} />
        <instances.HenHP name="Hen_HP002" rotation={[Math.PI / 2, 0, 0]} />
      </group>
    </group>
  )
}

useGLTF.preload(fileGLB)