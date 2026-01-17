
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Clock, 
  TrendingUp, 
  MessageSquare,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { MOCK_SESSIONS } from '../constants';
import { getDictationInsight } from '../services/geminiService';

const CHART_DATA = [
  { name: 'Mon', value: 420 },
  { name: 'Tue', value: 380 },
  { name: 'Wed', value: 510 },
  { name: 'Thu', value: 680 },
  { name: 'Fri', value: 490 },
  { name: 'Sat', value: 210 },
  { name: 'Sun', value: 150 },
];

const StatCard = ({ label, value, change, icon: Icon, color }: any) => (
  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-all group">
    <div className="flex items-start justify-between">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div className={`flex items-center gap-1 text-xs font-medium ${change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
        {change >= 0 ? '+' : ''}{change}%
        <ArrowUpRight size={14} className={change < 0 ? 'rotate-90' : ''} />
      </div>
    </div>
    <div className="mt-4">
      <p className="text-zinc-500 text-sm font-medium">{label}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  </div>
);

export default function Dashboard() {
  const [insight, setInsight] = useState<string>("Analyzing your latest sessions...");
  const [loadingInsight, setLoadingInsight] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      setLoadingInsight(true);
      const res = await getDictationInsight(MOCK_SESSIONS);
      setInsight(res);
      setLoadingInsight(false);
    };
    fetchInsight();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Productivity Dashboard</h1>
          <p className="text-zinc-500 mt-1">Monitor your voice dictation performance and efficiency gains.</p>
        </div>
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Live Sync Active
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Words" value="12,482" change={12.5} icon={MessageSquare} color="bg-indigo-600" />
        <StatCard label="Time Saved" value="14.2h" change={8.2} icon={Clock} color="bg-violet-600" />
        <StatCard label="Accuracy" value="99.4%" change={0.4} icon={Zap} color="bg-amber-600" />
        <StatCard label="Daily Goal" value="84%" change={-2.1} icon={TrendingUp} color="bg-emerald-600" />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Trend Chart */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-semibold text-lg">Weekly Usage</h3>
              <p className="text-sm text-zinc-500">Word count metrics across the last 7 days</p>
            </div>
            <select className="bg-zinc-950 border border-zinc-800 text-xs rounded-lg px-2 py-1 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#71717a" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#71717a" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(val) => `${val}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#fafafa' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#6366f1" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight Sidebar */}
        <div className="space-y-6">
          <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sparkles size={64} className="text-indigo-400" />
            </div>
            <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-3">
              <Sparkles size={18} />
              AI Insights
            </div>
            <p className={`text-sm leading-relaxed text-zinc-200 ${loadingInsight ? 'animate-pulse' : ''}`}>
              {insight}
            </p>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-indigo-400 font-bold">Powered by Gemini</span>
              <button className="text-xs text-indigo-400 font-medium hover:underline flex items-center gap-1">
                View Report <ChevronRight size={14} />
              </button>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="font-semibold mb-4">Top Destinations</h3>
            <div className="space-y-4">
              {[
                { name: 'Slack', words: '4.2k', share: 45 },
                { name: 'VS Code', words: '2.8k', share: 30 },
                { name: 'Notion', words: '1.5k', share: 15 },
                { name: 'Others', words: '0.9k', share: 10 },
              ].map((app) => (
                <div key={app.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-zinc-300">{app.name}</span>
                    <span className="text-zinc-500">{app.words} words</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 rounded-full transition-all duration-1000" 
                      style={{ width: `${app.share}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table Preview */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="font-semibold text-lg">Recent Dictations</h3>
          <Link to="/logs" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1">
            See all activity <ChevronRight size={16} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-950/50 text-zinc-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Session ID</th>
                <th className="px-6 py-4 font-medium">Application</th>
                <th className="px-6 py-4 font-medium">Length</th>
                <th className="px-6 py-4 font-medium">Words</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {MOCK_SESSIONS.slice(0, 4).map((session) => (
                <tr key={session.id} className="hover:bg-zinc-800/50 transition-colors group">
                  <td className="px-6 py-4 text-sm mono text-zinc-400">#{session.id.padStart(4, '0')}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-300">
                        {session.app[0]}
                      </div>
                      <span className="text-sm font-medium">{session.app}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400">{Math.floor(session.duration / 60)}m {session.duration % 60}s</td>
                  <td className="px-6 py-4 text-sm text-zinc-400 font-medium">{session.wordCount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                      session.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {session.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-zinc-500 hover:text-indigo-400 transition-colors">
                      <ExternalLink size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}