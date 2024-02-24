"use client";

import { CustomAudioRecorder } from "@/components/CustomAudioRecorder";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>React Audio Voice Recorder</h1>
        <p className={styles.subtitle}>Custom UI demo!</p>
      </header>

      <CustomAudioRecorder
        onRecordingComplete={(blob) => {
          console.log("Finished recording!", blob);
        }}
      />
    </main>
  );
}
