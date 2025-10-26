import { useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import TechRadar from './components/TechRadar'
import CommandPalette from './components/CommandPalette'

export default function App() {
  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top: y, behavior: 'smooth' })
  }, [])

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <Navbar onNav={scrollTo} />

      <main>
        <section id="home" className="scroll-mt-24">
          <Hero onPrimary={() => scrollTo('projects')} />
        </section>

        <section id="about" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">About Me</h2>
          <p className="mt-3 text-neutral-300 max-w-3xl">
            I’m a software developer focused on building playful, modern, and accessible products. I love TypeScript,
            React, and cloud-native architectures. This portfolio showcases selected work, an interactive Tech Radar,
            and a handy command palette for quick navigation.
          </p>
        </section>

        <section id="projects" className="scroll-mt-24">
          <Projects />
        </section>

        <section id="stack" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Tech Stack Radar</h2>
              <p className="text-neutral-300 mt-1">Hover to explore, use left/right arrow keys to rotate.</p>
            </div>
          </div>
          <TechRadar />
        </section>

        <section id="contact" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Contact</h2>
          <div className="mt-4 grid gap-4 sm:max-w-xl">
            <a href="mailto:dev@example.com" className="inline-flex items-center justify-center rounded-md bg-cyan-400 text-black font-semibold px-4 py-2 hover:bg-cyan-300 transition-colors">Email Me</a>
            <div className="text-sm text-neutral-400">Open to roles and collaborations.</div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 mt-8">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-neutral-400 flex items-center justify-between">
          <p>© {new Date().getFullYear()} Your Name</p>
          <p className="hidden sm:block">Built with React, Vite, Tailwind</p>
        </div>
      </footer>

      <CommandPalette onRun={(id) => {
        if (id === 'go-about') scrollTo('about')
        if (id === 'go-projects') scrollTo('projects')
        if (id === 'go-stack') scrollTo('stack')
        if (id === 'go-contact') scrollTo('contact')
      }} />
    </div>
  )
}
