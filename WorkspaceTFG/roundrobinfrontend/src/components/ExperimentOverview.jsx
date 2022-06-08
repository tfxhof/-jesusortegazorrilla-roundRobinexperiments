import React, { Fragment, useContext } from 'react';
import { AppContext } from '../providers/ExperimentContext';

export function ExperimentOverview() {
    
    const { expName } = useContext(AppContext);

    return (
        <Fragment>
            <div>
                <div class="container">
                    <div class="row align-items-center my-4">
                        
                        {/* To modify the experiment main info */}
                        <div class="col-lg-6">
                            {/* <div class="title">
                                <b>{name}</b>
                            </div>
                            <br></br>
                            <div class="experiments">
                                {description}
                            </div> */}
                            
                            {expName}
                            
                        </div>

                        {/* To modify the experiment lists (add samples, test, participants...) */}
                        <div class="col-lg-6">
                            Hola
                        </div>
                    </div>
                </div>
            </div>


        </Fragment >
    )
}

export default ExperimentOverview;
