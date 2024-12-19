import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MarkdownEditor = () => {
    const [markdown, setMarkdown] = useState('');
    const [html, setHtml] = useState('');

    // Handle Markdown text change
    const handleMarkdownChange = (event) => {
        const text = event.target.value;
        setMarkdown(text);
    };

    useEffect(() => {
        // Function to convert markdown to HTML using backend API
        const convertMarkdownToHtml = async () => {
            try {
                const response = await axios.post('http://localhost:5000/convert', {
                    markdownText: markdown
                });
                setHtml(response?.data?.html);
            } catch (error) {
                console.error('Error converting markdown:', error);
            }
        };

        // Call the conversion function on markdown text change
        if (markdown) {
            convertMarkdownToHtml();
        } else {
            setHtml('');
        }
    }, [markdown]);

    return (
        <div className="editor-container">
            <div className="editor">
                <h2>Markdown Editor</h2>
                <textarea
                    value={markdown}
                    onChange={handleMarkdownChange}
                    placeholder="Type your markdown here..."
                />
            </div>
            <div className="preview">
                <h2>Live Preview</h2>
                <div
                    className="preview-content"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        </div>
    );
};

export default MarkdownEditor;
