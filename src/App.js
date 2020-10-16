import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { motion, useMotionValue } from 'framer-motion'
import './App.css';

function App() {
  
    
    const [textArray, setTextArray] = useState([])
    
    const [showInput, setShowInput] = useState(false)
    
    const [inputText, setInputText] = useState(null)
    
    const [posX, setposX] = useState(0)
    const [posY, setposY] = useState(0)
    
    
    
    
    //HIGHLIGHT TOOL
    const [showHighlightTool, setShowHighlightTool] = useState(false)

    const [highlightCornerX, setHighlightCornerX] = useState(null)
    const [highlightCornerY, setHighlightCornerY] = useState(null)
    
    const [highlightWidth, setHighlightWidth] = useState(0)
    const [highlightHeight, setHighlightHeight] = useState(0)
    const [hRotation, setHRotation] = useState(0)
    
    const [allowPan, setAllowPan] = useState(false)
    
    const [textMouseDown, setTextMouseDown] = useState(false)
    const [textMouseDownId, setTextMouseDownId] = useState(null)
    
    
    useEffect(() => {
            
      console.log('useffecting')
      
      // localStorage.removeItem('textArray')
      
      let storedTextArray = JSON.parse(localStorage.getItem('textArray'));
      console.log(storedTextArray);
      
      if(textArray !== storedTextArray) {
        setTextArray(storedTextArray);
      }

      x.onChange(latest => {console.log(latest)})
    }, [])
  
  
    
    
    function newText(e) {

      e.preventDefault()
      
      if (e.detail === 2 && e.target.className === "App") {
        
        
        setShowInput(true)
        
        let posX = e.clientX;
        let posY = e.clientY;
        
        setposX(posX)
        setposY(posY)
        
        // console.log('double click')
        // console.log(posX, posY)
        
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
          // console.log(posX);
          // console.log(typeof e.target.value)
          // console.log(e.target.value.trim().length)
          
          setTextArray([...textArray, 
            {value: e.target.value, posX: posX, posY: posY, transformX: 0, transformY: 0}
          ] )
          
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
    
    function handleTextMouseDown(e) {
      // console.log(e.target.id)
      setTextMouseDown(true)
      setTextMouseDownId(parseInt(e.target.id))
      
      if(e.target != document.activeElement) {
        e.preventDefault()
      }
    }
    
    function handleMouseUp(e) {
      setTextMouseDown(false)
      setTextMouseDownId(null)
    }
    
    function handleKeyDown(e) {
      // e.target.style.width = 'inherit'
      
      if (e.keyCode === 13 && e.target.value.trim().length === 0) {
        e.preventDefault()
      }
      
      let characterLength = e.target.value.length
      // console.log(characterLength)
      let style = window.getComputedStyle(e.target)
      let width = parseInt(style.getPropertyValue('width'))
      // console.log(width)
      // console.log(characterLength / width)
      if (characterLength / width > .1) {
        // console.log('changing width');
        e.target.style.width = (width + width/10) + 'px'
      }
    }
    
    

 
    
    function appMouseDown(event, info) {
      if(event.target.className==='App') {
        console.log('app click')
        setAllowPan(true)
      }
    }
    
    function appMouseUp(event, info) {
      if(event.target.className==='App') {
        console.log('app click')
        setAllowPan(false)
      }
    }
    
    function onPan(event, info) {
        
        // console.log(info.point.x, info.point.y);
        
        let posX = info.point.x
        let posY = info.point.y
        
        // console.log(info.offset.x)
        // console.log(info.offset.y)
        
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
      if(event.target.className === 'App') {
        if(showInput) {
          setShowInput(false)
        }
        if(!showHighlightTool) {
          setShowHighlightTool(true)
        }
      }
    }
    
    function handlePanEnd(event, info) {
      setShowHighlightTool(false)
      setHighlightCornerX(null)
      setHighlightCornerY(null)
      setHighlightWidth(null)
      setHighlightHeight(null)
      setAllowPan(false)
    }
    
    
    
    
    
    
    
    
  const x = useMotionValue(0)
  const y = useMotionValue(0)
    
  return (
    <motion.div 
      className="App" 
      onClick={newText} 
      onPan={allowPan ? onPan : null} 
      onPanStart={allowPan ? handlePanStart : null} 
      onPanEnd={allowPan ? handlePanEnd : null}
      onMouseDown={appMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        cursor: `${textMouseDown ? 'pointer' : 'inherit'}`
      }}
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
        style={{left: highlightCornerX - 2, 
                top: highlightCornerY - 4, 
                width: highlightWidth, 
                height: highlightHeight, 
                transform: `rotate(${hRotation}deg)`, 
                transformOrigin: 'top left',
              }}
      >
      </motion.div>
      
      {textArray.map((text, i) => {
        // console.log(text)
        // console.log('x = ' + text.x,'y = ' + text.y)
        return <motion.div 
        className="textArray" 
        style={{
          left: text.posX - 4, 
          top: text.posY - 8,
          transform: `translate3d(${text.transformX}px, ${text.transformY}px)`,
        }} 
        key={i}
        drag
        dragMomentum={false}
        onDragStart={(event, info) => {
          
        }}
        onDragEnd={(event, info) => {
          console.log(info.offset.x, info.offset.y)
          // console.log(event.target.id)
          // console.log(x.get())
          // if(textArray[0].transformX) {
          //   console.log(textArray[0].transformX)
          //   }
          if(event.target.id) {
            let id = parseInt(event.target.id)
            console.log(event.target.id)
            
            let newTextArray = [...textArray]
            let newText = newTextArray[id]
            
            newText.transformX = info.offset.x
            newText.transformY = info.offset.y
            console.log(newText)
            
            newTextArray[id] = newText
            
            // localStorage['textArray'] = JSON.stringify(newTextArray)
            localStorage.setItem('textArray', JSON.stringify(newTextArray));
            // setTextArray(newTextArray)
          } else {
            console.log('no id?');
          }
        }}
        >
          <div 
            className="textSpan"
            id={i}
            contentEditable="true" 
            spellCheck="false" 
            style={{
              whiteSpace: 'pre',
              // borderColor: `${textMouseDownId === i ? 'black' : 'transparent'}`,
              color: `${textMouseDownId === i ? '#ce3636' : 'inherit'}`,
            }} 
            onMouseDown={handleTextMouseDown} 
            onMouseUp={handleMouseUp} 
            onDoubleClick={handleFocus}
            suppressContentEditableWarning={true}
            >
              {text.value}
          </div>
        </motion.div>
      })}
      
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