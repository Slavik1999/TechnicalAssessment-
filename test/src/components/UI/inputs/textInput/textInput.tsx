import TextField from '@mui/material/TextField';
import React, { useRef } from "react";
import styles from "./textInput.module.scss";

export default function TextInput(props: TextInputProps) {
  const {handleChange, handleBlur, label, value='', error, id, touched, className, minRows=4,
         placeholder, required=false, multiline=false, disabled, onKeyDown, helperText, subLabel,
         spellCheck=false, autoComplete="off"} = props;
  const inputRef = useRef<null | HTMLInputElement>(null);

  return(
    <div className={`${styles.textInputWrapper} ${className} ${disabled ? styles.textInputWrapper_disabled : ''}`}>
      {label
        ? <div className={styles.textInputWrapper_label}>{label}{required ? <span>*</span> : ''}</div>
        : <></>}

      {subLabel
        ? <div className={styles.textInputWrapper_subLabel}>{subLabel}</div>
        : <></>}

      <TextField
        className={styles.input}
        InputProps={{
          classes: {
              root: `${styles.input__field_input} ${multiline ? styles.input__field_input_multiLine : ''}`,
              focused: styles.input__field_active,
              error: styles.input__field_error,
              disabled: styles.input__field_disabled,
          },
        }}
        disabled={disabled}
        multiline={multiline}
        minRows={minRows}
        fullWidth
        value={value}
        spellCheck={spellCheck}
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(error && touched)}
        placeholder={placeholder}
        name={id}
        autoComplete={autoComplete}
        id={id}
        ref={inputRef}
        variant='outlined'
        type="text"
        onKeyDown={onKeyDown}

        helperText={helperText}
        FormHelperTextProps={{ classes: { root: styles.helperText } }}
      />

      {touched && error
        ? <div className={styles.textInputWrapper_error}>{error}</div>
        : <></>}
    </div>
  )
}

interface TextInputProps {
  /** Input id */
  id: string,

  /** Input label */
  label: string,

  /** Input sub-label */
  subLabel?: string,

  /** Input value */
  value?: string,

  /** Input placeholder */
  placeholder?: string,

  /** change event handler */
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,

  /** blur event handler */
  handleBlur?: (e: React.FocusEvent) => void,

  /** keyDown handler */
  onKeyDown?: (e: React.KeyboardEvent) => void,

  /** Input error message */
  error?: string,

  /** Input touched */
  touched?: boolean,

  /** just for view, use Yup to validate 
   * @default false
  */
  required?: boolean,

  /** multiline flag
   * @default false
   */
  multiline?: boolean,

  /** Min row amount (if multiline true) */
  minRows?: number,

  /** Disabled input
   * @default false
  */
  disabled?: boolean,

  /** className for container wrapping TextInput component */
  className?: string,
  
  /** Helper text */
  helperText?: string,

  /** Text spell check 
   * @default false
  */
  spellCheck?: boolean,

  /** Fill the text field with the text that was previously entered in it.
   * @default off
  */
  autoComplete?: 'on' | 'off' | 'string'
}