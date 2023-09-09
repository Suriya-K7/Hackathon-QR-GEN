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

  const [imageUrl, setImageUrl] = useState(null);

  const downloadImage = (imageUrl) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a temporary anchor element
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;

        // Extract the filename from the URL
        // const filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        const filename = Date.now();

        // Set the download attribute and filename
        link.setAttribute("download", filename);
        document.body.appendChild(link);

        // Simulate a click on the anchor element to start the download
        link.click();

        // Clean up the temporary anchor element
        link.parentNode.removeChild(link);

        // Set the downloaded image URL to display on the page
        setImageUrl(url);
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  };

  const handleDownload = () => {
    downloadImage(src);
  };

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
              <option value='png'>PNG</option>
              <option value='jpeg'>JPG</option>
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
            </>
          )}
        </div>
      </form>
      {src && (
        <div className='form-grp'>
          <button
            className='button link'
            onClick={handleDownload}
          >
            Download Image
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
