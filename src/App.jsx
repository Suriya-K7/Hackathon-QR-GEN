import React, { useState } from "react";

const App = () => {
  const [url, SetURL] = useState();
  const [size, setSize] = useState("400X400");
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [format, setFormat] = useState("jpg");
  const [src, setSrc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const QRCODE = `https://api.qrserver.com/v1/create-qr-code/?data=${url}&size=${size}&color=${qrColor.slice(
      1
    )}&bgcolor=${bgColor.slice(1)}&format=${format}`;
    setSrc(QRCODE);
    SetURL("");
    setSize("400X400");
    setQrColor("#000000");
    setBgColor("#ffffff");
  };
  console.log(src);

  return (
    <div className='input container'>
      <h2 className='head'>QR CODE GENERATOR</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-grp'>
          <label htmlFor='url'>Enter URL</label>
          <input
            type='url'
            id='url'
            name='url'
            placeholder='Enter URL'
            autoComplete='on'
            required
            value={url}
            onChange={(e) => SetURL(e.target.value)}
          />
          <div className='form-grp'>
            <label htmlFor='size'>Select QR code Size</label>
            <select
              id='size'
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value='400'>400X400</option>
              <option value='500'>500X500</option>
              <option value='600'>600X600</option>
              <option value='700'>700X700</option>
            </select>
          </div>
          <div className='form-grp'>
            <label htmlFor='format'>Select Format</label>
            <select
              id='format'
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <option value='jpg'>JPG</option>
              <option value='png'>PNG</option>
              <option value='gif'>GIF</option>
              <option value='svg'>SVG</option>
            </select>
          </div>
          <div className='form-grp'>
            <label htmlFor='clrDark'>QR Color</label>
            <input
              type='color'
              id='clrDark'
              value={qrColor}
              onChange={(e) => setQrColor(e.target.value)}
            />
          </div>
          <div className='form-grp'>
            <label htmlFor='clrLight'>BG Color</label>
            <input
              type='color'
              id='clrLight'
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </div>
          <div className='form-grp'>
            <button
              className='button'
              type='submit'
            >
              Generate QR Code
            </button>
          </div>
          {src && (
            <>
              <img
                src={src}
                alt=''
              />
              <div className='form-grp'>
                <a
                  href={src}
                  className='button link'
                  target='_blank'
                  download
                >
                  Download
                </a>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default App;
