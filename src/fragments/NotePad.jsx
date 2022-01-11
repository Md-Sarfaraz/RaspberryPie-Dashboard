import React, { useState, useEffect, useRef } from 'react'
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import style from 'react-syntax-highlighter/dist/esm/styles/prism/coldark-cold';
import {useLocalStorage} from '../services/StorageHook';
import { downloadMarkdownAsFile } from '../services/Util';
import Alert from 'react-bootstrap/Alert'
import './notepad.css'
import axios, { post } from 'axios';

const NotePad = () => {

    const inputRef = useRef("")
    const fullView = useRef()
    const [mdView, setMdView] = useState({ showEditor: true, showPreview: true })
    const [saved, setsaved] = useState(false)
    const [markdown, setMarkdown] = useLocalStorage('mdkey', "Welcome to Markdwon Editor")
    useEffect(() => {
        // console.log(inputRef.current.scrollHeight)
        inputRef.current.style.height = 'auto';
        inputRef.current.style.height = (inputRef.current.scrollHeight) + 'px';
        let div = fullView.current
        div.scrollTop = div.scrollHeight - div.clientHeight;
    }, [markdown])

    function downloadFile(e) {
        const contentType = { type: "text/plain;charset=utf-8" }
        downloadMarkdownAsFile(markdown, contentType, "newMarkdown.md")
        console.log("download")
    }
    function uploadFile(e) {
        let files = e.target.files
        let reader = new FileReader()
        reader.readAsText(files[0])
        reader.onload = (e) => {
            setMarkdown(e.target.result)
        }
    }

    function changeView(e) {
        let id = e.target.id
        let v = { showEditor: true, showPreview: true }
        if (id === 'mEdit') {
            v.showPreview = false
            v.showEditor = true
        }
        if (id === 'mBoth') {
            v.showPreview = true
            v.showEditor = true
        }
        if (id === 'mPrev') {
            v.showPreview = true
            v.showEditor = false
        }
        else {

        }
        setMdView(v)

    }

    function handleKeys(e) {
        let charCode = String.fromCharCode(e.which).toLowerCase();
        if (e.key === 'Tab' && !e.shiftKey) {
            document.execCommand('insertText', false, "\t");
            e.preventDefault();
            return false;
        }
        if ((e.ctrlKey || e.metaKey) && charCode === 's') {
            e.preventDefault();
            setsaved(true)
            setTimeout(() => {
                setsaved(false)
            }, 1500);
        } else if ((e.ctrlKey || e.metaKey) && charCode === 'c') {
            alert("Copied");
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
                        <div className="col-sm-4">
                            <h1 className="m-0 text-dark"><strong>Notepad</strong> <small className='ml-3'>(Markdown Editor)</small></h1>
                        </div>

                        <div className="col-sm-4 d-flex justify-content-end">
                            <input type="button" onClick={toogleFullWidth} className='btn btn-success' value="Full Width" />
                        </div>
                    </div>
                </div>
            </section>
            <div className="content">
                <div className='container-fluid' ref={fullView}>
                    <div className="card my-3" style={{ height: '100%' }}>
                        <div className="card-header bg-primary row">
                            <div className='col-sm-4'>
                                <h4 className=''>Markdown Editor</h4>
                            </div>
                            <div className="col-sm-4">
                                <div className="btn-group " role="group">
                                    <button type="button" id='mEdit' onClick={changeView} className="btn btn-light btn-outline-info">Editor</button>
                                    <button type="button" id='mBoth' onClick={changeView} className="btn btn-light btn-outline-info">Both</button>
                                    <button type="button" id='mPrev' onClick={changeView} className="btn btn-light btn-outline-info">Preview</button>
                                </div>
                            </div>

                            <div className="col-sm-4">
                                <div className="float-right">
                                    <label htmlFor="mdfile" className='btn btn-info mb-0'>
                                        <i className="fas fa-file-upload" style={{ fontSize: "1.2em" }}> Upload</i>
                                    </label>
                                    <input type="file" name="mdfile" id='mdfile' className="upload-hidden btn btn-warning mr-4" onChange={uploadFile} />
                                    <a onClick={downloadFile} className=" btn btn-info" >
                                        <i className="fas fa-file-download" style={{ fontSize: "1.2em" }}> Download</i></a>
                                </div>


                            </div>
                        </div>
                        <div className="card-body h-100">
                            <div className="row">
                                <div className="col-md md-editor" id='editormd' style={mdView.showEditor ? {} : { display: 'none' }}>
                                    <textarea ref={inputRef} className="form-group mr-4" style={{ height: '100%', minHeight: '100%', width: '100%' }}
                                        value={markdown} onKeyDown={handleKeys} onChange={(e) => { setMarkdown(e.target.value) }} ></textarea>
                                </div>
                                <div className="col-md" style={mdView.showPreview ? {} : { display: 'none' }} >
                                    <Alert show={saved} variant="success" className='alert alert-success'>
                                        <strong>Saved.</strong> Temporary LocalStorage Saved
                                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </Alert>
                                    <ReactMarkdown 
                                        children={markdown}
                                        rehypePlugins={[rehypeRaw]}
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
