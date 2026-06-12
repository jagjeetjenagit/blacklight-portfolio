import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { focusFX } from '../fx'

/* Soft round glow sprite, generated locally — no asset fetch */
function makeGlowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.25, 'rgba(190,225,255,.7)')
  g.addColorStop(0.6, 'rgba(140,200,255,.22)')
  g.addColorStop(1, 'rgba(120,190,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(c)
}

/* Suction frame shared by all clouds: the hovered video's rectangle,
   projected into the particle world (computed once per frame in Rig).
   Particles are drawn to the nearest point on the frame's OUTLINE, so
   the video appears to drink energy through its edges and corners. */
const worldTarget = new THREE.Vector3()
const worldRightPt = new THREE.Vector3()
const worldTopPt = new THREE.Vector3()
const localC = new THREE.Vector3()
const uVec = new THREE.Vector3()
const vVec = new THREE.Vector3()
const tmpV = new THREE.Vector3()

/* absorption events (world coords) waiting for a free burst sprite */
const burstQueue = []

/* One drifting cloud of additive glow points.
   While the pointer is over a video, the cloud gets DRAINED into it:
   particles spiral toward the video, accelerate as they close in,
   are absorbed at the frame, and respawn out in the dark. */
function Dust({ count, size, spread, depth, speed, opacity, color, warpSpeed = 2.4 }) {
  const ref = useRef()
  const matRef = useRef()
  const warp = useRef(0)
  const tex = useMemo(makeGlowTexture, [])
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * spread
      a[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.65
      a[i * 3 + 2] = (Math.random() - 0.5) * depth
    }
    return a
  }, [count, spread, depth])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    const w = (warp.current += ((focusFX.active ? 1 : 0) - warp.current) * 0.045)
    // the swirl keeps spinning during the drain so the inflow spirals
    ref.current.rotation.y += dt * speed * (1 + w * 1.6)
    ref.current.position.y = Math.sin(t * 0.07 * (1 + speed)) * 0.35
    matRef.current.opacity = opacity * (1 + w * 0.6)
    matRef.current.size = size * (1 + w * 0.3)

    if (w > 0.01) {
      const obj = ref.current
      // the video frame's center and edge basis vectors, in this cloud's
      // local (rotated) space — recomputed every frame
      localC.copy(worldTarget); obj.worldToLocal(localC)
      uVec.copy(worldRightPt); obj.worldToLocal(uVec); uVec.sub(localC)
      const halfX = uVec.length() || 1; uVec.divideScalar(halfX)
      vVec.copy(worldTopPt); obj.worldToLocal(vVec); vVec.sub(localC)
      const halfY = vVec.length() || 1; vVec.divideScalar(halfY)

      const pos = obj.geometry.attributes.position
      const arr = pos.array
      const base = dt * w * warpSpeed
      for (let i = 0; i < count; i++) {
        const ix = i * 3
        const dx = arr[ix] - localC.x
        const dy = arr[ix + 1] - localC.y
        const dz = arr[ix + 2] - localC.z
        // project onto the frame plane, clamp to the rectangle...
        const a = dx * uVec.x + dy * uVec.y + dz * uVec.z
        const b = dx * vVec.x + dy * vVec.y + dz * vVec.z
        let ca = Math.max(-halfX, Math.min(halfX, a))
        let cb = Math.max(-halfY, Math.min(halfY, b))
        // ...and if the particle floats over the frame, snap the target
        // outward to the nearest edge so energy enters at the borders
        if (Math.abs(a) < halfX && Math.abs(b) < halfY) {
          if (halfX - Math.abs(a) < halfY - Math.abs(b)) ca = a < 0 ? -halfX : halfX
          else cb = b < 0 ? -halfY : halfY
        }
        const txp = localC.x + uVec.x * ca + vVec.x * cb
        const typ = localC.y + uVec.y * ca + vVec.y * cb
        const tzp = localC.z + uVec.z * ca + vVec.z * cb
        const ddx = txp - arr[ix]
        const ddy = typ - arr[ix + 1]
        const ddz = tzp - arr[ix + 2]
        const d = Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz) || 1
        if (d < 0.22) {
          // impact! flash a small energy burst where it hit the frame...
          if (burstQueue.length < 24 && Math.random() < 0.65) {
            tmpV.set(arr[ix], arr[ix + 1], arr[ix + 2])
            obj.localToWorld(tmpV)
            burstQueue.push({ x: tmpV.x, y: tmpV.y, z: tmpV.z })
          }
          // ...then respawn far out in the field
          arr[ix] = (Math.random() - 0.5) * spread
          arr[ix + 1] = (Math.random() - 0.5) * spread * 0.65
          arr[ix + 2] = (Math.random() - 0.5) * depth
          continue
        }
        // gravity-well pull: a slow drift far away, gathering speed
        // near the frame — gravity, not teleport
        const pull = base * (0.5 + ((i % 7) / 7)) * (1 + 2.2 / (d + 0.6))
        const k = Math.min(pull / d, 0.12)
        arr[ix] += ddx * k
        arr[ix + 1] += ddy * k
        arr[ix + 2] += ddz * k
      }
      pos.needsUpdate = true
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        map={tex}
        size={size}
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

/* Tiny energy explosions where particles hit the frame: a pooled set of
   additive glow sprites that flash bright, swell, and fade in ~half a second */
function Bursts({ poolSize = 22 }) {
  const group = useRef()
  const tex = useMemo(makeGlowTexture, [])
  const pool = useMemo(
    () => Array.from({ length: poolSize }, () => ({ life: 0, x: 0, y: 0, z: 0, max: 1 })),
    [poolSize],
  )

  useFrame((_, dt) => {
    while (burstQueue.length) {
      const b = burstQueue.pop()
      const free = pool.find((p) => p.life <= 0)
      if (!free) { burstQueue.length = 0; break }
      free.life = 1
      free.x = b.x; free.y = b.y; free.z = b.z
      free.max = 0.5 + Math.random() * 0.45
    }
    for (let i = 0; i < pool.length; i++) {
      const p = pool[i]
      const s = group.current.children[i]
      if (p.life > 0) {
        p.life -= dt * 2.1
        const grown = 1 - Math.max(p.life, 0)
        s.position.set(p.x, p.y, p.z)
        s.scale.setScalar(p.max * (0.2 + grown * 1.5))
        s.material.opacity = Math.max(p.life, 0) ** 1.5 * 0.85
        s.visible = true
      } else {
        s.visible = false
      }
    }
  })

  return (
    <group ref={group}>
      {Array.from({ length: poolSize }).map((_, i) => (
        <sprite key={i} visible={false}>
          <spriteMaterial
            map={tex}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            color={i % 5 === 0 ? '#eaf6ff' : '#9fd4ff'}
          />
        </sprite>
      ))}
    </group>
  )
}

/* Camera drifts toward the pointer; dollies in slightly while a video
   drinks the field. Also projects the hovered video's screen position
   onto the z=0 plane of the particle world for the suction target. */
const rayDir = new THREE.Vector3()
function Rig() {
  const { camera } = useThree()
  const m = useRef({ x: 0, y: 0 })
  const warp = useRef(0)
  useEffect(() => {
    const onMove = (e) => {
      m.current.x = (e.clientX / innerWidth) * 2 - 1
      m.current.y = (e.clientY / innerHeight) * 2 - 1
    }
    addEventListener('mousemove', onMove)
    return () => removeEventListener('mousemove', onMove)
  }, [])
  useFrame(() => {
    const w = (warp.current += ((focusFX.active ? 1 : 0) - warp.current) * 0.05)
    camera.position.x += (m.current.x * 0.7 - camera.position.x) * 0.025
    camera.position.y += (-m.current.y * 0.45 - camera.position.y) * 0.025
    camera.position.z += (6 - w * 0.8 - camera.position.z) * 0.05
    camera.lookAt(0, 0, 0)

    const project = (out, nx, ny) => {
      rayDir.set(nx, ny, 0.5).unproject(camera).sub(camera.position).normalize()
      const t = -camera.position.z / (rayDir.z || -1)
      out.copy(camera.position).addScaledVector(rayDir, Math.abs(t))
    }
    project(worldTarget, focusFX.nx, focusFX.ny)
    project(worldRightPt, focusFX.nx + focusFX.rw, focusFX.ny)
    project(worldTopPt, focusFX.nx, focusFX.ny + focusFX.rh)
  })
  return null
}

export default function Particles() {
  return (
    <div className="particles" aria-hidden="true">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      >
        <Rig />
        {/* fine magical dust */}
        <Dust count={1100} size={0.045} spread={16} depth={7} speed={0.014} opacity={0.5} color="#bfe0ff" warpSpeed={1.4} />
        {/* drifting fireflies */}
        <Dust count={70} size={0.32} spread={14} depth={6} speed={-0.02} opacity={0.28} color="#9fd4ff" warpSpeed={1.0} />
        {/* large out-of-focus bokeh orbs */}
        <Dust count={14} size={1.6} spread={13} depth={5} speed={0.01} opacity={0.1} color="#7ab8ff" warpSpeed={0.55} />
        <Bursts />
      </Canvas>
    </div>
  )
}
