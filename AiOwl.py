import mpv
from chatterbot.trainers import ListTrainer
from chatterbot import ChatBot
from pyttsx3.drivers import sapi5
import socket
import pafy
from bs4 import BeautifulSoup
import urllib.request
import urllib.parse
import subprocess
import re
import requests
import eel
import sys
import time
import os
import webbrowser
import wikipedia
import speech_recognition as sr
import datetime
import pyttsx3


sys.path.insert(1, '../../')

engine = pyttsx3.init('sapi5')

voices = engine.getProperty('voices')

engine.setProperty('voice', voices[1].id)

playerPaused = False

player = mpv.MPV()

player.play('https://www.youtube.com/watch?v=yVDRKWRg70k')
# Create a new instance of a ChatBot
bot = ChatBot(
    'Lazy AiOwl',
    storage_adapter='chatterbot.storage.SQLStorageAdapter',
    logic_adapters=[
        {
            'import_path': 'chatterbot.logic.BestMatch',
            'default_response': 'I am sorry, but I do not understand.',
            'maximum_similarity_threshold': 0.90
        }
    ]
)

trainer = ListTrainer(bot)

trainer.train([
    'Hello, how are you?',
    'I am doing well.',
    'That is good to hear.',
    'Thank you, what about you?',
    "I'm fine",
    'That is good to hear.',
    'Who are you?',
    'I am just a random owl that wants to talk with you'
])

trainer.train([
    'Hello, how are you?',
    'I am great.',
    'That is awesome.',
    'Thanks, and you?',
    'Pretty good',
    'Glad to hear that!',
    'What is your name?',
    'AiOwl, a lazy one!'
])

trainer.train([
    "Hey, how's it going?",
    'I am doing good, thank you.',
    'Cool',
    'Hehe thanks, what about you though ?',
    'Not bad',
    'Aw... hope you feel better soon!',
    'What are you?',
    'An amazing AI that wants to be useful'
])

trainer.train([
    "What's good with you?",
    'All good :D',
    "That's nice",
    'What about you ?',
    'Good',
    'that is great'
    'Are you a robot?',
    'Indeed, but i am your friend aswell!'
])


def pauseMusic():
    global playerPaused
    player.cycle('pause')
    playerPaused = not playerPaused


def volumeChange(x):
    player.volume = x


def switchOn(music_name):
    query_string = urllib.parse.urlencode({"search_query": music_name})
    formatUrl = urllib.request.urlopen(
        "https://www.youtube.com/results?" + query_string)

    search_results = re.findall(
        r"watch\?v=(\S{11})", formatUrl.read().decode())
    clip = requests.get("https://www.youtube.com/watch?v=" +
                        "{}".format(search_results[0]))
    clip2 = "https://www.youtube.com/watch?v=" + \
        "{}".format(search_results[0])
    player.play(clip2)
    inspect = BeautifulSoup(clip.content, "html.parser")
    yt_title = inspect.find_all("meta", property="og:title")

    for concatMusic1 in yt_title:
        pass

    global musicTitle
    musicTitle = concatMusic1['content']

    eel.updateP("{}".format(search_results[0]))


def wiiPlayer(searchu):
    global playerPaused
    if playerPaused == False:
        switchOn(searchu)
    else:
        switchOn(searchu)
        pauseMusic()


def speak(audio):
    engine.say(audio)
    engine.runAndWait()


@eel.expose
def wishMe():
    hour = int(datetime.datetime.now().hour)
    if hour >= 0 and hour < 12:
        eel.updateC("Good morning!")
        speak("Good morning!")
    elif hour >= 12 and hour < 18:
        eel.updateC("Good afternoon!")
        speak("Good afternoon!")
    else:
        eel.updateC("Good Evening!")
        speak("Good Evening!")
    eel.updateC("How may I help you")
    speak("How may I help you")


def takeCommand():
    # It takes microphone input from the user and returns string output
    r = sr.Recognizer()
    with sr.Microphone() as source:
        eel.updateC("Listening...")
        r.pause_threshold = 1
        r.adjust_for_ambient_noise(source)
        audio = r.listen(source)
    try:
        eel.updateC("Recognizing")
        # Using google for voice recognition.
        query = r.recognize_google(audio, language='en-in')
        # User query will be printed.
        eel.updateC(f"Your command: {query}\n")
    except Exception as e:
        # print(e)  use only if you want to print the error!
        # Say that again will be printed in case of improper voice
        eel.updateC("Say that again please...")
        return "None"  # None string will be returned
    return query


@eel.expose
def inputFromUser(datos):
    if datos != "Bye":
        response = bot.get_response(datos)
        eel.replyAi(str(response))
    if datos == "Bye":
        eel.replyAi('Bye Bye :)')
        time.sleep(3)
        eel.SwitchtoChat(1, '')
        fricc()


@eel.expose
def fricc():
    while True:
        query = takeCommand().lower()  # Converting user query into lower case
        # Logic for executing tasks based on query
        if 'wikipedia' in query:  # if wikipedia found in the query then this block will be executed
            eel.wikiSearch('Searching Wikipedia...')
            speak('Searching Wikipedia')
            query = query.replace("wikipedia", "")
            title = "According to Wikipedia"
            results = wikipedia.summary(query, sentences=2)
            eel.wikiSearch(title, results)
            speak("According to Wikipedia")
            speak(results)
        elif 'open youtube' in query:
            webbrowser.open("youtube.com")
        elif 'open google' in query:
            webbrowser.open("google.com")
        elif 'my music' in query:
            music_dir = 'D:\\phoneueueCopy\\Music\\animu'
            songs = os.listdir(music_dir)
            eel.updateTnB(songs[1], '')
            os.startfile(os.path.join(music_dir, songs[1]))
        elif 'play' in query:
            query = query.replace("play", "")
            eel.updateTnB('HangOn!', '')
            speak('HangOn')
            wiiPlayer(query)
            title = 'Currently Playing'
            results = musicTitle
            eel.updateTnB(title, results)
            speak(title)
        elif 'pause the music' in query:
            pauseMusic()
        elif 'resume the music' in query:
            pauseMusic()
        elif 'stop the music' in query:
            pauseMusic()
        elif "let's chat" in query or 'hello' in query or "let's talk" in query:
            speak('Switching to Chat')
            eel.SwitchtoChat(3, 'Chat Mode')
            speak('I am ready')
            break
        elif "don't listen" in query or "stop listening" in query:
            speak("for how much time you want me to be quiet")
            a = int(takeCommand())
            time.sleep(a)
            print(a)
        elif 'put the volume on' in query:
            query = query.replace("put the volume on", "")
            volumeChange(query)
        else:
            response = requests.get(
                'https://api.duckduckgo.com/?q=' + query + '&format=json&pretty=1')
            eel.gogoDuck(response.json())


def start_eel(develop):
    """Start Eel with either production or development configuration."""

    if develop:
        directory = 'src'
        app = None
        page = {'port': 3000}
    else:
        directory = 'build'
        app = 'chrome'
        page = 'index.html'

    eel.init(directory, ['.tsx', '.ts', '.jsx', '.js', '.html'])

    eel_kwargs = dict(
        host='localhost',
        port=8080,
        size=(600, 1000),
    )
    try:
        eel.start(page, mode=app, **eel_kwargs)

    except EnvironmentError:
        # If Chrome isn't found, fallback to Microsoft Edge on Win10 or greater
        if sys.platform in ['win32', 'win64'] and int(platform.release()) >= 10:
            eel.start(page, mode='edge', **eel_kwargs)
        else:
            raise


if __name__ == '__main__':
    import sys

    start_eel(develop=len(sys.argv) == 2)
