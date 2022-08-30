import { Typography } from '@mui/material'
import { Input } from 'components'

interface Props {
  code?: string
  length: number
  errorMessage?: string
  onChange: (input: string) => void
  onFinish?: (input: string) => void
}

const VerifyCodeInput: React.FC<Props> = (props: Props): React.ReactElement => {
  const { onChange, code, onFinish, errorMessage, length } = props

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (code.length === 0) return
    if (e.code === 'Backspace') {
      onChange(code.substring(0, code.length - 1))
    }
  }

  const handleInputChange = (e, index) => {
    const { value } = e.target
    if (index === code.length) {
      const newValue = code + value
      onChange(newValue)
      if (index === length - 1) onFinish?.(newValue)
    }
  }

  return (
    <>
      <div className="flex gap-2 ">
        {Array.from({ length }).map((_, index) => {
          const isActive = code.length === index
          const value = code[index]

          return (
            <Input
              key={index}
              name="verifyCode"
              type="number"
              className="w-10 h-10 md:h-14 md:w-14 lg:w-14 lg:h-14"
              value={value || ''}
              focus={isActive}
              onKeyUp={handleKeyUp}
              onChange={(e) => handleInputChange(e, index)}
            />
          )
        })}
      </div>
      {errorMessage && (
        <div className="pt-2">
          <Typography variant="caption" className="text-red-600">
            {errorMessage}
          </Typography>
        </div>
      )}
    </>
  )
}

export default VerifyCodeInput
