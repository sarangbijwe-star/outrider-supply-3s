'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useCart } from '@/components/cart/cart-context'
import { OutriderLogo } from '@/components/ors-logo'
import { NAV_LINKS, SITE } from '@/lib/site'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const searchRef = useRef<HTMLInputElement>(null)
  const { cart, open } = useCart()
  const count = cart?.totalQuantity ?? 0

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

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [pathname])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  const solid = scrolled || searchOpen || pathname !== '/'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? 'border-b border-border bg-background/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-10">
        {/* Logo */}
        <Link href="/" aria-label={`${SITE.name} home`}>
          <OutriderLogo />
        </Link>

        {/* Center nav */}
        <nav className="hidden items-center gap-8 lg:flex xl:gap-9" aria-label="Main">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:text-foreground ${
                  active ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-sand transition-all duration-300 group-hover:w-full ${
                    active ? 'w-full' : 'w-0'
                  }`}
                />
              </Link>
            )
          })}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-5 md:gap-6">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
            className="text-foreground/90 transition-colors hover:text-sand"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </button>
          <button
            aria-label={`Shopping bag, ${count} item${count === 1 ? '' : 's'}`}
            onClick={open}
            className="relative text-foreground/90 transition-colors hover:text-sand"
          >
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[9px] font-semibold text-background">
                {count}
              </span>
            )}
          </button>
          <button aria-label="Open menu" className="text-foreground lg:hidden" onClick={() => setMenuOpen(true)}>
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.form
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            onSubmit={(e) => {
              e.preventDefault()
              const q = searchRef.current?.value.trim()
              if (q) router.push(`/search?q=${encodeURIComponent(q)}`)
            }}
            className="overflow-hidden border-t border-border"
            role="search"
          >
            <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-5 py-4 md:px-10">
              <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <input
                ref={searchRef}
                type="search"
                name="q"
                placeholder="Search tees, graphics, fits…"
                aria-label="Search products"
                className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}>
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

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
              <OutriderLogo compact />
              <button aria-label="Close menu" onClick={() => setMenuOpen(false)}>
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-6" aria-label="Mobile">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-border py-4 font-mono text-2xl uppercase tracking-tight text-foreground"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <p className="px-6 pb-10 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {SITE.tagline}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
