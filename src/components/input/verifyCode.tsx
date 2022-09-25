import { Typography } from '@mui/material'
import { Input } from './input'

interface Props {
  code?: string
  length: number
  errorMessage?: string
  onChange: (input: string) => void
  onFinish?: (input: string) => void
}

export const VerifyCodeInput: React.FC<Props> = (props: Props): React.ReactElement => {
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
      <div className="flex gap-5 ">
        {Array.from({ length }).map((_, index) => {
          const isActive = code.length === index
          const value = code[index]

          return (
            <Input
              key={index}
              name="verifyCode"
              type="number"
              className="w-[56px] h-[44px] rounded-[22px] bg-[#f5f7f9] border"
              value={value || ''}
              focus={isActive}
              onKeyUp={handleKeyUp}
              inputProps={{
                className: 'text-center'
              }}
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
