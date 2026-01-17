
import React from 'react';

export interface DictationSession {
  id: string;
  timestamp: string;
  duration: number; // in seconds
  wordCount: number;
  app: string;
  status: 'completed' | 'failed' | 'processing';
}

export interface VoicePreset {
  id: string;
  name: string;
  language: string;
  engine: 'Gemini-Ultra' | 'Whisper-Large' | 'Standard-AI';
  shortcut: string;
}

export interface MetricCardProps {
  label: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
}

export interface AppConfig {
  apiKey: string;
  model: string;
}