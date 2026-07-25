'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Collections', href: '#collections' },
  { label: 'New Arrivals', href: '#new-arrivals' },
  { label: 'Lookbook', href: '#lookbook' },
  { label: 'Journal', href: '#journal' },
  { label: 'Story', href: '#story' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-border bg-background/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-10">
        {/* Logo */}
        <a
          href="#top"
          className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-foreground md:text-base"
        >
          OutRider<span className="text-primary">.</span>
        </a>

        {/* Center nav */}
        <nav className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-sand transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-4 md:gap-6">
          <button
            aria-label="Search"
            className="text-foreground/90 transition-colors hover:text-sand"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </button>
          <button
            aria-label="Wishlist"
            className="hidden text-foreground/90 transition-colors hover:text-sand sm:block"
          >
            <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </button>
          <button
            aria-label="Shopping bag"
            className="relative text-foreground/90 transition-colors hover:text-sand"
          >
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-semibold text-primary-foreground">
              2
            </span>
          </button>
          <button
            aria-label="Open menu"
            className="text-foreground lg:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="font-mono text-sm font-bold uppercase tracking-[0.25em]">
                OutRider<span className="text-primary">.</span>
              </span>
              <button
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="border-b border-border py-4 font-mono text-2xl uppercase tracking-tight text-foreground"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
