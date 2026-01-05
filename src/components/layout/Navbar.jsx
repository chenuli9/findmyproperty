/*
 * Navbar component: top-level navigation bar
 */
const Navbar = ({ onNavigate }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo acts as home button - calls parent's navigation handler */}
        <h1 className="navbar-logo" onClick={() => onNavigate('search')}>
          FindMyProperty
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
