const Logo = ({ color }) => {
  return (
    <svg
      className={`w-8 ${color} text-teal-accent-400`}
      viewBox="0 0 24 24"
      strokeLinejoin="round"
      strokeWidth="2"
      strokeLinecap="round"
      strokeMiterlimit="10"
      stroke="currentColor"
      fill="none"
    >
      <circle cx="6.5" cy="7" r="5.5" />
      <circle cx="6.5" cy="20" r="2.5" />
      <circle cx="17.5" cy="4" r="2.5" />
      <circle cx="17.5" cy="17" r="5.5" />
    </svg>
  )
}
export default Logo