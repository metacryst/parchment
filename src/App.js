import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { motion } from 'framer-motion'
import './App.css';

function App() {
  
    
    const [text1, setText1] = useState([<div className="text0" key="0"></div>])
    
    const [showInput, setShowInput] = useState(false)
    const [showHighlightTool, setShowHighlightTool] = useState(false)
    
    const [inputText, setInputText] = useState(null)
    
    const [posX, setposX] = useState(0)
    const [posY, setposY] = useState(0)
    
    
    
    
    //HIGHLIGHT TOOL
    const [mouseDownPosition, setMouseDownPosition] = useState([null])
    const [highlightCornerX, setHighlightCornerX] = useState(null)
    const [highlightCornerY, setHighlightCornerY] = useState(null)
    
    const [highlightWidth, setHighlightWidth] = useState(0)
    const [highlightHeight, setHighlightHeight] = useState(0)
    const [hRotation, setHRotation] = useState(0)
    
    useEffect(() => {
      console.log('useffecting')
    })
  

  
    document.addEventListener('mousedown', (e) => {
      // prevent weird highlighting
      if(e.target.className === "App" && e.detail > 1) {
        e.preventDefault()
      }
      // if(e.target.className === "App" && e.detail === 1) {
      //   document.addEventListener('mouseup', handleMouseUp)

      //   document.addEventListener('mousemove', handleClickedMouseMove)
      //   // document.addEventListener('mouseup', (e) => {
      //   //   if(e.target.className === "App" && e.detail === 1) {
      //   //     console.log('removingevent')
      //   //     document.removeEventListener('mousemove', handleClickedMouseMove)
      //   //     initialMouseDown = null
      //   //   }
      //   // })
      // }
    });
    // document.addEventListener('mousemove', () => {
    //   console.log(document.body.style.cursor)
    // })
    
    // function handleMouseUp() {
    //   console.log('removingevent')
    //   document.removeEventListener('mousemove', handleClickedMouseMove)
    //   initialMouseDown = null
    //   setShowHighlightTool(false)
    //   document.removeEventListener('mouseup', handleMouseUp)
    // }
    
    
    // let initialMouseDown = null
    
    // function handleClickedMouseMove(e) {
    //   console.log(e.clientX)    
      
    //   let posX = e.clientX
    //   let posY = e.clientY
      
    //   if(!showHighlightTool) {
    //     setShowHighlightTool(true)
    //   }
      
    //   if (!initialMouseDown) {
    //     initialMouseDown = [posX, posY]
    //   } else if(!highlightPosX) {
    //     setHighlightPosX(initialMouseDown[0])
    //     setHighlightPosY(initialMouseDown[1])
    //   }
      
    //   setHighlightWidth(Math.abs(initialMouseDown[0] - posX))
    //   setHighlightHeight(Math.abs(initialMouseDown[0] - posY))
      
      
    //   console.log(initialMouseDown)
    // }
  
    
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
      
      if (e.detail === 2 && e.target.className === "textSpan") {
        let initialText = e.target.value
        
        console.log(e.target)
        
        // setShowInput(true)
        
        // let posX = e.clientX;
        // let posY = e.clientY;
        
        // setposX(posX)
        // setposY(posY)
        
        // console.log(e.target.innerText)
        
        // e.target.innerText = ''
        
      }
      
      
            
    }
    
    function handleKeyUp(e) {

        if (e.keyCode === 13 && !e.shiftKey && e.target.value.trim().length !== 0) {
          e.target.style.width = 20 + 'vh'
          console.log(posX);
          console.log(typeof e.target.value)
          console.log(e.target.value.trim().length)
          
          setText1([...text1, 
            <motion.div 
            className="text1" 
            style={{left: posX - 4, top: posY - 8,}} 
            key={text1.length} 
            drag
            dragMomentum={false}
            >
              <div className="textSpan" contentEditable="true" spellCheck="false" style={{whiteSpace: 'pre'}} onMouseDown={cancelFocus} onDoubleClick={handleFocus}>
                {e.target.value}
              </div>
            </motion.div>
          ])
          
          // setShowInput(false)
          setposY(posY + 20)
          
          e.target.value = ""
        } else if (e.keyCode === 13 && !e.shiftKey && e.target.value.trim().length == 0 ) {
          setShowInput(false)
        }
        
      }
      
    function handleFocus(e) {
      // console.log(e.target)
      e.target.focus();
    }
    
    function cancelFocus(e) {
      console.log('canceling')
      if(e.target != document.activeElement) {
        e.preventDefault()
      }
    }
    
    function handleKeyDown(e) {
      // e.target.style.width = 'inherit'
      
      if (e.keyCode === 13 && e.target.value.trim().length === 0) {
        e.preventDefault()
      }
      
      let characterLength = e.target.value.length
      console.log(characterLength)
      let style = window.getComputedStyle(e.target)
      let width = parseInt(style.getPropertyValue('width'))
      console.log(width)
      console.log(characterLength / width)
      if (characterLength / width > .1) {
        console.log('changing width');
        e.target.style.width = (width + width/10) + 'px'
      }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    // document.addEventListener('mouseup', checkForSelection);
    
    // let textBeingDragged;
    // let originalNode
  
    // function checkForSelection(event) {
    //   const selection = window.getSelection();
    //   console.log(selection)
    //   const selectedText = selection.toString();
    //   console.log(selectedText)
    //   if (selectedText) {
    //     originalNode = selection.anchorNode.parentNode;
    //     textBeingDragged = selectedText;
    //     document.addEventListener('dragend', handleDragEnd);
    //   }
    // }
    
    // function handleDragEnd(event) {
    //   const charRange = getCharPosition(event);
    //   const elemDrugOver = charRange.endContainer;
    //   if (elemDrugOver.nodeType === 3) {
    //     const offset = charRange.startOffset;
    //     const startText = elemDrugOver.wholeText.slice(0, offset);
    //     const endText = elemDrugOver.wholeText.slice(offset);
    //     elemDrugOver.textContent = `${startText}${textBeingDragged}${endText}`;
        
    //     const origText = originalNode.textContent;
    //     const indexOfSelection = origText.indexOf(textBeingDragged);
    //     const origStartText = origText.slice(0, indexOfSelection);
    //     const origEndText = origText.slice(offset + textBeingDragged.length);
    //     originalNode.textContent = `${origStartText}${origEndText}`;
  
    //     textBeingDragged = undefined;
    //     originalNode = undefined;
    //   }
    //   document.removeEventListener('dragend', handleDragEnd);
    // }
    
    // function getCharPosition(event) {
    //   if (document.caretPositionFromPoint) {
    //     return document.caretPositionFromPoint(event.clientX, event.clientY);
    //   } else if (document.caretRangeFromPoint) {
    //     return document.caretRangeFromPoint(event.clientX, event.clientY);
    //   }
    //   return false;
    // }
    

    
    // function textAreaTab(event) {
    //   if(event.keyCode===9) {
    //     event.preventDefault()
    //     let target = event.target
    //     var v=target.value,
    //     s=target.selectionStart,
    //     e=target.selectionEnd;
        
    //     target.value=v.substring(0, s)+'\t'+v.substring(e);
    //     target.selectionStart=target.selectionEnd=s+1;
    //     return false;
    //   }
    // }
    
    function onPan(event, info) {
      let mouseDownPosition={}
      console.log(info.point.x, info.point.y);
      
      let posX = info.point.x
      let posY = info.point.y
      
      console.log(info.offset.x)
      console.log(info.offset.y)
      
      if(!highlightCornerX) {
        setHighlightCornerX(posX)
        setHighlightCornerY(posY)
      }
      
      
      setHighlightWidth(Math.abs(info.offset.x))
      setHighlightHeight(Math.abs(info.offset.y))

      
      if(info.offset.x < 0) {
        setHRotation(90)
        setHighlightWidth(Math.abs(info.offset.y))
        setHighlightHeight(Math.abs(info.offset.x))
      } 
      
      if(info.offset.y < 0) {    
        setHRotation(-90)  
        setHighlightWidth(Math.abs(info.offset.y))
        setHighlightHeight(Math.abs(info.offset.x))  
      } 
      
      if (info.offset.y < 0 && info.offset.x < 0) {
        setHRotation(180)
        setHighlightWidth(Math.abs(info.offset.x))
        setHighlightHeight(Math.abs(info.offset.y))
      }
      
      if (info.offset.y > 0 && info.offset.x > 0) {
        setHRotation(0)
        setHighlightWidth(Math.abs(info.offset.x))
        setHighlightHeight(Math.abs(info.offset.y))
      }
      
      
    }
    
    function handlePanStart(event, info) {
      if(showInput) {
        setShowInput(false)
      }
      if(!showHighlightTool) {
        setShowHighlightTool(true)
      }
    }
    
    function handlePanEnd(event, info) {
      setShowHighlightTool(false)
      setHighlightCornerX(null)
      setHighlightCornerY(null)
      setHighlightWidth(null)
      setHighlightHeight(null)
    }
    
  return (
    <motion.div 
      className="App" 
      onClick={newText} 
      onPan={onPan} 
      onPanStart={handlePanStart} 
      onPanEnd={handlePanEnd}
    >
      
      <textarea 
        className={showInput ? 'mainInput' : 'hidden'} 
        autoFocus="autofocus" 
        onFocus={handleFocus} 
        contentEditable={true}
        suppressContentEditableWarning={true}
        onMouseOver={handleFocus} 
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        // onKeyDown={textAreaTab} 
        style={{left: posX - 3, top: posY - 11}}
        spellCheck="false"
      >
      </textarea>
      
      <motion.div 
        className={showHighlightTool ? 'highlightTool' : 'hidden'}
        style={{left: highlightCornerX - 2, top: highlightCornerY - 4, width: highlightWidth, height: highlightHeight, transform: `rotate(${hRotation}deg)`, transformOrigin: 'top left',}}
      >
      </motion.div>
      
      {text1}
    </motion.div>
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