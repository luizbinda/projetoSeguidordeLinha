import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default function SimpleSelect({ list, name }) {
  const [item, setItem] = React.useState('');

  const handleChange = event => {
    setItem(event.target.value);
  };

  return (
    <>
      <InputLabel>{name}</InputLabel>
      <Select value={item} onChange={handleChange}>
        {list.map(item => (
          <MenuItem value={item.id}>{item.nome}</MenuItem>
        ))}
      </Select>
    </>
  );
}
