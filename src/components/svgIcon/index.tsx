export default function SvgIcon({
  icon,
  color,
  size = 16,
}: {
  icon: string
  color?: string
  size?: number
}) {
  return (
    <svg
      className='icon'
      aria-hidden='true'
      style={{color, width: `${size}px`, height: `${size}px`}}
    >
      <use xlinkHref={`#${icon}`}></use>
    </svg>
  )
}
