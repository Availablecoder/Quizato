import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// MUI Components
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';

// Icons
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

// #############################

const TextInput = ({
  name,
  label,
  type,
  handleChange,
  isPassword,
  textHelper,
  defaultValue,
}) => {
  const [passwordShow, setPasswordShow] = useState(false);

  const handlePasswordShow = () => {
    setPasswordShow((prev) => !prev);
  };

  return (
    <FormControl variant="outlined" fullWidth margin="normal">
      <InputLabel>{label} *</InputLabel>
      <OutlinedInput
        name={name}
        onChange={handleChange}
        label={label}
        type={!passwordShow ? type : 'text'}
        endAdornment={
          isPassword && (
            <InputAdornment position="end">
              <IconButton onClick={handlePasswordShow}>
                {!passwordShow ? (
                  <VisibilityRoundedIcon />
                ) : (
                  <VisibilityOffRoundedIcon />
                )}
              </IconButton>
            </InputAdornment>
          )
        }
        required
        defaultValue={defaultValue}
        inputProps={{ minLength: isPassword ? 8 : 3 }}
      />
      {textHelper && (
        <FormHelperText sx={{ textAlign: 'right', fontSize: '14px' }}>
          <Link to={textHelper?.link} component={RouterLink}>
            {textHelper?.text}
          </Link>
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default TextInput;
