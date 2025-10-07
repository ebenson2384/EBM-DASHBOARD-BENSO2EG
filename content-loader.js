(function() {
    console.log('Enhanced Content Loader v2.3 - Fixed logging & performance');
    
    let loadedFiles = new Set(); // Track successfully loaded files
    let lastContent = new Map(); // Keep last processed content for live-refresh files
    let isInitialLoad = true;
    
    document.addEventListener('DOMContentLoaded', loadAllContent);
    // Polling interval (ms) - change to 0 to disable polling
    const POLL_INTERVAL = 3000;
    // mutable handle so we can stop/start polling reliably
    let intervalHandle = POLL_INTERVAL > 0 ? setInterval(loadAllContent, POLL_INTERVAL) : null;
    
    async function loadAllContent() {
        const contentFiles = [
            'ask-problem-definition.txt', 'ask-stakeholder-analysis.txt', 'ask-success-criteria.txt',
            'evidence-scientific-methods.txt', 'evidence-scientific-sources.txt', 'evidence-scientific-appraisal.txt',
            'evidence-practitioner-methods.txt', 'evidence-practitioner-sources.txt', 'evidence-practitioner-appraisal.txt',
            'evidence-organizational-methods.txt', 'evidence-organizational-sources.txt', 'evidence-organizational-appraisal.txt',
            'evidence-stakeholder-methods.txt', 'evidence-stakeholder-sources.txt', 'evidence-stakeholder-appraisal.txt',
            'synthesis-integration.txt', 'application-implementation.txt', 'assessment-monitoring.txt'
        ];
        
        let newFilesLoaded = 0;
        
        for (let filename of contentFiles) {
            // Previously we stopped polling files once loaded; now we keep polling all files and update on changes.
            // This allows live updates for every content file in `contentFiles`.
            
            try {
                // cache-bust with a timestamp to avoid browser caching during editing
                const cacheBuster = `_cb=${Date.now()}`;
                const sep = `content/${filename}`.includes('?') ? '&' : '?';
                const response = await fetch(`content/${filename}${sep}${cacheBuster}`);
                if (response.ok) {
                    let raw = await response.text();

                    // If the raw file content hasn't changed, skip processing early to save cycles
                    const prevRaw = lastContent.get(filename + '::raw') || '';
                    if (prevRaw === raw) {
                        // still same raw file; but continue to next file to maintain polling behavior
                        continue;
                    }
                    // store raw snapshot for future comparisons
                    lastContent.set(filename + '::raw', raw);
                    
                    // Find the target container (we rely on the onclick attribute existing so live-updates keep working)
                    const targetDiv = document.querySelector(`[onclick*="${filename}"]`);
                    if (targetDiv) {
                        const pre = targetDiv.querySelector('pre');
                        if (pre) {
                            try {
                                // Enhanced content processing
                                const processed = processContent(raw, filename);

                                // Update on change for all files. Compare processed output to lastContent and update when different.
                                const prev = lastContent.get(filename) || '';
                                if (prev !== processed) {
                                    pre.innerHTML = processed;
                                    lastContent.set(filename, processed);
                                    // Keep the onclick so we can continue to find and update this element on subsequent polls
                                    targetDiv.title = 'Live-updating from ' + filename;
                                    console.log(`🔁 Updated live ${filename}`);
                                    // Remove placeholder hints only after first successful render
                                    if (!loadedFiles.has(filename)) {
                                        removePlaceholderHints(targetDiv, filename);
                                        targetDiv.style.cursor = 'default';
                                        // keep onclick so updates continue to find the element
                                        // mark as seen but do not stop polling
                                        loadedFiles.add(filename);
                                        newFilesLoaded++;
                                    }
                                } else if (isInitialLoad && !loadedFiles.has(filename)) {
                                    // First time show content even if same as empty
                                    pre.innerHTML = processed;
                                    lastContent.set(filename, processed);
                                    targetDiv.title = 'Live-updating from ' + filename;
                                    removePlaceholderHints(targetDiv, filename);
                                    targetDiv.style.cursor = 'default';
                                    loadedFiles.add(filename);
                                    newFilesLoaded++;
                                    console.log(`✅ Loaded live ${filename}`);
                                }
                            } catch (processingError) {
                                // Fallback to plain text
                                const textToShow = raw;

                                // For errors, update plain-text wrapped output and compare as above
                                const wrapped = escapeAndWrap(textToShow);
                                const prevErr = lastContent.get(filename) || '';
                                if (prevErr !== wrapped) {
                                    pre.innerHTML = wrapped;
                                    lastContent.set(filename, wrapped);
                                    targetDiv.title = 'Live-updating from ' + filename;
                                    console.log(`🔁 Updated live ${filename} (plain text fallback)`);
                                    if (!loadedFiles.has(filename)) {
                                        removePlaceholderHints(targetDiv, filename);
                                        targetDiv.style.cursor = 'default';
                                        loadedFiles.add(filename);
                                        newFilesLoaded++;
                                    }
                                }
                            }
                        }
                    } else if (isInitialLoad) {
                        console.log(`❌ No container found for ${filename}`);
                    }
                } else if (response.status === 404 && isInitialLoad) {
                    console.log(`📝 File not found: ${filename} (create this file to see content)`);
                }
            } catch (error) {
                if (isInitialLoad) {
                    console.log(`❌ Network error loading ${filename}:`, error.message);
                }
            }
        }
        
    // NOTE: Do not automatically stop polling — keep watching files for live updates.
    // We retain loadedFiles/newFilesLoaded for diagnostics but do not clear the interval here.
        
        isInitialLoad = false;
    }
    
    function removePlaceholderHints(container, filename) {
        let removedCount = 0;
        
        // Strategy 1: Remove elements containing placeholder text
        const allElements = container.querySelectorAll('*');
        allElements.forEach(element => {
            const text = element.textContent || '';
            
            if ((text.includes(`📝 content/${filename}`) || 
                 text.includes(`🖊️ Click to edit this file`) ||
                 (text.includes('📝') && text.includes(filename)) ||
                 (text.includes('🖊️') && text.includes('Click to edit'))) &&
                !element.querySelector('pre') && 
                element.tagName !== 'PRE' &&
                element.textContent.length < 150) {
                
                element.style.display = 'none';
                removedCount++;
            }
        });
        
        if (removedCount > 0) {
            console.log(`🧹 Cleaned ${removedCount} placeholder(s) for ${filename}`);
        }
    }
    
    function processContent(content, filename) {
        if (typeof content !== 'string') {
            throw new Error('Content must be a string');
        }
        
        content = content.trim();
        
        if (!content) {
            return '<div style="font-family: inherit; line-height: 1.6; color: #999; font-style: italic;">Content file is empty. Add your content to see it here.</div>';
        }
        
        // Check for HTML content
        if (content.includes('<') && (content.includes('<div') || content.includes('<table') || content.includes('<h') || content.includes('<p'))) {
            if (content.includes('<script') || content.includes('<iframe') || content.includes('javascript:')) {
                console.warn(`⚠️ Potentially unsafe HTML detected in ${filename}, treating as plain text`);
                return escapeAndWrap(content);
            }
            return content;
        }
        
        // Process markdown
        try {
            return processMarkdown(content);
        } catch (error) {
            console.warn(`⚠️ Markdown processing failed for ${filename}:`, error.message);
            return escapeAndWrap(content);
        }
    }
    
    function processMarkdown(content) {
        // Enhanced markdown processing with all header levels
        content = content
            .replace(/^#### (.*$)/gim, '###HEADER4###$1###HEADER4###')
            .replace(/^### (.*$)/gim, '###HEADER3###$1###HEADER3###')
            .replace(/^## (.*$)/gim, '###HEADER2###$1###HEADER2###')
            .replace(/^# (.*$)/gim, '###HEADER1###$1###HEADER1###')
            .replace(/\*\*(.*?)\*\*/g, '###BOLD###$1###BOLD###')
            .replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, '###ITALIC###$1###ITALIC###')
            .replace(/^- (.*$)/gim, '###LISTITEM###$1###LISTITEM###')
            .replace(/^(\d+)\. (.*$)/gim, '###NUMITEM###$2###NUMITEM###');
        
        content = escapeHtml(content);
        
        content = content
            .replace(/###HEADER1###(.*?)###HEADER1###/g, '<h3 style="color: #2c3e50; margin-top: 20px; margin-bottom: 10px; font-weight: 600;">$1</h3>')
            .replace(/###HEADER2###(.*?)###HEADER2###/g, '<h4 style="color: #34495e; margin-top: 15px; margin-bottom: 8px; font-weight: 600;">$1</h4>')
            .replace(/###HEADER3###(.*?)###HEADER3###/g, '<h5 style="color: #7f8c8d; margin-top: 10px; margin-bottom: 5px; font-weight: 600;">$1</h5>')
            .replace(/###HEADER4###(.*?)###HEADER4###/g, '<h6 style="color: #95a5a6; margin-top: 8px; margin-bottom: 3px; font-weight: 600; font-size: 0.9em;">$1</h6>')
            .replace(/###BOLD###(.*?)###BOLD###/g, '<strong style="font-weight: 600;">$1</strong>')
            .replace(/###ITALIC###(.*?)###ITALIC###/g, '<em style="font-style: italic;">$1</em>')
            .replace(/###LISTITEM###(.*?)###LISTITEM###/g, '<li style="margin: 5px 0; padding-left: 5px;">$1</li>')
            .replace(/###NUMITEM###(.*?)###NUMITEM###/g, '<li style="margin: 5px 0; padding-left: 5px;">$1</li>')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');
        
        content = wrapConsecutiveLists(content);
        
        return `<div style="font-family: inherit; line-height: 1.6; color: #333; word-wrap: break-word;">${content}</div>`;
    }
    
    function wrapConsecutiveLists(content) {
        content = content.replace(/(<li[^>]*>.*?<\/li>(?:\s*<br>)*)+/gs, function(match) {
            const cleanList = match.replace(/\s*<br>\s*(?=<li|$)/g, '');
            const isNumbered = match.includes('list-style-type: decimal');
            const listTag = isNumbered ? 'ol' : 'ul';
            return `<${listTag} style="margin: 10px 0; padding-left: 25px; list-style-position: outside;">${cleanList}</${listTag}>`;
        });
        return content;
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function escapeAndWrap(content) {
        return `<div style="font-family: inherit; line-height: 1.6; color: #333; white-space: pre-wrap;">${escapeHtml(content)}</div>`;
    }
    
    window.enableAdvancedContent = function(filename) {
        console.log(`🎨 Advanced Formatting Help for ${filename || 'your content files'}:`);
        console.log('📝 MARKDOWN: # ## ### #### for headers, **bold**, *italic*, - bullets, 1. numbers');
        console.log('🎯 ASK CLAUDE: "Help me format my content with tables and charts"');
        console.log('⚡ ADVANCED: Paste HTML directly into your .txt files');
    };
    
    window.debugContentLoader = function() {
        console.log('🔍 Content Loader Status:');
        console.log(`📁 Files loaded: ${loadedFiles.size}/18`);
        console.log(`📋 Loaded files:`, Array.from(loadedFiles));
    };

    // Runtime controls
    window.stopContentPolling = function() {
        if (intervalHandle) {
            clearInterval(intervalHandle);
            intervalHandle = null;
            console.log('⛔ Content polling stopped');
        } else {
            console.log('ℹ️ Polling was not active');
        }
    };

    window.startContentPolling = function() {
        if (!intervalHandle && POLL_INTERVAL > 0) {
            intervalHandle = setInterval(loadAllContent, POLL_INTERVAL);
            console.log('▶️ Content polling started');
        } else {
            console.log('ℹ️ Polling already active or POLL_INTERVAL is 0');
        }
    };

    // Extended debug to show which files have last-known content
    const _oldDebug = window.debugContentLoader;
    window.debugContentLoader = function() {
        _oldDebug();
        console.log('📝 Live-tracked files and last content length:');
        for (let [k, v] of lastContent.entries()) {
            console.log(` - ${k}: ${String(v).length} chars`);
        }
    };
    
    console.log('📚 Content Loader ready! Type enableAdvancedContent() or debugContentLoader() in console.');
})();