import { createBrowserRouter } from 'react-router'

import { Layout } from './components/Layout/Layout'
import { AlgorithmsPage } from './pages/AlgorithmsPage/AlgorithmsPage'
import { ComparePage } from './pages/ComparePage/ComparePage'
import { HomePage } from './pages/HomePage/HomePage'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage'
import { VisualizerPage } from './pages/VisualizerPage/VisualizerPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'algorithms', element: <AlgorithmsPage /> },
      { path: 'algorithms/:algorithmId', element: <VisualizerPage /> },
      { path: 'compare', element: <ComparePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
