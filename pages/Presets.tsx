
import React, { useState } from 'react';
import { 
  Plus, 
  Mic, 
  Keyboard, 
  Globe, 
  Zap,
  MoreVertical,
  Edit,
  Trash2,
  X,
  Check
} from 'lucide-react';
import { VOICE_PRESETS } from '../constants';

const Modal = ({ isOpen, onClose, title, children }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <h3 className="text-lg font-bold">{title}</h3>
          <button onClick={onClose} className="p-1 text-zinc-500 hover:text-zinc-100 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default function Presets() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [presets, setPresets] = useState(VOICE_PRESETS);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Voice Presets</h1>
          <p className="text-zinc-500 mt-1">Configure specialized engines and shortcuts for different tasks.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
        >
          <Plus size={20} />
          <span>Create Preset</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {presets.map((preset) => (
          <div key={preset.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all group relative">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <Mic size={24} />
              </div>
              <button className="text-zinc-500 hover:text-zinc-100 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>
            
            <div className="mt-6">
              <h3 className="text-xl font-bold text-zinc-100">{preset.name}</h3>
              <p className="text-zinc-500 text-sm mt-1">Universal text input optimization</p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Globe size={14} />
                  <span>Language</span>
                </div>
                <span className="font-medium text-zinc-300">{preset.language}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Zap size={14} />
                  <span>AI Engine</span>
                </div>
                <span className="font-medium text-zinc-300">{preset.engine}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Keyboard size={14} />
                  <span>Shortcut</span>
                </div>
                <kbd className="px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[10px] font-bold text-zinc-300 mono">
                  {preset.shortcut}
                </kbd>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-bold transition-all border border-zinc-700">
                <Edit size={14} />
                Edit
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-rose-900/20 text-zinc-400 hover:text-rose-400 rounded-lg text-xs font-bold transition-all border border-zinc-700 hover:border-rose-500/50">
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* Empty State CTA */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-dashed border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center text-zinc-500 hover:border-indigo-500 hover:text-indigo-400 transition-all group h-[320px]"
        >
          <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-indigo-500/50 mb-4 transition-colors">
            <Plus size={24} />
          </div>
          <span className="font-semibold">Add New Preset</span>
          <p className="text-xs text-center mt-2 px-8">Define a custom configuration for specific tasks or languages.</p>
        </button>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Create Voice Preset"
      >
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Preset Name</label>
            <input 
              type="text" 
              placeholder="e.g. Legal Dictation"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Language</label>
              <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none">
                <option>English (US)</option>
                <option>German (DE)</option>
                <option>Spanish (ES)</option>
                <option>Japanese (JP)</option>
              </select>
            </div>
             <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Engine</label>
              <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none">
                <option>Gemini-Ultra</option>
                <option>Whisper-Large</option>
                <option>Cloud-Standard</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Shortcut Key</label>
            <div className="relative">
              <Keyboard className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
              <input 
                type="text" 
                placeholder="Press keys to bind..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-300 font-semibold hover:bg-zinc-800 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Check size={18} />
              Save Preset
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
