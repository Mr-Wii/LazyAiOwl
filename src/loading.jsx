import React, { useState, useContext } from 'react'
import styled, {ThemeProvider} from 'styled-components'
import FadeIn from 'react-fade-in'
import HangOn from './media/load1.gif'
import ReactLoading from 'react-loading'
import Pop from './media/Pop.mp3'
import { AiOwlContext } from './ContextAiOwl'
import useSound from 'use-sound';
import { GlobalStyles } from "./GlobalStyles";
import  {useDarkMode} from "./useDarkMode"
import { lightTheme, darkTheme } from "./Theme"
import Particles from 'react-particles-js';

const Loading = () => {
  const [loading, setLoading, eel ,pari] = useContext(AiOwlContext)
  const [theme] = useDarkMode()
  const [donezo, setDonezo] = useState(false)
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const leggo = (e) =>{
    e.preventDefault()
    play()
    setLoading(false)
    setInterval(() => {
    eel.fricc()
    }, 2500);
  }
  setInterval(() => {
    setDonezo(true)
  }, 3000);
  const [play] = useSound(Pop)
    return (
      <ThemeProvider theme={themeMode}>
      <>
      <GlobalStyles/>
      <Particles 
      params={pari} />
        <Div >
          <Containers>
            <FadeIn delay={500}>
              <H1>Lazy AiOwl</H1>
              <Img  id="img" src={HangOn} />
              { donezo ? 
              <FadeIn>
                <BtnDiv>
                  <BtnA onClick={leggo}>
                    <BtnP><span className="bg"></span><span className="base"></span><span className="text">Start</span></BtnP>
                  </BtnA>
                </BtnDiv>
              </FadeIn>
              :
              <Rloading type={'bubbles'}  height={64} width={64} /> }
            </FadeIn>
          </Containers>
        </Div>
      </>
    </ThemeProvider>
    )
  }
  
  export default Loading

const BtnDiv = styled.div`
  display: flex;
	align-items: center;
	justify-content: center;
  flex-flow: column;
  margin-top: 20px;
  `
const BtnA = styled.a`
   width: 100%;
	 max-width: 240px;
	 height: 54px;
	 padding: 8px;
	 font-size: 0.8rem;
	 font-weight: 900;
	 color: red;
	 text-align: center;
	 text-transform: uppercase;
	 text-decoration: none;
	 box-shadow: 0 0 0 1px inset ${({ theme }) => theme.boxshadow};
	 position: relative;
   margin: 10px 0;
   :hover > p {
    color: #ece8e1;
 }
 :hover > p span.text {
  box-shadow: 0 0 0 1px #ece8e1;
}
p {
  background: #00000000;
  color: ${({ theme }) => theme.text} !important;
}
p span.base {
  border: 1px solid #ece8e1;
}
:after, :before {
  content: "";
  width: 1px;
  position: absolute;
  height: 8px;
  background: ${({ theme }) => theme.body} !important;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
:before {
  right: 0;
  left: initial;
}
p span.base {
  box-sizing: border-box;
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  left: 0;
  border: 1px solid ${({ theme }) => theme.text};
}
p span.base:before {
  content: "";
  width: 2px;
  height: 2px;
  left: -1px;
  top: -1px;
  background: ${({ theme }) => theme.body};
  position: absolute;
  transition: 0.3s ease-out all;
}
p span.bg {
  left: -5%;
  position: absolute;
  background: #ff4655;
  width: 0;
  height: 100%;
  z-index: 3;
  transition: 0.3s ease-out all;
  transform: skewX(-10deg);
}
p span.text {
  z-index: 4;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
p span.text:after {
  content: "";
  width: 4px;
  height: 4px;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.body};
  position: absolute;
  transition: 0.3s ease-out all;
  z-index: 5;
}
:hover {
  color: #ece8e1;
}
:hover span.bg {
  width: 110%;
}
:hover span.text:after {
  background: ${({ theme }) => theme.body};
}
  `
const BtnP = styled.p`
  margin: 0;
	 height: 54px;
	 line-height: 54px;
	 box-sizing: border-box;
	 z-index: 1;
	 left: 0;
	 width: 100%;
	 position: relative;
	 overflow: hidden;
  `
const Rloading = styled(ReactLoading)`
  margin:auto;
  fill: ${({ theme }) => theme.text} !important;

  `
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  `
const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  position: relative;
  z-index: -1;
  margin-right: auto;
  display: block;
  margin-left: auto;
  @media screen and (max-width: 430px) {
    width: 50%;
  }
  filter:${({ theme }) => theme.text === '#FAFAFA' ? 'invert(100%)' : 'invert(0%)'};

  `
const Containers = styled.div`
  position: relative;

  `
const H1 = styled.h1`
color: ${({ theme }) => theme.text} !important;
margin-right: 30px;
margin-bottom: -30px;
z-index: 3;
text-align: center;
font-family: "Roboto Condensed", sans-serif;
animation-name: blinker;
animation-duration: 1s;
animation-iteration-count: 4;
animation-timing-function: ease-in-out;
animation-direction: alternate;
@keyframes blinker {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@media screen and (max-width: 600px) {
  font-size: 1.5rem;
}
  `