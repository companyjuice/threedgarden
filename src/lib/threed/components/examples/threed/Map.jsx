// 'use client'
// ==========================================================
// RESOURCES

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: sirsaugsage (https://sketchfab.com/sirsausage)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/fantasy-game-inn-192bf30a7e28425ab385aef19769d4b0
Title: Fantasy Game Inn
*/

import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

const theMapModelFile = '/fantasy_game_inn.glb'

export default function Map(props) {
  const { nodes, materials } = useGLTF(theMapModelFile)

  return (
    <RigidBody type="fixed" colliders="trimesh" ccd>
      <group 
        {...props} 
        dispose={null}
      >
        <mesh castShadow receiveShadow geometry={nodes.TheInn_bakeInn_0.geometry}>
          <meshStandardMaterial map={materials.bakeInn.map} />
        </mesh>
      </group>
    </RigidBody>
  )
}

useGLTF.preload(theMapModelFile)
