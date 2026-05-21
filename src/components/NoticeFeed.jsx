import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import NoticeCard from './NoticeCard'

const CATEGORIES = ['All', 'Academic', 'Event', 'Urgent', 'General']

export default function NoticeFeed({ session }) {
  const [notices, setNotices] = useState([])
  const [filter, setFilter] = useState('All')

  const fetchNotices = async () => {
    const { data } = await supabase
      .from('notices')
      .select('*')
      .order('created_at', { ascending: false })
    setNotices(data || [])
  }

  useEffect(() => {
    fetchNotices()
    const channel = supabase.channel('notices').on(
      'postgres_changes', { event: '*', schema: 'public', table: 'notices' }, fetchNotices
    ).subscribe()
    return () => supabase.removeChannel(channel)
  }, [])

  const filtered = filter === 'All' ? notices : notices.filter(n => n.category === filter)

  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <h1>📋 Campus Notice Board</h1>
          <p>Stay updated with the latest announcements, events, and academic notices from Bahria University.</p>
          <div className="hero-stats">
            <span>📢 {notices.length} Notices</span>
            <span>🎓 BSE-6A</span>
            <span>🏫 Bahria University</span>
          </div>
        </div>
      </div>

      <div className="feed">
        <div className="section-title">Latest Notices</div>
        <div className="filters">
          {CATEGORIES.map(c => (
            <button
              key={c}
              className={`filter-pill ${filter === c ? 'active' : ''}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔔</div>
            <p>No notices yet. Be the first to post!</p>
          </div>
        ) : (
          filtered.map(notice => (
            <NoticeCard key={notice.id} notice={notice} session={session} onDelete={fetchNotices} />
          ))
        )}
      </div>
    </>
  )
}