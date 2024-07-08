import { useGLTF, useAnimations } from "@react-three/drei"
import { useEffect, useRef, Suspense } from "react"
import * as THREE from "three"
import { useGame, type AnimationSet } from '#/lib/ecctrl/src/stores/useGame'
import React from "react"

export function EcctrlAnimation(props: EcctrlAnimationProps) {
  // Change the character src to yours
  const group = useRef()
  const { animations } = useGLTF(props.characterURL)
  const { actions } = useAnimations(animations, group)

  /**
   * Character animations setup
   */
  const curAnimation = useGame((state) => state.curAnimation)
  const resetAnimation = useGame((state) => state.reset)
  const initializeAnimationSet = useGame(
    (state) => state.initializeAnimationSet
  )

  useEffect(() => {
    // Initialize animation set
    initializeAnimationSet(props.animationSet)
  }, [])

  useEffect(() => {
  try {
    // Play animation
    const action =
      actions[curAnimation ? curAnimation : props.animationSet.jumpIdle]

    // For jump and jump land animation, only play once and clamp when finish
    if (
      curAnimation === props.animationSet.jump ||
      curAnimation === props.animationSet.jumpLand ||
      curAnimation === props.animationSet.action1 ||
      curAnimation === props.animationSet.action2 ||
      curAnimation === props.animationSet.action3 ||
      curAnimation === props.animationSet.action4
    ) {
      action
        .reset()
        .fadeIn(0.2)
        .setLoop(THREE.LoopOnce, undefined as number)
        .play()
      action.clampWhenFinished = true
    } else {
      try {
        action.reset().fadeIn(0.2).play()
      } catch (ERROR) {
        console.debug('ERROR: action', ERROR)
      }
    }

    // When any action is clamp and finished reset animation
    (action as any)._mixer.addEventListener("finished", () => resetAnimation())

    return () => {
      // Fade out previous action
      action.fadeOut(0.2)

      // Clean up mixer listener, and empty the _listeners array
      ;(action as any)._mixer.removeEventListener("finished", () =>
        resetAnimation()
      )
      (action as any)._mixer._listeners = []
    }
  } catch (ERROR) {
    console.debug('ERROR: useEffect curAnimation', ERROR)
  }
  }, [curAnimation])

  return (
    <Suspense fallback={null}>
      <group ref={group} dispose={null} userData={{ camExcludeCollision: true }}>
        {/* Replace character model here */}
        {props.children}
      </group>
    </Suspense>
  )
}

export type EcctrlAnimationProps = {
  characterURL: string
  animationSet: AnimationSet
  children: React.ReactNode
}
