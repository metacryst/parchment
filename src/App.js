import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  
    const [textBox1, setTextBox1] = useState(<div className="testDiv" style={{display: "hidden"}} ></div>)
    
    const [text1, setText1] = useState([<div className="text0" key="0"></div>])
    
    const [showInput, setShowInput] = useState(false)
    const [posX, setposX] = useState(0)
    const [posY, setposY] = useState(0)
    
    useEffect(() => {
      console.log('useffecting')
    })
  

  
    document.addEventListener('mouseup', checkForSelection);
    document.addEventListener('mousedown', (e) => {
      if(e.target.className === "App" && e.detail > 1) {
        e.preventDefault()
      }
    });
    // document.addEventListener('mousemove', () => {
    //   console.log(document.body.style.cursor)
    // })
  
    
    // let textBox = <div className="testDiv" style={{display: "hidden"}} ></div>
    
    function newText(e) {

      e.preventDefault()
      
      if (e.detail === 2 && e.target.className === "App") {
        
        
        setShowInput(true)
        
        let posX = e.clientX;
        let posY = e.clientY;
        
        setposX(posX)
        setposY(posY)
        
        console.log('double click')
        console.log(posX, posY)
        
        // setTextBox1(<input className="mainInput" autoFocus="autofocus" onFocus={handleFocus} onMouseOver={handleFocus} onKeyUp={handleEnter} style={{left: posX - 3, top: posY - 11}}></input>)
        
      }
      
      
            
    }
    
    function handleEnter(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
          console.log(posX);
          console.log(e.target.value)
          
          setText1([...text1, 
            <div className="text1" style={{left: posX, top: posY,}} key={text1.length}>
              <span className="textSpan">
                {e.target.value}
              </span>
            </div>
          ])
          
          // setShowInput(false)
          setposY(posY + 40)
          
          e.target.value = ""
        }
      }
      
    const handleFocus = (event) => event.target.select();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    let textBeingDragged;
    let originalNode
  
    function checkForSelection(event) {
      const selection = window.getSelection();
      console.log(selection)
      const selectedText = selection.toString();
      console.log(selectedText)
      if (selectedText) {
        originalNode = selection.anchorNode.parentNode;
        textBeingDragged = selectedText;
        document.addEventListener('dragend', handleDragEnd);
      }
    }
    
    function handleDragEnd(event) {
      const charRange = getCharPosition(event);
      const elemDrugOver = charRange.endContainer;
      if (elemDrugOver.nodeType === 3) {
        const offset = charRange.startOffset;
        const startText = elemDrugOver.wholeText.slice(0, offset);
        const endText = elemDrugOver.wholeText.slice(offset);
        elemDrugOver.textContent = `${startText}${textBeingDragged}${endText}`;
        
        const origText = originalNode.textContent;
        const indexOfSelection = origText.indexOf(textBeingDragged);
        const origStartText = origText.slice(0, indexOfSelection);
        const origEndText = origText.slice(offset + textBeingDragged.length);
        originalNode.textContent = `${origStartText}${origEndText}`;
  
        textBeingDragged = undefined;
        originalNode = undefined;
      }
      document.removeEventListener('dragend', handleDragEnd);
    }
    
    function getCharPosition(event) {
      if (document.caretPositionFromPoint) {
        return document.caretPositionFromPoint(event.clientX, event.clientY);
      } else if (document.caretRangeFromPoint) {
        return document.caretRangeFromPoint(event.clientX, event.clientY);
      }
      return false;
    }
    

    
    
    
  return (
    <div className="App" onClick={newText}>
      <textarea className={showInput ? 'mainInput' : 'hidden'} 
      autoFocus="autofocus" 
      onFocus={handleFocus} 
      onMouseOver={handleFocus} 
      onKeyUp={handleEnter} 
      style={{left: posX - 3, top: posY - 11}}>
        
      </textarea>
      {textBox1}
      {text1}
    </div>
  );
}

export default App;

{/* <div>hello</div>
<p>h</p>
<p>e</p>
<p>llo</p> */}


// const divs = []
  
// for (let i = 0; i <= 8000; i++) {
//     divs.push(<div className="square"></div>)
// }