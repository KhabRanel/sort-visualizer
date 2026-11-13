import { NavLink } from 'react-router'

const links: { to: string, label: string }[] = [
  { to: '/', label: 'Главная' },
  { to: '/algorithms', label: 'Алгоритмы' },
  { to: '/compare', label: 'Сравнение' },
]

export function Header() {
  return (
    <header className="header">
      <span className="header__logo">Sort Visualizer</span>
      <nav className="header__nav">
        {links.map((link) => (
          <NavLink className="header__link" end={link.to === '/'} key={link.to} to={link.to}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
