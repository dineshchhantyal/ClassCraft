import { CourseData } from './BannerScraper';

export interface ProcessedCourseData extends CourseData {
  dayOfWeek: string[];
  startTime: string | null;
  endTime: string | null;
  conflicts: string[];
}

export class CourseDataProcessor {
  
  processScheduleData(courses: CourseData[]): ProcessedCourseData[] {
    return courses.map(course => {
      // Extract days of week and times from schedule string
      // Example format: "MWF 10:00 AM - 11:15 AM"
      const { dayOfWeek, startTime, endTime } = this.parseSchedule(course.schedule);
      
      return {
        ...course,
        dayOfWeek,
        startTime,
        endTime,
        conflicts: [] // Will be populated later
      };
    });
  }
  
  private parseSchedule(scheduleString: string): {
    dayOfWeek: string[];
    startTime: string | null;
    endTime: string | null;
  } {
    try {
      // Handle online/asynchronous courses
      if (scheduleString.toLowerCase().includes('online') || 
          scheduleString.toLowerCase().includes('asynchronous')) {
        return {
          dayOfWeek: ['Online'],
          startTime: null,
          endTime: null
        };
      }
      
      // Extract days of week
      const dayMapping: Record<string, string> = {
        'M': 'Monday',
        'T': 'Tuesday',
        'W': 'Wednesday',
        'R': 'Thursday',
        'F': 'Friday',
        'S': 'Saturday',
        'U': 'Sunday'
      };
      
      const parts = scheduleString.split(' ');
      const dayChars = parts[0].split('');
      const dayOfWeek = dayChars.map(char => dayMapping[char] || char);
      
      // Extract times
      const timePattern = /(\d{1,2}:\d{2}\s*[AP]M)\s*-\s*(\d{1,2}:\d{2}\s*[AP]M)/i;
      const timeMatch = scheduleString.match(timePattern);
      
      let startTime = null;
      let endTime = null;
      
      if (timeMatch) {
        startTime = timeMatch[1];
        endTime = timeMatch[2];
      }
      
      return { dayOfWeek, startTime, endTime };
    } catch (error) {
      console.error(`Failed to parse schedule: ${scheduleString}`, error);
      return {
        dayOfWeek: ['Unknown'],
        startTime: null,
        endTime: null
      };
    }
  }
  
  findScheduleConflicts(courses: ProcessedCourseData[]): ProcessedCourseData[] {
    return courses.map(course => {
      const conflicts: string[] = [];
      
      // Skip courses without specific meeting times
      if (!course.startTime || !course.endTime) {
        return { ...course, conflicts };
      }
      
      for (const otherCourse of courses) {
        if (course.courseId === otherCourse.courseId || !otherCourse.startTime || !otherCourse.endTime) {
          continue;
        }
        
        // Check for day overlap
        const dayOverlap = course.dayOfWeek.some(day => 
          otherCourse.dayOfWeek.includes(day)
        );
        
        if (dayOverlap) {
          // Check for time overlap
          const courseStart = this.timeToMinutes(course.startTime);
          const courseEnd = this.timeToMinutes(course.endTime);
          const otherStart = this.timeToMinutes(otherCourse.startTime);
          const otherEnd = this.timeToMinutes(otherCourse.endTime);
          
          if ((courseStart <= otherEnd) && (courseEnd >= otherStart)) {
            conflicts.push(otherCourse.courseId);
          }
        }
      }
      
      return { ...course, conflicts };
    });
  }
  
  private timeToMinutes(timeString: string): number {
    // Convert time like "10:00 AM" to minutes since midnight
    const [timePart, meridian] = timeString.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);
    
    if (meridian.toUpperCase() === 'PM' && hours < 12) {
      hours += 12;
    } else if (meridian.toUpperCase() === 'AM' && hours === 12) {
      hours = 0;
    }
    
    return (hours * 60) + minutes;
  }
}