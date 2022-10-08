import './NavBar.css'

function NavBar() {
  return (
    <nav className='navtab'>
      <ul className='navtab__links'>
        <li className='navtab__link-container'>
          <a className='navtab__link' href='#about'>
            О проекте
          </a>
        </li>
        <li className='navtab__link-container'>
          <a className='navtab__link' href='#techs'>
            Технологии
          </a>
        </li>
        <li className='navtab__link-container'>
          <a className='navtab__link' href='#student'>
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
