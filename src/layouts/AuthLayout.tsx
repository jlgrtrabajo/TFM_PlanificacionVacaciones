import type { ReactNode } from 'react';

function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="min-vh-100 d-flex align-items-center bg-light">{children}</div>;
}

export default AuthLayout;
