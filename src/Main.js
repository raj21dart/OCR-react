import React from 'react'
import { useState, useEffect } from 'react'
import Tesseract from 'tesseract.js'


const Main = () =>{

  const [imagePath, setImagePath] = useState("")
  const [text, setText] = useState("")
  const [flag, setFlag] = useState(false)
  const [imgUpload, setImgUpload] = useState(false)

  const handleChange = (e) => {
    setImagePath(URL.createObjectURL(e.target.files[0]))
    setImgUpload(true)
  }

  const handleClcik = () => {
    Tesseract.recognize(
      imagePath,
      'eng+ben+hin',
      {
        logger: m => console.log(m)
      }
    )
    .catch(err => {
      console.error('Error',err)
    })
    .then(({ data: { text } }) => {
      setText(text)
      setFlag(true)
    })
  }





  return(
    <div className="main">

        {/*Column Instruction */}
        <div className="column instruction">
            <h1>Instruction</h1>
            <ol className="list">
                <li>Select Language</li>
                <li>Select Printed text image</li>
                <li>Click Convert Button</li>
                <li>Wait for Rocognition</li>
            </ol>
        </div>

        {/* Column Conversion */}
        <div className="column conversion">
            <h1>Convert to Text</h1>

            {/* Contains two columns */}
            <div className="img2text">

                {/* Column Upload Image */}
                <div className="column img-upload">
                    <h3 style={{marginBottom: '20px'}}>
                    {imgUpload ? `Uploaded Image to be Converted` : `Upload Image to be Converted`}
                    </h3>
                    
                    <img style={{marginBottom: '20px', height: imagePath ? '30vmin' : ''}} className="App-image" src={imagePath} alt=""/>
                </div>

                {/* Column for Extracted Text */}
                <div className="column extracted-text">
                    <h3 style={{marginBottom: '20px'}}>{flag ? `Extraxted text` : ''}</h3>

                    <div className="text-box" style={{background: text ? '#fff' : ''}}>
                        <p> { text } </p>
                    </div>
                </div>

                {/* Action */}
                <div className="action">
                    <label for="lang" id="label">Choose a language:</label>
                    <select name="lang" id="language">
                        <option value="eng"> English </option>
                        <option value="ben"> Bengali</option>
                        <option value="hindi"> Hindi</option>
                    </select>

                    <label class="custom-file-upload">
                    <input class="file" type="file" onChange={handleChange}/>
                        Upload
                    </label>
                    <p class="file-name"></p>
                            
                    <button className="btn" onClick={handleClcik}>
                        Convert
                    </button> 
                </div>
            </div>

        </div>
    </div>
  )
}

export default Main