// Content loader for EBM Dashboard
// This file contains all the evidence content from the .txt files

const contentData = {
    // ASK Framework files
    'ask-problem-definition.txt': `Loading from file system...`,
    'ask-stakeholder-analysis.txt': `Loading from file system...`,
    'ask-success-criteria.txt': `Loading from file system...`,
    
    // Scientific Evidence
    'evidence-scientific-methods.txt': `Loading from file system...`,
    'evidence-scientific-sources.txt': `Loading from file system...`,
    'evidence-scientific-appraisal.txt': `Loading from file system...`,
    
    // Practitioner Evidence
    'evidence-practitioner-methods.txt': `Loading from file system...`,
    'evidence-practitioner-sources.txt': `Loading from file system...`,
    'evidence-practitioner-appraisal.txt': `Loading from file system...`,
    
    // Organizational Evidence
    'evidence-organizational-methods.txt': `Loading from file system...`,
    'evidence-organizational-sources.txt': `Loading from file system...`,
    'evidence-organizational-sources.txt': `Loading from file system...`,
    'evidence-organizational-appraisal.txt': `Loading from file system...`,
    
    // Stakeholder Evidence
    'evidence-stakeholder-methods.txt': `Loading from file system...`,
    'evidence-stakeholder-sources.txt': `Loading from file system...`,
    'evidence-stakeholder-appraisal.txt': `Loading from file system...`,
    
    // Synthesis & Application
    'synthesis-integration.txt': `Loading from file system...`,
    'application-implementation.txt': `Loading from file system...`,
    'assessment-monitoring.txt': `Loading from file system...`
};

// Function to load content from file system
async function loadAllContent() {
    const contentPath = './content/';
    
    for (let filename in contentData) {
        try {
            const response = await fetch(contentPath + filename);
            if (response.ok) {
                const text = await response.text();
                contentData[filename] = text;
                console.log(`Loaded: ${filename}`);
            }
        } catch (error) {
            console.warn(`Could not load ${filename}:`, error);
        }
    }
    
    // Update all preview elements with actual content
    updatePreviewElements();
}

// Function to update preview elements with truncated content
function updatePreviewElements() {
    // Update problem definition preview
    if (contentData['ask-problem-definition.txt']) {
        const preview = contentData['ask-problem-definition.txt'].substring(0, 500);
        const element = document.getElementById('problem-definition-content');
        if (element) {
            element.textContent = preview + '\n\n[Click to view full content...]';
        }
    }
    
    // Similar updates for other content files...
    console.log('Content previews updated');
}

// Function to show full content in modal
function showFullContent(filename) {
    const content = contentData[filename];
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('content-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'content-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="closeModal()">
                <div class="modal-content" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h3 id="modal-title"></h3>
                        <button onclick="closeModal()" class="close-btn">×</button>
                    </div>
                    <div class="modal-body">
                        <pre id="modal-text"></pre>
                    </div>
                    <div class="modal-footer">
                        <button class="btn" onclick="editInVSCode('${filename}')">✏️ Edit in VS Code</button>
                        <button class="btn" onclick="closeModal()">Close</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Update modal content
    document.getElementById('modal-title').textContent = filename;
    document.getElementById('modal-text').textContent = content;
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('content-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function editInVSCode(filename) {
    alert(`To edit this file:\n\n1. Open VS Code\n2. Navigate to: content/${filename}\n3. Use GitHub Copilot to assist with content\n\nThe file path is: /Users/ethanbenson/Documents/EBM-Dashboard/content/${filename}`);
}

// Export for use in main dashboard
window.contentData = contentData;
window.loadAllContent = loadAllContent;
window.showFullContent = showFullContent;
