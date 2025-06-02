'use client';

import { useState } from 'react';
import styles from './VDOTForm.module.css';
import { calculateWorkoutDuration, formatDuration } from '@/app/utils/workoutCalculator';
import { parseWorkoutDescription } from '@/app/utils/workoutParser';

export function VDOTForm() {
  const [vdot, setVdot] = useState('');
  const [workout, setWorkout] = useState('');
  const [result, setResult] = useState<{
    duration: string;
    totalDistance: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const vdotNumber = parseFloat(vdot);
      if (isNaN(vdotNumber)) {
        throw new Error('Please enter a valid VDOT value');
      }

      const { workouts, totalDistance } = parseWorkoutDescription(workout);
      
      // Calculate total duration for all workout segments
      const totalDuration = workouts.reduce((total, workout) => {
        return total + calculateWorkoutDuration(vdotNumber, workout);
      }, 0);

      setResult({
        duration: formatDuration(totalDuration),
        totalDistance
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while calculating the workout');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="vdot">VDOT Value</label>
          <input
            id="vdot"
            type="number"
            value={vdot}
            onChange={(e) => setVdot(e.target.value)}
            placeholder="Enter your VDOT value"
            min="0"
            max="100"
            step="0.1"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="workout">Workout Description</label>
          <textarea
            id="workout"
            value={workout}
            onChange={(e) => setWorkout(e.target.value)}
            placeholder="Enter your workout description, e.g. 2 E + 3 × 1 T w/1 min rests + 4 × 3 min H (I pace) w/2 min recovery jg + 6 × 200 R w/200 jg + 1 E"
            rows={4}
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          Calculate
        </button>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        {result && (
          <div className={styles.result}>
            <h3>Workout Summary</h3>
            <p>Total Duration: {result.duration}</p>
            <p>Total Distance: {result.totalDistance.toFixed(1)} km</p>
          </div>
        )}
      </form>
    </div>
  );
} 