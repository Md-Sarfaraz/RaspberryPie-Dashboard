import React, { useEffect, useRef } from 'react'
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import remarkGfm from 'remark-gfm'
import style from 'react-syntax-highlighter/dist/esm/styles/prism/coldark-cold';
import useLocalStorage from '../services/StorageHook';
import { downloadMarkdownAsFile } from '../services/Util';
import './notepad.css'
import axios, { post } from 'axios';

const NotePad = () => {

    const inputRef = useRef("")
    const fullView = useRef()
    const editorRef = useRef("")
    const [markdown, setMarkdown] = useLocalStorage('mdkey', "Welcome to Markdwon Editor")
    useEffect(() => {
        console.log(inputRef.current.scrollHeight)
        // inputRef.current.setAttribute('style', 'height:' + (inputRef.current.scrollHeight) + 'px');
        inputRef.current.style.height = 'auto';
        inputRef.current.style.height = (inputRef.current.scrollHeight) + 'px';
        let div = fullView.current
        div.scrollTop = div.scrollHeight - div.clientHeight;
        // const editor = editorRef.current
        // if (editor) {
        //     //editor.scrollTop = editor.scrollHeight
        //     //editor.scrollIntoView()
        // }
    }, [markdown])

    function downloadFile(e) {
        const contentType = { type: "text/plain;charset=utf-8" }
        downloadMarkdownAsFile(markdown, contentType, "newMarkdown.md", e.target)
    }
    function uploadFile(e) {
        let files = e.target.files
        let reader = new FileReader()
        reader.readAsText(files[0])

        reader.onload = (e) => {
            setMarkdown(e.target.result)

        }

    }

    function preventTabExit(e) {
        if (e.key === 'Tab' && !e.shiftKey) {
            document.execCommand('insertText', false, "\t");

            e.preventDefault();
            return false;
        }
    }

    function toogleFullWidth(e) {
        fullView.current.classList.toggle('container')
    }
    return (

        <div className="content-wrapper">
            <section className="content-header">
                <div className="container">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark"><strong>Notepad</strong> <small className='ml-3'>(Markdown Editor)</small></h1>
                        </div>
                        <div className="col-sm-6 d-flex justify-content-end">
                            <input type="button" onClick={toogleFullWidth} className='btn btn-success' value="Full Width" />
                        </div>
                    </div>
                </div>
            </section>
            <div className="content">
                <div className='container-fluid' ref={fullView}>
                    <div className="card my-3" style={{ height: '100%' }}>
                        <div className="card-header bg-info">
                            <h4 className='card-title'>MarkDown Editor</h4>
                            <div class="card-tools">

                                <label for="mdfile" className='btn btn-info mb-0'>
                                    <i class="fas fa-file-upload" style={{ fontSize: "1.2em" }}> Upload</i>
                                </label>
                                <input type="file" name="mdfile" id='mdfile' className="upload-hidden btn btn-warning mr-4" onChange={uploadFile} />
                                <a onClick={downloadFile} className=" btn btn-info" >
                                    <i class="fas fa-file-download" style={{ fontSize: "1.2em" }}> Download</i></a>
                            </div>
                        </div>
                        <div className="card-body h-100">
                            <div ref={editorRef} className="row">
                                <div className="col-md-6 md-preview p-2"   >
                                    <textarea ref={inputRef} className="form-group " style={{ height: '100%', minHeight: '100%', width: '100%' }}
                                        value={markdown} onKeyDown={preventTabExit} onChange={(e) => { setMarkdown(e.target.value) }} ></textarea>
                                </div>
                                <div className="col-md-6">
                                    <ReactMarkdown
                                        children={markdown}
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            code({ node, inline, className, children, ...props }) {
                                                const match = /language-(\w+)/.exec(className || '')
                                                return !inline && match ? (
                                                    <SyntaxHighlighter
                                                        children={String(children).replace(/\n$/, '')}
                                                        style={style}
                                                        language={match[1]}
                                                        PreTag="div"
                                                        {...props}
                                                    />
                                                ) : (
                                                    <code className={className} {...props}>
                                                        {children}
                                                    </code>
                                                )
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotePad
