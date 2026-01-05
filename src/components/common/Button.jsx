 /*
 * Reusable Button component
 */

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  type = 'button',
  disabled = false,
  className = '',
  ...props 
}) => {
  // Dynamic class name construction: combines base, variant, and custom classes
  const baseClasses = 'btn';
  const variantClasses = `btn-${variant}`;
  const classes = `${baseClasses} ${variantClasses} ${className}`.trim();

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

