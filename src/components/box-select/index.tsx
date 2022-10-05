import { Typography } from '@mui/material'
import { Dispatch, FC, ReactElement, SetStateAction, useState } from 'react'
import { Circle } from '../circle'

type BoxSelect = {
  title: string
  value: string
  discountValue?: string
}

type Props = {
  onChange?: Dispatch<SetStateAction<number>>
  data: BoxSelect[]
  classname?: string
  gap?: string
}

export const BoxSelect: FC<Props> = ({ onChange = undefined, data, classname = '', gap }): ReactElement => {
  const [state, setState] = useState<number>(null)

  const handleOnChange = (index: number) => {
    if (onChange !== undefined) {
      onChange(index)
    }
    setState(index)
  }

  return (
    <div className={`flex flex-col sm:flex-row w-full items-center ${gap}`}>
      {data &&
        data.map(({ title, value, discountValue = null }, index) => {
          return (
            <div
              onClick={() => handleOnChange(index)}
              className={`h-[100px] w-full rounded-[24px] flex gap-[1.188rem] items-center pl-[2.125rem] hover:cursor-pointer ${[
                index === state && 'border-2 border-border-blue shadow-boxSelect',
                classname,
              ].join(' ')}`}
            >
              <Circle checked={index === state} />
              <div className="flex flex-col gap-py">
                <Typography variant="body4">{title}</Typography>

                <div className="flex flex-col">
                  <Typography className="text-fill-grey" variant="body4">
                    {value}
                  </Typography>
                  {discountValue && <Typography className="text-fill-grey/70 text-[13px]">{discountValue}</Typography>}
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export * from './single-select'
