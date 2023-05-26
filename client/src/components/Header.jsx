import logo from './assets/logo.png';

export default function Header() {
  return (
    <nav className='navbar bg-white mb-4 pt-2 pb-2 mb-5 fixed-top shadow-sm'>
      <div className='container'>
        <a className='navbar-brand' href='/'>
          <div className='d-flex'>
            <img src={logo} alt='logo' className='mr-2' />
            <div>Softleaf Project Management</div>
          </div>
        </a>
      </div>

    
    </nav>
  );
}