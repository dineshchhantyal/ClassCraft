import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { 
  Node, 
  Edge, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState,
  MarkerType,
  Position,
  Handle
} from 'reactflow';
import 'reactflow/dist/style.css';
import { ProcessedCourseData } from '@/utils/CourseDataProcessor';

interface CourseFlowDiagramProps {
  courses: ProcessedCourseData[];
}

// Custom node data type
interface CourseNodeData {
  label: string;
  courseName: string;
  instructor: string;
  schedule: string;
  location: string;
  credits: number;
}

// Custom node component moved outside the main component
const CourseNode = ({ data }: { data: CourseNodeData }) => {
  return (
    <div className="p-3 bg-white rounded-md shadow-md relative">
      {/* Add source handle (bottom) for outgoing connections */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="source"
        style={{ background: '#555', width: '10px', height: '10px' }}
      />
      
      {/* Add target handle (top) for incoming connections */}
      <Handle
        type="target"
        position={Position.Top}
        id="target"
        style={{ background: '#555', width: '10px', height: '10px' }}
      />
      
      <h3 className="font-bold text-lg">{data.label}</h3>
      <p className="text-sm">{data.courseName}</p>
      <div className="text-xs mt-2">
        <p><span className="font-medium">Instructor:</span> {data.instructor}</p>
        <p><span className="font-medium">Schedule:</span> {data.schedule}</p>
        <p><span className="font-medium">Location:</span> {data.location}</p>
        <p><span className="font-medium">Credits:</span> {data.credits}</p>
      </div>
    </div>
  );
};

// nodeTypes defined outside the component
const nodeTypes = {
  default: CourseNode,
};

const CourseFlowDiagram: React.FC<CourseFlowDiagramProps> = ({ courses }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  // Convert course data to React Flow nodes and edges
  useEffect(() => {
    if (!courses.length) return;

    const newNodes: Node<CourseNodeData>[] = [];
    const newEdges: Edge[] = [];
    const nodePositions: Record<string, { x: number, y: number }> = {};
    
    // Create nodes for courses
    courses.forEach((course, index) => {
      // Position nodes in a grid layout
      const row = Math.floor(index / 3);
      const col = index % 3;
      const x = col * 300 + 50;
      const y = row * 200 + 50;
      
      nodePositions[course.courseId] = { x, y };
      
      newNodes.push({
        id: course.courseId,
        type: 'default',
        position: { x, y },
        data: {
          label: `${course.courseId}`,
          courseName: course.courseName,
          instructor: course.instructor,
          schedule: course.schedule,
          location: course.location,
          credits: course.credits
        },
        style: {
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: '5px',
          padding: '10px',
          width: 250,
        },
      });
    });
    
    // Create edges for prerequisites
    courses.forEach(course => {
      course.prerequisites.forEach(prereq => {
        if (nodePositions[prereq]) {
          newEdges.push({
            id: `${prereq}-${course.courseId}`,
            source: prereq,
            target: course.courseId,
            sourceHandle: 'source', // specify the source handle ID
            targetHandle: 'target', // specify the target handle ID
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            style: { stroke: '#888' },
          });
        }
      });
      
      // Add conflict edges
      course.conflicts.forEach(conflict => {
        if (nodePositions[conflict] && !newEdges.some(e => 
          (e.source === course.courseId && e.target === conflict) || 
          (e.source === conflict && e.target === course.courseId)
        )) {
          newEdges.push({
            id: `conflict-${course.courseId}-${conflict}`,
            source: course.courseId,
            target: conflict,
            sourceHandle: 'source', // specify the source handle ID
            targetHandle: 'target', // specify the target handle ID
            style: { stroke: 'red', strokeDasharray: '5,5' },
            animated: true,
            label: 'Conflict',
          });
        }
      });
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [courses, setNodes, setEdges]);

  return (
    <div className="w-full h-[800px] border border-gray-200 rounded-md">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default CourseFlowDiagram;
