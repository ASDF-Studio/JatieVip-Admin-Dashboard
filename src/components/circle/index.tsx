import CheckIcon from '@mui/icons-material/Check'

type Props = {
  checked: boolean
}

export const Circle: React.FC<Props> = ({ checked = false }): React.ReactElement => {
  return (
    <div
      className={`w-5 h-5 rounded-full ${
        checked && 'bg-fill-pink'
      } border-[2px] flex justify-center items-center border-fill-pink`}
    >
      <CheckIcon strokeWidth="50px" className="text-white w-4 h-3" />
    </div>
  )
}
