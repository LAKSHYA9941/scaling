import { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
export type Term = {
  term: string;
  short: string; // 1-line summary
  long: string;  // full paragraph
};

export const glossary: Term[] = [
  {
    term: "Single Server Setup",
    short: "Everything runs on one machine—fast to build, single point of failure.",
    long: "All components (web app, database, cache, etc.) live on a single box. Great for prototypes, but any hardware or software fault takes the entire system down."
  },
  {
    term: "Load Balancer",
    short: "Distributes incoming traffic across multiple servers to avoid overload.",
    long: "A network component (hardware or software) that evenly spreads HTTP requests across a pool of web servers. Provides horizontal scaling and high availability by routing around failed nodes."
  },
  {
    term: "Horizontal vs Vertical Scaling",
    short: "Scale-out (add more machines) vs scale-up (bigger box).",
    long: "Vertical scaling upgrades CPU/RAM on one server; horizontal scaling adds more commodity servers. Horizontal is cheaper and fault-tolerant, but requires stateless design."
  },
  {
    term: "Database Replication",
    short: "Copy data from a master (write) node to slave (read) nodes.",
    long: "Master accepts all writes and streams changes to one or more slaves. Slaves handle reads, increasing throughput and providing failover copies."
  },
  {
    term: "Cache & Cache Tier",
    short: "In-memory store for hot data—faster than disk.",
    long: "Redis, Memcached, or in-process caches keep frequently accessed objects in RAM, reducing database hits and latency. Cache tier is deployed as an independent cluster."
  },
  {
    term: "CDN (Content Delivery Network)",
    short: "Geo-distributed edge servers that cache static files close to users.",
    long: "CDN PoPs cache images, CSS, JS, videos at the network edge. Users fetch assets from the nearest node, cutting latency and origin bandwidth."
  },
  {
    term: "Stateless Web Tier",
    short: "Servers keep no user state—any node can serve any request.",
    long: "Session data moved to shared storage (DB, Redis, NoSQL). Enables auto-scaling and rolling deployments without sticky sessions."
  },
  {
    term: "Message Queue",
    short: "Asynchronous buffer between producers and consumers.",
    long: "Kafka, RabbitMQ, SQS decouple services: producers publish messages, consumers process them later. Smooths traffic spikes and adds fault tolerance."
  },
  {
    term: "Database Sharding",
    short: "Split a large table into smaller shards by key.",
    long: "Horizontal partition of rows across multiple DB servers. Sharding key (e.g., user_id % 4) determines shard; allows parallel reads/writes at petabyte scale."
  },
  {
    term: "NoSQL",
    short: "Non-relational stores for unstructured or huge data.",
    long: "Document, key-value, column, or graph databases (MongoDB, DynamoDB, Cassandra) that trade ACID joins for horizontal scale and flexible schemas."
  },
  {
    term: "Auto-Scaling",
    short: "Add/remove servers automatically based on load.",
    long: "Cloud ASGs or K8s HPA spin nodes up/down via metrics (CPU, queue length). Requires stateless services and immutable images."
  },
  {
    term: "GeoDNS",
    short: "DNS that returns different IPs based on user location.",
    long: "Routes users to the nearest data-center for lower latency and disaster-failover capability."
  },
  {
    term: "Single Point of Failure (SPOF)",
    short: "Component whose crash brings the entire system down.",
    long: "Eliminated by redundancy, replication, and failover mechanisms at every tier."
  }
];

export default function SystemDesignGlossary() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="max-w-4xl mx-auto p-6 bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl">
      <div className="flex items-center gap-3 mb-5">
        <Info className="w-6 h-6 text-purple-400" />
        <h2 className="text-2xl font-extrabold tracking-tight text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
          System-Design Glossary
        </h2>
      </div>

      <div className="space-y-3">
        {glossary.map((item, idx) => (
          <div
            key={item.term}
            className="rounded-xl border border-slate-800 bg-slate-800/40 overflow-hidden transition-all"
          >
            {/* Header */}
            <button
              onClick={() => setOpen(open === idx ? null : idx)}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-800/60 transition-colors"
            >
              <div className="text-left">
                <div className="font-bold text-slate-100">{item.term}</div>
                <div className="text-xs text-slate-400 mt-1">{item.short}</div>
              </div>
              {open === idx ? (
                <ChevronUp className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </button>

            {/* Collapsible body */}
            <AnimatePresence>
              {open === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 pb-4 text-sm text-slate-300 leading-relaxed border-t border-slate-800"
                >
                  {item.long}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <footer className="mt-6 text-center text-xs text-slate-500">
        Click any card to expand the full explanation.
      </footer>
    </section>
  );
}