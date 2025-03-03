import { Outlet } from 'react-router-dom';
import Header from './Header';

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="fixed w-[100%] h-[80px] z-50">
        <Header />
      </header>

      <main className="flex flex-col flex-1 pt-[80px]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
