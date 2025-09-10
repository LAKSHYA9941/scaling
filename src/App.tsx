import { useState, useEffect } from "react";
import { ArrowRight, Database, Server, Users, Globe, Zap } from "lucide-react";
import SystemDesignGlossary from "./Gloassarycomp";

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Single Server",
      description: "One box does it all—great for day-one, painful for day-one-thousand.",
      pros: ["Simple to deploy", "Easy to maintain", "Zero config"],
      cons: ["Single point of failure", "Limited scale", "CPU + I/O bottleneck"],
      components: [
        { id: "client", type: "client", x: 50, y: 20, label: "Client" },
        { id: "server", type: "server", x: 50, y: 60, label: "Web + DB" }
      ],
      connections: [{ from: "client", to: "server" }]
    },
    {
      title: "Two-Tier",
      description: "Split web server and database—first step towards sanity.",
      pros: ["Cleaner concerns", "Independent DB tuning", "Fault isolation"],
      cons: ["DB still single", "No redundancy", "Vertical-scale only"],
      components: [
        { id: "client", type: "client", x: 50, y: 15, label: "Client" },
        { id: "webserver", type: "server", x: 50, y: 40, label: "Web Server" },
        { id: "database", type: "database", x: 50, y: 70, label: "Database" }
      ],
      connections: [
        { from: "client", to: "webserver" },
        { from: "webserver", to: "database" }
      ]
    },
    {
      title: "Load-Balanced",
      description: "Add a load balancer + multiple web nodes—horizontal scaling starts here.",
      pros: ["High availability", "Even traffic spread", "Easy to add nodes"],
      cons: ["DB bottleneck remains", "Sticky sessions", "More infra to manage"],
      components: [
        { id: "client", type: "client", x: 50, y: 10, label: "Client" },
        { id: "loadbalancer", type: "loadbalancer", x: 50, y: 25, label: "Load Balancer" },
        { id: "web1", type: "server", x: 25, y: 45, label: "Web 1" },
        { id: "web2", type: "server", x: 75, y: 45, label: "Web 2" },
        { id: "database", type: "database", x: 50, y: 70, label: "Database" }
      ],
      connections: [
        { from: "client", to: "loadbalancer" },
        { from: "loadbalancer", to: "web1" },
        { from: "loadbalancer", to: "web2" },
        { from: "web1", to: "database" },
        { from: "web2", to: "database" }
      ]
    },
    {
      title: "Master-Slave Replication",
      description: "Read replicas offload traffic—write once, read many.",
      pros: ["Read scale", "Data redundancy", "Geo distribution"],
      cons: ["Write bottleneck", "Eventual consistency", "Replication lag"],
      components: [
        { id: "client", type: "client", x: 50, y: 8, label: "Client" },
        { id: "loadbalancer", type: "loadbalancer", x: 50, y: 20, label: "Load Balancer" },
        { id: "web1", type: "server", x: 25, y: 35, label: "Web 1" },
        { id: "web2", type: "server", x: 75, y: 35, label: "Web 2" },
        { id: "master", type: "database", x: 25, y: 60, label: "Master" },
        { id: "slave1", type: "database", x: 50, y: 75, label: "Slave 1" },
        { id: "slave2", type: "database", x: 75, y: 60, label: "Slave 2" }
      ],
      connections: [
        { from: "client", to: "loadbalancer" },
        { from: "loadbalancer", to: "web1" },
        { from: "loadbalancer", to: "web2" },
        { from: "web1", to: "master", color: "red", label: "Write" },
        { from: "web1", to: "slave1", color: "blue", label: "Read" },
        { from: "web2", to: "master", color: "red", label: "Write" },
        { from: "web2", to: "slave2", color: "blue", label: "Read" },
        { from: "master", to: "slave1", color: "green", label: "Duplicate" },
        { from: "master", to: "slave2", color: "green", label: "Duplicate" }
      ]
    }
  ];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentStep((s) => Math.min(steps.length - 1, s + 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentStep((s) => Math.max(0, s - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [steps.length]);

  const ComponentIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'client': return <Users className="w-5 h-5" />;
      case 'server': return <Server className="w-5 h-5" />;
      case 'database': return <Database className="w-5 h-5" />;
      case 'loadbalancer': return <Globe className="w-5 h-5" />;
      default: return <Server className="w-5 h-5" />;
    }
  };

  const getComponentColor = (type: string) => {
    switch (type) {
      case 'client': return 'bg-blue-500';
      case 'server': return 'bg-green-500';
      case 'database': return 'bg-purple-500';
      case 'loadbalancer': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <header className="text-center mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-gradient-to-b from-slate-300 to-slate-100 bg-clip-text">
            How to Scale Your App from 0 to 1M+ Users
          </h1>
          <p className="text-slate-400 mt-2 text-sm md:text-base">A visual journey through system architecture evolution</p>
        </header>

        {/* Progress */}
        <div className="mb-6 md:mb-8 flex flex-wrap justify-center gap-2">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`px-3 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 hover:scale-105 ${i === currentStep
                ? "bg-slate-700 text-white shadow-lg"
                : i < currentStep
                  ? "bg-slate-600/20 text-green-300"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Diagram */}
          <div className="lg:col-span-2 bg-slate-800/50 rounded-xl p-4 md:p-6 border border-slate-700 shadow-xl">
            <h3 className="text-lg md:text-xl font-extrabold mb-4 text-slate-100 tracking-wide">
              {steps[currentStep].title}
            </h3>
            <div className="relative h-[40vh] md:h-96">
              <svg className="w-full h-full overflow-visible">
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" className="fill-slate-400" />
                  </marker>
                </defs>

                {/* Connections */}
                {steps[currentStep].connections.map((con, i) => {
                  const from = steps[currentStep].components.find((c) => c.id === con.from);
                  const to = steps[currentStep].components.find((c) => c.id === con.to);
                  if (!from || !to) return null;

                  // Convert percentage to actual SVG coordinates
                  const svgRect = { width: 100, height: 100 };
                  const x1 = (from.x / 100) * svgRect.width;
                  const y1 = ((from.y + 5) / 100) * svgRect.height;
                  const x2 = (to.x / 100) * svgRect.width;
                  const y2 = ((to.y - 5) / 100) * svgRect.height;

                  const midX = (x1 + x2) / 2;
                  const midY = (y1 + y2) / 2;

                  return (
                    <g key={i}>
                      <line
                        x1={`${x1}%`}
                        y1={`${y1}%`}
                        x2={`${x2}%`}
                        y2={`${y2}%`}
                        className={`stroke-2 ${con.color === "red"
                          ? "stroke-red-400"
                          : con.color === "blue"
                            ? "stroke-blue-400"
                            : con.color === "green"
                              ? "stroke-green-400"
                              : "stroke-slate-500"
                          }`}
                        markerEnd="url(#arrow)"
                      />
                      {con.label && (
                        <text
                          x={`${midX}%`}
                          y={`${midY - 1}%`}
                          className="text-[10px] font-semibold fill-slate-300"
                          textAnchor="middle"
                        >
                          {con.label}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Components */}
                {steps[currentStep].components.map((c) => (
                  <g key={c.id} className="cursor-pointer">
                    <rect
                      x={`${c.x - 6}%`}
                      y={`${c.y - 5}%`}
                      width="12%"
                      height="10%"
                      rx="8"
                      className={`${getComponentColor(c.type)} opacity-90 drop-shadow-lg hover:opacity-100 transition-opacity`}
                    />
                    <foreignObject x={`${c.x - 4.8}%`} y={`${c.y - 4}%`} width="9.6%" height="8%" className="overflow-visible">
                      <div className="flex h-full flex-col items-center justify-center gap-y-1 text-white">
                        <ComponentIcon type={c.type} />
                        <span className="text-[8px] md:text-[9px] font-semibold leading-none text-center px-1">
                          {c.label}
                        </span>
                      </div>
                    </foreignObject>
                  </g>
                ))}
              </svg>
            </div>

            {/* Color Legend */}
            {currentStep === 3 && (
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-red-400"></div> Write
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-blue-400"></div> Read
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-green-400"></div> Replication
                </div>
              </div>
            )}
          </div>

          {/* Info Cards */}
          <div className="space-y-4 md:space-y-6">
            <div className="bg-slate-800/50 rounded-xl p-4 md:p-5 border border-slate-700 shadow-lg">
              <h4 className="font-bold text-slate-100 mb-2">Description</h4>
              <p className="text-slate-300 text-sm">{steps[currentStep].description}</p>
            </div>

            <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4 md:p-5 shadow-lg">
              <h4 className="font-bold text-green-300 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" /> Pros
              </h4>
              <ul className="space-y-1 text-sm text-green-200">
                {steps[currentStep].pros.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 md:p-5 shadow-lg">
              <h4 className="font-bold text-red-300 mb-3">Cons</h4>
              <ul className="space-y-1 text-sm text-red-200">
                {steps[currentStep].cons.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">✗</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>

        <SystemDesignGlossary />


        {/* Navigation */}
        <footer className="flex justify-between items-center mt-8 md:mt-10">
          <button
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-200 disabled:opacity-50 hover:bg-slate-700 transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
            aria-label="Previous step"
          >
            <ArrowRight className="w-4 h-4 rotate-180" /> Prev
          </button>

          <span className="text-slate-400 text-sm">
            Step {currentStep + 1} of {steps.length}
          </span>

          <button
            onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}
            disabled={currentStep === steps.length - 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-200 disabled:opacity-50 hover:bg-slate-700 transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
            aria-label="Next step"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </footer>

        {/* Extra Info */}
        <section className="mt-8 md:mt-10 bg-slate-800/30 rounded-xl p-5 md:p-6 border border-slate-700 shadow-lg">
          <h3 className="text-lg font-extrabold text-slate-100 mb-4">What Comes Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-slate-300">
            <div>
              <h4 className="font-semibold text-slate-200 mb-3">Scaling Options</h4>
              <ul className="space-y-2">
                {["Horizontal sharding", "Micro-services split", "Redis / Memcached cache", "Global CDN"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-400">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 mb-3">Modern Tools</h4>
              <ul className="space-y-2">
                {["MongoDB, Cassandra", "Kafka, RabbitMQ", "Kubernetes", "Serverless functions"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-400">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;