'use client';

import { useAuth } from '@/hooks/useAuth';
import { TOSModal } from '@/components/modals/TOSModal';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    showTOSModal,
    acceptTOS,
    declineTOS,
  } = useAuth();

  return (
    <>
      {/* Global TOS Modal - appears on all pages */}
      <TOSModal
        isOpen={showTOSModal}
        onAccept={acceptTOS}
        onDecline={declineTOS}
      />
      
      {children}
    </>
  );
}

