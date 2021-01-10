import React, { createContext, useState } from 'react'

export const AiOwlContext = createContext()
export const eel = window.eel
eel.set_host('ws://localhost:8080')

export default ({ children }) => {
    const [loading, setLoading] = useState(true)
    const pari = {
        particles: {
            number: {
                value: 60,
                density: {
                    enable: true,
                    value_area: 1500
                }
            },
            line_linked: {
                enable: true,
                opacity: 0.02
            },
            move: {
                direction: 'right',
                speed: 0.05
            },
            size: {
                value: 1
            },
            opacity: {
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.05
                }
            }
        },
        backgroundMode: {
            enable: true,
            zIndex: -1
        },
        interactivity: {
            events: {
                onclick: {
                    enable: true,
                    mode: 'push'
                }
            },
            modes: {
                push: {
                    particles_nb: 1
                }
            }
        },
        retina_detect: true
    }
    return (
        <AiOwlContext.Provider value={[loading, setLoading, pari, eel]}>
            {children}
        </AiOwlContext.Provider>
    )
}
