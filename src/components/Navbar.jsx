export default function Navbar({ onNav }) {
  const link = 'px-3 py-1.5 rounded-md text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors'
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-neutral-950/70 border-b border-white/10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a
          href="#home"
          onClick={(e)=>{e.preventDefault(); onNav?.('home')}}
          className="font-black tracking-tight text-white"
        >DEV.PORTFOLIO</a>
        <div className="flex items-center gap-1">
          <a href="#about" onClick={(e)=>{e.preventDefault(); onNav?.('about')}} className={link}>About</a>
          <a href="#projects" onClick={(e)=>{e.preventDefault(); onNav?.('projects')}} className={link}>Projects</a>
          <a href="#stack" onClick={(e)=>{e.preventDefault(); onNav?.('stack')}} className={link}>Stack</a>
          <a href="#contact" onClick={(e)=>{e.preventDefault(); onNav?.('contact')}} className={link}>Contact</a>
          <span className="hidden sm:inline-flex ml-2 rounded bg-white/5 px-2 py-1 text-xs text-neutral-300">⌘K</span>
        </div>
      </nav>
    </header>
  )
}
