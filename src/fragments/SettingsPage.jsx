import React, { useEffect, useState, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import {useLocalStorage} from '../services/StorageHook';
import { ValidateIPaddress as ValidIP } from '../services/Util';
import { ValidatePort as ValidPort } from '../services/Util';
import { SocketContext } from "../services/SocketContext";


const SettingsPage = () => {
    const [serverIP, setServerIP] = useLocalStorage('server_ip', '')
    const [serverPort, setServerPort] = useLocalStorage('server_port', '')
    const [IP, setIP] = useState(serverIP)
    const [Port, setPort] = useState(serverPort)
    const { socket } = useContext(SocketContext)

    const [connsValue, setConnsValue] = useState("")
    useEffect(() => {
        let conn = socket.connected
        console.log("Server S :", conn)
        setConnsValue(conn ? "Alive" : "Offline")
    }, []);

    function onSave(event) {
        event.preventDefault();
        console.log(serverIP, serverPort)
        if (ValidIP(IP)) {
            setServerIP(IP)
            console.log("Ip Saved ...")
        } else {
            alert("Wrong IP Address")
        }
        if (ValidPort(Port)) {
            setServerPort(Port)
        } else {
            alert("Wrong Port Number")
        }
    }
    function onConnect(e) {
        console.log(socket.connected)
    }

    return (
        <div className="content-wrapper">
            <div className="container">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Settings</h1>
                            </div>
                            <div className="col-sm-6">
                                <p className='float-right p-2 m-auto text-primary'><strong className='text-indigo'>Server Status : </strong>{connsValue}</p>
                            </div>

                        </div>
                    </div>
                </section>

                <div className="content">
                    <div className="row">
                        <div className="col-ml-10">
                            <div className="card card-solid">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12 col-md-12 col-lg-8 order-2 order-md-1">

                                            <div className="card mr-1">
                                                <div className="card-body row">
                                                    <div className="col-md-10">
                                                        <form onSubmit={onSave} className="">
                                                            <div className="form-row">
                                                                <div className="input-group col-md-5">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i
                                                                            className="fas fa-laptop" /></span>
                                                                    </div>
                                                                    <input type="text" value={IP} onChange={(e) => {
                                                                        setIP(e.target.value)
                                                                    }} className="form-control" placeholder="Server IP"
                                                                        data-inputmask="'alias': 'ip'" data-mask
                                                                        im-insert="true" />
                                                                </div>

                                                                <div className="col-md-5">

                                                                    <input type="text" value={Port} onChange={(e) => {
                                                                        setPort(e.target.value)
                                                                    }} placeholder="Port No" className="form-control" />
                                                                </div>
                                                                <div className=" col-md-2">
                                                                    <input type="submit"
                                                                        className="form-control btn btn-primary"
                                                                        value="Save" />
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className=" col-md-2">
                                                        <button className='btn btn-primary' onClick={onConnect}>Connect</button>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="col-12 col-sm-4">
                                                    <div className="info-box bg-light">
                                                        <div className="info-box-content">
                                                            <span className="info-box-text text-center text-muted">Estimated budget</span>
                                                            <span
                                                                className="info-box-number text-center text-muted mb-0">2300</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-4">
                                                    <div className="info-box bg-light">
                                                        <div className="info-box-content">
                                                            <span className="info-box-text text-center text-muted">Total amount spent</span>
                                                            <span
                                                                className="info-box-number text-center text-muted mb-0">2000</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-4">
                                                    <div className="info-box bg-light">
                                                        <div className="info-box-content">
                                                            <span className="info-box-text text-center text-muted">Estimated project duration</span>
                                                            <span
                                                                className="info-box-number text-center text-muted mb-0">20 <span>
                                                                </span></span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2 card">
                                            <h3 className="text-primary"><i className="fas fa-cogs" /> Raspberry Pie
                                                DashBoard</h3>
                                            <p className="text-muted">Raw denim you probably haven't heard of them jean
                                                shorts Austin. Nesciunt tofu stumptown aliqua butcher retro keffiyeh
                                                dreamcatcher synth. Cosby sweater eu banh mi, qui irure terr.</p>
                                            <br />
                                            <div className="text-muted">
                                                <p className="text-sm">Client Company
                                                    <b className="d-block">Deveint Inc</b>
                                                </p>
                                                <p className="text-sm">Project Leader
                                                    <b className="d-block">Tony Chicken</b>
                                                </p>
                                            </div>
                                            <h5 className="mt-5 text-muted">Project files</h5>
                                            <ul className="list-unstyled">
                                                <li>
                                                    <Link to="#" className="btn-link text-secondary"><i
                                                        className="far fa-fw fa-file-word" /> Functional-requirements.docx</Link>
                                                </li>
                                                <li>
                                                    <Link to="#" className="btn-link text-secondary"><i
                                                        className="far fa-fw fa-file-pdf" /> UAT.pdf</Link>
                                                </li>
                                                <li>
                                                    <Link to="#" className="btn-link text-secondary"><i
                                                        className="far fa-fw fa-envelope" /> Email-from-flatbal.mln</Link>
                                                </li>
                                                <li>
                                                    <Link to="#" className="btn-link text-secondary"><i
                                                        className="far fa-fw fa-image " /> Logo.png</Link>
                                                </li>
                                                <li>
                                                    <Link to="#" className="btn-link text-secondary"><i
                                                        className="far fa-fw fa-file-word" /> Contract-10_12_2014.docx</Link>
                                                </li>
                                            </ul>
                                            <div className="text-center mt-5 mb-3">
                                                <Link to="#" className="btn btn-sm btn-primary">Add files</Link>
                                                <Link to="#" className="btn btn-sm btn-warning">Report contact</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage
