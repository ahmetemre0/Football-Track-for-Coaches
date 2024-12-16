'use client'

import React, { useState, useEffect, useRef } from 'react';

export default function Stopwatch({ totalSeconds, setTotalSeconds, isRunning, setIsRunning, editMode, setEditMode, editableMinutes, setEditableMinutes, editableSeconds, setEditableSeconds }) {
    const intervalRef = useRef(null);
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTotalSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    const handleTimeClick = () => {
        if (!isRunning) {
            setEditMode(true);
        }
    };

    const handleInputChange = (e, type) => {
        const value = Math.max(0, parseInt(e.target.value) || 0);
        if (type === 'minutes') {
            setEditableMinutes(value);
        } else if (type === 'seconds') {
            setEditableSeconds(Math.min(59, value));
        }
    };

    const handleSetTime = () => {
        const newTotalSeconds = editableMinutes * 60 + editableSeconds;
        setTotalSeconds(newTotalSeconds);
        setEditMode(false);
    };

    const handleStart = () => setIsRunning(true);
    const handlePause = () => setIsRunning(false);
    const handleReset = () => {
        setIsRunning(false);
        setTotalSeconds(0);
    };

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className="flex justify-center space-x-4 p-4 ">
            <div className="text-7xl font-mono">
                {editMode ? (
                    <div className="flex items-center space-x-2">
                        <input
                            type="number"
                            value={editableMinutes}
                            onChange={(e) => handleInputChange(e, 'minutes')}
                            className="w-24 text-center text-5xl border rounded p-2"
                            min="0"
                        />
                        <span>:</span>
                        <input
                            type="number"
                            value={editableSeconds}
                            onChange={(e) => handleInputChange(e, 'seconds')}
                            className="w-24 text-center text-5xl border rounded p-2"
                            min="0"
                            max="59"
                        />
                    </div>
                ) : (
                    <span onClick={handleTimeClick} className="cursor-pointer">
                        {formatTime(totalSeconds)}
                    </span>
                )}
            </div>
            <div className="flex space-x-2">
                {editMode ? (
                    <button
                        onClick={handleSetTime}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Set Time
                    </button>
                ) : (
                    <>
                        <button
                            onClick={isRunning ? handlePause : handleStart}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            {isRunning ? 'Pause' : 'Start'}
                        </button>
                        <button
                            onClick={handleReset}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Reset
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

