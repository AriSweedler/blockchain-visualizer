import React, { useRef, useEffect } from 'react';

const AutoResizeTextarea = ({value, style, onChange}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';

    const handleInput = () => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    };

    textarea.addEventListener('input', handleInput);

    return () => {
      textarea.removeEventListener('input', handleInput);
    };
  }, []);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      style={style}
      onChange={onChange}
    />
  );
};

export default AutoResizeTextarea;
