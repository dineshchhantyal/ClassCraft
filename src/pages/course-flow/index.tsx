import React, { useState } from 'react';
import Layout from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CourseFlowDiagram from './diagram';
import { useToast } from "@/components/ui/use-toast";
import { ProcessedCourseData } from '@/utils/CourseDataProcessor';

export default function CourseScraper() {
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState<ProcessedCourseData[]>([]);
  const { toast } = useToast();
  
  // Form state
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [term, setTerm] = useState('');
  
  const runScraper = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url || !username || !password || !term) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real implementation, you would trigger a serverless function or API endpoint
      // that runs the Selenium scraper on the server
      const response = await fetch('/api/scrape-courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url,
          username,
          password,
          term
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to scrape courses');
      }
      
      const data = await response.json();
      setCourseData(data.courses);
      
      toast({
        title: "Scraping Complete",
        description: `Successfully scraped ${data.courses.length} courses.`
      });
    } catch (error) {
      console.error('Error while scraping:', error);
      toast({
        title: "Error",
        description: "Failed to scrape course data. Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Course Data Scraper</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Scraper Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Scrape Course Data</h2>
          
          <form onSubmit={runScraper} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="url" className="text-gray-700">Banner URL</Label>
              <Input 
                id="url" 
                type="url" 
                placeholder="https://banner.university.edu" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">Username</Label>
              <Input 
                id="username" 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="term" className="text-gray-700">Term</Label>
              <Input 
                id="term" 
                type="text"
                placeholder="Fall 2025"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-transform transform hover:scale-105"
              disabled={loading}
            >
              {loading ? "Scraping..." : "Start Scraping"}
            </Button>
          </form>
        </div>
        
        {/* Status and Statistics */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Scraping Results</h2>
          
          {courseData.length > 0 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{courseData.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Departments</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(courseData.map(c => c.courseId.split(' ')[0])).size}
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Instructors</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(courseData.map(c => c.instructor)).size}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total Credits</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {courseData.reduce((sum, course) => sum + course.credits, 0)}
                  </p>
                </div>
              </div>
              
              <Button 
                className="w-full bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-transform transform hover:scale-105"
                onClick={() => {
                  const dataStr = JSON.stringify(courseData, null, 2);
                  const dataBlob = new Blob([dataStr], { type: 'application/json' });
                  const url = URL.createObjectURL(dataBlob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `course-data-${term.replace(/\s+/g, '-')}.json`;
                  link.click();
                }}
              >
                Export Data (JSON)
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400">
              <p>No data scraped yet</p>
              <p className="text-sm">Fill out the form and start scraping</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Flow Diagram */}
      {courseData.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Course Visualization</h2>
          <CourseFlowDiagram courses={courseData} />
        </div>
      )}
    </div>
  );
}

CourseScraper.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};