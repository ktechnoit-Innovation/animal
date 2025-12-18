"use client"

import React, { useEffect, useState } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'

export default function Count({ number }) {
    // motion value that we'll animate
    const count = useMotionValue(0)
    // local state to render the rounded value
    const [display, setDisplay] = useState(0)

    useEffect(() => {
        // subscribe to motion value changes and update local state
        const unsubscribe = count.onChange((v) => {
            setDisplay(Math.round(v))
        })

        // animate to the target number (coerce strings to Number)
        const controls = animate(count, Number(number) || 0, { duration: 2.5 })

        return () => {
            controls.stop()
            unsubscribe()
        }
    }, [number])

    return <motion.pre style={text}>{display}</motion.pre>
}

/**
 * ==============   Styles   ================
 */

const text = {
    fontSize: 32,
    color: "#ffff",
}
