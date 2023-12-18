import css from './Button.module.css';

export const Button = ({ onclick, children }) => {
  return (
    <button type="button" className={css.button} onClick={onclick}>
      {children}
    </button>
  );
};
