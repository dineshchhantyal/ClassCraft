import type { NextApiRequest, NextApiResponse } from 'next';
import { BannerScraper } from '@/utils/BannerScraper';
import { CourseDataProcessor } from '@/utils/CourseDataProcessor';
import path from 'path';

// Increase API timeout - scraping might take time
export const config = {
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: '4mb',
    },
    externalResolver: true, // This allows longer execution time
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { url, username, password, term } = req.body;

  if (!url || !username || !password || !term) {
    res.status(400).json({ message: 'Missing required parameters' });
    return;
  }

  // Only use mock data if explicitly configured
  const useMockData = process.env.USE_MOCK_DATA === 'true';
  
  try {
    let courseData;
    
    if (useMockData) {
      console.log('Using mock data');
      courseData = getMockCourseData();
    } else {
      console.log('Starting real data scraping process');
      
      // Initialize the scraper
      const scraper = new BannerScraper();
      
      try {
        console.log('Initializing scraper...');
        await scraper.initialize();
        
        try {
          // Login to the Banner system
          console.log(`Attempting to login at ${url}...`);
          await scraper.login(url, username, password);
          
          // Navigate to the course search page
          console.log('Navigating to course search page...');
          await scraper.navigateToCourseSearch();
          
          // Extract course data for the specified term
          console.log(`Extracting courses for term: ${term}...`);
          courseData = await scraper.extractCoursesForTerm(term);
          
          // Get prerequisites (if implemented)
          console.log('Getting prerequisites...');
          courseData = await scraper.getPrerequisites(courseData);
          
          try {
            // Optional: Save the raw data to a file for backup/debugging
            console.log('Saving course data to file...');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const outputPath = path.join(process.cwd(), 'data', `course-data-${timestamp}.json`);
            await scraper.saveCourseData(courseData, outputPath);
          } catch (saveError) {
            console.error('Error saving data to file (non-critical):', saveError);
            // Continue execution even if saving fails
          }
        } catch (scrapingError) {
          console.error('Scraping operation failed:', scrapingError);
          if (scrapingError instanceof Error) {
            // Add more detailed error information
            console.error('Error details:', {
              message: scrapingError.message,
              stack: scrapingError.stack,
              name: scrapingError.name
            });
            
            // Specific handling for common element not found errors
            if (scrapingError.message.includes('no such element') || 
                scrapingError.message.includes('Unable to locate element')) {
              throw new Error(`Element not found during scraping. The website structure may have changed. Details: ${scrapingError.message}`);
            } else {
              throw new Error(`Scraping operation failed: ${scrapingError.message}`);
            }
          } else {
            throw new Error('Scraping operation failed: Unknown error');
          }
        }
      } catch (initError) {
        console.error('Failed to initialize scraper:', initError);
        
        // Add fallback to mock data when in development
        if (process.env.NODE_ENV === 'development') {
          console.log('⚠️ Scraping failed, falling back to mock data in development mode');
          courseData = getMockCourseData();
        } else if (initError instanceof Error) {
          throw new Error(`Browser initialization failed: ${initError.message}`);
        } else {
          throw new Error('Browser initialization failed: Unknown error');
        }
      } finally {
        // Make sure we close the browser instance
        try {
          console.log('Closing browser...');
          await scraper.close();
        } catch (closeError) {
          console.error('Error while closing browser:', closeError);
        }
      }
    }
    
    // Only process data if we have some
    if (!courseData || courseData.length === 0) {
      throw new Error('No course data available to process');
    }
    
    // Process the data
    console.log(`Processing scraped data (${courseData.length} courses)...`);
    const processor = new CourseDataProcessor();
    const processedData = processor.processScheduleData(courseData);
    const finalData = processor.findScheduleConflicts(processedData);

    // Return the processed data
    res.status(200).json({
      success: true,
      courses: finalData
    });
  } catch (error) {
    console.error('Error during course scraping:', error);
    // Include stack trace for better debugging
    const errorDetails = error instanceof Error ? 
      { message: error.message, stack: error.stack } : 
      { message: String(error) };
      
    res.status(500).json({
      success: false,
      message: 'Failed to scrape courses',
      error: errorDetails
    });
  }
}

// Mock data function - kept as fallback
function getMockCourseData() {
  return [
    {
      courseId: 'CS 101',
      courseName: 'Introduction to Computer Science',
      instructor: 'Dr. Smith',
      schedule: 'MWF 10:00 AM - 11:15 AM',
      location: 'Science Hall 101',
      credits: 3,
      prerequisites: []
    },
    {
      courseId: 'CS 201',
      courseName: 'Data Structures',
      instructor: 'Dr. Johnson',
      schedule: 'TR 9:30 AM - 10:45 AM',
      location: 'Science Hall 102',
      credits: 4,
      prerequisites: ['CS 101']
    },
    {
      courseId: 'CS 301',
      courseName: 'Algorithms',
      instructor: 'Dr. Williams',
      schedule: 'MWF 1:00 PM - 2:15 PM',
      location: 'Science Hall 203',
      credits: 4,
      prerequisites: ['CS 201']
    },
    {
      courseId: 'MATH 120',
      courseName: 'Calculus I',
      instructor: 'Dr. Brown',
      schedule: 'MWF 11:30 AM - 12:45 PM',
      location: 'Math Building 105',
      credits: 4,
      prerequisites: []
    },
    {
      courseId: 'MATH 220',
      courseName: 'Calculus II',
      instructor: 'Dr. Davis',
      schedule: 'TR 1:00 PM - 2:15 PM',
      location: 'Math Building 201',
      credits: 4,
      prerequisites: ['MATH 120']
    },
    {
      courseId: 'CS 350',
      courseName: 'Software Engineering',
      instructor: 'Dr. Miller',
      schedule: 'MWF 10:00 AM - 11:15 AM',
      location: 'Science Hall 305',
      credits: 3,
      prerequisites: ['CS 201']
    }
  ];
}