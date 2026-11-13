import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <div className="page">
      <h1>404</h1>
      <p>Такой страницы нет.</p>
      <Link to="/">На главную</Link>
    </div>
  )
}
