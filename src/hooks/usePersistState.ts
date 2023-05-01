import React, { useCallback, useEffect, useRef, useState } from 'react'

const get = <T>(key: string): T => JSON.parse(localStorage.getItem(key)) as T

const set = <T>(key: string, v: T) =>
  localStorage.setItem(key, JSON.stringify(v))

type valueUpdater<T> = (v: T) => T

export const usePersistState = <T>(
  key: string,
  value: T,
  reset?: boolean,
): [T, (f: valueUpdater<T>) => void] => {
  const [val, setVal] = useState<T>(reset ? value : get<T>(key) || value)

  const setter = useCallback(
    (f: valueUpdater<T>): void =>
      setVal((old: T) => {
        const newV = f(old)
        set<T>(key, newV)
        return newV
      }),
    [setVal],
  )
  return [val, setter]
}
