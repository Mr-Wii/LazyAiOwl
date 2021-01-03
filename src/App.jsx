import React, {
  useState,
  useContext
} from 'react'
import './App.css';
import { AiOwlContext } from './ContextAiOwl'
import aiowl from './media/aiowl.gif'
import Loading from './loading'
import FadeIn from 'react-fade-in'
import styled, {ThemeProvider} from 'styled-components'
import  {useDarkMode} from "./useDarkMode"
import Particles from 'react-particles-js'
import { GlobalStyles } from "./GlobalStyles"
import { lightTheme, darkTheme } from "./Theme"
import Toggle from "./Toggler"
import Clock from 'react-live-clock';
import TextTransition, { presets } from "react-text-transition";
import ReactRoundedImage from "react-rounded-image";
import TextyAnim from 'rc-texty'
import thumbD from './media/thumbnaildummy.jpg'
import musicIcon from './media/music.png'
import playIcon from './media/play.png'
import pauseIcon from './media/pause.png'
import wikiIcon from './media/wiki.png'
import searchIcon from './media/search.png'

function App() {
  let [loading, setLoading, eel ,pari] = useContext(AiOwlContext)
  let [command, setCommand] = useState('')
  let [title, setTitle] = useState('')
  let [thumbnail, setThumbnail] = useState(thumbD)
  let [result, setResult] = useState('')
  let [source, setSource] = useState('')
  let [gogoduckR, setGogoduck] = useState('')
  let [musicOn, setMusicOn] = useState(false)
  let [theme, themeToggler] = useDarkMode()
  let [dateShow, SetShowDate] = useState(false)
  let [searchTituru, setSt] = useState('')
  let [vc, setVc] = useState(false)

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  const updateC = (data) => {
    setCommand(data)
  }
  window.eel.expose(updateC, 'updateC')

  const updateTnB = (title, body) => {
    setMusicOn(true)
    setTitle(title)
    setResult(body)
    }
  window.eel.expose(updateTnB, 'updateTnB')

  const updateP = (data) => {
    setThumbnail(`http://img.youtube.com/vi/${data}/mqdefault.jpg`)
  }
  window.eel.expose(updateP, 'updateP')

  const wikiSearch = (title, data) => {
    setMusicOn(false)    
    setTitle(title)
    setGogoduck(data)
  }
  window.eel.expose(wikiSearch, 'wikiSearch')

  const gogoDuck = (data) => {
    setMusicOn(false)    
    setTitle(data.Heading)
    setSt(data.Heading)
    if (!data.Heading) {
      setTitle('😓')
      setGogoduck('I am sorry, I have no answer for that one...')
    } else if (!data.AbstractText && data.RelatedTopics) {
      setGogoduck(data.RelatedTopics[0].Text) 
    } else {
      setGogoduck(data.AbstractText) 
    }
  }
  window.eel.expose(gogoDuck, 'gogoDuck')
  
  const showDate = () => SetShowDate(true)
  const hideDate = () => SetShowDate(false)

  const dateu = dateShow ? <Clock format={'dddd, MMM D'} ticking={true} timezone={'Africa/Casablanca'} /> : ''
  const yearu = dateShow ? <Clock format={'YYYY'} ticking={true} timezone={'Africa/Casablanca'} /> : ''

  const switchTab = () => {
      setMusicOn(!musicOn)
      if (!musicOn) {
        setTitle('Currently Playing')
      } else {
        console.log(searchTituru);
        setTitle(searchTituru)
      }
  }

  const showCommands = () =>{
    setVc(!vc)
  }
  return (loading ? <Loading /> :
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <Particles params={pari} />
        <Div id="otosan" className="papi">
          <FadeIn delay={500}>
            <TopBar onMouseOver={showDate} onMouseLeave={hideDate}>
              <Date>
              <TextTransition direction='down' text={dateu} springConfig={ presets.gentle }/>
              </Date> 
              <Clock format={'hh:mm A'} ticking={true} timezone={'Africa/Casablanca'} />
              <AmPm>
              <TextTransition direction='down' text={yearu} springConfig={ presets.gentle }/>
              </AmPm>
            </TopBar>
            <div className='topdiv'>
              <LogoImgu src={aiowl} duration='460' timingFunction='linear' />
            </div>
            <div className="middiv">
            <TextTransition className='friccmoi' direction='down' style={{fontWeight: '800',marginBottom: '20px',marginTop:'15px', color: '#236c7e', fontSize:'26px'}} text={command} springConfig={ presets.wobbly }/>
            <TextTransition direction='up' style={{fontWeight: '800',marginBottom: '25px', color: '#1abe7f', fontSize:'22px'}} text={title} springConfig={ presets.gentle }/>
              {musicOn ? 
              <ImgDiv>
              <TextyAnim
              type={'bottom'}
              mode={'smooth'}
              style={{fontSize:'15px', marginBottom: '25px', textAlign:'center', width:'100%'}}
            >
              {result}
            </TextyAnim>
                <ReactRoundedImage
                  image={thumbnail}
                  roundedColor={theme === 'light' ? 'black' : 'black'}
                  imageWidth="120"
                  imageHeight="120"
                  roundedSize="3"
                  hoverColor="#DD1144"
                />
              </ImgDiv>:<TextTransition direction='down' text={gogoduckR} springConfig={ presets.wobbly }/>}
              <p id="resultsrc">{source}</p>
            </div>
            <Toggle theme={theme} toggleTheme={themeToggler} />
          </FadeIn>
          <SecBtn1 onClick={switchTab}>{musicOn ? <TextTransition direction='down' text={'Search'} springConfig={ presets.wobbly }/> : <TextTransition direction='down' text={'Music'} springConfig={ presets.wobbly }/>}</SecBtn1>
          <Commandsu onClick={showCommands}>{vc ? <TextTransition direction='down' text={'Hide Commands'} springConfig={ presets.wobbly }/> : <TextTransition direction='down' text={'Show Commands'} springConfig={ presets.wobbly }/> }</Commandsu>
          {vc ? 
          <CmdDiv>
            <ul>
            <li><span>Music: </span>Play '...'</li>
            <li><span>Pause:</span> Pause The Music</li>
            <li><span>Play: </span> Resume The Music</li>
            <li><span>Search: </span> ''...'</li>
            <li><span>Wikipedia: </span> '...' in wikipedia</li>
            </ul>
          </CmdDiv> : '' }
        </Div> 
      </>
    </ThemeProvider>
  )
}

export default App;

const LogoImgu = styled.img`
width: 50% !important;
filter:${({ theme }) => theme.text === '#FAFAFA' ? 'invert(0%)' : 'invert(100%)'};
`

const CmdDiv = styled.div`
cursor: default;
position: absolute; 
font-size:12px;
top: 40px;
right: 5px;
color: ${({ theme }) => theme.text} !important;
border: 1px ${({ theme }) => theme.text} solid;
ul {
  padding-inline-end: 13px;
  padding-inline-start: 12px;
  list-style-type: none;
}

li {
  padding-bottom: 5px;
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.1);
  }
}
li span {
  font-weight: 600;
}
ul li:nth-child(1)::before  {
  content: "";
  background-image: url(${musicIcon});
  background-size: contain;
  display: inline-block;
  width: 1em;
  height: 1em;
  position: relative;
  top: 0.1rem;
  margin-right: 0.5rem;
  filter:${({ theme }) => theme.text === '#FAFAFA' ? 'invert(100%)' : 'invert(0%)'};
}
ul li:nth-child(2)::before  {
  content: "";
  background-image: url(${pauseIcon});
  background-size: contain;
  display: inline-block;
  width: 1em;
  height: 1em;
  position: relative;
  top: 0.1rem;
  margin-right: 0.5rem;
  filter:${({ theme }) => theme.text === '#FAFAFA' ? 'invert(100%)' : 'invert(0%)'};
}
ul li:nth-child(3)::before  {
  content: "";
  background-image: url(${playIcon});
  background-size: contain;
  display: inline-block;
  width: 1em;
  height: 1em;
  position: relative;
  top: 0.1rem;
  margin-right: 0.5rem;
  filter:${({ theme }) => theme.text === '#FAFAFA' ? 'invert(100%)' : 'invert(0%)'};
}
ul li:nth-child(4)::before  {
  content: "";
  background-image: url(${searchIcon});
  background-size: contain;
  display: inline-block;
  width: 1em;
  height: 1em;
  position: relative;
  top: 0.1rem;
  margin-right: 0.5rem;
  filter:${({ theme }) => theme.text === '#FAFAFA' ? 'invert(100%)' : 'invert(0%)'};
}
ul li:nth-child(5)::before  {
  content: "";
  background-image: url(${wikiIcon});
  background-size: contain;
  display: inline-block;
  width: 1em;
  height: 1em;
  position: relative;
  top: 0.1rem;
  margin-right: 0.5rem;
  filter:${({ theme }) => theme.text === '#FAFAFA' ? 'invert(100%)' : 'invert(0%)'};
}
`

const SecBtn1 = styled.button`
position: absolute; 
top: 10px;
left: 5px
width: 70px;
color: ${({ theme }) => theme.text} !important;
background: none;
cursor: pointer;
outline: 0;
border: none;
font-size:13px;
transition: all 0.5s ease-in-out;
:hover {
  transform: scale(1.1);
}
`
const Commandsu = styled(SecBtn1)`
top: 10px;
right: 5px;
`
const ImgDiv = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
img {
  object-fit: cover !important;
}`

const TopBar = styled.div`
// border: 1px solid black;
display:flex; 
text-align: center;
justify-content: center;
margin-bottom: 25px;
cursor: default;
time {
  width: 20%;
}
`
const Date = styled.span`
text-align: right;
width: 30%;
`
const AmPm = styled.span`
width: 30%;
text-align: left;
`
const Div = styled.div`
`
