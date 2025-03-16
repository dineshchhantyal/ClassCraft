import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import fs from 'fs/promises';
import path from 'path';
import { Select } from 'selenium-webdriver/lib/select'; // Add this import

export interface CourseData {
  courseId: string;
  courseName: string;
  instructor: string;
  schedule: string;
  location: string;
  credits: number;
  prerequisites: string[];
}

export class BannerScraper {
  private driver: WebDriver | null = null;
  
  async initialize() {
    const options = new chrome.Options();
    options.addArguments('--headless'); // Run in headless mode
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-gpu');
    options.addArguments('--window-size=1920,1080'); 
    options.addArguments('--start-maximized'); 
    
    // Build the driver
    this.driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
      
    // Set an implicit wait time for the entire session
    await this.driver.manage().setTimeouts({ implicit: 30000 });
  }
  
  async login(url: string, username: string, password: string) {
    if (!this.driver) throw new Error('Driver not initialized');
    
    await this.driver.get(url);

    console.log("Driver initialized");
    // Wait for login form to be fully loaded
  
    await this.driver.findElement(By.id('UserID')).sendKeys(username);
    await this.driver.findElement(By.id('PIN')).sendKeys(password);
    
    // Wait for the submit button to be clickable
    const submitButton = await this.driver.findElement(By.css('input[type="submit"]'));
    await this.driver.wait(until.elementIsEnabled(submitButton), 3000);
    await submitButton.click();
    

    
    // Additional wait after page load
    await this.driver.sleep(5000);
    
    // Now find and click the Student anchor tag
    try {
      // Try to find by href first (more precise)
      const studentLink = await this.driver.wait(
        until.elementLocated(By.css('a[href="/PROD/twbkwbis.P_GenMenu?name=bmenu.P_StuMainMnu"]')), 
        3000
      );
      await this.driver.wait(until.elementIsEnabled(studentLink), 30000);
      await studentLink.click();
      
      // Wait for navigation after clicking
      await this.driver.sleep(3000);
    } catch (error) {
      console.error('Error clicking Student link:', error);
      // Fallback to finding by link text if href approach fails
      try {
        const studentLink = await this.driver.wait(until.elementLocated(By.linkText('Student')), 30000);
        await studentLink.click();
        await this.driver.sleep(3000);
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        throw new Error('Could not navigate to Student section');
      }
    }
  }
  
  async navigateToCourseSearch() {
    if (!this.driver) throw new Error('Driver not initialized');
    
    // No need to click Student link again as it's already clicked in login flow
    // Wait for the Look Up Classes link to be clickable
    try {
      const lookupLink = await this.driver.wait(until.elementLocated(By.linkText('Look Up Classes')), 30000);
      await this.driver.wait(until.elementIsEnabled(lookupLink), 30000);
      await lookupLink.click();
      
      // Wait for the page to load with increased timeout
      await this.driver.wait(until.elementLocated(By.css('select[name="p_term"]')), 60000);
      
      // Additional wait after page load
      await this.driver.sleep(5000);
      console.log("Successfully navigated to term selection page");
    } catch (error) {
      console.error('Error navigating to course search:', error);
      throw new Error('Failed to navigate to course search page');
    }
  }
  
  async extractCoursesForTerm(term: string): Promise<CourseData[]> {
    if (!this.driver) throw new Error('Driver not initialized');
    
    try {
      console.log(`Looking for available terms`);
      
      // Select the term using the Select class for better dropdown handling
      const termSelect = await this.driver.wait(until.elementLocated(By.css('select[name="p_term"]')), 30000);
      await this.driver.wait(until.elementIsEnabled(termSelect), 30000);
      
      // Create Select object from the dropdown element
      const dropdown = new Select(termSelect);
      
      // Get all options
      const options = await termSelect.findElements(By.css('option'));
      
      // Find first non-empty option
      let selectedTerm = '';
      
      for (const option of options) {
        const value = await option.getAttribute('value');
        if (value && value !== '') {
          // Select this option
          selectedTerm = value;
          await dropdown.selectByValue(value);
          const text = await option.getText();
          console.log(`Selected first available term: ${text} (${value})`);
          break;
        }
      }
      
      if (!selectedTerm) {
        throw new Error('No valid term options found');
      }
      
      // Wait for and click the submit button
      const submitButton = await this.driver.wait(
        until.elementLocated(By.css('input[type="submit"][value="Submit"]')), 
        30000
      );
      await this.driver.wait(until.elementIsEnabled(submitButton), 30000);
      await submitButton.click();
      console.log("Submitted term selection");
      
      // Wait for the subject list to load
      await this.driver.wait(until.elementLocated(By.css('.subjectlist option')), 60000);
      
      // Extract course data
      const courses: CourseData[] = [];
      
      // Find all subject areas (this will vary by institution)
      const subjects = await this.driver.findElements(By.css('.subjectlist option'));
      
      for (const subject of subjects) {
        const subjectText = await subject.getText();
        await subject.click();
        
        // Wait for and click the Course Search button
        const searchButton = await this.driver.wait(until.elementLocated(By.css('input[value="Course Search"]')), 30000);
        await this.driver.wait(until.elementIsEnabled(searchButton), 30000);
        await searchButton.click();
        
        // Wait for course table to load
        await this.driver.wait(until.elementLocated(By.css('table.datadisplaytable')), 60000);
        await this.driver.sleep(3000); // Additional wait for table content
        
        // Extract course rows
        const courseRows = await this.driver.findElements(By.css('table.datadisplaytable tr'));
        
        for (let i = 1; i < courseRows.length; i++) { // Skip header row
          const row = courseRows[i];
          const cells = await row.findElements(By.css('td'));
          
          if (cells.length >= 6) {
            const courseId = await cells[0].getText();
            const courseName = await cells[1].getText();
            const schedule = await cells[2].getText();
            const location = await cells[3].getText();
            const instructor = await cells[4].getText();
            const credits = parseFloat(await cells[5].getText());
            
            courses.push({
              courseId,
              courseName,
              instructor,
              schedule,
              location,
              credits,
              prerequisites: [] // We'll need additional navigation to get prerequisites
            });
          }
        }
        
        // Go back to subject selection
        await this.driver.navigate().back();
        
        // Wait for the page to reload after going back
        await this.driver.wait(until.elementLocated(By.css('.subjectlist')), 30000);
        await this.driver.sleep(3000); // Additional wait after navigation
      }
      
      return courses;
    } catch (error) {
      console.error('Error extracting courses for term:', error);
      throw new Error('Failed to extract courses for term');
    }
  }
  
  async getPrerequisites(courseData: CourseData[]): Promise<CourseData[]> {
    // This would require additional navigation for each course to find prerequisites
    // Implementation depends on how prerequisites are displayed in Banner
    return courseData;
  }
  
  async saveCourseData(courses: CourseData[], outputPath: string) {
    await fs.writeFile(
      outputPath,
      JSON.stringify(courses, null, 2),
      'utf-8'
    );
    console.log(`Saved ${courses.length} courses to ${outputPath}`);
  }
  
  async close() {
    if (this.driver) {
      await this.driver.quit();
      this.driver = null;
    }
  }
}