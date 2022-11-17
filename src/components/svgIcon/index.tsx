export default function SvgIcon({icon, color}: {icon: string; color: string}) {
  return (
    <svg className='icon' aria-hidden='true' style={{color}}>
      <use xlinkHref={`#${icon}`}></use>
    </svg>
  )
}
