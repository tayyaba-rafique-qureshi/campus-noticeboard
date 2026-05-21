import { useState } from 'react'
import { supabase } from '../supabaseClient'

const CATEGORIES = ['Academic', 'Event', 'Urgent', 'General']

export default function PostForm({ session, onClose }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('General')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('notices').insert({
      title, body, category, user_id: session.user.id
    })
    if (error) setError(error.message)
    else onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>Post a Notice</h2>
        <form onSubmit={submit}>
          <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
          <textarea placeholder="Body" value={body} onChange={e => setBody(e.target.value)} required />
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          {error && <p className="error">{error}</p>}
          <button className="btn-primary" type="submit">Post Notice</button>
        </form>
      </div>
    </div>
  )
}