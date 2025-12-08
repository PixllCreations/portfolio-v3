"use client";

import type React from "react";

import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Html, Environment, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { useRef, useState, useMemo, useEffect } from "react";
import {
  BufferGeometry,
  CatmullRomCurve3,
  Group,
  Line,
  LineBasicMaterial,
  MathUtils,
  Mesh,
  QuadraticBezierCurve3,
  TubeGeometry,
  Vector3,
} from "three";
import ProjectsSection from "./projects-section";
import AboutSection from "./about-section";
import SkillsSection from "./skills-section";
import ContactSection from "./contact-section";

interface NeuronNode {
  id: string;
  position: [number, number, number];
  label: string;
  color: string;
  content: React.ReactNode;
}

function DetailedNeuron({
  position,
  color,
  isActive,
  onClick,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  isActive: boolean;
  onClick: () => void;
  scale?: number;
}) {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  const latticeStructure = useMemo(() => {
    const structure = [];
    const segments = 12;
    const radius = 0.8;

    // Create meridian lines (vertical pathways)
    for (let i = 0; i < segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const points = [];
      for (let j = 0; j <= segments; j++) {
        const phi = (j / segments) * Math.PI;
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        points.push(new Vector3(x, y, z));
      }
      structure.push({ points, type: "meridian" });
    }

    // Create latitude lines (horizontal pathways)
    for (let j = 1; j < segments; j++) {
      const phi = (j / segments) * Math.PI;
      const points = [];
      for (let i = 0; i <= segments * 2; i++) {
        const theta = (i / (segments * 2)) * Math.PI * 2;
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        points.push(new Vector3(x, y, z));
      }
      structure.push({ points, type: "latitude" });
    }

    return structure;
  }, []);

  const latticeNodes = useMemo(() => {
    const nodes: Vector3[] = [];
    // Only add nodes to a subset of paths for cleaner look
    const selectedPaths = latticeStructure.filter((_, i) => i % 3 === 0);

    selectedPaths.forEach((path) => {
      // Place 2-3 nodes evenly along each selected path
      const nodeCount = 2;
      for (let i = 0; i < nodeCount; i++) {
        // Evenly distribute nodes along the path (avoid ends)
        const t = (i + 1) / (nodeCount + 1);
        const index = Math.floor(t * path.points.length);
        if (path.points[index]) {
          nodes.push(path.points[index]);
        }
      }
    });
    return nodes;
  }, [latticeStructure]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;

      if (isActive) {
        const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
        groupRef.current.scale.setScalar(scale * pulse);
      } else {
        groupRef.current.scale.lerp(new Vector3(scale, scale, scale).multiplyScalar(hovered ? 1.1 : 1), 0.1);
      }
    }
  });

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = "auto";
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <group
      ref={groupRef}
      position={position}
    >
      <mesh
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        renderOrder={0}
      >
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshBasicMaterial
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>

      {/* Lattice structure */}
      {latticeStructure.map((path, i) => {
        const curve = new CatmullRomCurve3(path.points);
        const tubeGeometry = new TubeGeometry(curve, path.points.length, 0.02, 8, false);

        return (
          <mesh
            key={i}
            geometry={tubeGeometry}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            renderOrder={1}
          >
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={isActive ? 1.5 : hovered ? 1 : 0.6}
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={isActive ? 0.5 : hovered ? 0.35 : 0.25}
            />
          </mesh>
        );
      })}

      {/* Connection nodes - simple spheres */}
      {latticeNodes.map((node, i) => (
        <mesh
          key={`node-${i}`}
          position={[node.x, node.y, node.z]}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          renderOrder={2}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isActive ? 2 : hovered ? 1.5 : 1}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={isActive ? 0.7 : hovered ? 0.7 : 0.5}
          />
        </mesh>
      ))}

      {/* Core nucleus */}
      <mesh
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        renderOrder={2}
      >
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 2 : hovered ? 1.5 : 1}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

function SynapseConnection({
  start,
  end,
  isActive,
  color,
}: {
  start: [number, number, number];
  end: [number, number, number];
  isActive: boolean;
  color: string;
}) {
  const lineRef = useRef<Line>(null);
  const pulseRef = useRef<Mesh>(null);

  const curve = useMemo(() => {
    const startVec = new Vector3(...start);
    const endVec = new Vector3(...end);
    const midPoint = new Vector3().lerpVectors(startVec, endVec, 0.5);
    midPoint.y += 0.5;

    return new QuadraticBezierCurve3(startVec, midPoint, endVec);
  }, [start, end]);

  const points = useMemo(() => curve.getPoints(50), [curve]);

  const geometry = useMemo(() => {
    const geom = new BufferGeometry().setFromPoints(points);
    return geom;
  }, [points]);

  const lineObject = useMemo(() => {
    const material = new LineBasicMaterial({ color, transparent: true, opacity: 0.08 });
    return new Line(geometry, material);
  }, [geometry, color]);

  useFrame((state) => {
    if (lineRef.current) {
      const material = lineRef.current.material as LineBasicMaterial;
      material.opacity = MathUtils.lerp(material.opacity, isActive ? 0.25 : 0.08, 0.1);
    }

    if (pulseRef.current && isActive) {
      const t = (state.clock.elapsedTime * 0.5) % 1;
      const point = curve.getPoint(t);
      pulseRef.current.position.copy(point);
    }
  });

  return (
    <group>
      <primitive
        object={lineObject}
        ref={lineRef}
      />

      {isActive && (
        <mesh ref={pulseRef}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.4}
          />
        </mesh>
      )}
    </group>
  );
}

function CameraController({
  targetPosition,
  activeNode,
  controlsRef,
}: {
  targetPosition: [number, number, number];
  activeNode: string | null;
  controlsRef: React.RefObject<any>;
}) {
  const { camera } = useThree();
  const isAnimating = useRef(false);
  const prevActiveNode = useRef(activeNode);

  // Start animation when active node changes
  if (prevActiveNode.current !== activeNode) {
    isAnimating.current = true;
    prevActiveNode.current = activeNode;
    // Disable controls during animation
    if (controlsRef.current) {
      controlsRef.current.enabled = false;
    }
  }

  useFrame(() => {
    if (isAnimating.current) {
      const target = new Vector3(...targetPosition);
      const distance = camera.position.distanceTo(target);

      if (distance > 0.1) {
        camera.position.lerp(target, 0.05);
      } else {
        // Animation complete - re-enable controls
        isAnimating.current = false;
        if (controlsRef.current) {
          controlsRef.current.enabled = true;
        }
      }
    }
  });

  return null;
}

function NeuronScene({
  nodes,
  activeNode,
  setActiveNode,
}: {
  nodes: NeuronNode[];
  activeNode: string | null;
  setActiveNode: (id: string | null) => void;
}) {
  const controlsRef = useRef<any>(null);

  const connections = useMemo(() => {
    const conns: Array<{
      start: [number, number, number];
      end: [number, number, number];
      nodes: string[];
      color: string;
    }> = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        conns.push({
          start: nodes[i].position,
          end: nodes[j].position,
          nodes: [nodes[i].id, nodes[j].id],
          color: nodes[i].color,
        });
      }
    }
    return conns;
  }, [nodes]);

  const activeNodeData = nodes.find((n) => n.id === activeNode);
  const cameraPosition: [number, number, number] = activeNodeData
    ? [activeNodeData.position[0] * 0.3, activeNodeData.position[1] * 0.3 + 2, 8]
    : [0, 2, 8];

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={cameraPosition}
        fov={60}
      />
      <CameraController
        targetPosition={cameraPosition}
        activeNode={activeNode}
        controlsRef={controlsRef}
      />
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        minDistance={3}
        maxDistance={15}
        target={[0, 0, 0]}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 8}
      />

      <ambientLight intensity={0.3} />
      <pointLight
        position={[10, 10, 10]}
        intensity={1}
        color="#ffffff"
      />
      <pointLight
        position={[-10, -10, -10]}
        intensity={0.5}
        color="#6366f1"
      />
      <pointLight
        position={[0, 0, 0]}
        intensity={0.8}
        color="#06b6d4"
      />

      <Environment preset="night" />

      <gridHelper
        args={[20, 20, "#1e1b4b", "#1e1b4b"]}
        position={[0, -3, 0]}
      />

      {connections.map((conn, i) => (
        <SynapseConnection
          key={i}
          start={conn.start}
          end={conn.end}
          isActive={activeNode ? conn.nodes.includes(activeNode) : false}
          color={conn.color}
        />
      ))}

      {nodes.map((node) => (
        <group key={node.id}>
          <DetailedNeuron
            position={node.position}
            color={node.color}
            isActive={activeNode === node.id}
            onClick={() => setActiveNode(node.id)}
            scale={activeNode === node.id ? 1.5 : 1}
          />

          {!activeNode && (
            <Html
              position={[node.position[0], node.position[1] + 1.2, node.position[2]]}
              center
            >
              <div
                className={`pointer-events-none transition-all duration-300 ${
                  activeNode === node.id ? "opacity-100 scale-110" : "opacity-60 scale-100"
                }`}
              >
                <div className="bg-background/80 backdrop-blur-md px-4 py-2 rounded-lg border border-primary/30 shadow-2xl">
                  <p
                    className="text-foreground font-bold text-sm whitespace-nowrap tracking-wider"
                    style={{ color: node.color }}
                  >
                    {node.label.toUpperCase()}
                  </p>
                </div>
              </div>
            </Html>
          )}

          {activeNode === node.id && (
            <Html
              position={[0, 0, 0]}
              center
              style={{
                width: "600px",
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "auto",
              }}
              zIndexRange={[1000, 0]}
              distanceFactor={10}
            >
              <div className="pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-background/90 backdrop-blur-xl p-8 rounded-2xl border-2 border-primary/40 shadow-2xl max-h-[70vh] overflow-y-auto relative">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveNode(null);
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                    }}
                    className="absolute top-4 right-4 w-8 h-8 bg-primary text-primary-foreground rounded-lg hover:bg-primary/30 flex items-center justify-center transition-colors z-50 cursor-pointer"
                    aria-label="Close"
                    type="button"
                  >
                    <span className="text-primary-foreground text-2xl font-light leading-none pointer-events-none">
                      ×
                    </span>
                  </button>
                  {node.content}
                </div>
              </div>
            </Html>
          )}
        </group>
      ))}
    </>
  );
}

export default function NeuronNavigation() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [webglError, setWebglError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if WebGL is available
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebglError(true);
      }
    } catch (e) {
      setWebglError(true);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-linear-to-b from-background via-background/95 to-primary/5 flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const nodes: NeuronNode[] = useMemo(
    () => [
      {
        id: "home",
        position: [0, 0, 0],
        label: "Home",
        color: "#6366f1",
        content: (
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-primary">Welcome</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Full-Stack Software Developer specializing in cutting-edge web technologies and immersive 3D experiences.
            </p>
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setActiveNode("projects")}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                View Projects
              </button>
              <button
                onClick={() => setActiveNode("contact")}
                className="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
              >
                Get in Touch
              </button>
            </div>
          </div>
        ),
      },
      {
        id: "about",
        position: [-4, 2, -2],
        label: "About",
        color: "#8b5cf6",
        content: <AboutSection color="#8b5cf6" />,
      },
      {
        id: "projects",
        position: [4, 1, -1],
        label: "Projects",
        color: "#06b6d4",
        content: <ProjectsSection />,
      },
      {
        id: "skills",
        position: [-3, -2, 1],
        label: "Skills",
        color: "#10b981",
        content: <SkillsSection color="#10b981" />,
      },
      {
        id: "contact",
        position: [3, -1, 2],
        label: "Contact",
        color: "#f59e0b",
        content: <ContactSection color="#f59e0b" />,
      },
    ],
    [],
  );

  if (webglError) {
    // Fallback UI when WebGL is not available
    return (
      <div className="fixed inset-0 bg-linear-to-b from-background via-background/95 to-primary/5 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-primary">Portfolio</h1>
            <p className="text-muted-foreground">
              WebGL is not available in your browser. Please use a modern browser with WebGL support.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nodes.map((node) => (
              <div
                key={node.id}
                className="bg-background/80 backdrop-blur-md p-6 rounded-lg border border-primary/30 cursor-pointer hover:bg-background/90 transition-colors"
                onClick={() => setActiveNode(node.id)}
              >
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ color: node.color }}
                >
                  {node.label}
                </h2>
              </div>
            ))}
          </div>
          {activeNode && (
            <div className="fixed inset-0 bg-background/90 backdrop-blur-xl flex items-center justify-center z-50 p-4">
              <div className="bg-background/90 backdrop-blur-xl p-8 rounded-2xl border-2 border-primary/40 shadow-2xl max-w-2xl max-h-[80vh] overflow-y-auto relative">
                <button
                  onClick={() => setActiveNode(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-primary text-primary-foreground rounded-lg hover:bg-primary/30 flex items-center justify-center transition-colors z-50 cursor-pointer"
                  aria-label="Close"
                  type="button"
                >
                  <span className="text-primary-foreground text-2xl font-light leading-none pointer-events-none">
                    ×
                  </span>
                </button>
                {nodes.find((n) => n.id === activeNode)?.content}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-linear-to-b from-background via-background/95 to-primary/5">
      <Canvas
        onError={(error) => {
          console.error("Canvas error:", error);
          setWebglError(true);
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
        }}
      >
        <NeuronScene
          nodes={nodes}
          activeNode={activeNode}
          setActiveNode={setActiveNode}
        />
      </Canvas>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="bg-background/80 backdrop-blur-md px-6 py-3 rounded-full border border-primary/30 shadow-xl">
          <p className="text-sm text-muted-foreground text-center">
            Click on neurons to navigate • Drag to rotate view
          </p>
        </div>
      </div>
    </div>
  );
}
