import React from 'react'
import { Check, X } from 'react-feather'

const Notifications = () => {
  return (
    <>
    <div className="container-fluid">
        <div className="row px-2 pt-3">
                            <div className="col-md-6 pt-4 pt-md-0">
                                <h1 className="page_heading mb-0">Notifications</h1>
                                <div className="breadcrumbs">
                                    <span>Dashboard / </span>
                                    <span>Notifications List  </span>
                                   
                                </div>
                            </div>
                            <div className="col-md-6 pt-3">
                                    <span className="gap-10 d-flex align-items-center justify-content-md-end">
                                        <button className="btn_imprt"><X></X> Mark as unread</button>
                                        
                                        <button className="black_btn"><Check></Check> Mark as read</button>
                                   </span>
                            </div>
        </div>
        <div className="row px-2">
            <div className="col-8 mt-2">
                <div className="card_cmn">
                    <h6 className='font-14'>You have a new notification</h6>
                    <p className='font-12 color-grey'>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</p>
                    <span className="gap-10 d-flex align-items-center ">
                                        <button className="btn_imprt"><X></X> Mark as unread</button>
                                        
                                        <button className="black_btn"><Check></Check> Mark as read</button>
                                   </span>
                </div>
            </div>
            <div className="col-8 mt-2">
                <div className="card_cmn">
                    <h6 className='font-14'>You have a new notification</h6>
                    <p className='font-12 color-grey'>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</p>
                    <span className="gap-10 d-flex align-items-center ">
                                        <button className="btn_imprt"><X></X> Mark as unread</button>
                                        
                                        <button className="black_btn"><Check></Check> Mark as read</button>
                                   </span>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Notifications