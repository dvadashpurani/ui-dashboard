
import React, { useState } from 'react';
import { 
  Filter, 
  Download, 
  Search, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown
} from 'lucide-react';
import { MOCK_SESSIONS } from '../constants';

export default function Logs() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = MOCK_SESSIONS.filter(s => 
    s.app.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.includes(searchTerm)
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dictation Logs</h1>
          <p className="text-zinc-500 mt-1">Detailed history of all voice-to-text sessions across your apps.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-all">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-all">
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-4 bg-zinc-950/50 border-b border-zinc-800">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              type="text" 
              placeholder="Search by app or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-950/50 text-zinc-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-zinc-300">
                    ID <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="px-6 py-4 font-medium">Timestamp</th>
                <th className="px-6 py-4 font-medium">Application</th>
                <th className="px-6 py-4 font-medium">Word Count</th>
                <th className="px-6 py-4 font-medium">Duration</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filtered.map((session) => (
                <tr key={session.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4 text-sm mono text-zinc-400">#{session.id}</td>
                  <td className="px-6 py-4 text-sm text-zinc-300">
                    {new Date(session.timestamp).toLocaleDateString()}
                    <span className="text-zinc-500 ml-2">
                      {new Date(session.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium px-2 py-1 bg-zinc-800 rounded border border-zinc-700">
                      {session.app}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-300 font-semibold">{session.wordCount}</td>
                  <td className="px-6 py-4 text-sm text-zinc-400">{Math.floor(session.duration / 60)}m {session.duration % 60}s</td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center w-2 h-2 rounded-full mr-2 ${
                      session.status === 'completed' ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}></span>
                    <span className="text-xs font-medium capitalize">{session.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-zinc-800 rounded transition-all text-zinc-500 hover:text-zinc-100">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-zinc-800 bg-zinc-950/50 flex items-center justify-between">
          <p className="text-xs text-zinc-500 font-medium">Showing 1 to {filtered.length} of {MOCK_SESSIONS.length} results</p>
          <div className="flex items-center gap-2">
            <button disabled className="p-2 border border-zinc-800 rounded hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
              <ChevronLeft size={16} />
            </button>
            <button className="p-2 border border-zinc-800 rounded hover:bg-zinc-800 transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
