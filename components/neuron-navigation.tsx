"use client";

import type React from "react";

import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Html, Environment, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { useRef, useState, useMemo } from "react";
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
import Image from "next/image";
import Link from "next/link";

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

          <Html
            position={[node.position[0], node.position[1] + 1.2, node.position[2]]}
            center
          >
            <div
              className={`pointer-events-none transition-all duration-300 ${
                activeNode === node.id
                  ? "opacity-100 scale-110"
                  : activeNode
                  ? "opacity-0 scale-90"
                  : "opacity-60 scale-100"
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
        content: (
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-primary to-accent rounded-full blur-md opacity-50"></div>
                <img
                  src="/hero.png"
                  alt="Profile"
                  className="relative w-32 h-32 rounded-full object-cover border-4 border-primary/50 shadow-2xl"
                />
              </div>
              <h2
                className="text-3xl font-bold"
                style={{ color: "#8b5cf6" }}
              >
                About Me
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Passionate developer with expertise in React, Next.js, Three.js, and modern web technologies. I create
              immersive digital experiences that push the boundaries of what's possible on the web.
            </p>
            {/* <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Experience</h3>
                <p className="text-sm text-muted-foreground">5+ Years</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Projects</h3>
                <p className="text-sm text-muted-foreground">50+ Completed</p>
              </div>
            </div> */}
          </div>
        ),
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
        content: (
          <div className="space-y-4">
            <h2
              className="text-3xl font-bold"
              style={{ color: "#10b981" }}
            >
              Technical Skills
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground text-sm">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "Three.js", "TypeScript"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground text-sm">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {["Node.js", "PostgreSQL", "MongoDB", "Redis"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground text-sm">3D & Graphics</h3>
                <div className="flex flex-wrap gap-2">
                  {["Three.js", "R3F", "WebGL", "Blender"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground text-sm">Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {["Git", "Docker", "AWS", "Vercel"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "contact",
        position: [3, -1, 2],
        label: "Contact",
        color: "#f59e0b",
        content: (
          <div className="space-y-4">
            <h2
              className="text-3xl font-bold"
              style={{ color: "#f59e0b" }}
            >
              Get In Touch
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Interested in working together? Let's connect and discuss your next project.
            </p>
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white">
                  <span className="text-primary">
                    <Image
                      src="/email.svg"
                      alt="Email"
                      width={30}
                      height={30}
                      onClick={() => window.open("mailto:eddie@edwardscott.dev", "_blank", "noopener,noreferrer")}
                    />
                  </span>
                </div>
                <div>
                  <Link
                    href="mailto:eddie@edwardscott.dev"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    eddie@edwardscott.dev{" "}
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary">
                    <Image
                      src="/linkedin.svg"
                      alt="LinkedIn"
                      width={30}
                      height={30}
                      onClick={() =>
                        window.open("https://www.linkedin.com/in/eddiscott", "_blank", "noopener,noreferrer")
                      }
                    />
                  </span>
                </div>
                <div>
                  <Link
                    href="https://www.linkedin.com/in/eddiscott"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    linkedin.com/in/eddiscott
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white">
                  <span className="text-primary">
                    <Image
                      src="/github.svg"
                      alt="GitHub"
                      width={30}
                      height={30}
                      className="bg-transparent"
                      onClick={() => window.open("https://github.com/pixllcreations", "_blank", "noopener,noreferrer")}
                    />
                  </span>
                </div>
                <div>
                  <Link
                    href="https://github.com/pixllcreations"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    github.com/pixllcreations
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div className="fixed inset-0 bg-linear-to-b from-background via-background/95 to-primary/5">
      <Canvas>
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
