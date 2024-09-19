'use client'

import Header from './Header';
import MenuContainer from './MenuContainer';
import { MenuProvider } from './MenuProvider';
import NavMenu from './NavMenu';
import Search from './Search';

export default function UserInterface(): JSX.Element {
  return (
    <MenuProvider>
      <div className='h-screen w-screen'>
        <Header />
        <Search />
        <NavMenu />
        <MenuContainer />

      </div>

    </MenuProvider>
  );
}