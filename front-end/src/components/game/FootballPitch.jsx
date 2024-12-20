import React, { useState, useRef, useEffect } from 'react';
import ActionModal from './ActionModal';

export default function FootballPitch({ actions, match, homeTeam, awayTeam, onActionSubmit, currentTime, setIsPitchModalOpen }) {
    const [clickedCoords, setClickedCoords] = useState(null);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const canvasRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (imageRef.current) {
                setImageDimensions({
                    width: imageRef.current.width,
                    height: imageRef.current.height,
                });
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleImageLoad = ({ target }) => {
        setImageDimensions({
            width: target.naturalWidth,
            height: target.naturalHeight,
        });
    };

    const handleCanvasClick = (event) => {
        console.log(currentTime)
        const canvas = canvasRef.current;
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Normalize coordinates
            const normalizedX = x / rect.width;
            const normalizedY = y / rect.height;

            setClickedCoords({ x: normalizedX, y: normalizedY });
            setIsModalOpen(true); // Open the modal
            setIsPitchModalOpen(true);
        }
    };

    const handleModalSubmit = (formData) => {
        const actionData = {
            ...formData,
            actionPointX: clickedCoords.x,
            actionPointY: clickedCoords.y,
            minutes: currentTime.minutes,
            seconds: currentTime.seconds
        };

        onActionSubmit(actionData); // Call the parent-provided function to handle submission
        setIsModalOpen(false); // Close the modal
        setIsPitchModalOpen(false);
    };

    return (
        <div className="flex justify-center">
            <div className="relative inline-block w-5/6">
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
            {isModalOpen && (
                <ActionModal
                    isPositional={true}
                    actions={actions}
                    match={match}
                    homeTeam={homeTeam}
                    awayTeam={awayTeam}
                    onClose={() => setIsModalOpen(false)}
                    onActionSubmit={handleModalSubmit}
                    currentTime={currentTime}
                />
            )}
        </div>
    );
}
