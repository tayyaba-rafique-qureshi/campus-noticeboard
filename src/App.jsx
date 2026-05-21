import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Navbar from './components/Navbar'
import NoticeFeed from './components/NoticeFeed'
import AuthForm from './components/AuthForm'
import PostForm from './components/PostForm'
import './App.css'

export default function App() {
  const [session, setSession] = useState(null)
  const [showAuth, setShowAuth] = useState(false)
  const [showPost, setShowPost] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    supabase.auth.onAuthStateChange((_event, session) => setSession(session))
  }, [])

  return (
    <div className="app">
      <Navbar session={session} onAuthClick={() => setShowAuth(true)} />
      {showAuth && !session && <AuthForm onClose={() => setShowAuth(false)} />}
      <NoticeFeed session={session} />
      {session && (
        <button className="fab" onClick={() => setShowPost(!showPost)}>+</button>
      )}
      {showPost && session && <PostForm session={session} onClose={() => setShowPost(false)} />}
    </div>
  )
}