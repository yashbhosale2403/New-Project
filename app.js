/* ==========================================================================
   STYLECRAFT - Interactive JavaScript Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------------------------------------------- */
    /* 1. Theme Switcher Engine                                                   */
    /* -------------------------------------------------------------------------- */
    const themeButtons = document.querySelectorAll(".theme-btn");
    const htmlElement = document.documentElement;

    const THEME_STORAGE_KEY = "stylecraft-theme";

    
    function applyTheme(theme) {
        htmlElement.setAttribute("data-theme", theme);

        themeButtons.forEach((button) => {
            button.classList.toggle(
                "active",
                button.dataset.themeSet === theme
            );
        });
    }

   
    function saveTheme(theme) {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }

    
    function loadTheme() {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            applyTheme("dark");
        }
    }

    
    themeButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const selectedTheme = button.dataset.themeSet;

            applyTheme(selectedTheme);

            saveTheme(selectedTheme);

            showToast(`Theme switched to ${selectedTheme.toUpperCase()} mode!`);

        });

    });

    /**
     * Initialize theme
     */
    loadTheme();

    /* -------------------------------------------------------------------------- */
    /* 2. Interactive Sandbox Tabs                                                */
    /* -------------------------------------------------------------------------- */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const sandboxPanels = document.querySelectorAll('.sandbox-panel');

    tabButtons.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');

            tabButtons.forEach(t => t.classList.remove('active'));
            sandboxPanels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });

    /* -------------------------------------------------------------------------- */
    /* 3. Glassmorphism Generator                                                 */
    /* -------------------------------------------------------------------------- */
    const inputBlur = document.getElementById('input-blur');
    const inputOpacity = document.getElementById('input-opacity');
    const inputRadius = document.getElementById('input-radius');
    const inputBorder = document.getElementById('input-border');

    const valBlur = document.getElementById('val-blur');
    const valOpacity = document.getElementById('val-opacity');
    const valRadius = document.getElementById('val-radius');
    const valBorder = document.getElementById('val-border');

    const previewGlassBox = document.getElementById('preview-glass-box');
    const codeGlassOut = document.getElementById('code-glass-out');

    function updateGlassmorphism() {
        const blur = inputBlur.value;
        const opacity = inputOpacity.value;
        const radius = inputRadius.value;
        const borderOpacity = inputBorder.value;

        valBlur.textContent = `${blur}px`;
        valOpacity.textContent = opacity;
        valRadius.textContent = `${radius}px`;
        valBorder.textContent = borderOpacity;

        const cssBg = `rgba(255, 255, 255, ${opacity})`;
        const cssFilter = `blur(${blur}px)`;
        const cssBorder = `1px solid rgba(255, 255, 255, ${borderOpacity})`;
        const cssRadius = `${radius}px`;

        previewGlassBox.style.background = cssBg;
        previewGlassBox.style.backdropFilter = cssFilter;
        previewGlassBox.style.webkitBackdropFilter = cssFilter;
        previewGlassBox.style.borderRadius = cssRadius;
        previewGlassBox.style.border = cssBorder;

        codeGlassOut.textContent = `background: ${cssBg};\nbackdrop-filter: ${cssFilter};\n-webkit-backdrop-filter: ${cssFilter};\nborder-radius: ${cssRadius};\nborder: ${cssBorder};`;
    }

    [inputBlur, inputOpacity, inputRadius, inputBorder].forEach(input => {
        if (input) input.addEventListener('input', updateGlassmorphism);
    });
    updateGlassmorphism();

    /* -------------------------------------------------------------------------- */
    /* 4. Flexbox Visualizer                                                      */
    /* -------------------------------------------------------------------------- */
    const flexBox = document.getElementById('visualizer-flex-box');
    const codeFlexOut = document.getElementById('code-flex-out');

    let currentJustify = 'center';
    let currentAlign = 'center';
    let currentDirection = 'row';

    function bindOptionGroup(containerId, callback) {
        const buttons = document.querySelectorAll(`#${containerId} .btn-option`);
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                callback(btn.getAttribute('data-val'));
            });
        });
    }

    bindOptionGroup('opt-justify', (val) => {
        currentJustify = val;
        updateFlexVisualizer();
    });

    bindOptionGroup('opt-align', (val) => {
        currentAlign = val;
        updateFlexVisualizer();
    });

    bindOptionGroup('opt-direction', (val) => {
        currentDirection = val;
        updateFlexVisualizer();
    });

    function updateFlexVisualizer() {
        flexBox.style.justifyContent = currentJustify;
        flexBox.style.alignItems = currentAlign;
        flexBox.style.flexDirection = currentDirection;

        codeFlexOut.textContent = `display: flex;\njustify-content: ${currentJustify};\nalign-items: ${currentAlign};\nflex-direction: ${currentDirection};`;
    }

    /* -------------------------------------------------------------------------- */
    /* 5. Box Shadow Generator                                                    */
    /* -------------------------------------------------------------------------- */
    const shX = document.getElementById('input-sh-x');
    const shY = document.getElementById('input-sh-y');
    const shBlur = document.getElementById('input-sh-blur');
    const shSpread = document.getElementById('input-sh-spread');

    const previewShadowBox = document.getElementById('preview-shadow-box');
    const codeShadowOut = document.getElementById('code-shadow-out');

    function updateBoxShadow() {
        const x = shX.value;
        const y = shY.value;
        const blur = shBlur.value;
        const spread = shSpread.value;

        document.getElementById('val-sh-x').textContent = `${x}px`;
        document.getElementById('val-sh-y').textContent = `${y}px`;
        document.getElementById('val-sh-blur').textContent = `${blur}px`;
        document.getElementById('val-sh-spread').textContent = `${spread}px`;

        const shadowCSS = `${x}px ${y}px ${blur}px ${spread}px rgba(99, 102, 241, 0.45)`;
        previewShadowBox.style.boxShadow = shadowCSS;
        codeShadowOut.textContent = `box-shadow: ${shadowCSS};`;
    }

    [shX, shY, shBlur, shSpread].forEach(input => {
        if (input) input.addEventListener('input', updateBoxShadow);
    });
    updateBoxShadow();

    /* -------------------------------------------------------------------------- */
    /* 6. Keyframe Animations Sandbox                                             */
    /* -------------------------------------------------------------------------- */
    const previewAnimBox = document.getElementById('preview-anim-box');
    const animDurInput = document.getElementById('input-anim-dur');
    const valAnimDur = document.getElementById('val-anim-dur');
    const codeAnimOut = document.getElementById('code-anim-out');

    let currentAnimPreset = 'pulse';

    // Inject dynamic CSS Keyframes into document head
    const animStyleTag = document.createElement('style');
    animStyleTag.innerHTML = `
        @keyframes scPulse {
            0% { transform: scale(1); box-shadow: 0 0 0 rgba(99, 102, 241, 0.4); }
            100% { transform: scale(1.1); box-shadow: 0 0 30px rgba(99, 102, 241, 0.8); }
        }
        @keyframes scBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        @keyframes scSpin {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
        }
        @keyframes scShake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-10px); }
            40%, 80% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(animStyleTag);

    function updateAnimation() {
        const dur = animDurInput.value;
        valAnimDur.textContent = `${dur}s`;

        let keyframeName = 'scPulse';
        if (currentAnimPreset === 'bounce') keyframeName = 'scBounce';
        if (currentAnimPreset === 'spin') keyframeName = 'scSpin';
        if (currentAnimPreset === 'shake') keyframeName = 'scShake';

        previewAnimBox.style.animation = `${keyframeName} ${dur}s infinite ease-in-out`;

        codeAnimOut.textContent = `/* CSS Keyframe Animation */\nanimation: ${keyframeName} ${dur}s infinite ease-in-out;\n\n@keyframes ${keyframeName} {\n  /* Dynamic motion steps */\n}`;
    }

    bindOptionGroup('opt-anim', (val) => {
        currentAnimPreset = val;
        updateAnimation();
    });

    if (animDurInput) {
        animDurInput.addEventListener('input', updateAnimation);
    }
    updateAnimation();

    /* -------------------------------------------------------------------------- */
    /* 7. 3D Tilt Effect on Hero Card                                             */
    /* -------------------------------------------------------------------------- */
    const heroTiltCard = document.getElementById('hero-tilt-card');
    if (heroTiltCard) {
        heroTiltCard.addEventListener('mousemove', (e) => {
            const rect = heroTiltCard.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rotateX = (-y / rect.height) * 20;
            const rotateY = (x / rect.width) * 20;

            heroTiltCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        heroTiltCard.addEventListener('mouseleave', () => {
            heroTiltCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    }

    /* -------------------------------------------------------------------------- */
    /* 8. Component Code Modal Data & Viewer                                      */
    /* -------------------------------------------------------------------------- */
    const componentCodeMap = {
        'neumorphic-btn': {
            title: 'Soft Neumorphic Button Code',
            code: `<button class="btn-neumorphic">Soft Neumorphic</button>\n\n/* CSS */\n.btn-neumorphic {\n    padding: 12px 24px;\n    background: #121824;\n    color: #f8fafc;\n    font-weight: 600;\n    border: none;\n    border-radius: 14px;\n    box-shadow: 6px 6px 14px rgba(0, 0, 0, 0.4), -6px -6px 14px rgba(255, 255, 255, 0.03);\n    cursor: pointer;\n    transition: all 0.2s ease;\n}\n.btn-neumorphic:active {\n    box-shadow: inset 4px 4px 8px rgba(0,0,0,0.5), inset -4px -4px 8px rgba(255,255,255,0.03);\n}`
        },
        'cyber-btn': {
            title: 'Cyberpunk Animated Border Button Code',
            code: `<button class="btn-cyber-border">Cyberpunk</button>\n\n/* CSS */\n.btn-cyber-border {\n    position: relative;\n    padding: 12px 28px;\n    background: transparent;\n    color: #00f3ff;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 1px;\n    border: 2px solid #00f3ff;\n    border-radius: 8px;\n    cursor: pointer;\n    overflow: hidden;\n    transition: color 0.3s ease;\n}\n.btn-cyber-border::before {\n    content: '';\n    position: absolute;\n    top: 0; left: -100%;\n    width: 100%; height: 100%;\n    background: #00f3ff;\n    transition: left 0.3s ease;\n    z-index: -1;\n}\n.btn-cyber-border:hover {\n    color: #000;\n}\n.btn-cyber-border:hover::before {\n    left: 0;\n}`
        },
        'floating-input': {
            title: 'Floating Input Label Code',
            code: `<div class="floating-group">\n    <input type="text" id="email" class="floating-input" placeholder=" ">\n    <label for="email" class="floating-label">Email Address</label>\n</div>\n\n/* CSS */\n.floating-group { position: relative; width: 100%; }\n.floating-input {\n    width: 100%; padding: 12px 16px;\n    background: #0a0d14; border: 1px solid rgba(255, 255, 255, 0.1);\n    border-radius: 14px; color: #fff; outline: none;\n}\n.floating-label {\n    position: absolute; left: 16px; top: 50%; transform: translateY(-50%);\n    color: #94a3b8; pointer-events: none; transition: all 0.2s ease;\n}\n.floating-input:focus ~ .floating-label,\n.floating-input:not(:placeholder-shown) ~ .floating-label {\n    top: 0; font-size: 0.75rem; color: #6366f1;\n}`
        },
        'toggle-switch': {
            title: 'Animated Switch Toggle Code',
            code: `<label class="switch-label">\n    <input type="checkbox" class="switch-input" checked>\n    <span class="switch-slider"></span>\n    <span>Notifications</span>\n</label>\n\n/* CSS */\n.switch-slider {\n    width: 48px; height: 26px;\n    background: #1a2234; border-radius: 9999px; position: relative;\n    transition: background 0.3s ease;\n}\n.switch-slider::before {\n    content: ''; position: absolute; top: 3px; left: 3px;\n    width: 20px; height: 20px; background: #fff; border-radius: 50%;\n    transition: transform 0.3s ease;\n}\n.switch-input:checked + .switch-slider { background: #6366f1; }\n.switch-input:checked + .switch-slider::before { transform: translateX(22px); }`
        },
        'tooltip': {
            title: 'Animated Tooltip Code',
            code: `<div class="tooltip-trigger">\n    Hover Over Me\n    <div class="tooltip-content">Pure CSS Gradient Tooltip!</div>\n</div>\n\n/* CSS */\n.tooltip-trigger { position: relative; cursor: pointer; }\n.tooltip-content {\n    position: absolute; bottom: 130%; left: 50%;\n    transform: translateX(-50%) translateY(10px);\n    background: linear-gradient(135deg, #6366f1, #ec4899);\n    color: #fff; padding: 6px 12px; border-radius: 8px;\n    opacity: 0; pointer-events: none; transition: all 0.3s ease;\n}\n.tooltip-trigger:hover .tooltip-content {\n    opacity: 1; transform: translateX(-50%) translateY(0);\n}`
        },
        'badges': {
            title: 'Status Badges & Chips Code',
            code: `<span class="hero-badge">Verified</span>\n<span class="live-badge">ONLINE</span>\n\n/* CSS */\n.hero-badge {\n    display: inline-flex; align-items: center; padding: 6px 16px;\n    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);\n    border-radius: 9999px; color: #818cf8;\n}\n.live-badge {\n    font-family: 'Fira Code', monospace; padding: 2px 8px; border-radius: 4px;\n    background: rgba(39, 201, 63, 0.15); color: #27c93f; border: 1px solid rgba(39, 201, 63, 0.3);\n}`
        }
    };

    const codeModal = document.getElementById('code-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalCodeContent = document.getElementById('modal-code-content');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCopyBtn = document.getElementById('modal-copy-btn');

    document.querySelectorAll('.btn-view-code').forEach(btn => {
        btn.addEventListener('click', () => {
            const compKey = btn.getAttribute('data-comp');
            const compData = componentCodeMap[compKey];
            if (compData) {
                modalTitle.textContent = compData.title;
                modalCodeContent.textContent = compData.code;
                codeModal.classList.add('active');
            }
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            codeModal.classList.remove('active');
        });
    }

    if (codeModal) {
        codeModal.addEventListener('click', (e) => {
            if (e.target === codeModal) codeModal.classList.remove('active');
        });
    }

    /* -------------------------------------------------------------------------- */
    /* 9. Copy Code & Toast Feedback                                              */
    /* -------------------------------------------------------------------------- */
    function showToast(message) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<span>✨</span><span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideInToast 0.3s reverse forwards';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    function setupCopyButton(btnId, codeElementId, label) {
        const btn = document.getElementById(btnId);
        const codeEl = document.getElementById(codeElementId);

        if (btn && codeEl) {
            btn.addEventListener('click', () => {
                const textToCopy = codeEl.textContent;
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast(`${label} copied to clipboard!`);
                }).catch(() => {
                    showToast('Failed to copy code.');
                });
            });
        }
    }

    setupCopyButton('copy-glass-code', 'code-glass-out', 'Glassmorphism CSS');
    setupCopyButton('copy-flex-code', 'code-flex-out', 'Flexbox CSS');
    setupCopyButton('copy-shadow-code', 'code-shadow-out', 'Box Shadow CSS');
    setupCopyButton('copy-anim-code', 'code-anim-out', 'Animation CSS');

    if (modalCopyBtn && modalCodeContent) {
        modalCopyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(modalCodeContent.textContent).then(() => {
                showToast('Component code copied to clipboard!');
            });
        });
    }

});
