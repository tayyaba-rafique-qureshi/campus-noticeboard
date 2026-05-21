import { supabase } from '../supabaseClient'

const categoryColors = {
  Academic: '#3b82f6',
  Event: '#8b5cf6',
  Urgent: '#ef4444',
  General: '#14b8a6'
}

const categoryEmoji = {
  Academic: '📚',
  Event: '🎉',
  Urgent: '🚨',
  General: '📌'
}

export default function NoticeCard({ notice, session, onDelete }) {
  const canDelete = session && session.user.id === notice.user_id

const handleDelete = async () => {
  const confirmed = window.confirm('Are you sure you want to delete this notice?')
  if (!confirmed) return
  const { error } = await supabase.from('notices').delete().eq('id', notice.id)
  if (!error) onDelete()
}

  const color = categoryColors[notice.category] || '#14b8a6'
  const emoji = categoryEmoji[notice.category] || '📌'

  return (
    <div className="card" style={{ borderLeft: `5px solid ${color}` }}>
      <div className="card-header">
        <span className="badge" style={{ background: color }}>
          {emoji} {notice.category}
        </span>
        {canDelete && (
          <button className="btn-delete" onClick={handleDelete} title="Delete notice">🗑️</button>
        )}
      </div>
      <h3>{notice.title}</h3>
      <p>{notice.body}</p>
      <div className="card-footer">
        <span className="card-meta">🕐 {new Date(notice.created_at).toLocaleString()}</span>
      </div>
    </div>
  )
}