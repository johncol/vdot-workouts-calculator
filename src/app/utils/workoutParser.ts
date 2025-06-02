import { Workout } from './workoutCalculator';

interface ParsedWorkout {
  workouts: Workout[];
  totalDistance: number;
}

export function parseWorkoutDescription(description: string): ParsedWorkout {
  const workouts: Workout[] = [];
  let totalDistance = 0;

  // Split the workout into segments by '+'
  const segments = description.split('+').map(s => s.trim());

  for (const segment of segments) {
    // Handle interval workouts (e.g., "4 × 3 min H (I pace) w/2 min recovery jg")
    if (segment.includes('×')) {
      const [repsStr, rest] = segment.split('w/');
      const [count, duration] = repsStr.split('×').map(s => s.trim());
      
      // Extract the workout type from the description
      let type: 'I' | 'R' = 'I';
      if (duration.includes('R')) {
        type = 'R';
      }

      // Parse the distance (convert from minutes to km if needed)
      let distance = 0;
      if (duration.includes('min')) {
        // For time-based intervals, estimate distance based on pace
        // This is a rough estimate and might need adjustment
        const minutes = parseInt(duration);
        distance = minutes / 4; // Assuming 4 min/km pace as default
      } else {
        // For distance-based intervals
        distance = parseFloat(duration);
      }

      // Parse rest distance
      let restDistance = 0;
      if (rest) {
        if (rest.includes('min')) {
          const minutes = parseInt(rest);
          restDistance = minutes / 4; // Same rough estimate
        } else {
          restDistance = parseFloat(rest);
        }
      }

      workouts.push({
        type,
        distance,
        repetitions: parseInt(count),
        restDistance
      });

      totalDistance += distance * parseInt(count);
    } else {
      // Handle simple workouts (e.g., "2 E")
      const [distance, type] = segment.split(' ').map(s => s.trim());
      if (distance && type) {
        workouts.push({
          type: type as 'E' | 'L' | 'M' | 'T',
          distance: parseFloat(distance)
        });
        totalDistance += parseFloat(distance);
      }
    }
  }

  return { workouts, totalDistance };
} 