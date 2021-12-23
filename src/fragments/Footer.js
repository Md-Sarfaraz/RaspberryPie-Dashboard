import React from 'react'

export const Footer = () => {
    let style = {
        padding: "1rem",
        borderTop: "1px solid #dee2e6",

        background: "#fff",
        backgroundColor: "rgb(255, 255, 255)",
        backgroundPositionX: "0 %",
        backgroundPositionY: "0 %",
        backgroundRepeat: "repeat",
        backgroundAttachment: "scroll",
        backgroundimage: "none",
        backgroundsize: "auto",
        backgroundOrigin: "padding - box",
        backgroundClip: "border - box",
        borderTopColor: "rgb(222, 226, 230)",
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        color: "#869099",
        position: "sticky",
    }
    return (
        <div className="" style={style}>
            <footer className="container">
                <div className="float-right d-none d-sm-inline">
                    Anything you want
                </div>
                <strong>Copyright © 2014-2020 <a href="https://adminlte.io">AdminLTE.io</a>.</strong> All rights reserved.
            </footer>
        </div>
    )
}
