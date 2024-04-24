import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  ConnectionLineType,
} from "reactflow";
import "reactflow/dist/style.css";

import { Drawer } from "antd";
import { useCallback, useState } from "react";
import CustomNode from "@/components/FlowNode/CustomNode";
import Layout from "@/components/layout/layout";
import AuthLayout from "@/components/layout/authLayout";

const initialNodes: Node[] = [
  {
    id: "2000",
    data: {
      label: "CSCI 2000: Intro to Computer Programming",
      description:
        "An introduction to algorithms and programming, with an emphasis on the basic design, implementation, and testing of solutions to numerical and non-numerical problems. Prerequisite: CSCI 1080 or credit or registration in a mathematics core curriculum course.",
      active: false,
      alreadyTaken: false,
      classes: [
        {
          id: 1,
          name: "class 1",
          time: "2:30-4:30",
          crn: "102222",
          description: "THis is descr",
          location: "ksahjdka",
        },
        {
          id: 2,
          name: "class 2",
          time: "2:30-4:30",
          description: "THis is descr",
          location: "ksahjdka",
        },
      ],
    },
    position: { y: 100, x: 115 },
    selected: false,
    deletable: true,
  },
  {
    id: "1011",
    data: {
      label: "MATH 1011 or MATH 1012 or MATH 1031",
      description:
        "MATH 1011:In-depth treatment of solving equations and inequalities; function properties and graphs; inverse functions; linear, quadratic, polynomial, rational, exponential and logarithmic functions with applications; systems of equations. Students may not receive credit for both MATH 1011 and MATH 1009. Prerequisite(s): MATH ACT 16 or higher. Students with MATH ACT of 16-18 must concurrently enroll in MATH 1001. LCCN: CMAT 1213",
    },
    position: { y: 100, x: -400 },
    selected: false,
  },
  {
    id: "2003",
    data: {
      label: "CSCI 2003: Intermediate Programming",
      description:
        "CSCI 2003 - Intermediate Programming - 3 hrs\nContinuation of CSCI 2000, with increased emphasis on program design (including structured and object oriented techniques, data structures, and algorithms). Prerequisite(s): Grade of 'C' or better in CSCI 2000 and credit in MATH 1011 or MATH 1013 or MATH 1031 or permission of the department head. Anticipated availability: Fall '22 | ",
    },
    position: { y: 250, x: 5 },
    selected: false,
  },
  {
    id: "2026",
    data: {
      label: "CSCI 2026: Intro to Discrete Structure",
      description:
        "CSCI 2003 - Intermediate Programming - 3 hrs\nContinuation of CSCI 2000, with increased emphasis on program design (including structured and object oriented techniques, data structures, and algorithms). Prerequisite(s): Grade of 'C' or better in CSCI 2000 and credit in MATH 1011 or MATH 1013 or MATH 1031 or permission of the department head. Anticipated availability: Fall '22 | ",
      alreadyTaken: false,
    },
    position: { y: 250, x: 200 },
  },
  {
    id: "2073",
    data: {
      label: "CSCI 2073: Data Structure",
      description:
        "CSCI 2003 - Intermediate Programming - 3 hrs\nContinuation of CSCI 2000, with increased emphasis on program design (including structured and object oriented techniques, data structures, and algorithms). Prerequisite(s): Grade of 'C' or better in CSCI 2000 and credit in MATH 1011 or MATH 1013 or MATH 1031 or permission of the department head. Anticipated availability: Fall '22 | ",
    },
    position: { y: 400, x: 5 },
  },
  {
    id: "3026",
    data: {
      label: "CSCI 3026: Advanced Discrete Strucutes",
      description:
        "CSCI 2003 - Intermediate Programming - 3 hrs\nContinuation of CSCI 2000, with increased emphasis on program design (including structured and object oriented techniques, data structures, and algorithms). Prerequisite(s): Grade of 'C' or better in CSCI 2000 and credit in MATH 1011 or MATH 1013 or MATH 1031 or permission of the department head. Anticipated availability: Fall '22 | ",
    },
    position: { y: 400, x: 200 },
  },
  {
    id: "2053",
    data: {
      label: "CSCI 2053: Computer Organization & Assembly",
      description:
        "CSCI 2003 - Intermediate Programming - 3 hrs\nContinuation of CSCI 2000, with increased emphasis on program design (including structured and object oriented techniques, data structures, and algorithms). Prerequisite(s): Grade of 'C' or better in CSCI 2000 and credit in MATH 1011 or MATH 1013 or MATH 1031 or permission of the department head. Anticipated availability: Fall '22 | ",
    },
    position: { y: 400, x: 400 },
  },
  {
    id: "2098",
    data: {
      label: "CSCI 2098: Ethics in Computing",
      description:
        "CSCI 2003 - Intermediate Programming - 3 hrs\nContinuation of CSCI 2000, with increased emphasis on program design (including structured and object oriented techniques, data structures, and algorithms). Prerequisite(s): Grade of 'C' or better in CSCI 2000 and credit in MATH 1011 or MATH 1013 or MATH 1031 or permission of the department head. Anticipated availability: Fall '22 | ",
    },
    position: { y: 550, x: -400 },
  },
  {
    id: "3020",
    data: { label: "CSCI 3020: Object-Oriented Design & Programming" },
    position: { y: 550, x: -200 },
  },
  {
    id: "3030",
    data: { label: "CSCI 3030: Internet Programming" },
    position: { y: 550, x: 400 },
  },
  {
    id: "3005",
    data: { label: "CSCI 3005: Analysis of Algorithm" },
    position: { y: 550, x: 200 },
  },
  {
    id: "3010",
    data: { label: "CSCI 3010: Org of Programming Lang" },
    position: { y: 550, x: 200 },
  },
  {
    id: "4012",
    data: { label: "CSCI 4012: Computer Architecture" },
    position: { y: 550, x: 400 },
  },
  {
    id: "4055",
    data: { label: "CSCI 4055: Theory of Data Base Management Systems" },
    position: { y: 700, x: 5 },
  },
  {
    id: "4011",
    data: { label: "CSCI 4011: Operating Systems" },
    position: { y: 700, x: 400 },
  },
  {
    id: "4060",
    data: {
      label: "Principles of Software Engineering",
      description: "Principles of Software Engineering",
    },
    position: { y: 850, x: 200 },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "2000", target: "2003" },
  { id: "e2-3", source: "2000", target: "2026" },
  { id: "e3-2", source: "2003", target: "2073" },
  { id: "e-6", source: "1011", target: "2003" },
  { id: "e4-6", source: "1011", target: "2026" },
  { id: "e5-7", source: "2026", target: "3026" },
  { id: "e6-8", source: "2073", target: "2098" },
  { id: "e7-9", source: "2073", target: "3020" },
  { id: "e8-10", source: "2073", target: "3030" },
  { id: "e9-11", source: "2073", target: "3005" },
  { id: "e10-12", source: "2073", target: "3010" },
  { id: "e11-13", source: "3026", target: "3005" },
  { id: "e12-14", source: "2053", target: "4012" },
  { id: "e13-15", source: "3010", target: "4060" },
  { id: "e14-16", source: "3005", target: "4055" },
  { id: "e15-17", source: "2026", target: "2053" },
  { id: "e16-18", source: "4055", target: "4060" },
  { id: "e17-19", source: "2053", target: "4011" },
  { id: "e18-20", source: "3010", target: "4011" },
];

// const [nodes, setNodes] = useState<Node[]>(initialNodes);

const nodeTypes = {
  custom: CustomNode,
};

const defaultEdgeOptions = {
  animated: true,
  type: "smoothstep",
};

export default function Page() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [currentNode, setCurrentNode] = useState({
    label: "",
    description: "",
    alreadyTaken: "",
    classes: "",
  });

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (e: React.MouseEvent, node: Node) => {
      setOpen(true);
      setCurrentNode((prev) => ({
        ...prev,
        label: node.data.label,
        description: node.data?.description ?? "",
        alreadyTaken: node.data?.alreadyTaken,
      }));
      console.log(node);
    },
    [nodes]
  );

  return (
    <div className="flow flex-1 container mx-auto h-screen">
      <Drawer
        title={currentNode ? currentNode.label : "null"}
        onClose={onClose}
        open={open}
        style={{ backgroundColor: "lightyellow" }}
      >
        <p>{currentNode.description}</p>
        {/* <p>{alreadyTaken}</p> */}
        <p className="makeItItalic">
          {currentNode.alreadyTaken
            ? "You have already taken"
            : "You haven't taken the course yet."}
        </p>
        <p className="makeItRed"> Generally offered In Fall only!</p>
        <p className="makeItBold">
          These are the available classes for Fall 2024 :{" "}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <div
            style={{
              border: "1px solid green",
              padding: "4px 4px 4px 12px",
              borderRadius: "12px",
            }}
          >
            <p className="makeItGreen">Class CRN : 10229 </p>
            <p className="makeItGreen">Class Time: 2:30 - 3:45 </p>
            <p className="makeItBlue">Class CRN: 10223</p>
            <p className="makeItBlue" style={{ marginBottom: "0px" }}>
              CLass Time: 12:15 - 2:00
            </p>
          </div>
          <div
            style={{
              border: "1px solid green",
              padding: "4px 4px 4px 12px",
              borderRadius: "12px",
            }}
          >
            <p className="makeItGreen">Class CRN : 10229 </p>
            <p className="makeItGreen">Class Time: 2:30 - 3:45 </p>
            <p className="makeItBlue">Class CRN: 10223</p>
            <p className="makeItBlue" style={{ marginBottom: "0px" }}>
              CLass Time: 12:15 - 2:00
            </p>
          </div>
        </div>
      </Drawer>

      {/* <header className="header">Bachelor&apos;s in Computer Science</header> */}
      <h1
        className="text-2xl font-bold text-center mt-4
      text-yellow-800
      "
      >
        Four Year Plan
      </h1>
      <p className="text-center text-yellow-600 pb-2">
        Bachelor&apos;s in Computer Science
      </p>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        onNodeClick={onNodeClick}
        className="h-full mt-4"
      />
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <Layout>
      <AuthLayout>{page}</AuthLayout>
    </Layout>
  );
};
