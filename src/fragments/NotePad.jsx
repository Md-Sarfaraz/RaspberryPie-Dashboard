import React, { useEffect } from 'react'
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import remarkGfm from 'remark-gfm'
import style from 'react-syntax-highlighter/dist/esm/styles/prism/coldark-cold';
import useLocalStorage from '../services/StorageHook';


const NotePad = () => {


    const [markdown, setMarkdown] = useLocalStorage('mdkey',"Welcome to Markdwon Editor")
    useEffect(() => {

    }, [])

    function preventTabExit(e) {
        if (e.key === 'Tab' && !e.shiftKey) {
            document.execCommand('insertText', false, "\t");
            e.preventDefault();
            return false;
        }
    }
    return (
        <div className="content-wrapper">
            <section className="content-header">
            <div className="container">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0 text-dark"> Raspberry Pie <small>System Monitor</small></h1>
                                </div>
                                <div className="col-sm-6 d-flex flex-row justify-content-end">
                                    <button className="btn btn-info" >Connect</button>
                                </div>

                            </div>
                        </div>
            </section>
            <div className="content">
                <div className=''>
                    <div className="card my-3" style={{height:'100%'}}>
                        <div className="card-header">
                            <h4>MarkDown Editor</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6  p-2"   >
                                    <textarea className="form-group" style={{height:'90%',maxHeight:'100%',minHeight:'100%', width: '100%'}}value={markdown} onKeyDown={preventTabExit} onChange={(e) => { setMarkdown(e.target.value) }} ></textarea>
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
