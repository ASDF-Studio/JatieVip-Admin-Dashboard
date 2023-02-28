import { Typography } from '@mui/material'
import { Dispatch, FC, ReactElement, SetStateAction } from 'react'
import { ISelectedProduct } from 'services/types'
import { Circle } from '../circle'

type BoxSelect = {
  title: string
  value: string
  discountValue?: string
  weight?: number
}

type Props = {
  onChange?: Dispatch<SetStateAction<ISelectedProduct>>
  data: BoxSelect[]
  classname?: string
  gap?: string
  selected?: ISelectedProduct
  defualtValue?: number
}

export const BoxSelect: FC<Props> = ({ onChange = undefined, data, classname = '', gap, selected }): ReactElement => {
  return (
    <div className={`flex flex-col sm:flex-row w-full items-center ${gap}`}>
      {data &&
        data.map(({ weight, title, value, discountValue = null }, index) => {
          return (
            <div
              key={index}
              onClick={() => onChange(data[index] as ISelectedProduct)}
              className={`h-[100px] w-full rounded-[24px] flex gap-[1.188rem] items-center pl-[2.125rem] hover:cursor-pointer ${[
                weight === selected?.weight && 'border-2 border-border-blue shadow-boxSelect',
                classname,
              ].join(' ')}`}
            >
              <Circle checked={weight === selected?.weight} />
              <div className="flex flex-col gap-py">
                <Typography variant="body4">{title}</Typography>

                <div className="flex flex-col">
                  <Typography className="text-fill-grey leading-normal" variant="body4">
                    {value}
                  </Typography>
                  {discountValue && (
                    <Typography className="text-fill-grey/70 text-[13px] font-normal -tracking-[.5px]">
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

export * from './single-select'
