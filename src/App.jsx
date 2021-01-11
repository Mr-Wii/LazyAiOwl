import React, { useState, useContext, useEffect } from 'react'
import './App.css'
import { AiOwlContext } from './ContextAiOwl'
import aiowl from './media/aiowl.gif'
import Loading from './loading'
import FadeIn from 'react-fade-in'
import styled, { ThemeProvider } from 'styled-components'
import { useDarkMode } from './useDarkMode'
import Particles from 'react-particles-js'
import { GlobalStyles } from './GlobalStyles'
import { lightTheme, darkTheme } from './Theme'
import Toggle from './Toggler'
import Clock from 'react-live-clock'
import TextTransition, { presets } from 'react-text-transition'
import ReactRoundedImage from 'react-rounded-image'
import TextyAnim from 'rc-texty'
import thumbD from './media/thumbnaildummy.jpg'
import musicIcon from './media/music.png'
import playIcon from './media/play.png'
import pauseIcon from './media/pause.png'
import wikiIcon from './media/wiki.png'
import searchIcon from './media/search.png'
import sendIcon from './media/send.png'
import userIcon from './media/user.png'
import robotIcon from './media/robot.png'
import chatIcon from './media/chat.png'
import nextId from 'react-id-generator'
import volIcon from './media/vol.png'
import muteIcon from './media/mute.png'

function App() {
    let [loading, setLoading, pari, eel] = useContext(AiOwlContext)
    let [command, setCommand] = useState('')
    let [title, setTitle] = useState('')
    let [thumbnail, setThumbnail] = useState(thumbD)
    let [result, setResult] = useState('')
    let [source, setSource] = useState('')
    let [gogoduckR, setGogoduck] = useState('')
    let [theme, themeToggler] = useDarkMode()
    let [dateShow, SetShowDate] = useState(false)
    let [searchTituru, setSt] = useState('')
    let [vc, setVc] = useState(false)
    let [visualState, setVisualState] = useState(2)
    let [updateMsg, setUpdateMsg] = useState('')
    let [msgContent, setMsgContent] = useState([])

    const msgRef = React.useRef()
    const pRef = React.useRef()

    const onSubmit = (e) => {
        e.preventDefault()
        if (msgRef.current.defaultValue === '') {
            console.log('nothing')
        } else {
            eel.inputFromUser(msgRef.current.defaultValue)
            const newMsg =
                msgRef.current.defaultValue.charAt(0).toUpperCase() +
                msgRef.current.defaultValue.slice(1)
            setMsgContent([
                ...msgContent,
                {
                    name: 'You',
                    id: nextId(),
                    avatar: userIcon,
                    msg: newMsg
                }
            ])
            setUpdateMsg('')
        }
    }
    const UserVmsg = (msg) => {
        msgContent.push({
            name: 'You',
            id: nextId(),
            avatar: userIcon,
            msg: msg
        })
    }
    window.eel.expose(UserVmsg, 'UserVmsg')

    const SwitchtoChat = (e, txt) => {
        setTitle(txt)
        setVisualState(e)
    }
    window.eel.expose(SwitchtoChat, 'SwitchtoChat')

    const replyAi = (reply) => {
        console.log(reply)
        const newMsg = reply.charAt(0).toUpperCase() + reply.slice(1)
        setMsgContent([
            ...msgContent,
            {
                name: 'AiOwl',
                id: nextId(),
                avatar: robotIcon,
                msg: newMsg
            }
        ])
        pRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' })
    }
    window.eel.expose(replyAi, 'replyAi')

    const onUpdateu = (e) => setUpdateMsg(e.target.value)

    const themeMode = theme === 'light' ? lightTheme : darkTheme

    const updateC = (data) => setCommand(data)
    window.eel.expose(updateC, 'updateC')

    const updateTnB = (title, body) => {
        setVisualState(1)
        setTitle(title)
        setResult(body)
    }
    window.eel.expose(updateTnB, 'updateTnB')

    const updateP = (data) => setThumbnail(`http://img.youtube.com/vi/${data}/mqdefault.jpg`)

    window.eel.expose(updateP, 'updateP')

    const wikiSearch = (title, data) => {
        setVisualState(2)
        setTitle(title)
        setGogoduck(data)
    }
    window.eel.expose(wikiSearch, 'wikiSearch')

    const gogoDuck = (data) => {
        setVisualState(2)
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

    const dateu = dateShow ? (
        <Clock format={'dddd, MMM D'} ticking={true} timezone={'Africa/Casablanca'} />
    ) : (
        ''
    )
    const yearu = dateShow ? (
        <Clock format={'YYYY'} ticking={true} timezone={'Africa/Casablanca'} />
    ) : (
        ''
    )

    const switchTab = () => {
        if (visualState === 1) {
            setVisualState(2)
        } else if (visualState === 2) {
            setVisualState(3)
            setTitle(searchTituru)
        } else {
            setVisualState(1)
            setTitle('Currently Playing')
        }
    }

    const showCommands = () => setVc(!vc)

    return loading ? (
        <Loading />
    ) : (
        <ThemeProvider theme={themeMode}>
            <>
                <GlobalStyles />
                <Particles params={pari} />
                <Div id="otosan" className="papi">
                    <FadeIn delay={500}>
                        <TopBar onMouseOver={showDate} onMouseLeave={hideDate}>
                            <Date>
                                <TextTransition
                                    direction="down"
                                    text={dateu}
                                    springConfig={presets.gentle}
                                />
                            </Date>
                            <Clock format={'hh:mm'} ticking={true} timezone={'Africa/Casablanca'} />
                            <AmPm>
                                <TextTransition
                                    direction="up"
                                    text={yearu}
                                    springConfig={presets.gentle}
                                />
                            </AmPm>
                        </TopBar>
                        <div className="topdiv">
                            <LogoImgu src={aiowl} duration="460" timingFunction="linear" />
                        </div>
                        <div className="middiv">
                            <TextTransition
                                className="friccmoi"
                                direction="down"
                                style={{
                                    fontWeight: '800',
                                    marginBottom: '20px',
                                    marginTop: '15px',
                                    color: '#236c7e',
                                    fontSize: '26px'
                                }}
                                text={command}
                                springConfig={presets.wobbly}
                            />
                            <TextTransition
                                direction="up"
                                style={{
                                    fontWeight: '800',
                                    marginBottom: '25px',
                                    color: '#1abe7f',
                                    fontSize: '22px'
                                }}
                                text={title}
                                springConfig={presets.gentle}
                            />
                            {visualState === 1 ? (
                                <ImgDiv>
                                    <TextyAnim
                                        type={'bottom'}
                                        mode={'smooth'}
                                        style={{
                                            fontSize: '15px',
                                            marginBottom: '25px',
                                            textAlign: 'center',
                                            width: '100%'
                                        }}>
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
                                </ImgDiv>
                            ) : visualState === 2 ? (
                                <TextTransition
                                    direction="down"
                                    text={gogoduckR}
                                    springConfig={presets.wobbly}
                                />
                            ) : (
                                <ChatDiv>
                                    <div id="chatBoxs" className="chatBox">
                                        {msgContent.map((element) => (
                                            <div key={element.id} className="divChatu">
                                                <ReactRoundedImage
                                                    image={element.avatar}
                                                    roundedColor={
                                                        theme === 'light' ? 'black' : 'black'
                                                    }
                                                    imageWidth="50"
                                                    imageHeight="50"
                                                    roundedSize="17"
                                                    hoverColor="#DD1144"
                                                />
                                                <h4>{element.name}</h4>
                                                <p>{element.msg}</p>
                                                <div ref={pRef} />
                                            </div>
                                        ))}
                                    </div>
                                    <form autoComplete="off" onSubmit={onSubmit}>
                                        <input
                                            onChange={onUpdateu}
                                            ref={msgRef}
                                            name="msg"
                                            placeholder="Your message"
                                            value={updateMsg}
                                            type="text"
                                        />
                                        <img src={sendIcon} onClick={onSubmit} alt="submit" />
                                    </form>
                                </ChatDiv>
                            )}
                            <p id="resultsrc">{source}</p>
                        </div>
                        <Toggle theme={theme} toggleTheme={themeToggler} />
                    </FadeIn>
                    <SecBtn1 onClick={switchTab}>
                        {visualState === 2 ? (
                            <TextTransition
                                direction="down"
                                text={'Search'}
                                springConfig={presets.wobbly}
                            />
                        ) : visualState === 1 ? (
                            <TextTransition
                                direction="down"
                                text={'Music'}
                                springConfig={presets.wobbly}
                            />
                        ) : (
                            <TextTransition
                                direction="down"
                                text={'ChitChat'}
                                springConfig={presets.wobbly}
                            />
                        )}{' '}
                    </SecBtn1>
                    <Commandsu onClick={showCommands}>
                        {vc ? (
                            <TextTransition
                                direction="down"
                                text={'Hide Commands'}
                                springConfig={presets.wobbly}
                            />
                        ) : (
                            <TextTransition
                                direction="down"
                                text={'Show Commands'}
                                springConfig={presets.wobbly}
                            />
                        )}
                    </Commandsu>
                    {vc ? (
                        <CmdDiv>
                            <ul>
                                <li>
                                    <span>Music: </span>Play '...'
                                </li>
                                <li>
                                    <span>Pause:</span> Pause The Music
                                </li>
                                <li>
                                    <span>Play: </span> Resume The Music
                                </li>
                                <li>
                                    <span>Search: </span> ''...'
                                </li>
                                <li>
                                    <span>Wikipedia: </span> '...' in wikipedia
                                </li>
                                <li>
                                    <span>Chat: </span> Let's chat/talk
                                </li>
                                <li>
                                    <span>Vol: </span> Put the volume on '...'
                                </li>
                                <li>
                                    <span>Mute: </span> Stop listening
                                </li>
                            </ul>
                        </CmdDiv>
                    ) : (
                        ''
                    )}
                </Div>
            </>
        </ThemeProvider>
    )
}

export default App

const ChatDiv = styled.div`
    margin: auto;
    width: 80%;
    height: 100%;
    .chatBox {
        margin: auto;
        background: ${({ theme }) => theme.boxshadow1} !important;
        height: 350px;
        width: 80%;
        border: none;
        border-radius: 15px;
        overflow-x: hidden !important;
        overflow-wrap: break-word;
        padding-right: 15px;
        box-sizing: border-box;
        img {
            vertical-align: top !important;
            filter: ${({ theme }) => (theme.text === '#FAFAFA' ? 'invert(100%)' : 'invert(100%)')};
        }
    }
    .chatBox::-webkit-scrollbar {
        width: 10px;
    }
    .chatBox::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.boxshadow1} !important ;
        border-top-right-radius: 15px;
        border: none;
        border-bottom-right-radius: 15px;
    }
    .chatBox::-webkit-scrollbar-thumb {
        background-color: rgb(26, 26, 26); /* color of the scroll thumb */
        border-radius: 20px; /* roundness of the scroll thumb */
        border: 3px solid rgba(255, 166, 0, 0); /* creates padding around scroll thumb */
    }

    form {
        margin-top: 20px;
        input {
            width: 65%;
            border-radius: 15px;
            outline: 0;
            height: 20px;
            background: ${({ theme }) => theme.boxshadow} !important ;
            color: ${({ theme }) => theme.text} !important;
            padding-top: 15px;
            padding-left: 15px;
            padding-bottom: 15px;
            border: none;
            padding-right: 50px;
        }
        input::placeholder {
            color: ${({ theme }) => theme.text} !important;
        }
        img {
            margin-left: -50px;
            width: 20px;
            color: ${({ theme }) => theme.text} !important;
            filter: ${({ theme }) => (theme.text === '#FAFAFA' ? 'invert(100%)' : 'invert(0%)')};
            vertical-align: middle;
            cursor: pointer;
            :hover {
                transform: scale(1.1);
            }
        }
    }
    .divChatu {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding-left: 10px;
        padding-top: 10px;

        p {
            width: 100%;
            text-align: left;
            padding-left: 10px;
        }
        h4 {
            padding-left: 7px;
            font-weight: 800;
            margin-block-start: 0.9em;
            cursor: default;
        }
    }
`
const LogoImgu = styled.img`
    width: 50% !important;
    filter: ${({ theme }) => (theme.text === '#FAFAFA' ? 'invert(0%)' : 'invert(100%)')};
`
const CmdDiv = styled.div`
    cursor: default;
    position: absolute;
    font-size: 12px;
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
    ul li::before {
        content: '';
        background-size: contain;
        display: inline-block;
        width: 1em;
        height: 1em;
        position: relative;
        top: 0.1rem;
        margin-right: 0.5rem;
        filter: ${({ theme }) => (theme.text === '#FAFAFA' ? 'invert(100%)' : 'invert(0%)')};
    }
    ul li:nth-child(1)::before {
        background-image: url(${musicIcon});
    }
    ul li:nth-child(2)::before {
        background-image: url(${pauseIcon});
    }
    ul li:nth-child(3)::before {
        background-image: url(${playIcon});
    }
    ul li:nth-child(4)::before {
        background-image: url(${searchIcon});
    }
    ul li:nth-child(5)::before {
        background-image: url(${wikiIcon});
    }
    ul li:nth-child(6)::before {
        background-image: url(${chatIcon});
    }
    ul li:nth-child(7)::before {
        background-image: url(${volIcon});
    }
    ul li:nth-child(8)::before {
        background-image: url(${muteIcon});
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
    }
`
const TopBar = styled.div`
    // border: 1px solid black;
    display: flex;
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
const Div = styled.div``
