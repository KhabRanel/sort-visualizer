import { Outlet } from 'react-router'

import { Header } from '../Header/Header'

export function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        <Outlet />
      </main>
      <footer className="layout__footer">
        Курсовая работа по JavaScript, 2026
      </footer>
    </div>
  )
}
