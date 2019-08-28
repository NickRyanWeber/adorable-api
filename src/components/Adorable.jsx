import React, { useState, useEffect } from 'react'
import M from 'materialize-css'

const Adorable = () => {
  const [mouth, setMouth] = useState(1)
  const [eyes, setEyes] = useState(1)
  const [nose, setNose] = useState(1)
  let URL = `https://api.adorable.io/avatars/face/eyes${eyes}/nose${nose}/mouth${mouth}/1B5AE1`
  useEffect(() => {
    M.AutoInit()
  }, [])

  return (
    <>
      <main className="container">
        <h1 className="center-align">Adorable Avatar Selector</h1>
        <div className="row">
          <div className="col s5 offset-s3">
            <main className="card">
              <section className="card-image">
                <img src={URL} alt="" />
              </section>
              <section className="col s8 offset-s2">
                <br />
                <p className="range-field center">
                  Eyes
                  <input
                    type="range"
                    min="1"
                    max="9"
                    value={eyes}
                    onChange={e => {
                      setEyes(e.target.value)
                    }}
                  />
                </p>
                <p className="range-field center">
                  Nose
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={nose}
                    onChange={e => {
                      setNose(e.target.value)
                    }}
                  />
                </p>
                <p className="range-field center">
                  Mouth
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={mouth}
                    onChange={e => {
                      setMouth(e.target.value)
                    }}
                  />
                </p>
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
