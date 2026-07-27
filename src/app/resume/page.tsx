"use client";

export default function ResumePage() {
  return (
    <html lang="en">
      <head>
        <style>{`
          @media print {
            body { margin: 0; padding: 0; }
            .no-print { display: none !important; }
            @page { margin: 0.5in; size: letter; }
          }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            color: #1a1a2e;
            line-height: 1.5;
            padding: 40px;
            max-width: 850px;
            margin: 0 auto;
            background: white;
          }
          .print-bar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #0d1117;
            color: white;
            padding: 12px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 100;
          }
          .print-bar a {
            color: #22d3ee;
            text-decoration: none;
            font-size: 14px;
          }
          .print-bar button {
            background: #22d3ee;
            color: #0d1117;
            border: none;
            padding: 8px 20px;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            font-size: 14px;
          }
          .print-bar button:hover { opacity: 0.9; }
          .content { padding-top: 60px; }
          h1 {
            font-size: 28px;
            font-weight: 700;
            letter-spacing: 1px;
            margin-bottom: 4px;
          }
          .subtitle {
            font-size: 13px;
            color: #0891b2;
            font-weight: 600;
            margin-bottom: 2px;
          }
          .contact {
            font-size: 12px;
            color: #666;
            margin-bottom: 16px;
          }
          .contact a { color: #0891b2; text-decoration: none; }
          h2 {
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #0891b2;
            border-bottom: 2px solid #0891b2;
            padding-bottom: 3px;
            margin-top: 16px;
            margin-bottom: 8px;
          }
          .summary { font-size: 13px; margin-bottom: 4px; }
          .skills-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4px 24px;
            font-size: 12.5px;
          }
          .skills-grid p { margin-bottom: 3px; }
          .skills-grid strong { color: #1a1a2e; }
          .project {
            margin-bottom: 10px;
            font-size: 12.5px;
          }
          .project-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
          }
          .project-title { font-weight: 700; font-size: 13px; }
          .project-tech { font-size: 11px; color: #666; }
          .project ul {
            margin: 2px 0 0 18px;
            font-size: 12.5px;
          }
          .project li { margin-bottom: 1px; }
          .experience { margin-bottom: 10px; font-size: 12.5px; }
          .exp-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
          }
          .exp-role { font-weight: 700; font-size: 13px; }
          .exp-date { font-size: 12px; color: #666; font-style: italic; }
          .exp-company { font-size: 12px; color: #555; margin-bottom: 2px; }
          .experience ul { margin: 2px 0 0 18px; }
          .experience li { margin-bottom: 1px; }
          .two-col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0 24px;
          }
          .edu-entry { font-size: 12.5px; margin-bottom: 4px; }
          .cert-list { font-size: 12.5px; }
          .cert-list p { margin-bottom: 2px; }
        `}</style>
      </head>
      <body>
        <div className="print-bar no-print">
          <a href="/">← Back to Portfolio</a>
          <button onClick={() => window.print()}>Download PDF</button>
        </div>
        <div className="content">
          <h1>JJ JEWELL</h1>
          <div className="subtitle">IT Professional | Cybersecurity Student | Self-Hosted Infrastructure & Automation</div>
          <div className="contact">
            <a href="https://jj.jewellcore.com">jj.jewellcore.com</a> &nbsp;|&nbsp;
            GitHub: <a href="https://github.com/Jjjewell1">Jjjewell1</a> &nbsp;|&nbsp;
            Richlands, Virginia &nbsp;|&nbsp;
            <a href="mailto:jj@jewellcore.com">jj@jewellcore.com</a>
          </div>

          <h2>Professional Summary</h2>
          <p className="summary">
            Hands-on IT professional pursuing degrees in Cyber Security and Information Systems Technology (IST)
            at Southwest Virginia Community College. Designs, deploys, and troubleshoots self-hosted infrastructure
            spanning containerized services, KVM/libvirt virtualization, CI/CD-style deployment pipelines, and local
            AI tooling. Comfortable working across the full stack of a home lab environment — from networking and
            reverse proxies to WordPress development and local large language model integration. Former business owner
            bringing over a decade of leadership, budgeting, and customer-facing experience to a technical career.
          </p>

          <h2>Technical Skills</h2>
          <div className="skills-grid">
            <p><strong>Operating Systems:</strong> Windows, Linux (Ubuntu Server), Unraid</p>
            <p><strong>Virtualization &amp; Containers:</strong> Docker, Docker Compose, Portainer, KVM/QEMU/libvirt, Coolify (PaaS)</p>
            <p><strong>Networking:</strong> TCP/IP, DNS, port forwarding, reverse proxies, Cloudflare Tunnels, container networking</p>
            <p><strong>Self-Hosted Services:</strong> Nextcloud, Home Assistant, Plex, Jellyfin, WordPress, MySQL/MariaDB</p>
            <p><strong>AI &amp; Automation:</strong> Ollama (local LLM hosting), Cline, OpenCode CLI, ComfyUI</p>
            <p><strong>Web Development:</strong> HTML, CSS, JavaScript, PHP, WordPress/Elementor/ACF, Next.js</p>
            <p><strong>Tools &amp; Workflow:</strong> Git, GitHub, VS Code, CI/CD pipelines (GitHub → Coolify → Cloudflare)</p>
            <p><strong>Currently Studying:</strong> Python, Linux admin, network security, digital forensics, SIEM, cloud</p>
          </div>

          <h2>Technical Projects</h2>

          <div className="project">
            <div className="project-header">
              <span className="project-title">Self-Hosted Family Media & Web Platform</span>
              <span className="project-tech">WordPress Multisite, Coolify, Cloudflare Tunnels, ComfyUI</span>
            </div>
            <ul>
              <li>Built and maintain a self-hosted family travel/scrapbook site with nested &ldquo;sub-adventures&rdquo; content feature, deployed through a GitHub → Coolify → Cloudflare Tunnel pipeline.</li>
              <li>Collaborate with a second developer using a shared GitHub workflow for a two-person team.</li>
              <li>Generated custom branding assets using ComfyUI with the Z-Image Turbo model.</li>
            </ul>
          </div>

          <div className="project">
            <div className="project-header">
              <span className="project-title">Home Lab Infrastructure — Unraid Server (&ldquo;Venus&rdquo;)</span>
              <span className="project-tech">Unraid, Docker, ZFS, KVM/QEMU, Coolify</span>
            </div>
            <ul>
              <li>Administer an Unraid server hosting Coolify, Homepage dashboard, Nextcloud, and multiple containerized services on a ZFS storage pool.</li>
              <li>Diagnosed and resolved a Docker named-volume caching issue causing dashboard configuration changes not to reflect live.</li>
              <li>Troubleshot a KVM/libvirt VM startup failure tied to a loop-device conflict with emhttpd.</li>
              <li>Exposed self-hosted services to the public internet securely via Cloudflare Tunnels, avoiding open inbound ports.</li>
            </ul>
          </div>

          <div className="project">
            <div className="project-header">
              <span className="project-title">Local AI Development Environment</span>
              <span className="project-tech">Ollama, NVIDIA RTX 5060, Cline, OpenCode</span>
            </div>
            <ul>
              <li>Configured Ollama on a Windows workstation (RTX 5060, 8GB VRAM) to serve local models for AI-assisted coding.</li>
              <li>Diagnosed and fixed a Cline tool-call failure/looping issue caused by Ollama&rsquo;s default context window, resolving it with a custom Modelfile raising num_ctx to 8192–16384.</li>
              <li>Explored a broader local-AI stack including Open WebUI, AnythingLLM (RAG), n8n automation, and Whisper transcription.</li>
            </ul>
          </div>

          <div className="project">
            <div className="project-header">
              <span className="project-title">Caregiver Support Tools</span>
              <span className="project-tech">HTML, CSS Grid, JavaScript</span>
            </div>
            <ul>
              <li>Designed a mobile-friendly wellness schedule using fluid CSS Grid for responsive layout across devices.</li>
              <li>Built an interactive medication-logging tool with per-dose checkboxes, timestamps, CSV export, and an in-page countdown timer with audio and haptic alerts.</li>
            </ul>
          </div>

          <h2>Professional Experience</h2>

          <div className="experience">
            <div className="exp-header">
              <span className="exp-role">Freelance Web Developer</span>
              <span className="exp-date">2021 — Present</span>
            </div>
            <div className="exp-company">Self-Employed</div>
            <ul>
              <li>Consult with clients to build and maintain responsive WordPress websites.</li>
              <li>Manage hosting environments, DNS, backups, and ongoing server troubleshooting.</li>
            </ul>
          </div>

          <div className="experience">
            <div className="exp-header">
              <span className="exp-role">Landscaping Business Owner</span>
              <span className="exp-date">2010 — 2021 (11 Years)</span>
            </div>
            <div className="exp-company">Self-Employed</div>
            <ul>
              <li>Managed daily operations, crews, budgeting, scheduling, and equipment purchasing.</li>
              <li>Handled customer relations, sales, and estimating for an independent business.</li>
            </ul>
          </div>

          <h2>Education</h2>
          <div className="edu-entry">
            <strong>Southwest Virginia Community College</strong> — In Progress<br />
            Associate Degree: Information Systems Technology (IST) &amp; Cyber Security
          </div>

          <div className="two-col">
            <div>
              <h2>Certifications</h2>
              <div className="cert-list">
                <p>CompTIA A+ — In Progress</p>
                <p>CompTIA Network+ — Planned</p>
                <p>CompTIA Security+ — Planned</p>
              </div>
            </div>
            <div>
              <h2>&nbsp;</h2>
              <div className="cert-list">
                <p>Linux+ — Planned</p>
                <p>Microsoft Azure Fundamentals (AZ-900) — Planned</p>
                <p>AWS Cloud Practitioner — Planned</p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
