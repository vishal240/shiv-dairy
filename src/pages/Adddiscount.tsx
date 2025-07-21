import React from 'react'
import { Check, File, X } from 'react-feather'

const Adddiscount = () => {
  return (
    <div className="container-fluid">
                <div className="row px-2 pt-3">
                    <div className="col-md-6 pt-4 pt-md-0">
                        <h1 className="page_heading mb-0">Add Discount Coupons</h1>
                        <div className="breadcrumbs">
                            <span>Dashboard / </span>
                            <span>Discount List / </span>
                            <span className="active">Add Discount Coupons</span>
                        </div>
                    </div>
                    <div className="col-md-6 pt-3">
                            <span className="gap-10 d-flex align-items-center justify-content-md-end">
                                <button className="btn_imprt"><X></X> Cancel</button>
                                <button className="black_btn"><File></File> Save as Draft</button>
                                <button className="black_btn"><Check></Check> Save</button>
                           </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="row px-2 pt-3">
                   <div className="col-12">
                        <div className="card_cmn">
                            <div className="row">
                                <h5 className="card_heading">Genral Informations</h5>
                            </div>
                            <div className="row">
                                <div className="col-6 pt-3">
                                    <label className='lbl'>Discount Name</label>
                                    <input type="text" className='input_text '></input>
                                </div>
                                <div className="col-6 pt-3">
                                    <label className='lbl'>Valid Till</label>
                                    <input type="text" className='input_text '></input>
                                </div>
                                <div className="col-6 pt-3">
                                     <label className='lbl'>Select Discount Type</label>
                                        <select className="store_select w-100">
                                            <option>Flat</option>
                                        </select>
                                </div>
                                <div className="col-6 pt-3">
                                     <label className='lbl'>Select Discount Unit</label>
                                        <select className="store_select w-100">
                                            <option>Percentage</option>
                                        </select>
                                </div>
                                <div className="col-6 pt-3">
                                    <label className='lbl'>Set Amount</label>
                                    <input type="text" className='input_text '></input>
                                </div>
                                <div className="col-6 pt-3">
                                     <label className='lbl'>Status</label>
                                        <select className="store_select w-100">
                                            <option>Active</option>
                                        </select>
                                </div>
                                <div className="col-12 pt-3">
                                    <label className='lbl'>Discription</label>
                                    <textarea  className='textarea'></textarea>
                                </div>
                            </div>
                        </div>  
                    </div> 
                </div>
                
                <div className="row px-2 pt-3">
                    <div className="col-12">
    
                            <span className="gap-10 d-flex align-items-center justify-content-md-end">
                                <button className="btn_imprt"><X></X> Cancel</button>
                                <button className="black_btn"><File></File> Save as Draft</button>
                                <button className="black_btn"><Check></Check> Save</button>
                           </span>
               
                    </div>
                </div>
                    </div>
                   
                </div>
               
            </div>
  )
}

export default Adddiscount