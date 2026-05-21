import { supabase } from '../supabaseClient'

export default function Navbar({ session, onAuthClick }) {
  const signOut = () => supabase.auth.signOut()

  return (
    <nav className="navbar">
      <div className="nav-brand">📋 Campus Notice Board</div>
      <div className="nav-auth">
        {session ? (
          <>
            <span className="nav-email">{session.user.email}</span>
            <button className="btn-outline" onClick={signOut}>Sign Out</button>
          </>
        ) : (
          <button className="btn-primary" onClick={onAuthClick}>Sign In / Register</button>
        )}
      </div>
    </nav>
  )
}