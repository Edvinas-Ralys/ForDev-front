export   const renderCustomToolbar = _ => {
    return (
      <div id="toolbar-container">
        <span className="ql-formats">
          <button className="ql-bold" aria-label="Bold"></button>
          <button className="ql-italic" aria-label="Italic"></button>
          <button className="ql-code-block" aria-label="Code"></button>
          <button className="ql-underline" aria-label="Underline"></button>
        </span>
        <select className="ql-size" aria-label="Size"></select>
        <span className="ql-formats">
          <select className="ql-color"></select>
          <select className="ql-background"></select>
        </span>
      </div>
    )
  }
 export const header = renderCustomToolbar()