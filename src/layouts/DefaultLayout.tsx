import type { ReactNode } from 'react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Header />
      <main className="flex-grow-1 py-4">
        <div className="container-fluid">
          <div className="row">
            <aside className="col-12 col-lg-3 mb-4 mb-lg-0">
              <Sidebar />
            </aside>
            <section className="col-12 col-lg-9">{children}</section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DefaultLayout;
