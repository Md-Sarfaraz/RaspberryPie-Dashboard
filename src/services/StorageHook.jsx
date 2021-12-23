import { useState, useEffect } from "react";

function getSavedValue(key, defaultValue) {
    const savedValue = JSON.parse(localStorage.getItem(key))
    if (savedValue) return savedValue
    if (defaultValue instanceof Function) return defaultValue()
    return defaultValue
}
function getSavedSession(key, defaultValue) {
    const savedValue = JSON.parse(sessionStorage.getItem(key))
    if (savedValue) return savedValue
    if (defaultValue instanceof Function) return defaultValue()
    return defaultValue
}

export default function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        return getSavedValue(key, defaultValue)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value,key])

    return [value, setValue]
}

export function useSessionStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        return getSavedSession(key, defaultValue)
    })

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value))
    }, [value,key])

    return [value, setValue]
}