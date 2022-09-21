import styles from "./button.module.scss";
import { memo } from "react";
import { NavLink } from "react-router-dom";
import Loader from "@source/components/loader/loader";
import { ButtonUnstyled } from "@mui/base";

const buttonSize = {
  small: styles.btn_small,
  medium: styles.btn_medium,
  large: styles.btn_large,
}

const variantStyles = {
  contained: styles.btn__contained,
  outlined: styles.btn__outlined,
  additional: styles.btn__additional,
}

const disableStyles = {
  contained: styles.btn__contained_inActive,
  outlined: styles.btn__outlined_inActive,
  additional: styles.btn__additional_inActive
}

const activeStyles = {
  contained: styles.btn__contained_active,
  outlined: styles.btn__outlined_active,
  additional: styles.btn__additional_active
}

const ButtonRoot = (props: EventButtonProps) => {
  const {children, className, disabled, onClick, size='medium', link='',
        variant='contained', isLoading, event="button", href} = props;

  const getBtnClasses = () => {
     return(
      `${styles.btn}
      ${buttonSize[size]}
      ${variantStyles[variant]} 
      ${disabled ? disableStyles[variant] : ''} 
      ${isLoading ? activeStyles[variant] : ''}
      ${className}`
    )
  }

  const geBtnChildren = () => {
    return(
      <div className={styles.btn__childrenWrapper}>
        {!isLoading
          ? <span>{children}</span>
          : <Loader />}
      </div>
    )
  }

  return(
    <>
      {event === 'visual'
        ? <div className={getBtnClasses()}>
            {geBtnChildren()}
          </div>
        : event === 'link'
          ? link 
            ? <NavLink className={getBtnClasses()} to={link}>
                {geBtnChildren()}
              </NavLink>
            : <a className={getBtnClasses()} href={href}>
                {geBtnChildren()}
              </a>

          : <button 
              type={event}
              disabled={disabled}
              className={getBtnClasses()}
              onClick={onClick}>
                {geBtnChildren()}
            </button>}
    </>
  )
}

export default memo((props: EventButtonProps) => {
  return(
    <ButtonUnstyled {...props} component={ButtonRoot}/>
  )
})

interface EventButtonProps {
  /** Button inner */
  children?: string | JSX.Element,

  /** Button variant 
   * @default 'contained'
  */
  variant?: 'outlined' | 'contained' | 'additional',

  /** Button disabled 
   * @default false
  */
  disabled?: boolean,

  /** Button size 
   * @default medium
  */
  size?: 'medium' | 'large' | 'small',

  /** Can add click event handler */
  onClick?: (x?:any) => any,

  /** Button event type 
   *  visual - just button view (no events target), 
   *  submit - target submit event inside form, 
   *  button - target click event by click
   *  link - redirect to link url
   * @default button
  */
  event?: 'submit' | 'button' | 'visual' | 'link',

  /** Redirect Url (use react-router-dom NavLink inside)*/
  link?: string,

  /** Redirect Url (use tag <a></a>)*/
  href?: string,

  /** For fetching process */
  isLoading?: boolean,

  /** className for container wrapping Button component   
   *  set width of Button from className!
  */
  className?: string,
}