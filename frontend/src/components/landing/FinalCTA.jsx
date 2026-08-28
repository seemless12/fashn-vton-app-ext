import React from 'react';
import InstallCTA from '../../components/ui/InstallCTA';

export default function FinalCTA() {
  return (
    <div className="bg-surface">
      <InstallCTA 
        headline="Stop wondering how it will look."
        subtitle="See it on you. Install Shopping Buddy and turn your browser into a virtual fitting room."
        variant="warm"
      />
    </div>
  );
}
