import { MenuItem, StandardTextFieldProps, TextField } from '@mui/material'

import type { Option } from 'common/types'
export interface ExtendedInputProps extends StandardTextFieldProps {
  options?: Option[]
}

export default function SelectInput({
  options = [],
  placeholder = `Seleccione`,
  defaultValue = `-1`,
  ...props
}: ExtendedInputProps): JSX.Element {
  return (
    <TextField
      placeholder={placeholder}
      SelectProps={{ placeholder, label: `Seleccione` }}
      select
      defaultValue={defaultValue}
      {...props}
    >
      {options.map(({ value, label }) => (
        <MenuItem
          key={value}
          value={value}
          sx={{
            padding: `5px 10px`,
            color: `black`,
          }}
        >
          {label}
        </MenuItem>
      ))}
    </TextField>
  )
}
