#!/usr/bin/env python3
"""
Generate dashboard data file with all content from .txt files
This creates a JavaScript file that can be loaded into the HTML dashboard
"""

import os
import json

def read_file_safely(filepath):
    """Read a file and return its content, handling errors gracefully"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        return f"[Error loading file: {e}]"

def generate_content_js():
    """Generate a JavaScript file with all content data"""
    
    content_dir = './content/'
    content_files = [
        # ASK Framework
        'ask-problem-definition.txt',
        'ask-stakeholder-analysis.txt',
        'ask-success-criteria.txt',
        
        # Scientific Evidence
        'evidence-scientific-methods.txt',
        'evidence-scientific-sources.txt',
        'evidence-scientific-appraisal.txt',
        
        # Practitioner Evidence
        'evidence-practitioner-methods.txt',
        'evidence-practitioner-sources.txt',
        'evidence-practitioner-appraisal.txt',
        
        # Organizational Evidence
        'evidence-organizational-methods.txt',
        'evidence-organizational-sources.txt',
        'evidence-organizational-appraisal.txt',
        
        # Stakeholder Evidence
        'evidence-stakeholder-methods.txt',
        'evidence-stakeholder-sources.txt',
        'evidence-stakeholder-appraisal.txt',
        
        # Synthesis & Application
        'synthesis-integration.txt',
        'application-implementation.txt',
        'assessment-monitoring.txt'
    ]
    
    # Read all content
    content_data = {}
    for filename in content_files:
        filepath = os.path.join(content_dir, filename)
        content_data[filename] = read_file_safely(filepath)
        print(f"Loaded: {filename} ({len(content_data[filename])} characters)")
    
    # Generate JavaScript file
    js_content = "// Auto-generated content data for EBM Dashboard\n"
    js_content += "// Generated: " + __import__('datetime').datetime.now().isoformat() + "\n\n"
    js_content += "const DASHBOARD_CONTENT = " + json.dumps(content_data, indent=2, ensure_ascii=False) + ";\n\n"
    js_content += """
// Helper function to get content
function getContent(filename) {
    return DASHBOARD_CONTENT[filename] || '[Content not found]';
}

// Helper function to get preview (first 800 characters)
function getPreview(filename) {
    const content = getContent(filename);
    if (content.length > 800) {
        return content.substring(0, 800) + '\\n\\n[Click to view full content...]';
    }
    return content;
}

// Export for global use
window.DASHBOARD_CONTENT = DASHBOARD_CONTENT;
window.getContent = getContent;
window.getPreview = getPreview;

console.log('Dashboard content loaded: ' + Object.keys(DASHBOARD_CONTENT).length + ' files');
"""
    
    # Write to file
    output_file = 'dashboard_content.js'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"\n✅ Generated: {output_file}")
    print(f"📊 Total files: {len(content_data)}")
    print(f"📝 Total characters: {sum(len(v) for v in content_data.values()):,}")
    
    return output_file

if __name__ == '__main__':
    generate_content_js()
