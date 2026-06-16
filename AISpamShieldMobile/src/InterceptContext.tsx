import React, { createContext, useContext, useState, ReactNode } from 'react';
import { InterceptEvent } from './types';
import { recentIntercepts as initialIntercepts } from './data';

interface InterceptContextType {
  intercepts: InterceptEvent[];
  addIntercept: (intercept: InterceptEvent) => void;
}

const InterceptContext = createContext<InterceptContextType | undefined>(undefined);

export function InterceptProvider({ children }: { children: ReactNode }) {
  const [intercepts, setIntercepts] = useState<InterceptEvent[]>(initialIntercepts);

  const addIntercept = (intercept: InterceptEvent) => {
    setIntercepts(prev => [intercept, ...prev]);
  };

  return (
    <InterceptContext.Provider value={{ intercepts, addIntercept }}>
      {children}
    </InterceptContext.Provider>
  );
}

export function useIntercepts() {
  const context = useContext(InterceptContext);
  if (context === undefined) {
    throw new Error('useIntercepts must be used within an InterceptProvider');
  }
  return context;
}
