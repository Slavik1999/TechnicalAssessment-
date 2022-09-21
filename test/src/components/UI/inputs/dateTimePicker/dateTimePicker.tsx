import { memo } from 'react';
import { DateTimePicker as DateTimePickerLib, Application } from 'react-rainbow-components';
import styles from "./dateTimePicker.module.scss";
import calendarIcon from "@source/assets/icons/calendar.svg";

export default memo((props: DateTimePickerProps) => {
  const {onChange, value, className, label, 
        disabled, placeholder, id, maxDate, required, touched, error} = props;

  const theme = {
    rainbow: {
        palette: {
          brand: '#501FC1',
        },
    },
  };

  return(
    <div className={`${styles.picker} ${className} ${disabled ? styles.picker_disabled : ''}`}>
      {label
        ? <div className={styles.picker_label}>{label}</div>
        : <></>}

      <Application theme={theme}>
        <DateTimePickerLib
            id={id}
            name={id}
            value={value || undefined}
            maxDate={maxDate}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className={`
              ${styles.picker_inner} 
              ${touched && error ? styles.picker_inner_error : ''}`
            }
            icon={<img src={calendarIcon} alt="calendar"/>} 
            disabled={disabled}
            formatStyle="medium"/>
      </Application>

      {touched && error
        ? <div className={styles.picker_error}>{error}</div>
        : <></>}
    </div>
  )
});

interface DateTimePickerProps {
  /** DatePicker value */
  value: Date | null,

  /** DatePicker change handler */
  onChange: (x: Date) => void,

  /** className for container wrapping DateInput component */
  className?: string,

  /** DatePicker disabled 
   * @default false
  */
  disabled?: boolean,

  /** DatePicker label */
  label?: string,

  /** DatePicker placeholder */
  placeholder?: string,

  /** DatePicker id */
  id?: string,

  /** Last day user can set */
  maxDate?: Date,

  /** Is date required */
  required?: boolean,

  /** Input error message */
  error?: string,

  /** Input touched */
  touched?: boolean,
}