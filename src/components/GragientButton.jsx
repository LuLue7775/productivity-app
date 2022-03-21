import React from 'react'

export default function GragientButton({ text, handleClick }) {

  return (

    <div className='d-flex justify-content-center align-items-center mode-color rounded-circle shadow mode-text p-3 gradient-btn' 
        style={{width:'200px', height:'200px'}}
        onClick={handleClick}
        > 
        {text}
    </div>
    )
}
