import { useState } from "react";
import { ArrowRight, Database, Server, Users, Copy } from "lucide-react";
import { Plus } from "lucide-react";

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
        { from: "master", to: "slave1", color: "green", label: "Repl" },
        { from: "master", to: "slave2", color: "green", label: "Repl" }
      ]
    }
  ];





  const ComponentIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'client':
        return <Users className="w-6 h-6" />;
      case 'server':
        return <Server className="w-6 h-6" />;
      case 'database':
        return <Database className="w-6 h-6" />;
      case 'loadbalancer':
        return <Copy className="w-6 h-6" />;
      default:
        return <Server className="w-6 h-6" />;
    }
  };

  const getComponentColor = (type: string) => {
    switch (type) {
      case 'client':
        return 'bg-blue-500';
      case 'server':
        return 'bg-green-500';
      case 'database':
        return 'bg-purple-500';
      case 'loadbalancer':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  /* ----------  UI  ---------- */
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <div className="max-w-6xl mx-auto p-6">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-gradient-to-b from-slate-400 to-slate-50 bg-clip-text">
            How to scale your App from 0 to 1M+ users
          </h1>
        </header>

        {/* Progress */}
        <div className="mb-8 flex justify-between items-center">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${i === currentStep
                ? "bg-slate-950 text-white"
                : i < currentStep
                  ? "bg-slate-600/20 text-green-300"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Diagram */}

          {/* ----------  DIAGRAM  ---------- */}
          <div className="lg:col-span-2 bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-slate-100">{steps[currentStep].title}</h3>
            <div className="relative h-96">
              <svg className="w-full h-full">
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" className="fill-slate-500" />
                  </marker>
                </defs>

                {/* Blocks & Labels */}

                {/* ----------  BLOCKS  ---------- */}
                {steps[currentStep].components.map((c) => (
                  <g key={c.id}>
                    {/* block with inner padding via smaller foreignObject */}
                    <rect
                      x={`${c.x - 6}%`}
                      y={`${c.y - 5}%`}
                      width="12%"
                      height="10%"
                      rx="8"
                      className={`${getComponentColor(c.type)} opacity-90 drop-shadow-md`}
                    />

                    {/* content island: 2 % smaller on every side → visual padding */}
                    <foreignObject
                      x={`${c.x - 4.8}%`}   /* 1.2 % inset from left  */
                      y={`${c.y - 4}%`}    /* 1 % inset from top    */
                      width="9.6%"          /* 12 % - 2.4 % total horizontal padding */
                      height="8%"           /* 10 % - 2 % total vertical padding   */
                      className="overflow-visible"
                    >
                      <div className="flex h-full flex-col items-center justify-center gap-y-1 text-white">
                        <ComponentIcon type={c.type} />
                        <span className="text-[9px] font-semibold leading-none">
                          {c.label}
                        </span>
                      </div>
                    </foreignObject>
                  </g>
                ))}
                {/* Connections */}

                {/* ----------  CONNECTIONS  ---------- */}
                {steps[currentStep].connections.map((con, i) => {
                  const from = steps[currentStep].components.find((c) => c.id === con.from);
                  const to = steps[currentStep].components.find((c) => c.id === con.to);
                  if (!from || !to) return null;
                  const x1 = from.x;
                  const y1 = from.y + 4;
                  const x2 = to.x;
                  const y2 = to.y - 4;
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
                              : "stroke-slate-500"}`}
                        markerEnd="url(#arrow)"
                      />
                      {con.label && (
                        <text
                          x={`${midX}%`}
                          y={`${midY}%`}
                          className="text-[10px] font-semibold fill-slate-300"
                          textAnchor="middle"
                          dy="-4"
                        >
                          {con.label}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Info Cards */}

          {/* ----------  INFO CARDS  ---------- */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
              <h4 className="font-bold text-slate-100 mb-2">Description</h4>
              <p className="text-slate-300 text-sm">{steps[currentStep].description}</p>
            </div>

            <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-5">
              <h4 className="font-bold text-green-300 mb-3 flex items-center gap-2">
                <Plus className="w-4 h-4" /> Pros
              </h4>
              <ul className="space-y-1 text-sm text-green-200">
                {steps[currentStep].pros.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-5">
              <h4 className="font-bold text-red-300 mb-3">Cons</h4>
              <ul className="space-y-1 text-sm text-red-200">
                {steps[currentStep].cons.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>

        {/* Navigation */}

        {/* ----------  NAV  ---------- */}
        <footer className="flex justify-between items-center mt-10">
          <button
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-200 disabled:opacity-50 hover:bg-slate-700 transition"
          >
            <ArrowRight className="w-4 h-4 rotate-180" /> Prev
          </button>

          <span className="text-slate-400 text-sm">
            Step {currentStep + 1} / {steps.length}
          </span>

          <button
            onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}
            disabled={currentStep === steps.length - 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-200 disabled:opacity-50 hover:bg-slate-700 transition"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </footer>

        {/* Extra Info */}

        {/* ----------  EXTRA  ---------- */}
        <section className="mt-10 bg-slate-800/30 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-bold text-slate-100 mb-4">What Comes Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div>
              <h4 className="font-semibold text-slate-200 mb-2">Scaling Options</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Horizontal sharding</li>
                <li>Micro-services split</li>
                <li>Redis / Memcached cache</li>
                <li>Global CDN</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 mb-2">Modern Tools</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>MongoDB, Cassandra</li>
                <li>Kafka, RabbitMQ</li>
                <li>Kubernetes</li>
                <li>Serverless functions</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;