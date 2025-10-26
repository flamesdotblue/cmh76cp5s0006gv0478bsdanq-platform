import { Rocket, Github, Linkedin } from 'lucide-react'
import { useEffect, useRef } from 'react'

export default function Hero({ onPrimary }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      el.style.setProperty('--rx', String(y * -5))
      el.style.setProperty('--ry', String(x * 7))
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -left-32 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute top-10 right-0 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-3xl" />
      </div>

      <div
        ref={containerRef}
        className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pt-14 pb-10 md:grid-cols-2"
        style={{ transform: 'perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))', transition: 'transform 120ms ease-out' }}
      >
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur px-3 py-1 mb-4">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-neutral-300">Open for opportunities</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight">Building playful, modern software</h1>
          <p className="mt-4 text-lg text-neutral-300 max-w-prose">
            Explore my work, tech stack, and experiments. Subtle parallax reacts to your cursor — move around.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={onPrimary} className="rounded-lg bg-cyan-400 text-black px-4 py-2 font-semibold hover:bg-cyan-300 transition-colors inline-flex items-center gap-2">
              <Rocket size={18} /> See Projects
            </button>
            <a href="https://github.com/yourhandle" target="_blank" rel="noreferrer" className="rounded-lg border border-white/15 px-4 py-2 font-semibold hover:bg-white/5 transition-colors inline-flex items-center gap-2">
              <Github size={18} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/yourhandle" target="_blank" rel="noreferrer" className="rounded-lg border border-white/15 px-4 py-2 font-semibold hover:bg-white/5 transition-colors inline-flex items-center gap-2">
              <Linkedin size={18} /> LinkedIn
            </a>
          </div>
        </div>

        <SceneCard />
      </div>
    </section>
  )
}

function SceneCard() {
  return (
    <div className="relative w-full aspect-square">
      <div className="absolute inset-0 rounded-xl border border-white/10 bg-gradient-to-br from-cyan-400/15 via-transparent to-fuchsia-400/15" />
      <div className="absolute inset-0 rounded-xl p-6 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 drop-shadow-xl">
            <defs>
              <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <path d="M48.1,-58.3C62.9,-49.5,75.3,-35.6,79.3,-19.7C83.2,-3.8,78.8,14.1,69.8,29.3C60.8,44.5,47.2,57,31.7,63.7C16.3,70.4,-1,71.4,-17.4,66.9C-33.8,62.3,-49.3,52.2,-59.1,38.1C-69,24,-73.1,6,-70.7,-10.4C-68.2,-26.8,-59.1,-41.6,-46.5,-51.7C-33.9,-61.8,-17,-67.2,-0.6,-66.3C15.7,-65.4,31.4,-58.1,48.1,-58.3Z" transform="translate(100 100)" fill="url(#g)" />
          </svg>
        </div>
        <div className="text-xs text-neutral-300/90 mt-4">
          Generative blob: Lightweight SVG accent acting as a hero visual without extra packages.
        </div>
      </div>
    </div>
  )
}
