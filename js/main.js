// ===== WORKFLOW TOGGLE =====
function toggleWorkflow(header) {
    const workflow = header.closest('.workflow');
    workflow.classList.toggle('open');
}

// ===== INTERACTIVE TERMINAL =====
const terminalCommands = {
    about: {
        cmd: 'cat about-me.yaml',
        output: () => `
<div class="output-line" style="animation-delay:0.05s"><span style="color:var(--accent-purple)">summary:</span> |</div>
<div class="output-line" style="animation-delay:0.1s">&nbsp;&nbsp;DevOps Engineer with 4+ years of experience in cloud and on-prem infrastructure.</div>
<div class="output-line" style="animation-delay:0.25s">&nbsp;&nbsp;Infrastructure as Code, and end-to-end observability.</div>
<div class="output-line" style="animation-delay:0.3s">&nbsp;</div>
<div class="output-line" style="animation-delay:0.35s"><span style="color:var(--accent-purple)">focus:</span></div>
<div class="output-line" style="animation-delay:0.4s">&nbsp;&nbsp;- Cloud Infrastructure (AWS, Azure) & On-Prem</div>
<div class="output-line" style="animation-delay:0.45s">&nbsp;&nbsp;- CI/CD Pipeline Design & GitOps</div>
<div class="output-line" style="animation-delay:0.5s">&nbsp;&nbsp;- Kubernetes & Container Orchestration</div>
<div class="output-line" style="animation-delay:0.55s">&nbsp;&nbsp;- Infrastructure as Code (Terraform, Ansible)</div>
<div class="output-line" style="animation-delay:0.6s">&nbsp;&nbsp;- Monitoring & Observability (Prometheus, Grafana, Loki)</div>
<div class="output-line" style="animation-delay:0.65s">&nbsp;&nbsp;- Security & Secret Management (Vault, IAM)</div>`
    },
    skills: {
        cmd: 'kubectl get pods -n skills',
        output: () => `
<div class="output-line" style="animation-delay:0.05s;color:var(--text-muted)">NAMESPACE &nbsp; NAME &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; READY &nbsp; STATUS &nbsp;&nbsp; AGE</div>
<div class="output-line" style="animation-delay:0.1s">skills &nbsp;&nbsp;&nbsp;&nbsp; aws &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1/1 &nbsp;&nbsp;&nbsp; <span style="color:var(--accent-green)">Running</span> &nbsp; 2y</div>
<div class="output-line" style="animation-delay:0.15s">skills &nbsp;&nbsp;&nbsp;&nbsp; azure &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1/1 &nbsp;&nbsp;&nbsp; <span style="color:var(--accent-green)">Running</span> &nbsp; 2y</div>
<div class="output-line" style="animation-delay:0.2s">skills &nbsp;&nbsp;&nbsp;&nbsp; kubernetes &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1/1 &nbsp;&nbsp;&nbsp; <span style="color:var(--accent-green)">Running</span> &nbsp; 4y</div>
<div class="output-line" style="animation-delay:0.25s">skills &nbsp;&nbsp;&nbsp;&nbsp; terraform &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1/1 &nbsp;&nbsp;&nbsp; <span style="color:var(--accent-green)">Running</span> &nbsp; 4y</div>
<div class="output-line" style="animation-delay:0.3s">skills &nbsp;&nbsp;&nbsp;&nbsp; docker &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1/1 &nbsp;&nbsp;&nbsp; <span style="color:var(--accent-green)">Running</span> &nbsp; 4y</div>
<div class="output-line" style="animation-delay:0.35s">skills &nbsp;&nbsp;&nbsp;&nbsp; ansible &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1/1 &nbsp;&nbsp;&nbsp; <span style="color:var(--accent-green)">Running</span> &nbsp; 4y</div>
<div class="output-line" style="animation-delay:0.4s">skills &nbsp;&nbsp;&nbsp;&nbsp; github-actions &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1/1 &nbsp;&nbsp;&nbsp; <span style="color:var(--accent-green)">Running</span> &nbsp; 3y</div>
<div class="output-line" style="animation-delay:0.45s">skills &nbsp;&nbsp;&nbsp;&nbsp; gitlab-ci &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1/1 &nbsp;&nbsp;&nbsp; <span style="color:var(--accent-green)">Running</span> &nbsp; 4y</div>
<div class="output-line" style="animation-delay:0.5s">skills &nbsp;&nbsp;&nbsp;&nbsp; argocd &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1/1 &nbsp;&nbsp;&nbsp; <span style="color:var(--accent-green)">Running</span> &nbsp; 3y</div>
<div class="output-line" style="animation-delay:0.55s">skills &nbsp;&nbsp;&nbsp;&nbsp; prometheus-grafana &nbsp; 1/1 &nbsp;&nbsp;&nbsp; <span style="color:var(--accent-green)">Running</span> &nbsp; 4y</div>
<div class="output-line" style="animation-delay:0.6s">skills &nbsp;&nbsp;&nbsp;&nbsp; vault &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1/1 &nbsp;&nbsp;&nbsp; <span style="color:var(--accent-green)">Running</span> &nbsp; 2y</div>
<div class="output-line" style="animation-delay:0.65s">skills &nbsp;&nbsp;&nbsp;&nbsp; haproxy-keepalived &nbsp; 1/1 &nbsp;&nbsp;&nbsp; <span style="color:var(--accent-green)">Running</span> &nbsp; 1y</div>
<div class="output-line" style="animation-delay:0.7s">&nbsp;</div>
<div class="output-line" style="animation-delay:0.75s;color:var(--accent-green)">12 pods running | 0 pending | 0 failed</div>`
    },
    experience: {
        cmd: 'git log --oneline career',
        output: () => `
<div class="output-line" style="animation-delay:0.05s"><span style="color:var(--accent-yellow)">a3f7b2e</span> <span style="color:var(--accent-green)">(HEAD -> main)</span> DevOps Engineer @ Endava <span style="color:var(--text-muted)">(Jun 2025 - Present)</span></div>
<div class="output-line" style="animation-delay:0.15s"><span style="color:var(--accent-yellow)">d82ca1f</span> DevOps Engineer @ Ejobs <span style="color:var(--text-muted)">(Feb 2022 - Present)</span></div>
<div class="output-line" style="animation-delay:0.25s"><span style="color:var(--accent-yellow)">f19e3a7</span> DevOps Engineer @ Winbet <span style="color:var(--text-muted)">(Feb 2025 - May 2025)</span></div>
<div class="output-line" style="animation-delay:0.35s"><span style="color:var(--accent-yellow)">b4c8d21</span> System Administrator @ Coface <span style="color:var(--text-muted)">(Feb 2023 - Mar 2025)</span></div>
<div class="output-line" style="animation-delay:0.45s"><span style="color:var(--accent-yellow)">e7f2a09</span> IT Specialist @ Magnetic IT <span style="color:var(--text-muted)">(Apr 2022 - Feb 2023)</span></div>
<div class="output-line" style="animation-delay:0.55s"><span style="color:var(--accent-yellow)">c1d4e88</span> IT Technician @ Concord Service <span style="color:var(--text-muted)">(Nov 2015 - May 2016)</span></div>
<div class="output-line" style="animation-delay:0.65s">&nbsp;</div>
<div class="output-line" style="animation-delay:0.7s;color:var(--text-muted)">6 commits | career branch created 2015</div>`
    },
    contact: {
        cmd: 'cat contact.json',
        output: () => `
<div class="output-line" style="animation-delay:0.05s">{</div>
<div class="output-line" style="animation-delay:0.1s">&nbsp;&nbsp;<span style="color:var(--accent-blue)">"name"</span>: <span style="color:var(--accent-green)">"Cosmin Pascariu"</span>,</div>
<div class="output-line" style="animation-delay:0.15s">&nbsp;&nbsp;<span style="color:var(--accent-blue)">"role"</span>: <span style="color:var(--accent-green)">"Cloud/DevOps Engineer"</span>,</div>
<div class="output-line" style="animation-delay:0.2s">&nbsp;&nbsp;<span style="color:var(--accent-blue)">"email"</span>: <span style="color:var(--accent-green)">"pascariucosmin93@gmail.com"</span>,</div>
<div class="output-line" style="animation-delay:0.25s">&nbsp;&nbsp;<span style="color:var(--accent-blue)">"phone"</span>: <span style="color:var(--accent-green)">"+40 749 571 122"</span>,</div>
<div class="output-line" style="animation-delay:0.3s">&nbsp;&nbsp;<span style="color:var(--accent-blue)">"location"</span>: <span style="color:var(--accent-green)">"Iasi, Romania"</span>,</div>
<div class="output-line" style="animation-delay:0.35s">&nbsp;&nbsp;<span style="color:var(--accent-blue)">"available"</span>: <span style="color:var(--accent-orange)">true</span>,</div>
<div class="output-line" style="animation-delay:0.4s">&nbsp;&nbsp;<span style="color:var(--accent-blue)">"languages"</span>: [<span style="color:var(--accent-green)">"Romanian"</span>, <span style="color:var(--accent-green)">"English"</span>]</div>
<div class="output-line" style="animation-delay:0.45s">}</div>`
    },
    neofetch: {
        cmd: 'cat summary.md',
        output: () => {
            const now = new Date();
            const start = new Date('2022-02-01');
            const diff = now - start;
            const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
            const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
            return `
<div class="output-line" style="animation-delay:0.05s">
<div class="neo-header">
<div class="neo-logo">
   ____   ____
  / ___| |  _ \\
 | |     | |_) |
 | |___  |  __/
  \\____| |_|
</div>
<div class="neo-info">
<span class="neo-label">cosmin</span>@<span class="neo-label">cloud</span><br>
──────────────<br>
<span class="neo-label">OS:</span> DevOps Linux x86_64<br>
<span class="neo-label">Host:</span> Endava / Ejobs<br>
<span class="neo-label">Uptime:</span> ${years}y ${days}d<br>
<span class="neo-label">Shell:</span> bash + terraform + ansible<br>
<span class="neo-label">Cloud:</span> AWS, Azure, On-Prem<br>
<span class="neo-label">Containers:</span> Docker, K8s, Helm<br>
<span class="neo-label">CI/CD:</span> GitHub Actions, GitLab, ArgoCD<br>
<span class="neo-label">Monitoring:</span> Prometheus, Grafana, Loki<br>
<br>
<span class="neo-label">Cloud</span> <span class="neo-bar-track"><span class="neo-bar-fill" style="width:90%;background:var(--accent-blue)"></span></span>
<span class="neo-label">K8s</span> <span class="neo-bar-track"><span class="neo-bar-fill" style="width:85%;background:var(--accent-purple)"></span></span>
<span class="neo-label">IaC</span> <span class="neo-bar-track"><span class="neo-bar-fill" style="width:90%;background:var(--accent-green)"></span></span>
<span class="neo-label">CI/CD</span> <span class="neo-bar-track"><span class="neo-bar-fill" style="width:88%;background:var(--accent-orange)"></span></span>
</div>
</div>
</div>`;
        }
    }
};

let isTyping = false;

function typeCommand(text, callback) {
    const typedCmd = document.getElementById('typed-cmd');
    const cursor = document.getElementById('terminal-cursor');
    typedCmd.textContent = '';
    cursor.style.display = 'inline-block';
    isTyping = true;
    let i = 0;

    function type() {
        if (i < text.length) {
            typedCmd.textContent += text[i];
            i++;
            setTimeout(type, 30 + Math.random() * 40);
        } else {
            cursor.style.display = 'none';
            isTyping = false;
            if (callback) setTimeout(callback, 150);
        }
    }
    type();
}

function runCommand(cmdKey) {
    if (isTyping) return;

    const cmd = terminalCommands[cmdKey];
    if (!cmd) return;

    // Update active button
    document.querySelectorAll('.cmd-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-cmd="${cmdKey}"]`).classList.add('active');

    // Hide previous output and next prompt
    const output = document.getElementById('cmd-output');
    const nextPrompt = document.getElementById('next-prompt');
    output.innerHTML = '';
    nextPrompt.style.display = 'none';

    // Type the command, then show output
    typeCommand(cmd.cmd, () => {
        output.innerHTML = cmd.output();
        nextPrompt.style.display = 'flex';
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    // Open all workflows
    document.querySelectorAll('.workflow').forEach(w => w.classList.add('open'));

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

    // Uptime counter
    const startDate = new Date('2022-02-01');
    function updateUptime() {
        const now = new Date();
        const diff = now - startDate;
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('uptime').textContent = `${years}y ${days}d ${hours}h`;
    }
    updateUptime();
    setInterval(updateUptime, 3600000);

    // Terminal command buttons
    document.querySelectorAll('.cmd-btn').forEach(btn => {
        btn.addEventListener('click', () => runCommand(btn.dataset.cmd));
    });

    // Auto-run first command
    setTimeout(() => runCommand('about'), 500);
});
