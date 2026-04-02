// ===== CONSTANTS =====
const TYPE_MIN_MS    = 30;
const TYPE_JITTER_MS = 40;
const CAREER_START   = new Date('2022-02-01');

// ===== HELPERS =====
function calcUptime(startDate) {
    const diff        = new Date() - startDate;
    const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365;
    const MS_PER_DAY  = 1000 * 60 * 60 * 24;
    const MS_PER_HOUR = 1000 * 60 * 60;
    return {
        years: Math.floor(diff / MS_PER_YEAR),
        days:  Math.floor((diff % MS_PER_YEAR) / MS_PER_DAY),
        hours: Math.floor((diff % MS_PER_DAY)  / MS_PER_HOUR),
    };
}

function makeLines(lines, delayStep = 0.05) {
    return lines
        .map((html, i) => `<div class="output-line pre" style="animation-delay:${((i + 1) * delayStep).toFixed(2)}s">${html}</div>`)
        .join('\n');
}

// ===== WORKFLOW TOGGLE =====
function toggleWorkflow(header) {
    header.closest('.workflow').classList.toggle('open');
}

// ===== TERMINAL COMMANDS =====
const terminalCommands = {
    about: {
        cmd: 'cat about-me.yaml',
        output: () => makeLines([
            `<span style="color:var(--accent-purple)">summary:</span> |`,
            `  DevOps Engineer with 4+ years of experience in cloud and on-prem infrastructure.`,
            `  Infrastructure as Code, and end-to-end observability.`,
            ` `,
            `<span style="color:var(--accent-purple)">focus:</span>`,
            `  - Cloud Infrastructure (AWS, Azure) & On-Prem`,
            `  - CI/CD Pipeline Design & GitOps`,
            `  - Kubernetes & Container Orchestration`,
            `  - Infrastructure as Code (Terraform, Ansible)`,
            `  - Monitoring & Observability (Prometheus, Grafana, Loki)`,
            `  - Security & Secret Management (Vault, IAM)`,
        ]),
    },
    skills: {
        cmd: 'kubectl get pods -n skills',
        output: () => makeLines([
            `<span style="color:var(--text-muted)">NAMESPACE   NAME                    READY   STATUS    AGE</span>`,
            `skills      aws                     1/1     <span style="color:var(--accent-green)">Running</span>   2y`,
            `skills      azure                   1/1     <span style="color:var(--accent-green)">Running</span>   2y`,
            `skills      kubernetes              1/1     <span style="color:var(--accent-green)">Running</span>   4y`,
            `skills      terraform               1/1     <span style="color:var(--accent-green)">Running</span>   4y`,
            `skills      docker                  1/1     <span style="color:var(--accent-green)">Running</span>   4y`,
            `skills      ansible                 1/1     <span style="color:var(--accent-green)">Running</span>   4y`,
            `skills      github-actions          1/1     <span style="color:var(--accent-green)">Running</span>   3y`,
            `skills      gitlab-ci               1/1     <span style="color:var(--accent-green)">Running</span>   4y`,
            `skills      argocd                  1/1     <span style="color:var(--accent-green)">Running</span>   3y`,
            `skills      prometheus-grafana      1/1     <span style="color:var(--accent-green)">Running</span>   4y`,
            `skills      vault                   1/1     <span style="color:var(--accent-green)">Running</span>   2y`,
            `skills      haproxy-keepalived      1/1     <span style="color:var(--accent-green)">Running</span>   1y`,
            ` `,
            `<span style="color:var(--accent-green)">12 pods running | 0 pending | 0 failed</span>`,
        ]),
    },
    experience: {
        cmd: 'git log --oneline career',
        output: () => makeLines([
            `<span style="color:var(--accent-yellow)">a3f7b2e</span> <span style="color:var(--accent-green)">(HEAD -> main)</span> DevOps Engineer @ Endava <span style="color:var(--text-muted)">(Jun 2025 - Present)</span>`,
            `<span style="color:var(--accent-yellow)">d82ca1f</span> DevOps Engineer @ Ejobs <span style="color:var(--text-muted)">(Feb 2022 - Present)</span>`,
            `<span style="color:var(--accent-yellow)">f19e3a7</span> DevOps Engineer @ Winbet <span style="color:var(--text-muted)">(Feb 2025 - May 2025)</span>`,
            `<span style="color:var(--accent-yellow)">b4c8d21</span> System Administrator @ Coface <span style="color:var(--text-muted)">(Feb 2023 - Mar 2025)</span>`,
            `<span style="color:var(--accent-yellow)">e7f2a09</span> IT Specialist @ Magnetic IT <span style="color:var(--text-muted)">(Apr 2022 - Feb 2023)</span>`,
            `<span style="color:var(--accent-yellow)">c1d4e88</span> IT Technician @ Concord Service <span style="color:var(--text-muted)">(Nov 2015 - May 2016)</span>`,
            ` `,
            `<span style="color:var(--text-muted)">6 commits | career branch created 2015</span>`,
        ]),
    },
    contact: {
        cmd: 'cat contact.json',
        output: () => makeLines([
            `{`,
            `  <span style="color:var(--accent-blue)">"name"</span>: <span style="color:var(--accent-green)">"Cosmin Pascariu"</span>,`,
            `  <span style="color:var(--accent-blue)">"role"</span>: <span style="color:var(--accent-green)">"Cloud/DevOps Engineer"</span>,`,
            `  <span style="color:var(--accent-blue)">"email"</span>: <span style="color:var(--accent-green)">"pascariucosmin93@gmail.com"</span>,`,
            `  <span style="color:var(--accent-blue)">"phone"</span>: <span style="color:var(--accent-green)">"+40 749 571 122"</span>,`,
            `  <span style="color:var(--accent-blue)">"location"</span>: <span style="color:var(--accent-green)">"Iasi, Romania"</span>,`,
            `  <span style="color:var(--accent-blue)">"available"</span>: <span style="color:var(--accent-orange)">true</span>,`,
            `  <span style="color:var(--accent-blue)">"languages"</span>: [<span style="color:var(--accent-green)">"Romanian"</span>, <span style="color:var(--accent-green)">"English"</span>]`,
            `}`,
        ]),
    },
    neofetch: {
        cmd: 'cat summary.md',
        output: () => {
            const { years, days } = calcUptime(CAREER_START);
            return `<div class="output-line" style="animation-delay:0.05s"><div class="neo-header"><div class="neo-logo">   ____   ____
  / ___| |  _ \\
 | |     | |_) |
 | |___  |  __/
  \\____| |_|
</div><div class="neo-info"><span class="neo-label">cosmin</span>@<span class="neo-label">cloud</span><br>──────────────<br><span class="neo-label">OS:</span> DevOps Linux x86_64<br><span class="neo-label">Host:</span> Endava / Ejobs<br><span class="neo-label">Uptime:</span> ${years}y ${days}d<br><span class="neo-label">Shell:</span> bash + terraform + ansible<br><span class="neo-label">Cloud:</span> AWS, Azure, On-Prem<br><span class="neo-label">Containers:</span> Docker, K8s, Helm<br><span class="neo-label">CI/CD:</span> GitHub Actions, GitLab, ArgoCD<br><span class="neo-label">Monitoring:</span> Prometheus, Grafana, Loki<br><br><span class="neo-label">Cloud</span> <span class="neo-bar-track"><span class="neo-bar-fill" style="width:90%;background:var(--accent-blue)"></span></span><br><span class="neo-label">K8s</span> <span class="neo-bar-track"><span class="neo-bar-fill" style="width:85%;background:var(--accent-purple)"></span></span><br><span class="neo-label">IaC</span> <span class="neo-bar-track"><span class="neo-bar-fill" style="width:90%;background:var(--accent-green)"></span></span><br><span class="neo-label">CI/CD</span> <span class="neo-bar-track"><span class="neo-bar-fill" style="width:88%;background:var(--accent-orange)"></span></span></div></div></div>`;
        },
    },
};

let isTyping = false;

function typeCommand(text, callback) {
    const typedCmd = document.getElementById('typed-cmd');
    const cursor   = document.getElementById('terminal-cursor');
    typedCmd.textContent = '';
    cursor.style.display = 'inline-block';
    isTyping = true;
    let i = 0;

    function type() {
        if (i < text.length) {
            typedCmd.textContent += text[i++];
            setTimeout(type, TYPE_MIN_MS + Math.random() * TYPE_JITTER_MS);
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

    document.querySelectorAll('.cmd-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-cmd="${cmdKey}"]`)?.classList.add('active');

    const output     = document.getElementById('cmd-output');
    const nextPrompt = document.getElementById('next-prompt');
    output.innerHTML = '';
    nextPrompt.style.display = 'none';

    typeCommand(cmd.cmd, () => {
        output.innerHTML = cmd.output();
        nextPrompt.style.display = 'flex';
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.workflow').forEach(w => w.classList.add('open'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

    const { years, days, hours } = calcUptime(CAREER_START);
    document.getElementById('uptime').textContent = `${years}y ${days}d ${hours}h`;

    document.querySelectorAll('.cmd-btn').forEach(btn => {
        btn.addEventListener('click', () => runCommand(btn.dataset.cmd));
    });

    setTimeout(() => runCommand('about'), 500);
});
