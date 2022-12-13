/*
This file was generated by https://github.com/pmndrs/gltfjsx and then
customized manually. It uses drei's new useAnimations hook which extracts
all actions and sets up a THREE.AnimationMixer for it so that you don't have to.
All of the assets actions, action-names and clips are available in its output.
*/

import React, { useEffect, useState } from 'react'
import { useGLTF, useTexture, useAnimations } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'

export default function Model(props) {
  // Fetch model and a separate texture
  const { nodes, animations } = useGLTF('objects/examples/stacy.glb')
  const texture = useTexture('objects/examples/stacy.jpg')

  // Extract animation actions
  const { ref, actions, names } = useAnimations(animations)

  // Hover and animation-index states
  const [hovered, setHovered] = useState(false)
  const [index, setIndex] = useState(4)

  // Animate the selection halo
  const { color, scale } = useSpring({
    scale: hovered ? [1.15, 1.15, 1] : [1, 1, 1],
    color: hovered ? 'hotpink' : 'aquamarine',
  })

  // Change cursor on hover-state
  useEffect(() => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'), [hovered])

  // Change animation when the index changes
  useEffect(() => {
    // Reset and fade in animation after an index has been changed
    actions[names[index]].reset().fadeIn(0.5).play()

    // In the clean-up phase, fade it out
    // (page route may have changed)
    if (actions[names[index]]) {
      return () => actions[names[index]].fadeOut(0.5)
    }
    return null
  }, [index, actions, names])

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        {/* actions */}
        <primitive object={nodes.mixamorigHips} />
        {/* model */}
        <skinnedMesh
          castShadow
          receiveShadow
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => setIndex((index + 1) % names.length)}
          geometry={nodes.stacy.geometry}
          skeleton={nodes.stacy.skeleton}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}>
          <meshStandardMaterial map={texture} map-flipY={false} skinning />
        </skinnedMesh>
      </group>
      {/* background circle */}
      {/* <a.mesh receiveShadow position={[0, 1, -1]} scale={scale}>
        <circleGeometry args={[1, 64]} />
        <a.meshStandardMaterial color={color} />
      </a.mesh> */}
    </group>
  )
}
