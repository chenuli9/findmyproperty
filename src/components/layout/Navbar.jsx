const Navbar = ({ onNavigate }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo" onClick={() => onNavigate('search')}>
          FindMyProperty
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
