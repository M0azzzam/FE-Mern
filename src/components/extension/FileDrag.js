import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const FileDrag = props => {
  const { forwardRef: defaultRef, multiple = false } = props;
  const inputRef = defaultRef || React.createRef();
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState(null);
  const onChagne = () => {
    let files = inputRef.current.files;
    files = Array.from(files);
    setFiles(files);
  }

  useEffect(() => {
    if (files) {
      const imgs = [];
      if (files.length) {
        files.forEach(file => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = e => {
            imgs.push(reader.result);
            setImages([...imgs]);
          }
        });
      }
    }
  }, [files]);

  return (
    <div style={{ border: '1px dashed #cecece', display: 'flex', justifyContent: 'center', flexDirection: 'row', flexFlow: 'column wrap', alignItems: 'center', height: '150px', margin: '0 auto', width: '100%' }}>
      <Button style={{}} label="Choose a logo" icon='image' htmlFor='upload-image' onClick={() => inputRef.current.click()} />
      <div style={{ flexGrow: 0, flexBasis: '50%', marginTop: '15px' }}>
        {images.map((image, index) => <img key={index} alt='File Drag' src={image} style={{ width: '60px', margin: '0 15px', border: '1px dashed #cecece' }} />)}
      </div>
      <input type='file' id='upload-image' hidden ref={inputRef} onChange={onChagne} multiple={multiple} />
    </div>
  );
}

FileDrag.propTypes = {
  forwardRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.instanceOf(Element) })
  ]),
  multiple: propTypes.bool
}

export default FileDrag;
