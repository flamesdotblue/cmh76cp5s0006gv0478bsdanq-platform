import { useEffect, useRef } from 'react'

// Unique feature: Interactive Tech Radar (hover to reveal, arrow keys to rotate)
export default function TechRadar() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const c = canvasRef.current
    const ctx = c.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    const tech = [
      { name: 'React', ring: 1, angle: 10 },
      { name: 'TypeScript', ring: 1, angle: 50 },
      { name: 'Node.js', ring: 2, angle: 105 },
      { name: 'Tailwind', ring: 2, angle: 160 },
      { name: 'PostgreSQL', ring: 3, angle: 215 },
      { name: 'AWS', ring: 3, angle: 270 }
    ]

    let rotation = -20 * Math.PI/180
    const mouse = { x: 0, y: 0, active: false }

    const resize = () => {
      const size = Math.min(c.parentElement.clientWidth, 520)
      c.width = size * dpr
      c.height = size * dpr
      c.style.width = c.style.height = size + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    const draw = () => {
      const w = c.width / dpr
      const h = c.height / dpr
      ctx.clearRect(0,0,w,h)

      const cx = w/2, cy = h/2
      const maxR = Math.min(w,h)/2 - 10

      const grad = ctx.createRadialGradient(cx, cy, maxR*0.1, cx, cy, maxR)
      grad.addColorStop(0, 'rgba(34,211,238,0.08)')
      grad.addColorStop(1, 'rgba(255,255,255,0.02)')
      ctx.fillStyle = grad
      ctx.beginPath(); ctx.arc(cx,cy,maxR,0,Math.PI*2); ctx.fill()

      for (let i=1;i<=3;i++) {
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(255,255,255,0.12)'
        ctx.arc(cx, cy, (i/3)*maxR, 0, Math.PI*2)
        ctx.stroke()
      }

      for (let i=0;i<4;i++) {
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(rotation + i*Math.PI/2)
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(255,255,255,0.08)'
        ctx.moveTo(0,0)
        ctx.lineTo(maxR,0)
        ctx.stroke()
        ctx.restore()
      }

      tech.forEach(t => {
        const r = (t.ring/3) * maxR
        const a = rotation + t.angle * Math.PI/180
        const x = cx + Math.cos(a)*r
        const y = cy + Math.sin(a)*r
        const hovered = mouse.active && Math.hypot(mouse.x-x, mouse.y-y) < 16
        ctx.beginPath()
        ctx.fillStyle = hovered ? '#22d3ee' : 'rgba(255,255,255,0.9)'
        ctx.arc(x,y, hovered ? 6 : 4, 0, Math.PI*2)
        ctx.fill()
        ctx.font = '12px ui-sans-serif,system-ui,-apple-system'
        ctx.fillStyle = 'rgba(255,255,255,'+(hovered?1:0.7)+')'
        ctx.fillText(t.name, x+8, y+4)
      })
    }

    const onMove = (e) => {
      const rect = c.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
      draw()
    }
    const onLeave = () => { mouse.active = false; draw() }
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') { rotation -= 0.1; draw() }
      if (e.key === 'ArrowRight') { rotation += 0.1; draw() }
    }

    window.addEventListener('resize', resize)
    window.addEventListener('keydown', onKey)
    c.addEventListener('mousemove', onMove)
    c.addEventListener('mouseleave', onLeave)
    resize()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('keydown', onKey)
      c.removeEventListener('mousemove', onMove)
      c.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="flex flex-col items-start gap-3">
      <canvas ref={canvasRef} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur" aria-label="Interactive tech radar" />
      <p className="text-sm text-neutral-400">Hover to explore. Use ← → to rotate.</p>
    </div>
  )
}
