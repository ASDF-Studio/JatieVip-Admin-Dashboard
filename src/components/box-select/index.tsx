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
}

export const BoxSelect: FC<Props> = ({ onChange = undefined, data, classname = '' }): ReactElement => {
  const [state, setState] = useState<number>(null)

  const handleOnChange = (index: number) => {
    if (onChange !== undefined) {
      onChange(index)
    }
    setState(index)
  }

  return (
    <div className="flex gap-5">
      {data &&
        data.map(({ title, value, discountValue = null }, index) => {
          return (
            <div
              onClick={() => handleOnChange(index)}
              className={`w-[18.75rem] h-[6.25rem] rounded-[24px] flex gap-[1.188rem] items-center pl-[2.125rem] hover:cursor-pointer ${[
                index === state && 'border-2 border-border-blue shadow-boxSelect',
                classname,
              ].join(' ')}`}
            >
              <Circle checked={index === state} />
              <div className="flex flex-col gap-py">
                <Typography fontFamily="Avenir Next LT Pro" variant="title1">
                  {title}
                </Typography>

                <div className="flex gap-2.5">
                  <Typography className="text-fill-grey" variant="title1" fontFamily="Avenir Next LT Pro">
                    {value}
                  </Typography>
                  {discountValue && (
                    <Typography variant="bodyBold" className="text-fill-grey/70">
                      {discountValue}
                    </Typography>
                  )}
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}
