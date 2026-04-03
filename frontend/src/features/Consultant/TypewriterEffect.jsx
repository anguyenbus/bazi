import React, { useState, useEffect, useRef } from 'react';

/**
 * Parse markdown-like text and render formatted HTML
 */
const parseMarkdown = (text) => {
    if (!text) return '';

    // Pre-processing: If "1." is found in the middle of a sentence (not at the start of a line), 
    // it likely means the AI squashed the list. Let's add newlines.
    let processedText = text
        .replace(/([.!?])(\s*)(\d+\.\s+)/g, '$1\n$3') // Add newline before numbered items if they follow a sentence end
        .replace(/([^\n])(\d+\.\s+)/g, '$1\n$2');    // General newline before numbered items if missing

    let html = processedText
        // Headers: ### Title -> <h4>Title</h4>
        .replace(/^###\s+(.+)$/gm, '<h4 class="ai-heading">$1</h4>')
        .replace(/^##\s+(.+)$/gm, '<h3 class="ai-heading">$1</h3>')
        .replace(/^#\s+(.+)$/gm, '<h3 class="ai-heading">$1</h3>')
        // Bold: **text** -> <strong>text</strong>
        .replace(/\*\*([^*]+)\*\*/g, '<strong class="ai-bold">$1</strong>')
        // Numbered lists: 1. item -> <li>item</li>
        .replace(/^\d+\.\s+(.+)$/gm, '<li class="ai-list-item">$1</li>')
        // Bullet points: - item or • item
        .replace(/^[-•]\s+(.+)$/gm, '<li class="ai-bullet">$1</li>')
        // Line breaks
        .replace(/\n/g, '<br/>');

    // Wrap consecutive <li> items in <ol> or <ul>
    html = html.replace(/(<li class="ai-list-item">.*?<\/li>(<br\/>)?)+/g, (match) => {
        return '<ol class="ai-list">' + match.replace(/<br\/>/g, '') + '</ol>';
    });
    html = html.replace(/(<li class="ai-bullet">.*?<\/li>(<br\/>)?)+/g, (match) => {
        return '<ul class="ai-list">' + match.replace(/<br\/>/g, '') + '</ul>';
    });

    return html;
};

/**
 * Typewriter Effect for "Streaming AI" responses with Markdown support
 */
const TypewriterEffect = ({ text, speed = 20, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const textRef = useRef(text);

    useEffect(() => {
        // Reset if text changes
        if (textRef.current !== text) {
            setDisplayedText('');
            setCurrentIndex(0);
            setIsComplete(false);
            textRef.current = text;
        }

        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        } else if (!isComplete) {
            setIsComplete(true);
            if (onComplete) onComplete();
        }
    }, [currentIndex, text, speed, onComplete, isComplete]);

    // Parse markdown when complete, show raw text during typing
    const content = isComplete
        ? parseMarkdown(displayedText)
        : displayedText;

    return (
        <div className="typewriter-text">
            {isComplete ? (
                <div
                    className="ai-response-formatted"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            ) : (
                <>
                    {displayedText}
                    <span className="cursor-blink">|</span>
                </>
            )}
        </div>
    );
};

export default TypewriterEffect;

