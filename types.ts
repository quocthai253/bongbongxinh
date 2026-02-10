// Import React to ensure React namespace is available for ReactNode
import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  // Properly type the icon property using React.ReactNode
  icon: React.ReactNode;
  image: string;
}

export interface Testimony {
  id: number;
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export interface Feature {
  title: string;
  description: string;
  // Properly type the icon property using React.ReactNode
  icon: React.ReactNode;
}