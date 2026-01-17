
import React from 'react';
import { 
  Mic, 
  Zap, 
  Clock, 
  MessageSquare,
  Layout,
  Settings,
  Shield,
  Layers,
  Database,
  Search
} from 'lucide-react';
import { DictationSession, VoicePreset } from './types';

export const MOCK_SESSIONS: DictationSession[] = [
  { id: '1', timestamp: '2024-05-20T10:30:00Z', duration: 124, wordCount: 450, app: 'Slack', status: 'completed' },
  { id: '2', timestamp: '2024-05-20T11:15:00Z', duration: 45, wordCount: 120, app: 'Notion', status: 'completed' },
  { id: '3', timestamp: '2024-05-20T13:45:00Z', duration: 320, wordCount: 1200, app: 'VS Code', status: 'completed' },
  { id: '4', timestamp: '2024-05-21T09:00:00Z', duration: 12, wordCount: 30, app: 'Chrome', status: 'failed' },
  { id: '5', timestamp: '2024-05-21T10:10:00Z', duration: 540, wordCount: 2100, app: 'Gmail', status: 'completed' },
  { id: '6', timestamp: '2024-05-21T14:20:00Z', duration: 65, wordCount: 180, app: 'Discord', status: 'completed' },
  { id: '7', timestamp: '2024-05-22T08:30:00Z', duration: 180, wordCount: 650, app: 'Linear', status: 'completed' },
  { id: '8', timestamp: '2024-05-22T11:50:00Z', duration: 30, wordCount: 95, app: 'Slack', status: 'completed' },
];

export const VOICE_PRESETS: VoicePreset[] = [
  { id: 'p1', name: 'Technical Docs', language: 'en-US', engine: 'Gemini-Ultra', shortcut: '⌥ + T' },
  { id: 'p2', name: 'Casual Chat', language: 'en-US', engine: 'Whisper-Large', shortcut: '⌥ + C' },
  { id: 'p3', name: 'German Meeting', language: 'de-DE', engine: 'Gemini-Ultra', shortcut: '⌥ + G' },
];

export const NAV_ITEMS = [
  { label: 'Overview', icon: <Layout size={20} />, path: '/' },
  { label: 'Dictation Logs', icon: <MessageSquare size={20} />, path: '/logs' },
  { label: 'Voice Presets', icon: <Mic size={20} />, path: '/presets' },
  { label: 'Privacy & Security', icon: <Shield size={20} />, path: '/security' },
  { label: 'Integrations', icon: <Layers size={20} />, path: '/integrations' },
  { label: 'Settings', icon: <Settings size={20} />, path: '/settings' },
];
