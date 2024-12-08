import React, { useState, useRef, useEffect } from 'react'

export default function FootballPitch() {
    const [clickedCoords, setClickedCoords] = useState(null)
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
    const canvasRef = useRef(null)
    const imageRef = useRef(null)

    useEffect(() => {
        const handleResize = () => {
            if (imageRef.current) {
                setImageDimensions({
                    width: imageRef.current.width,
                    height: imageRef.current.height
                })
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleImageLoad = ({ target }) => {
        setImageDimensions({
            width: target.naturalWidth,
            height: target.naturalHeight
        })
    }

    const handleCanvasClick = (event) => {
        const canvas = canvasRef.current
        if (canvas) {
            const rect = canvas.getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top

            // Normalize coordinates
            const normalizedX = x / rect.width
            const normalizedY = y / rect.height

            setClickedCoords({ x: normalizedX, y: normalizedY })
        }
    }

    return (
        <div className="flex justify-center">
            <div className="relative inline-block w-1/2">
                <img
                    ref={imageRef}
                    src="/pitch.png"
                    alt="Football Pitch"
                    width={imageDimensions.width}
                    height={imageDimensions.height}
                    onLoad={handleImageLoad}
                    style={{ width: '100%', height: 'auto' }}
                />
                <canvas
                    ref={canvasRef}
                    width={imageDimensions.width}
                    height={imageDimensions.height}
                    onClick={handleCanvasClick}
                    className="absolute top-0 left-0 w-full h-full cursor-crosshair"
                />
            </div>

        </div>
    )
}