import React from 'react'
import { ChartData } from "./ChartData";
import { CpuCore } from "./CpuCore";

export const ChartView = () => {
    return (
        <div>
            <div className="row">
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-header border-0">
                            <div className="d-flex justify-content-between">
                                <h3 className="card-title">CPU Temperature</h3>

                            </div>
                        </div>
                        <div className="card-body">
                            <div className="position-relative mb-4">
                                <div className="chartjs-size-monitor">
                                    <ChartData />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-header border-0">
                            <div className="d-flex justify-content-between">
                                <h3 className="card-title">CPU Usage</h3>

                            </div>
                        </div>
                        <div className="card-body">
                            <div className="position-relative mb-4">
                                <div className="chartjs-size-monitor">
                                    <CpuCore />
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-end">
                                <span className="mr-2">
                                    <i className="fas fa-square text-primary" /> This Week
                                </span>
                                <span>
                                    <i className="fas fa-square text-gray" /> Last Week
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    )
}
