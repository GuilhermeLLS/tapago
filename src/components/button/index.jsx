const VariantStyles = {
  primary: 'bg-blue-500 text-white px-4 py-2 rounded-md',
  secondary: 'bg-white text-blue-500 px-4 py-2 rounded-md',
}

/**
 * Component for showing details of the user.
 * @component
 * @param {'primary' | 'secondary'} variant  button variant. Wither primary or secondary.
 * @param {Object} children
 * @param {Object} other  other props to be passed to the button. Same interface as native HTML button
 */

export default function Button({ variant = 'primary', children, ...other }) {
  return (
    <button className={`${VariantStyles[variant]} px-4 py-2 rounded-md`} {...other}>
      {children}
    </button>
  )
}
