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
            font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
            color: #2d3748;
            line-height: 1.6;
            padding: 60px 40px;
            max-width: 850px;
            margin: 0 auto;
            background: #f8fafc;
          }
          .print-bar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #1a202c;
            color: white;
            padding: 12px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 100;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
          .print-bar a {
            color: #63b3ed;
            text-decoration: none;
            font-size: 14px;
            transition: color 0.2s;
          }
          .print-bar a:hover { color: #90cdf4; }
          .print-bar button {
            background: #3182ce;
            color: white;
            border: none;
            padding: 8px 20px;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            font-size: 14px;
            transition: background 0.2s;
          }
          .print-bar button:hover { background: #2b6cb0; }
          .content { 
            padding-top: 40px; 
            background: white;
            padding: 50px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            border-radius: 8px;
          }
          h1 {
            font-size: 32px;
            font-weight: 800;
            letter-spacing: -0.5px;
            margin-bottom: 8px;
            color: #1a202c;
            text-transform: uppercase;
          }
          .subtitle {
            font-size: 15px;
            color: #3182ce;
            font-weight: 500;
            margin-bottom: 12px;
          }
          .contact {
            font-size: 13px;
            color: #718096;
            margin-bottom: 24px;
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
          }
          .contact a { color: #3182ce; text-decoration: none; font-weight: 500; }
          .contact a:hover { text-decoration: underline; }
          h2 {
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #2b6cb0;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 4px;
            margin-top: 24px;
            margin-bottom: 12px;
          }
          .summary { font-size: 14px; margin-bottom: 16px; color: #4a5568; text-align: justify; }
          .skills-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px 24px;
            font-size: 13px;
            margin-bottom: 20px;
          }
          .skills-grid p { margin-bottom: 4px; color: #4a5568; }
          .skills-grid strong { color: #2d3748; font-weight: 600; }
          .project {
            margin-bottom: 16px;
            font-size: 13px;
          }
          .project-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 4px;
          }
          .project-title { font-weight: 700; font-size: 14px; color: #1a202c; }
          .project-tech { font-size: 12px; color: #718096; font-style: italic; }
          .project ul {
            margin: 4px 0 0 20px;
            font-size: 13px;
            color: #4a5568;
          }
          .project li { margin-bottom: 3px; }
          .experience { margin-bottom: 16px; font-size: 13px; }
          .exp-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 2px;
          }
          .exp-role { font-weight: 700; font-size: 14px; color: #1a202c; }
          .exp-date { font-size: 12px; color: #718096; font-style: italic; }
          .exp-company { font-size: 13px; color: #4a5568; margin-bottom: 6px; font-weight: 500; }
          .experience ul { margin: 4px 0 0 20px; color: #4a5568; }
          .experience li { margin-bottom: 3px; }
          .two-col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0 24px;
          }
          .edu-entry { font-size: 13px; margin-bottom: 8px; color: #4a5568; }
          .cert-list { font-size: 13px; }
          .cert-list p { margin-bottom: 4px; color: #4a5568; }
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
