import React, { useState, useEffect } from 'react'
import M from 'materialize-css'
import axios from 'axios'

const Adorable = () => {
  const [mouth, setMouth] = useState(0)
  const [eyes, setEyes] = useState(0)
  const [nose, setNose] = useState(0)
  const [url, setUrl] = useState()
  const [eyesArr, setEyesArr] = useState([])
  const [noseArr, setNoseArr] = useState([])
  const [mouthArr, setMouthArr] = useState([])
  const [hex, setHex] = useState('')
  const [hue, setHue] = useState(Math.ceil(Math.random() * 360))
  const [saturation, setSaturation] = useState(Math.ceil(Math.random() * 100))
  const [lightness, setLightness] = useState(Math.ceil(Math.random() * 100))
  const [hide, setHide] = useState(' hide')

  useEffect(() => {
    const url = `https://api.adorable.io/avatars/face/${eyesArr[eyes]}/${noseArr[nose]}/${mouthArr[mouth]}/${hex}`
    setUrl(url)
  }, [mouth, eyes, nose, hex])

  const fetchData = async () => {
    const resp = await axios.get(
      `https://api.allorigins.win/get?url=https://api.adorable.io/avatars/list`
    )
    const apiData = JSON.parse(resp.data.contents)
    setEyesArr(apiData.face.eyes)
    setNoseArr(apiData.face.nose)
    setMouthArr(apiData.face.mouth)

    setEyes(Math.floor(Math.random() * apiData.face.eyes.length))
    setMouth(Math.floor(Math.random() * apiData.face.mouth.length))
    setNose(Math.floor(Math.random() * apiData.face.nose.length))
  }

  const HSLToHex = (h, s, l) => {
    s /= 100
    l /= 100

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0

    if (0 <= h && h < 60) {
      r = c
      g = x
      b = 0
    } else if (60 <= h && h < 120) {
      r = x
      g = c
      b = 0
    } else if (120 <= h && h < 180) {
      r = 0
      g = c
      b = x
    } else if (180 <= h && h < 240) {
      r = 0
      g = x
      b = c
    } else if (240 <= h && h < 300) {
      r = x
      g = 0
      b = c
    } else if (300 <= h && h < 360) {
      r = c
      g = 0
      b = x
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16)
    g = Math.round((g + m) * 255).toString(16)
    b = Math.round((b + m) * 255).toString(16)

    // Prepend 0s, if necessary
    if (r.length == 1) r = '0' + r
    if (g.length == 1) g = '0' + g
    if (b.length == 1) b = '0' + b

    return r + g + b
  }

  useEffect(() => {
    M.AutoInit()
    fetchData()
  }, [])

  useEffect(() => {
    setHex(HSLToHex(hue, saturation, lightness))
  }, [hue, saturation, lightness])

  useEffect(() => {
    const timer = setTimeout(() => {}, 750)
    setHide('')
  }, [url])

  return (
    <>
      <main className="container">
        <h3 className="center-align">Adorable Avatar Selector</h3>
        <div className="row">
          <div className="col s6 offset-s3">
            <main className={`card${hide}`}>
              <section className="card-image">
                <img src={url} alt="" />
              </section>
              <section className="col s6">
                <br />
                <label className="range-field center">Eyes</label>
                <input
                  type="range"
                  min="0"
                  max={eyesArr.length}
                  value={eyes}
                  onChange={e => {
                    setEyes(e.target.value)
                  }}
                />
                <label className="range-field center">Nose</label>
                <input
                  type="range"
                  min="0"
                  max={noseArr.length}
                  value={nose}
                  onChange={e => {
                    setNose(e.target.value)
                  }}
                />
                <label className="range-field center">Mouth</label>
                <input
                  type="range"
                  min="0"
                  max={mouthArr.length}
                  value={mouth}
                  onChange={e => {
                    setMouth(e.target.value)
                  }}
                />
                <br />
              </section>
              <section className="col s6">
                <br />
                <label className="range-field center">Hue</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={hue}
                  onChange={e => {
                    setHue(e.target.value)
                  }}
                />
                <label className="range-field center">Saturation</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={saturation}
                  onChange={e => {
                    setSaturation(e.target.value)
                  }}
                />
                <label className="range-field center">Lightness</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={lightness}
                  onChange={e => {
                    setLightness(e.target.value)
                  }}
                />
                <br />
              </section>
            </main>
          </div>
        </div>
      </main>
    </>
  )
}

export default Adorable
