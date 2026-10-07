import { Link, Route, Routes } from 'react-router'
import Seo from '@/components/seo/Seo'
import { AuthProvider } from './auth'
import { ChatDetail, ChatsList } from './Chats'
import Dashboard from './Dashboard'
import { LeadDetail, LeadsList } from './Leads'
import Login from './Login'
import Menu from './Menu'
import { PostEditor, PostsList } from './Posts'
import Projects from './Projects'
import Settings from './Settings'
import Shell from './Shell'
import Team from './Team'
import Texts from './Texts'
import { ToastProvider } from './ui'

function AdminNotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-2xl normal-case">Page not found</h1>
      <Link to="/admin" className="mt-3 inline-block font-semibold text-highlight hover:underline">
        Back to the dashboard
      </Link>
    </div>
  )
}

// Everything under /admin. Lazy-loaded by App.jsx so none of this ships to normal visitors.
export default function AdminApp() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Seo title="Admin" noindex />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route element={<Shell />}>
            <Route index element={<Dashboard />} />
            <Route path="leads" element={<LeadsList />} />
            <Route path="leads/:id" element={<LeadDetail />} />
            <Route path="chats" element={<ChatsList />} />
            <Route path="chats/:id" element={<ChatDetail />} />
            <Route path="posts" element={<PostsList />} />
            <Route path="posts/:id" element={<PostEditor />} />
            <Route path="team" element={<Team />} />
            <Route path="projects" element={<Projects />} />
            <Route path="texts" element={<Texts />} />
            <Route path="menu" element={<Menu />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<AdminNotFound />} />
          </Route>
        </Routes>
      </ToastProvider>
    </AuthProvider>
  )
}
