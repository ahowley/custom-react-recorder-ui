"use client";

import uploadIcon from "@/public/CloudArrowUp.svg";
import pauseIcon from "@/public/Pause.svg";
import playIcon from "@/public/Play.svg";
import trashIcon from "@/public/Trash.svg";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { LiveAudioVisualizer } from "react-audio-visualize";
import { useAudioRecorder } from "react-audio-voice-recorder";
import "./CustomAudioRecorder.css";

type MediaAudioTrackConstraints = Pick<
  MediaTrackConstraints,
  | "deviceId"
  | "groupId"
  | "autoGainControl"
  | "channelCount"
  | "echoCancellation"
  | "noiseSuppression"
  | "sampleRate"
  | "sampleSize"
>;

type CustomAudioRecorderProps = {
  onRecordingComplete: (blob: Blob) => any;
  afterDelete?: () => any;
  audioTrackConstraints?: MediaAudioTrackConstraints;
  onNotAllowedOrFound?: (exception: DOMException) => any;
  barWidth?: number;
  gap?: number;
  backgroundColor?: string;
  barColor?: string;
};

export const CustomAudioRecorder: React.FC<CustomAudioRecorderProps> = ({
  onRecordingComplete,
  afterDelete,
  audioTrackConstraints,
  onNotAllowedOrFound,
  barWidth,
  gap,
  backgroundColor,
  barColor,
}) => {
  const deleteRef = useRef(false);
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    // recordingTime,
    mediaRecorder,
  } = useAudioRecorder(audioTrackConstraints, onNotAllowedOrFound);

  const handleDelete = () => {
    deleteRef.current = true;
    if (isRecording) stopRecording();
    setTimeout(() => {
      deleteRef.current = false;
      afterDelete && afterDelete();
    }, 10);
  };

  const handlePlayPause = () => {
    if (!isRecording) {
      startRecording();
    } else {
      togglePauseResume();
    }
  };

  useEffect(() => {
    if (!recordingBlob || isRecording || deleteRef.current) return;

    onRecordingComplete(recordingBlob);
  }, [recordingBlob]);

  return (
    <form action="" className="recorder">
      {mediaRecorder ? (
        <>
          <button className="button trash" type="button" onClick={handleDelete}>
            <span className="screen-reader-only">Delete Button</span>
            <Image className="icon" src={trashIcon} alt="An icon of a trash can." />
          </button>
          <LiveAudioVisualizer
            mediaRecorder={mediaRecorder}
            barWidth={barWidth ?? 2}
            gap={gap ?? 1}
            barColor={barColor ?? "#929292"}
            backgroundColor={backgroundColor ?? "transparent"}
            maxDecibels={-1}
            height={45}
            width={332}
          />
        </>
      ) : (
        <>
          <div className="button-placeholder" />
          <div className="visualizer-skeleton" />
        </>
      )}
      {(!isRecording || isPaused) && (
        <button className="button play" type="button" onClick={handlePlayPause}>
          <span className="screen-reader-only">Play Button</span>
          <Image className="icon" src={playIcon} alt="An icon of a play button." />
        </button>
      )}
      {isRecording && !isPaused && (
        <button className="button pause" type="button" onClick={handlePlayPause}>
          <span className="screen-reader-only">Pause Button</span>
          <Image className="icon" src={pauseIcon} alt="An icon of a pause button." />
        </button>
      )}
      {isRecording ? (
        <button className="button upload" type="button" onClick={stopRecording}>
          <span className="screen-reader-only">Upload Button</span>
          <Image className="icon" src={uploadIcon} alt="An icon of a cloud with an up arrow." />
        </button>
      ) : (
        <div className="button-placeholder" />
      )}
    </form>
  );
};
