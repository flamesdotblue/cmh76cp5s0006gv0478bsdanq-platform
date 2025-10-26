import { motion } from 'framer-motion'
import { ExternalLink, Star } from 'lucide-react'

const projects = [
  {
    title: 'Realtime Collaboration Suite',
    desc: 'Operational transforms with CRDT fallbacks, websockets, and conflict-free presence.',
    tags: ['TypeScript', 'React', 'CRDT', 'WebSocket'],
    link: 'https://example.com/collab'
  },
  {
    title: 'Edge-first E-commerce',
    desc: 'Serverless functions, streaming SSR, and ISR for global storefront performance.',
    tags: ['Next.js', 'Edge', 'Vercel', 'Stripe'],
    link: 'https://example.com/shop'
  },
  {
    title: 'ML-driven Code Review Bot',
    desc: 'Analyzes PRs, predicts risky diffs, and suggests refactors with LLMs.',
    tags: ['Python', 'LLM', 'LangChain', 'GitHub Apps'],
    link: 'https://example.com/ml-bot'
  }
]

export default function Projects() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Highlighted Projects</h2>
          <p className="text-neutral-300 mt-1">A curated selection of things I loved building recently.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-amber-500">
          <Star size={18} />
          <span className="text-sm">Open-source friendly</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.06, type: 'spring', stiffness: 120, damping: 16 }}
            className="group rounded-xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur hover:bg-white/10 hover:-translate-y-0.5 transition-all"
          >
            <div className="h-32 bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20" />
            <div className="p-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <ExternalLink size={18} className="text-neutral-400 group-hover:text-neutral-200" />
              </div>
              <p className="text-sm text-neutral-300 mt-1">{p.desc}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map(t => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10 text-neutral-200">{t}</span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  )
}
