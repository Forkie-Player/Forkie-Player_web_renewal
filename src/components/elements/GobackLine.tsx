import { useNavigate } from 'react-router-dom'
import * as Strings from '../../lib/strings'

export default function GobackLine() {
  const navigate = useNavigate()

  const goback = () => {
    navigate(-1)
  }
  return (
    <div
      className="unselectable w-fit h-8 p-1 rounded-xl text-md cursor-pointer hover:shadow-outer hover:bg-background-light-hover"
      onClick={goback}
    >
      {Strings.GoBack}
    </div>
  )
}
