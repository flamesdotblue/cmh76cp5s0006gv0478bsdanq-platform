import { useEffect, useMemo, useState } from 'react'
import { Command, Home, FolderGit2, User, Mail } from 'lucide-react'

const defaultCommands = [
  { id: 'go-about', label: 'Go to About' },
  { id: 'go-projects', label: 'Go to Projects' },
  { id: 'go-stack', label: 'Go to Tech Stack' },
  { id: 'go-contact', label: 'Go to Contact' },
  { id: 'email', label: 'Email Developer', action: () => window.open('mailto:dev@example.com?subject=Hello&body=Hi!') },
]

export default function CommandPalette({ onRun }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      }
      if (open && e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const items = useMemo(() => {
    const q = query.trim().toLowerCase()
    return defaultCommands.filter(c => c.label.toLowerCase().includes(q))
  }, [query])

  useEffect(() => { if (!open) setQuery('') }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 backdrop-blur px-4 py-2 shadow-sm hover:bg-white/15"
        aria-label="Open Command Palette"
      >
        <Command size={16} /> <span className="text-sm">Search</span>
        <kbd className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-white/10 border border-white/10">⌘K</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute left-1/2 top-[15vh] -translate-x-1/2 w-[92vw] max-w-xl rounded-xl border border-white/10 bg-neutral-950">
            <div className="border-b border-white/10 p-3">
              <div className="flex items-center gap-2">
                <Command size={16} className="text-neutral-400" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e)=>setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent outline-none text-sm placeholder:text-neutral-500"
                />
              </div>
            </div>
            <div className="max-h-[50vh] overflow-auto p-2">
              {items.length === 0 && (
                <p className="text-sm text-neutral-500 p-3">No results.</p>
              )}
              <ul className="mt-1">
                {items.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        item.action?.();
                        if (!item.action) onRun?.(item.id)
                        setOpen(false)
                      }}
                      className="w-full text-left px-2 py-2 rounded-md hover:bg-white/5 flex items-center gap-2"
                    >
                      {iconFor(item.id)}
                      <span className="text-sm">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function iconFor(id) {
  if (id === 'go-about') return <User size={16} className="text-neutral-500" />
  if (id === 'go-projects') return <FolderGit2 size={16} className="text-neutral-500" />
  if (id === 'go-stack') return <Home size={16} className="text-neutral-500" />
  if (id === 'go-contact') return <Mail size={16} className="text-neutral-500" />
  return <Command size={16} className="text-neutral-500" />
}
