import { trainingIntensities } from '../data/trainingIntensities';

type WorkoutType = 'E' | 'L' | 'M' | 'T' | 'I' | 'R';

export interface Workout {
  type: WorkoutType;
  distance: number; // in kilometers
  repetitions?: number; // for interval workouts
  restDistance?: number; // for interval workouts
}

// Convert pace string (e.g., "7:37-8:24") to seconds per kilometer
function paceToSeconds(pace: string): number {
  // For ranges, take the average
  if (pace.includes('-')) {
    const [min, max] = pace.split('-').map(p => {
      const [minutes, seconds] = p.split(':').map(Number);
      return minutes * 60 + seconds;
    });
    return (min + max) / 2;
  }
  
  const [minutes, seconds] = pace.split(':').map(Number);
  return minutes * 60 + seconds;
}

// Find paces for a given VDOT
function findPaces(vdot: number): Record<WorkoutType, number> {
  const vdotData = trainingIntensities.find(data => data.VDOT === vdot);
  if (!vdotData) {
    throw new Error(`No pace data found for VDOT ${vdot}`);
  }

  return {
    'E': paceToSeconds(vdotData['E/L (km)']),
    'L': paceToSeconds(vdotData['E/L (km)']),
    'M': paceToSeconds(vdotData['M (km)']),
    'T': paceToSeconds(vdotData['T (km)']),
    'I': vdotData['I (km)'] ? paceToSeconds(vdotData['I (km)']) : 0,
    'R': vdotData['R (200m)'] ? paceToSeconds(vdotData['R (200m)']) : 0,
  };
}

// Calculate workout duration in seconds
export function calculateWorkoutDuration(vdot: number, workout: Workout): number {
  const paces = findPaces(vdot);
  
  if (!paces[workout.type]) {
    throw new Error(`Invalid workout type: ${workout.type}`);
  }

  switch (workout.type) {
    case 'R':
      // For R workouts, convert 200m pace to per km pace
      const rPacePerKm = paces.R * 5; // 200m to 1km
      return rPacePerKm * workout.distance;
      
    case 'I':
      if (!workout.repetitions || !workout.restDistance) {
        throw new Error('Interval workouts require repetitions and rest distance');
      }
      // Calculate total work time
      const workTime = paces.I * workout.distance;
      // Calculate total rest time (assuming rest pace is 1.5x slower than interval pace)
      const restTime = (paces.I * 1.5) * workout.restDistance;
      return (workTime + restTime) * workout.repetitions;
      
    default:
      // For E, L, M, T workouts
      return paces[workout.type] * workout.distance;
  }
}

// Helper function to format duration in HH:MM:SS
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
} 