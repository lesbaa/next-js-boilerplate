import css from 'styled-jsx/css'

export default css`
  @keyframes fade {
    0% { opacity: 0 }
    100% { opacity: 1 }
  }
  
  .fade-in {
    animation: 0.3s 0.5s fade backwards ease-out;
  }

  * {
    font-weight: 300;
    font-family: 'RobotoMono', sans-serif;
  }

  body {
    width: 100%;
    height: auto;
    min-height: 100vh;
    color: #353535;
    overflow-x: hidden;
    font-family: 'RobotoMono', sans-serif;
    font-smoothing: subpixel-antialiased;
    font-size: 1.07em;
    background-image: linear-gradient(to bottom right, #eee6ee, #d9d9d9);
  }

  b {
    font-weight: 700;
  }

  strong {
    font-weight: 400;
  }

  a {
    color: #333;
    text-decoration: underline;
    cursor: pointer;
  }

  a:visited {
    color: #666;
  }

  figure, body {
    margin: 0;
    padding: 0;
  }

  button {
    background: none repeat scroll 0 0 transparent;
    border: medium none;
    border-spacing: 0;
    color: #26589F;
    font-size: 1em;
    font-weight: normal;
    list-style: none outside none;
    margin: 0;
    padding: 0;
    text-align: left;
    text-decoration: none;
    text-indent: 0;
  }
`
