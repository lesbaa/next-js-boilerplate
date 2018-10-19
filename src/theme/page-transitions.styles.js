import css from 'styled-jsx/css'

export default css`

.page-transition-enter .Main,
.page-transition-enter {
  opacity: 0;
}

.page-transition-enter-active .Main,
.page-transition-enter-active {
  opacity: 1;
  transition: opacity 250ms, transform 250ms;
}

.page-transition-exit .Main,
.page-transition-exit {
  transform: translateY(0);
  opacity: 1;
}

.page-transition-exit-active .Main,
.page-transition-exit-active {
  opacity: 0;
  transition: opacity 250ms, transform 250ms;
}

`
