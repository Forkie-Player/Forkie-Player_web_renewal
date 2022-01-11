import { useNavigate } from 'react-router-dom'
import * as Strings from '../../lib/strings'
import { CustomClearButton } from './CustomButton'

export default function GobackLine() {
  const navigate = useNavigate()

  const goback = () => {
    navigate(-1)
  }
  return <CustomClearButton text={Strings.GoBack} onClick={goback} />
}
